/* ==========================================================
   Journal posts: the data behind blog.html and post.html
   (and the three newest are the ones shown on the home page).
   · slug   : the post's address  ->  post.html?p=<slug>
   · img    : a project slug from js/projects.js: its cover is used (assets/work/<slug>/cover-*.webp)
   · body   : a list of blocks: { p }, { h }, { q, by } or { img, caption }
   Newest first. Placeholder copy: swap in your own.
   ========================================================== */
window.POSTS = [
  {
    slug: 'why-small-teams-make-braver-brands',
    title: 'Why small teams make braver brands',
    category: 'Branding',
    date: '2026-10-28',
    read: 5, i,
    author: 'PyraViz Studio',
    img: 'badea-bank',
    excerpt: 'Fewer layers, faster calls, and work that still feels like someone made it.',
    body: [
      { p: 'Every brand starts brave. Somewhere between the first sketch and the final sign-off, a lot of them stop being brave. The idea gets passed through enough hands that each one sands a little off, until what reaches the customer is smooth, safe and forgettable.' },
      { p: 'We don’t think that happens because people lack taste. It happens because of structure. When ten people have to agree, the work drifts toward whatever nobody objects to, and nobody objects to the middle.' },
      { h: 'The cost of every extra layer' },
      { p: 'Each handoff loses context. The strategist knows why a colour was chosen; the account manager remembers half of it; the client hears a summary of the summary. By the time feedback comes back, it is answering a question nobody asked.' },
      { q: 'The best work we have made came out of rooms with four people in them, not forty.', by: 'Founder, PyraViz' },
      { h: 'What a tight team changes' },
      { p: 'In a small team, the person presenting the idea is the person who had it. Decisions are made in the same conversation the problem is raised. Feedback lands on the work, not on a deck about the work.' },
      { p: 'That speed is not about rushing. It buys time to try the second and third idea, the ones that only show up after the obvious one is out of the way. That is usually where the brave version lives.' },
      { img: 'tomoor-alula', caption: 'Early identity explorations, before anything was safe.' },
      { h: 'Brave, not reckless' },
      { p: 'Bravery in branding is not shock for its own sake. It is choosing one clear thing to say and saying it without hedging. Small teams are simply better at protecting that one clear thing all the way to launch.' }
    ]
  },
  {
    slug: 'shooting-light-red-sea-production',
    title: 'Shooting light: notes from a Red Sea production',
    category: 'Film',
    date: '2026-09-14',
    read: 6,
    author: 'PyraViz Studio',
    img: 'fahd-hotel',
    excerpt: 'What we learned chasing golden hour for six days straight.',
    body: [
      { p: 'Six days, one coastline, and a shot list built almost entirely around two windows of light a day. This is what a week chasing the sun on the Red Sea taught us about planning, patience and knowing when to put the camera down.' },
      { h: 'Plan the light, not the scenes' },
      { p: 'We scheduled the shoot backwards from sunrise and sunset tables, then fitted the scenes into those windows. The middle of the day went to travel, set-up and the interiors that didn’t need the sun.' },
      { p: 'It sounds obvious, but the instinct on set is always to keep shooting. Some of our best decisions were the ones where we waited an hour instead.' },
      { img: 'trade-tower', caption: 'Day four, eleven minutes before sunset.' },
      { h: 'Water is a mirror and a trap' },
      { p: 'The sea gives you light from every direction, which is a gift for faces and a nightmare for exposure. We leaned on polarisers and kept our talent turned slightly away from the glare, letting the water fill the shadows for us.' },
      { q: 'Golden hour lasts about twenty minutes. You get one take that matters, maybe two.', by: 'Director of Photography' },
      { h: 'What we’d do again' },
      { p: 'A small crew, one vehicle, and a scout the day before every location. Being able to move fast meant we never had to choose between the right place and the right light.' }
    ]
  },
  {
    slug: 'art-and-commerce-arent-opposites',
    title: 'Art and commerce aren’t opposites',
    category: 'Strategy',
    date: '2026-08-02',
    read: 4,
    author: 'PyraViz Studio',
    img: 'al-zohour-park',
    excerpt: 'How a clear strategy gives creative work room to take risks.',
    body: [
      { p: 'There is an old idea that you have to pick a side: make something beautiful, or make something that sells. We built this studio on the belief that the choice is false, and that the best brands are the ones that refuse to make it.' },
      { h: 'Strategy is what makes risk affordable' },
      { p: 'When everyone agrees on who the work is for and what it has to do, the creative team can take bigger swings, because there is a clear way to tell whether a swing landed. Without that, every bold idea feels like a gamble.' },
      { q: 'A good brief doesn’t limit the work. It tells you where the edges are so you can go right up to them.', by: 'Strategy Lead' },
      { h: 'Measure what matters' },
      { p: 'We agree on a small number of signals before anything is made: recall, sign-ups, sales in a region, time spent with a film. Then we let the work be as surprising as it needs to be to move them.' },
      { p: 'Art earns attention. Commerce turns attention into a business. A brand needs both, in the same piece of work.' }
    ]
  },
  {
    slug: 'designing-for-arabic-and-latin',
    title: 'Designing one identity for two scripts',
    category: 'Design',
    date: '2026-07-10',
    read: 7,
    author: 'PyraViz Studio',
    img: 'siraj',
    excerpt: 'Building bilingual systems where Arabic is never the afterthought.',
    body: [
      { p: 'Most of our clients speak to their customers in Arabic and English. Too often, bilingual identities are designed in Latin first, with Arabic bolted on at the end. We start with both on the table from day one.' },
      { h: 'Pair, don’t translate' },
      { p: 'An Arabic typeface is not a translation of a Latin one. We look for pairs that share a temperament, the same contrast and rhythm, rather than forcing one script to imitate the shapes of the other.' },
      { img: 'fahd-tower', caption: 'Type pairing tests for a hospitality client.' },
      { h: 'Layouts that read both ways' },
      { p: 'Right-to-left is not a mirror image. Grids, icons with direction, and even photography crops need to be considered for each reading order. We design key layouts in both directions before the system is signed off.' },
      { p: 'The result is an identity that feels native in both languages, which customers notice even when they can’t say why.' }
    ]
  },
  {
    slug: 'a-website-is-a-product',
    title: 'A website is a product, not a brochure',
    category: 'Digital',
    date: '2026-06-03',
    read: 5,
    author: 'PyraViz Studio',
    img: 'al-nada-residence-apartment-03',
    excerpt: 'Why we design sites to be used, measured and improved after launch.',
    body: [
      { p: 'The launch day is when a website starts its life, not when it finishes. Yet many sites are planned like printed brochures: designed once, approved once, and left alone until the next redesign.' },
      { h: 'Start with what people come to do' },
      { p: 'Before we draw a single screen, we list the handful of things visitors actually come to do: book, buy, find an address, get in touch. Every page is judged by how quickly it gets them there.' },
      { h: 'Speed is part of the design' },
      { p: 'A beautiful page that takes six seconds to load is a page most people never see. We set a performance budget at the start and design within it, the same way we would design within a brand palette.' },
      { q: 'If it’s slow, it’s broken. Nobody waits for a brand to load.', by: 'Digital Lead' },
      { h: 'Keep improving' },
      { p: 'After launch we watch what people do, fix what gets in their way, and ship small improvements every month. Over a year, those small changes add up to more than any redesign.' }
    ]
  },
  {
    slug: 'notes-on-shooting-landscapes',
    title: 'Five notes on shooting the landscape you live in',
    category: 'Photography',
    date: '2026-05-12',
    read: 4,
    author: 'PyraViz Studio',
    img: 'summer-house-resort',
    excerpt: 'Familiar places are the hardest to photograph well. Here’s how we try.',
    body: [
      { p: 'It is easy to make a striking picture of somewhere new. It is much harder to see the place you pass every day with fresh eyes. These are the habits that help us.' },
      { h: '1. Go at the wrong time' },
      { p: 'Visit at dawn, in a sandstorm, at midnight. The same street looks like a different city in different light.' },
      { h: '2. Walk, don’t drive' },
      { p: 'The best frames show up between destinations. Moving slowly gives you time to notice them.' },
      { img: 'mr-abdulrahman-apartment', caption: 'Twenty minutes from the studio, at 5:40am.' },
      { h: '3. Leave space' },
      { p: 'Let the landscape be big. A small figure in a wide frame often says more than a close-up.' },
      { h: '4. Return' },
      { p: 'Shoot the same spot across seasons. The series is usually stronger than any single image.' },
      { h: '5. Edit hard' },
      { p: 'Show ten pictures, not a hundred. The work is in choosing.' }
    ]
  }
];
