/* ==========================================================================
   projects.js  -  the ONLY file you edit to manage your projects.

   Add a project = copy one block below, paste it in the list, change the text and
   the image paths. Nothing else in the site needs touching. The home grid, the
   filters, "load more", the project page and next/previous links all read this list.

   FIELDS
     slug         URL id, lowercase, no spaces      -> yoursite.com/#/work/salt-and-stone
     title        project name
     client       client / brand name
     year         number, e.g. 2026
     category     ONE word/phrase; the filter chips are built from these automatically
     services     list of what you did (shown on the project page)
     role         your role (optional)
     cover        card image on the home grid. Also the big main picture on the project page
     hero         (optional) different main picture for the project page
     description  the paragraph next to the title on the project page
     gallery      UP TO 50 images (more works too). Each item is either
                    'assets/projects/my-image.jpg'          (path or full URL)
                    { src: '...', caption: 'Shown in the viewer' }
     story        second section on the project page (all parts optional)
        lead        big statement that lights up word by word
        body        list of paragraphs
        images      1 or 2 photos - the layout adapts to the number
        credits     [{ role: 'Director', name: 'Someone' }, ...]

   IMAGES
     A bare name like 'p07' is shorthand for 'assets/projects/p07.jpg'.
     The demo images p01-p52 are generated placeholders: replace them with yours.
     Tip: cover 1200x800, gallery 1600px wide, JPG/WebP, under ~300 KB each.
   ========================================================================== */
window.PROJECTS = [
  {
    slug: 'salt-and-stone',
    title: 'Salt & Stone',
    client: 'Coastal Hospitality Group',
    year: 2026,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p01',
    description: 'A slow, tactile film about a place that rewards patience. We spent three weeks on location and let the light decide the schedule.',
    gallery: [
      'p02', 'p03', 'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'p11',
      'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21',
      'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31',
      'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40', 'p41',
      'p42', 'p43', 'p44', 'p45', 'p46', 'p47', 'p48', 'p49', 'p50', 'p51'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p21', 'p22'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Design', name: 'Laila Ashraf' }, { role: 'Producer', name: 'Omar Fathy' }]
    }
  },
  {
    slug: 'the-quiet-room',
    title: 'The Quiet Room',
    client: 'Cairo Design Week',
    year: 2026,
    category: 'Product',
    services: ['Photography', 'Design', 'Branding'],
    role: 'Concept, design and delivery',
    cover: 'p02',
    description: 'An identity built from a single gesture, then stretched across signage, packaging and a quietly confident website.',
    gallery: [
      'p03', 'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'p11'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p22', 'p23'],
      credits: [{ role: 'Producer', name: 'Omar Fathy' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'small-objects',
    title: 'Small Objects',
    client: 'Nubia Textiles',
    year: 2026,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p03',
    description: 'Still-life photography for a small-batch maker, lit like paintings and shot entirely on set with practical light.',
    gallery: [
      'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'p11'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p23'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Design', name: 'Laila Ashraf' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  },
  {
    slug: 'harvest-season',
    title: 'Harvest Season',
    client: 'Delta Tourism Office',
    year: 2026,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p04',
    description: 'A seasonal campaign that traded stock imagery for real people, real weather and one very long road trip.',
    gallery: [
      'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'p11', 'p12', 'p13', 'p14',
      'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24',
      'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33', 'p34'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p24', 'p25'],
      credits: [{ role: 'Producer', name: 'Omar Fathy' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Design', name: 'Laila Ashraf' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'deep-end',
    title: 'Deep End',
    client: 'Bayt Furniture',
    year: 2026,
    category: 'Digital',
    services: ['Digital & Web', 'Design', 'Content'],
    role: 'Concept, design and delivery',
    cover: 'p05',
    description: 'A digital home for a studio that wanted less noise: fast, typographic and easy for the team to keep updated.',
    gallery: [
      'p06', 'p07', 'p08', 'p09', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15',
      'p16', 'p17'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p25', 'p26'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Design', name: 'Laila Ashraf' }]
    }
  },
  {
    slug: 'golden-hour',
    title: 'Golden Hour',
    client: 'Red Sea Collective',
    year: 2026,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p06',
    description: 'A launch film, a photo series and a social system, all cut from the same three days of shooting.',
    gallery: [
      'p07', 'p08', 'p09', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16',
      'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26',
      'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36',
      'p37', 'p38', 'p39', 'p40', 'p41', 'p42', 'p43', 'p44', 'p45', 'p46'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p26'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Design', name: 'Laila Ashraf' }]
    }
  },
  {
    slug: 'paper-skies',
    title: 'Paper Skies',
    client: 'Marsa Hotels',
    year: 2026,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p07',
    description: 'Art direction and set design for a product story told in colour, texture and very careful shadows.',
    gallery: [
      'p08', 'p09', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17',
      'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p27', 'p28'],
      credits: [{ role: 'Sound', name: 'Mariam Tarek' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'night-shift',
    title: 'Night Shift',
    client: 'Sinai Adventures',
    year: 2026,
    category: 'Branding',
    services: ['Branding', 'Design', 'Strategy'],
    role: 'Concept, design and delivery',
    cover: 'p08',
    description: 'A brand refresh that kept everything loved about the old identity and removed everything that was in the way.',
    gallery: [
      'p09', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18',
      'p19', 'p20', 'p21', 'p22'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p28', 'p29'],
      credits: [{ role: 'Design', name: 'Laila Ashraf' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Editor', name: 'Youssef Karim' }]
    }
  },
  {
    slug: 'terracotta',
    title: 'Terracotta',
    client: 'Terra Goods',
    year: 2025,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p09',
    description: 'A slow, tactile film about a place that rewards patience. We spent three weeks on location and let the light decide the schedule.',
    gallery: [
      'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p29'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'slow-water',
    title: 'Slow Water',
    client: 'Atlas Outdoor',
    year: 2025,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p10',
    description: 'An identity built from a single gesture, then stretched across signage, packaging and a quietly confident website.',
    gallery: [
      'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20',
      'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30',
      'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p30', 'p31'],
      credits: [{ role: 'Design', name: 'Laila Ashraf' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Producer', name: 'Omar Fathy' }]
    }
  },
  {
    slug: 'northbound',
    title: 'Northbound',
    client: 'Zamalek Kitchen',
    year: 2025,
    category: 'Product',
    services: ['Photography', 'Design', 'Branding'],
    role: 'Concept, design and delivery',
    cover: 'p11',
    description: 'Still-life photography for a small-batch maker, lit like paintings and shot entirely on set with practical light.',
    gallery: [
      'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21',
      'p22', 'p23', 'p24', 'p25'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p31', 'p32'],
      credits: [{ role: 'Colour', name: 'Hady Samir' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Design', name: 'Laila Ashraf' }]
    }
  },
  {
    slug: 'fig-and-ember',
    title: 'Fig & Ember',
    client: 'Sahra Coffee Roasters',
    year: 2025,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p12',
    description: 'A seasonal campaign that traded stock imagery for real people, real weather and one very long road trip.',
    gallery: [
      'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p32'],
      credits: [{ role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'low-tide',
    title: 'Low Tide',
    client: 'Oasis Wellness',
    year: 2025,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p13',
    description: 'A digital home for a studio that wanted less noise: fast, typographic and easy for the team to keep updated.',
    gallery: [
      'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23',
      'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33',
      'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40', 'p41', 'p42', 'p43',
      'p44', 'p45', 'p46', 'p47', 'p48', 'p49', 'p50', 'p51', 'p52', 'p01'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p33', 'p34'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'atlas-coffee',
    title: 'Atlas Coffee',
    client: 'Nile Arts Foundation',
    year: 2025,
    category: 'Digital',
    services: ['Digital & Web', 'Design', 'Content'],
    role: 'Concept, design and delivery',
    cover: 'p14',
    description: 'A launch film, a photo series and a social system, all cut from the same three days of shooting.',
    gallery: [
      'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24',
      'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p34', 'p35'],
      credits: [{ role: 'Design', name: 'Laila Ashraf' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Director of Photography', name: 'Salma Adel' }]
    }
  },
  {
    slug: 'sunday-market',
    title: 'Sunday Market',
    client: 'Lotus & Co.',
    year: 2025,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p15',
    description: 'Art direction and set design for a product story told in colour, texture and very careful shadows.',
    gallery: [
      'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25',
      'p26', 'p27', 'p28', 'p29'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p35'],
      credits: [{ role: 'Design', name: 'Laila Ashraf' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'concrete-garden',
    title: 'Concrete Garden',
    client: 'Al Noor Foundation',
    year: 2025,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p16',
    description: 'A brand refresh that kept everything loved about the old identity and removed everything that was in the way.',
    gallery: [
      'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p36', 'p37'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  },
  {
    slug: 'halcyon',
    title: 'Halcyon',
    client: 'Azure Resorts',
    year: 2024,
    category: 'Branding',
    services: ['Branding', 'Design', 'Strategy'],
    role: 'Concept, design and delivery',
    cover: 'p17',
    description: 'A slow, tactile film about a place that rewards patience. We spent three weeks on location and let the light decide the schedule.',
    gallery: [
      'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27',
      'p28', 'p29', 'p30', 'p31', 'p32', 'p33'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p37', 'p38'],
      credits: [{ role: 'Producer', name: 'Omar Fathy' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  },
  {
    slug: 'blue-hour',
    title: 'Blue Hour',
    client: 'Kemet Films',
    year: 2024,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p18',
    description: 'An identity built from a single gesture, then stretched across signage, packaging and a quietly confident website.',
    gallery: [
      'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28',
      'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38',
      'p39', 'p40', 'p41', 'p42', 'p43', 'p44', 'p45', 'p46', 'p47', 'p48'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p38'],
      credits: [{ role: 'Colour', name: 'Hady Samir' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Producer', name: 'Omar Fathy' }]
    }
  },
  {
    slug: 'dust-and-silk',
    title: 'Dust & Silk',
    client: 'Coastal Hospitality Group',
    year: 2024,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p19',
    description: 'Still-life photography for a small-batch maker, lit like paintings and shot entirely on set with practical light.',
    gallery: [
      'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29',
      'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p39', 'p40'],
      credits: [{ role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  },
  {
    slug: 'the-long-table',
    title: 'The Long Table',
    client: 'Cairo Design Week',
    year: 2024,
    category: 'Product',
    services: ['Photography', 'Design', 'Branding'],
    role: 'Concept, design and delivery',
    cover: 'p20',
    description: 'A seasonal campaign that traded stock imagery for real people, real weather and one very long road trip.',
    gallery: [
      'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30',
      'p31', 'p32'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p40', 'p41'],
      credits: [{ role: 'Design', name: 'Laila Ashraf' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Creative Director', name: 'Nour Hassan' }]
    }
  },
  {
    slug: 'kiln',
    title: 'Kiln',
    client: 'Nubia Textiles',
    year: 2024,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p21',
    description: 'A digital home for a studio that wanted less noise: fast, typographic and easy for the team to keep updated.',
    gallery: [
      'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31',
      'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p41'],
      credits: [{ role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Producer', name: 'Omar Fathy' }]
    }
  },
  {
    slug: 'mirage',
    title: 'Mirage',
    client: 'Delta Tourism Office',
    year: 2024,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p22',
    description: 'A launch film, a photo series and a social system, all cut from the same three days of shooting.',
    gallery: [
      'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32',
      'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p42', 'p43'],
      credits: [{ role: 'Sound', name: 'Mariam Tarek' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Creative Director', name: 'Nour Hassan' }]
    }
  },
  {
    slug: 'parallel',
    title: 'Parallel',
    client: 'Bayt Furniture',
    year: 2024,
    category: 'Digital',
    services: ['Digital & Web', 'Design', 'Content'],
    role: 'Concept, design and delivery',
    cover: 'p23',
    description: 'Art direction and set design for a product story told in colour, texture and very careful shadows.',
    gallery: [
      'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p43', 'p44'],
      credits: [{ role: 'Sound', name: 'Mariam Tarek' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Design', name: 'Laila Ashraf' }, { role: 'Creative Director', name: 'Nour Hassan' }]
    }
  },
  {
    slug: 'saffron-road',
    title: 'Saffron Road',
    client: 'Red Sea Collective',
    year: 2024,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p24',
    description: 'A brand refresh that kept everything loved about the old identity and removed everything that was in the way.',
    gallery: [
      'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p44'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Design', name: 'Laila Ashraf' }, { role: 'Producer', name: 'Omar Fathy' }]
    }
  },
  {
    slug: 'tidewater',
    title: 'Tidewater',
    client: 'Marsa Hotels',
    year: 2023,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p25',
    description: 'A slow, tactile film about a place that rewards patience. We spent three weeks on location and let the light decide the schedule.',
    gallery: [
      'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35',
      'p36', 'p37', 'p38', 'p39'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p45', 'p46'],
      credits: [{ role: 'Producer', name: 'Omar Fathy' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Editor', name: 'Youssef Karim' }]
    }
  },
  {
    slug: 'woven',
    title: 'Woven',
    client: 'Sinai Adventures',
    year: 2023,
    category: 'Branding',
    services: ['Branding', 'Design', 'Strategy'],
    role: 'Concept, design and delivery',
    cover: 'p26',
    description: 'An identity built from a single gesture, then stretched across signage, packaging and a quietly confident website.',
    gallery: [
      'p27', 'p28', 'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36',
      'p37', 'p38', 'p39', 'p40', 'p41', 'p42'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p46', 'p47'],
      credits: [{ role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'first-light',
    title: 'First Light',
    client: 'Terra Goods',
    year: 2023,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p27',
    description: 'Still-life photography for a small-batch maker, lit like paintings and shot entirely on set with practical light.',
    gallery: [
      'p28', 'p29', 'p30', 'p31', 'p32', 'p33'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p47'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Director of Photography', name: 'Salma Adel' }]
    }
  },
  {
    slug: 'oasis-club',
    title: 'Oasis Club',
    client: 'Atlas Outdoor',
    year: 2023,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p28',
    description: 'A seasonal campaign that traded stock imagery for real people, real weather and one very long road trip.',
    gallery: [
      'p29', 'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38',
      'p39', 'p40', 'p41', 'p42', 'p43', 'p44'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p48', 'p49'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Creative Director', name: 'Nour Hassan' }]
    }
  },
  {
    slug: 'brass-and-bloom',
    title: 'Brass & Bloom',
    client: 'Zamalek Kitchen',
    year: 2023,
    category: 'Product',
    services: ['Photography', 'Design', 'Branding'],
    role: 'Concept, design and delivery',
    cover: 'p29',
    description: 'A digital home for a studio that wanted less noise: fast, typographic and easy for the team to keep updated.',
    gallery: [
      'p30', 'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p49', 'p50'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Design', name: 'Laila Ashraf' }]
    }
  },
  {
    slug: 'field-notes',
    title: 'Field Notes',
    client: 'Sahra Coffee Roasters',
    year: 2023,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p30',
    description: 'A launch film, a photo series and a social system, all cut from the same three days of shooting.',
    gallery: [
      'p31', 'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40',
      'p41', 'p42', 'p43', 'p44', 'p45', 'p46', 'p47', 'p48', 'p49', 'p50'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p50'],
      credits: [{ role: 'Design', name: 'Laila Ashraf' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'monsoon',
    title: 'Monsoon',
    client: 'Oasis Wellness',
    year: 2023,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p31',
    description: 'Art direction and set design for a product story told in colour, texture and very careful shadows.',
    gallery: [
      'p32', 'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p51', 'p52'],
      credits: [{ role: 'Sound', name: 'Mariam Tarek' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Director of Photography', name: 'Salma Adel' }]
    }
  },
  {
    slug: 'ember-studio',
    title: 'Ember Studio',
    client: 'Nile Arts Foundation',
    year: 2022,
    category: 'Digital',
    services: ['Digital & Web', 'Design', 'Content'],
    role: 'Concept, design and delivery',
    cover: 'p32',
    description: 'A brand refresh that kept everything loved about the old identity and removed everything that was in the way.',
    gallery: [
      'p33', 'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40', 'p41', 'p42',
      'p43', 'p44', 'p45', 'p46', 'p47', 'p48', 'p49', 'p50'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p52', 'p01'],
      credits: [{ role: 'Producer', name: 'Omar Fathy' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Design', name: 'Laila Ashraf' }, { role: 'Creative Director', name: 'Nour Hassan' }]
    }
  },
  {
    slug: 'salt-flats',
    title: 'Salt Flats',
    client: 'Lotus & Co.',
    year: 2022,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p33',
    description: 'A slow, tactile film about a place that rewards patience. We spent three weeks on location and let the light decide the schedule.',
    gallery: [
      'p34', 'p35', 'p36', 'p37', 'p38', 'p39', 'p40', 'p41', 'p42', 'p43',
      'p44', 'p45', 'p46', 'p47'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p01'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'lantern',
    title: 'Lantern',
    client: 'Al Noor Foundation',
    year: 2022,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p34',
    description: 'An identity built from a single gesture, then stretched across signage, packaging and a quietly confident website.',
    gallery: [
      'p35', 'p36', 'p37', 'p38', 'p39', 'p40', 'p41', 'p42', 'p43', 'p44',
      'p45', 'p46', 'p47', 'p48', 'p49', 'p50', 'p51', 'p52', 'p01', 'p02'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p02', 'p03'],
      credits: [{ role: 'Sound', name: 'Mariam Tarek' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'cedar-house',
    title: 'Cedar House',
    client: 'Azure Resorts',
    year: 2022,
    category: 'Branding',
    services: ['Branding', 'Design', 'Strategy'],
    role: 'Concept, design and delivery',
    cover: 'p35',
    description: 'Still-life photography for a small-batch maker, lit like paintings and shot entirely on set with practical light.',
    gallery: [
      'p36', 'p37', 'p38', 'p39', 'p40', 'p41', 'p42', 'p43', 'p44', 'p45',
      'p46', 'p47'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p03', 'p04'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Editor', name: 'Youssef Karim' }]
    }
  },
  {
    slug: 'riverbend',
    title: 'Riverbend',
    client: 'Kemet Films',
    year: 2022,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p36',
    description: 'A seasonal campaign that traded stock imagery for real people, real weather and one very long road trip.',
    gallery: [
      'p37', 'p38', 'p39', 'p40', 'p41', 'p42', 'p43', 'p44', 'p45', 'p46',
      'p47', 'p48', 'p49', 'p50'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p04'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Design', name: 'Laila Ashraf' }]
    }
  },
  {
    slug: 'copper-sky',
    title: 'Copper Sky',
    client: 'Coastal Hospitality Group',
    year: 2022,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p37',
    description: 'A digital home for a studio that wanted less noise: fast, typographic and easy for the team to keep updated.',
    gallery: [
      'p38', 'p39', 'p40', 'p41', 'p42', 'p43', 'p44', 'p45', 'p46', 'p47',
      'p48', 'p49', 'p50', 'p51', 'p52', 'p01'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p05', 'p06'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'signal',
    title: 'Signal',
    client: 'Cairo Design Week',
    year: 2022,
    category: 'Product',
    services: ['Photography', 'Design', 'Branding'],
    role: 'Concept, design and delivery',
    cover: 'p38',
    description: 'A launch film, a photo series and a social system, all cut from the same three days of shooting.',
    gallery: [
      'p39', 'p40', 'p41', 'p42', 'p43', 'p44', 'p45', 'p46', 'p47', 'p48',
      'p49', 'p50', 'p51', 'p52'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p06', 'p07'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Editor', name: 'Youssef Karim' }]
    }
  },
  {
    slug: 'undertow',
    title: 'Undertow',
    client: 'Nubia Textiles',
    year: 2022,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p39',
    description: 'Art direction and set design for a product story told in colour, texture and very careful shadows.',
    gallery: [
      'p40', 'p41', 'p42', 'p43', 'p44', 'p45', 'p46', 'p47', 'p48', 'p49',
      'p50', 'p51', 'p52', 'p01', 'p02', 'p03', 'p04', 'p05'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p07'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'wildgrass',
    title: 'Wildgrass',
    client: 'Delta Tourism Office',
    year: 2021,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p40',
    description: 'A brand refresh that kept everything loved about the old identity and removed everything that was in the way.',
    gallery: [
      'p41', 'p42', 'p43', 'p44', 'p45', 'p46', 'p47', 'p48', 'p49', 'p50',
      'p51', 'p52', 'p01', 'p02'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p08', 'p09'],
      credits: [{ role: 'Colour', name: 'Hady Samir' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  },
  {
    slug: 'marble-hour',
    title: 'Marble Hour',
    client: 'Bayt Furniture',
    year: 2021,
    category: 'Digital',
    services: ['Digital & Web', 'Design', 'Content'],
    role: 'Concept, design and delivery',
    cover: 'p41',
    description: 'A slow, tactile film about a place that rewards patience. We spent three weeks on location and let the light decide the schedule.',
    gallery: [
      'p42', 'p43', 'p44', 'p45', 'p46', 'p47'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p09', 'p10'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Producer', name: 'Omar Fathy' }]
    }
  },
  {
    slug: 'nomad',
    title: 'Nomad',
    client: 'Red Sea Collective',
    year: 2021,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p42',
    description: 'An identity built from a single gesture, then stretched across signage, packaging and a quietly confident website.',
    gallery: [
      'p43', 'p44', 'p45', 'p46', 'p47', 'p48', 'p49', 'p50', 'p51'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p10'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  },
  {
    slug: 'amber-lane',
    title: 'Amber Lane',
    client: 'Marsa Hotels',
    year: 2021,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p43',
    description: 'Still-life photography for a small-batch maker, lit like paintings and shot entirely on set with practical light.',
    gallery: [
      'p44', 'p45', 'p46', 'p47', 'p48', 'p49', 'p50', 'p51', 'p52', 'p01',
      'p02', 'p03', 'p04', 'p05', 'p06', 'p07'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p11', 'p12'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Design', name: 'Laila Ashraf' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Director of Photography', name: 'Salma Adel' }]
    }
  },
  {
    slug: 'still-life-no-4',
    title: 'Still Life No. 4',
    client: 'Sinai Adventures',
    year: 2021,
    category: 'Branding',
    services: ['Branding', 'Design', 'Strategy'],
    role: 'Concept, design and delivery',
    cover: 'p44',
    description: 'A seasonal campaign that traded stock imagery for real people, real weather and one very long road trip.',
    gallery: [
      'p45', 'p46', 'p47', 'p48', 'p49', 'p50', 'p51', 'p52', 'p01'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p12', 'p13'],
      credits: [{ role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'northern-lights-hotel',
    title: 'Northern Lights Hotel',
    client: 'Terra Goods',
    year: 2021,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p45',
    description: 'A digital home for a studio that wanted less noise: fast, typographic and easy for the team to keep updated.',
    gallery: [
      'p46', 'p47', 'p48', 'p49', 'p50', 'p51', 'p52', 'p01', 'p02', 'p03',
      'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'p11', 'p12', 'p13',
      'p14', 'p15', 'p16', 'p17'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p13'],
      credits: [{ role: 'Producer', name: 'Omar Fathy' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Design', name: 'Laila Ashraf' }]
    }
  },
  {
    slug: 'palm-and-pine',
    title: 'Palm & Pine',
    client: 'Atlas Outdoor',
    year: 2021,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p46',
    description: 'A launch film, a photo series and a social system, all cut from the same three days of shooting.',
    gallery: [
      'p47', 'p48', 'p49', 'p50', 'p51', 'p52', 'p01', 'p02', 'p03'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p14', 'p15'],
      credits: [{ role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'clay-works',
    title: 'Clay Works',
    client: 'Zamalek Kitchen',
    year: 2021,
    category: 'Product',
    services: ['Photography', 'Design', 'Branding'],
    role: 'Concept, design and delivery',
    cover: 'p47',
    description: 'Art direction and set design for a product story told in colour, texture and very careful shadows.',
    gallery: [
      'p48', 'p49', 'p50', 'p51', 'p52', 'p01', 'p02', 'p03', 'p04', 'p05',
      'p06', 'p07', 'p08', 'p09', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15',
      'p16', 'p17', 'p18', 'p19'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p15', 'p16'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Design', name: 'Laila Ashraf' }]
    }
  },
  {
    slug: 'afterglow',
    title: 'Afterglow',
    client: 'Sahra Coffee Roasters',
    year: 2020,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p48',
    description: 'A brand refresh that kept everything loved about the old identity and removed everything that was in the way.',
    gallery: [
      'p49', 'p50', 'p51', 'p52', 'p01', 'p02', 'p03', 'p04', 'p05', 'p06',
      'p07', 'p08'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p16'],
      credits: [{ role: 'Sound', name: 'Mariam Tarek' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'skyline-sessions',
    title: 'Skyline Sessions',
    client: 'Oasis Wellness',
    year: 2020,
    category: 'Campaign',
    services: ['Strategy', 'Content', 'Film Production'],
    role: 'Concept, direction and production',
    cover: 'p49',
    description: 'A slow, tactile film about a place that rewards patience. We spent three weeks on location and let the light decide the schedule.',
    gallery: [
      'p50', 'p51', 'p52', 'p01', 'p02', 'p03'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.'
      ],
      images: ['p17', 'p18'],
      credits: [{ role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  },
  {
    slug: 'rooftop',
    title: 'Rooftop',
    client: 'Nile Arts Foundation',
    year: 2020,
    category: 'Digital',
    services: ['Digital & Web', 'Design', 'Content'],
    role: 'Concept, design and delivery',
    cover: 'p50',
    description: 'An identity built from a single gesture, then stretched across signage, packaging and a quietly confident website.',
    gallery: [
      'p51', 'p52', 'p01', 'p02', 'p03', 'p04', 'p05', 'p06', 'p07', 'p08',
      'p09', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16'
    ],
    story: {
      lead: 'We shot until the light gave up, then we shot a little more.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p18', 'p19'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Design', name: 'Laila Ashraf' }, { role: 'Creative Director', name: 'Nour Hassan' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'weekend-bazaar',
    title: 'Weekend Bazaar',
    client: 'Lotus & Co.',
    year: 2020,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p51',
    description: 'Still-life photography for a small-batch maker, lit like paintings and shot entirely on set with practical light.',
    gallery: [
      'p52', 'p01', 'p02', 'p03', 'p04', 'p05'
    ],
    story: {
      lead: 'We didn\'t set out to make something loud. We set out to make something you\'d remember a week later.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p19'],
      credits: [{ role: 'Director of Photography', name: 'Salma Adel' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  },
  {
    slug: 'moon-garden',
    title: 'Moon Garden',
    client: 'Al Noor Foundation',
    year: 2020,
    category: 'Photography',
    services: ['Photography', 'Art Direction', 'Post Production'],
    role: 'Concept, design and delivery',
    cover: 'p52',
    description: 'A seasonal campaign that traded stock imagery for real people, real weather and one very long road trip.',
    gallery: [
      'p01', 'p02', 'p03', 'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10',
      'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20',
      'p21', 'p22', 'p23', 'p24'
    ],
    story: {
      lead: 'Every great project starts with one honest sentence. This one started with a cup of tea and a long walk.',
      body: [
        'We built a small system first: a palette, a rhythm, a few rules. Then we broke the rules where the material asked us to, and kept the breaks that felt true.',
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.'
      ],
      images: ['p20', 'p21'],
      credits: [{ role: 'Editor', name: 'Youssef Karim' }, { role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Sound', name: 'Mariam Tarek' }, { role: 'Colour', name: 'Hady Samir' }]
    }
  },
  {
    slug: 'silt',
    title: 'Silt',
    client: 'Azure Resorts',
    year: 2020,
    category: 'Branding',
    services: ['Branding', 'Design', 'Strategy'],
    role: 'Concept, design and delivery',
    cover: 'p01',
    description: 'A digital home for a studio that wanted less noise: fast, typographic and easy for the team to keep updated.',
    gallery: [
      'p02', 'p03', 'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'p11',
      'p12', 'p13', 'p14', 'p15'
    ],
    story: {
      lead: 'The brief said modern. The place said patient. We listened to the place.',
      body: [
        'From there the work became a series of small decisions: which colour to trust, which shot to cut, when to leave a silence alone. None of them mattered on their own. Together they became the whole thing.',
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.'
      ],
      images: ['p21', 'p22'],
      credits: [{ role: 'Sound', name: 'Mariam Tarek' }, { role: 'Colour', name: 'Hady Samir' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Art Direction', name: 'Karim Nabil' }]
    }
  },
  {
    slug: 'vesper',
    title: 'Vesper',
    client: 'Kemet Films',
    year: 2020,
    category: 'Film',
    services: ['Film Production', 'Post Production', 'Art Direction'],
    role: 'Concept, direction and production',
    cover: 'p02',
    description: 'A launch film, a photo series and a social system, all cut from the same three days of shooting.',
    gallery: [
      'p03', 'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'p11', 'p12',
      'p13', 'p14'
    ],
    story: {
      lead: 'Good work feels inevitable, as if it had always been there waiting for someone to notice.',
      body: [
        'The final piece was assembled in a week and refined for a month. The best compliment came from the client, who said it looked like it had always belonged to them.',
        'It began with a phone call and a very short brief. The team wanted something that felt handmade without looking precious, so we visited before we drew a single frame. We walked the space, met the people who run it, and wrote down what we noticed instead of what we expected.'
      ],
      images: ['p22'],
      credits: [{ role: 'Art Direction', name: 'Karim Nabil' }, { role: 'Producer', name: 'Omar Fathy' }, { role: 'Editor', name: 'Youssef Karim' }, { role: 'Sound', name: 'Mariam Tarek' }]
    }
  }
];
