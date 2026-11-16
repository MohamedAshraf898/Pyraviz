#!/usr/bin/env python3
"""
Build the Work section from the real project library.

Reads   Pyraviz Website Images/Pyraviz Website - Projects and SEO.xlsx   (sheets "Projects" and "Web Images")
and the .webp files next to it, then writes:
  assets/work/<slug>/cover-{480,800,1200,1800}.webp   card + project hero
  assets/work/<slug>/NN-s.webp                         gallery thumbnail (640px)
  assets/work/<slug>/NN.webp                           full image for the viewer (1400px long side)
  js/projects.js                                       window.PROJECTS, read by js/work.js

Only renders go in the galleries ("Process - ..." images are skipped).
Images that already exist are not converted again, so re-running after adding a project is quick.

Usage:  python3 scripts/build-projects.py            (needs Pillow: pip install pillow)
        python3 scripts/build-projects.py --data-only   (rewrite js/projects.js without touching images)
"""
import json, os, re, sys, zipfile
import xml.etree.ElementTree as ET
from concurrent.futures import ProcessPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB = os.path.join(ROOT, 'Pyraviz Website Images')
XLSX = os.path.join(LIB, 'Pyraviz Website - Projects and SEO.xlsx')
OUT = os.path.join(ROOT, 'assets', 'work')
COVER_W = [480, 800, 1200, 1800]
THUMB, FULL = 640, 1400
Q_COVER, Q_THUMB, Q_FULL = 74, 72, 72

# ---------- xlsx (no openpyxl needed) ----------
NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
T = '{%s}t' % NS['m']

def read_xlsx(path):
    z = zipfile.ZipFile(path)
    ss = [''.join(t.text or '' for t in si.iter(T))
          for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si', NS)] if 'xl/sharedStrings.xml' in z.namelist() else []
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    target = {r.get('Id'): r.get('Target') for r in rels}
    rid = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'
    def col(ref):
        n = 0
        for ch in re.match(r'[A-Z]+', ref).group(0): n = n * 26 + ord(ch) - 64
        return n - 1
    sheets = {}
    for s in wb.find('m:sheets', NS):
        t = target[s.get(rid)].lstrip('/')
        t = t if t.startswith('xl/') else 'xl/' + t
        rows = []
        for r in ET.fromstring(z.read(t)).iter('{%s}row' % NS['m']):
            row = {}
            for c in r.findall('m:c', NS):
                v, ty = c.find('m:v', NS), c.get('t')
                if ty == 'inlineStr': val = ''.join(x.text or '' for x in c.iter(T))
                elif v is None: continue
                else: val = ss[int(v.text)] if ty == 's' else v.text
                row[col(c.get('r'))] = val.strip()
            if row: rows.append([row.get(i, '') for i in range(max(row) + 1)])
        head = rows[0]
        sheets[s.get('name')] = [dict(zip(head, r + [''] * (len(head) - len(r)))) for r in rows[1:]]
    return sheets

def local(p):
    # 'Pyraviz Website Images\\04 - ...\\x.webp' -> absolute path
    p = p.replace('\\', '/')
    if p.startswith('Pyraviz Website Images/'): p = p[len('Pyraviz Website Images/'):]
    return os.path.join(LIB, p)

def clean_cat(c): return re.sub(r'^\d+\s*-\s*', '', c).strip()
def num(v):
    try: return int(float(v))
    except (TypeError, ValueError): return ''

# ---------- images ----------
def resize_save(src, dst, long_side=None, width=None, q=72):
    if os.path.exists(dst): return 0
    from PIL import Image
    im = Image.open(src)
    im = im.convert('RGB')
    if width: box = (width, 100000)
    else: box = (long_side, long_side)
    im.thumbnail(box, Image.LANCZOS)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    tmp = dst + '.tmp'
    im.save(tmp, 'WEBP', quality=q, method=5)
    os.replace(tmp, dst)
    return 1

def job(args):
    kind, src, slug, n = args
    d = os.path.join(OUT, slug)
    if kind == 'cover':
        return sum(resize_save(src, os.path.join(d, f'cover-{w}.webp'), width=w, q=Q_COVER) for w in COVER_W)
    return (resize_save(src, os.path.join(d, f'{n:02d}-s.webp'), long_side=THUMB, q=Q_THUMB) +
            resize_save(src, os.path.join(d, f'{n:02d}.webp'), long_side=FULL, q=Q_FULL))

# ---------- main ----------
def main():
    data_only = '--data-only' in sys.argv
    x = read_xlsx(XLSX)
    projects, images = x['Projects'], x['Web Images']
    by_id = {}
    for im in images:
        if im['Image type'] != 'Render': continue
        by_id.setdefault(im['ID'], []).append(im)

    jobs, out, missing = [], [], []
    for p in projects:
        slug = p['URL slug'] or re.sub(r'[^a-z0-9]+', '-', p['Project name'].lower()).strip('-')
        cover = local(p['Cover image'])
        if not os.path.exists(cover): missing.append(cover); continue
        jobs.append(('cover', cover, slug, 0))
        gallery = []
        for im in by_id.get(p['ID'], []):
            src = local(im['Web file'])
            if not os.path.exists(src): missing.append(src); continue
            n = len(gallery) + 1
            jobs.append(('img', src, slug, n))
            gallery.append({'src': f'assets/work/{slug}/{n:02d}.webp', 'thumb': f'assets/work/{slug}/{n:02d}-s.webp',
                            'caption': im['View / space'], 'alt': im['Alt text']})
        loc = ', '.join(v for v in [p['City'], p['Country']] if v)
        style = ', '.join(v for v in [p['Design style'], p['Design style 2 (optional)']] if v)
        services = [s for s in [p['Service (page subtitle)']] if s]
        out.append({
            'slug': slug,
            'title': p['Project name'],
            'client': p['Client'],
            'year': num(p['Year']),
            'category': clean_cat(p['Category']),
            'type': p['Project type'],
            'location': loc,
            'scope': p['Scope'],
            'style': style,
            'spaces': p['Spaces / rooms shown'] if p['Spaces / rooms shown'] not in ('', '-') else '',
            'services': services,
            'cover': f'assets/work/{slug}/cover-1200.webp',
            'coverAlt': p['Cover alt text'],
            'description': p['Short description'],
            'seoTitle': p['Page title'],
            'seoDescription': p['Meta description'],
            'gallery': gallery,
        })

    if missing:
        print(f'! {len(missing)} files listed in the sheet were not found, e.g.:', *missing[:5], sep='\n  ')

    js = ('/* ==========================================================================\n'
          '   projects.js  -  GENERATED by scripts/build-projects.py from\n'
          '   "Pyraviz Website Images/Pyraviz Website - Projects and SEO.xlsx".\n'
          '   Edit the spreadsheet (or add images), then run:  python3 scripts/build-projects.py\n'
          '   Hand edits here are overwritten on the next run.\n'
          '   ========================================================================== */\n'
          'window.PROJECTS = [\n' +
          ',\n'.join(json.dumps(p, ensure_ascii=False, separators=(',', ':')) for p in out) + '\n];\n')
    with open(os.path.join(ROOT, 'js', 'projects.js'), 'w', encoding='utf-8') as f: f.write(js)
    print(f'js/projects.js: {len(out)} projects, {sum(len(p["gallery"]) for p in out)} gallery images')

    if data_only: return
    done, made = 0, 0
    with ProcessPoolExecutor(max_workers=max(2, (os.cpu_count() or 4) - 1)) as ex:
        for r in ex.map(job, jobs, chunksize=4):
            done += 1; made += r
            if done % 100 == 0 or done == len(jobs): print(f'images: {done}/{len(jobs)} sources, {made} files written', flush=True)

if __name__ == '__main__':
    main()
