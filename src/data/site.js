// Every visible string that isn't project data lives here.
// Assumptions to confirm (also listed in the hand-off):
// - Production URL is https://naufalkateni.com (the portfolio repo's homepage in the API).
// - "About 2 years" of experience is copied from the previous site and may be out of date.
// - Project notes are condensed from each repo's README on GitHub; repos without a useful README
//   (simple-video-meet, news-portal) have no notes and show the API description only.

export const site = {
  name: 'Muhammad Naufal Kateni',
  short: 'Naufal Kateni',
  handle: 'NaufalK25',
  role: 'Fullstack developer, mostly backend',
  url: 'https://naufalkateni.com',
  description:
    'Muhammad Naufal Kateni is a fullstack developer who leans backend: database design and REST APIs in Node.js, NestJS and TypeScript.',
  statement:
    'Fullstack developer, mostly backend. I design databases and build the REST APIs that sit on them, in Node.js and TypeScript.',
  email: 'naufalkateni2001@gmail.com',
  cv: 'https://drive.google.com/drive/folders/1sEMyvGzp0gc0PcztVR8UJWMeKEG7gkmW?usp=drive_link',
  portrait: { src: '/img/naufal-680.webp', small: '/img/naufal-420.webp', w: 680, h: 1024 }
};

export const contacts = [
  { channel: 'Email', handle: site.email, href: `mailto:${site.email}` },
  { channel: 'GitHub', handle: 'NaufalK25', href: 'https://github.com/NaufalK25' },
  { channel: 'LinkedIn', handle: 'muhammad-naufal-kateni', href: 'https://www.linkedin.com/in/muhammad-naufal-kateni/' },
  { channel: 'X', handle: '@NaufalK2511', href: 'https://x.com/NaufalK2511' },
  { channel: 'WhatsApp', handle: '+62 816 382001', href: 'https://wa.me/62816382001' }
];

// The developer entity in the hero. type is schema notation, shown in mono.
export const developer = [
  { key: 'PK', field: 'handle', type: 'varchar', value: 'naufalk25' },
  { field: 'role', type: 'varchar', value: 'Fullstack, mostly backend' },
  { field: 'builds_with', type: 'text[]', value: 'Node.js, NestJS, Express, TypeScript' },
  { field: 'stores_in', type: 'text[]', value: 'PostgreSQL, MySQL, MongoDB, Redis' },
  { field: 'ships_with', type: 'text[]', value: 'Docker, Git' },
  { field: 'experience', type: 'interval', value: 'about 2 years' }
];

export const bio = [
  'I’m a fullstack developer with about two years of experience, focused on the backend. I build REST APIs in Node.js with Express and NestJS, written in TypeScript, use Redis for caching and Docker to ship them.',
  'I also do database design, version everything in Git, and document and test APIs before anyone else has to. On the frontend and CMS side I’ve worked with React, Laravel and WordPress.'
];

// Skills that are not tied to a public repo still belong in the schema (a stack with 0 rows).
export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'PHP'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Laravel', 'GraphQL'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { group: 'Frontend', items: ['React', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { group: 'Tools', items: ['Docker', 'Git', 'Postman'] }
];

// Facts from each repo's README. Keyed by repo name.
export const notes = {
  orm2erd: [
    'You already wrote the models, so the schema exists. orm2erd reads them and writes the ERD, instead of someone drawing and maintaining one by hand.',
    'It detects the ORM (Prisma, Sequelize, Mongoose, TypeORM, Drizzle, MikroORM), resolves the entry points, normalizes everything into one intermediate model, then emits Mermaid, DBML, PlantUML, D2 and more from a single parse.',
    'A --check flag fails CI when the committed diagram falls behind the models. Published on npm under the MIT license.'
  ],
  'portfolio-api': [
    'The API behind this page. NestJS and Prisma on PostgreSQL (Neon), with JWT auth, a sync that pulls repos from GitHub, Cloudinary for the thumbnails and Swagger docs.',
    'It runs in Docker. Every project row on this site, and every line in the schema above it, comes from its /repo endpoint.'
  ],
  'portfolio-dashboard': [
    'The CMS-style dashboard where I edit the repos, their metadata and stats that portfolio-api serves.',
    'React 19 with TypeScript and Vite, token-based login behind Google reCAPTCHA, tables for the records and Recharts for the stats.'
  ],
  portfolio: [
    'This site. React and Vite, prerendered at build time so every page ships real HTML, with the project rows read from portfolio-api.',
    'The design treats the work as a schema: a developer entity, project rows, and stacks joined to projects.'
  ],
  'following-vs-followers': [
    'Compares who you follow on GitHub with who follows you back, in both directions.',
    'Both lists are fetched in parallel to keep large accounts fast, up to a limit of 30,000 followers or following.'
  ],
  'bookmark-api': [
    'A bookmark service with two front doors: a REST API documented in Swagger and a GraphQL endpoint, both on NestJS with Prisma and PostgreSQL.'
  ],
  'secondhand-api': [
    'Backend for SecondHand, a marketplace built as a team project (group 6) and mirrored here from GitLab.',
    'Express with Sequelize migrations and seeders on PostgreSQL, deployed to Heroku with separate staging and production apps.'
  ],
  'user-game-api': ['Stores user accounts, biodata and game histories. Express on PostgreSQL, deployed to Heroku.'],
  'tes-kasir-alan': [
    'A point-of-sale app built as the technical test for a Web Developer role at Alan Creative. Laravel on the back end, React on the front.'
  ]
};
