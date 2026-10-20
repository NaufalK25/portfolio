// Every visible string that isn't project data lives here.
// Assumptions to confirm (also listed in the hand-off):
// - Production URL is https://muhammad-naufal-kateni.netlify.app (the portfolio repo's homepage in the API).
// - "About 2 years" of experience is copied from the previous site and may be out of date.
// Project notes are not here: they come from portfolio-api (edited in the dashboard).

export const site = {
  name: 'Muhammad Naufal Kateni',
  short: 'Naufal Kateni',
  handle: 'NaufalK25',
  role: 'Fullstack developer, mostly backend',
  url: 'https://muhammad-naufal-kateni.netlify.app',
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
  'I also do database design, work in Git, and document and test my APIs. On the frontend and CMS side I’ve worked with React, Laravel and WordPress.'
];

// Work history, condensed from the 2026 CV. Newest first; to: null is the current job.
// Each point is a short lead you can scan, then the detail. tags sum up the stack per job.
export const jobs = [
  {
    company: 'Ragdalion Technology',
    role: 'Backend Developer',
    from: '2025-08',
    to: null,
    place: 'Bekasi',
    summary:
      'Six services of a microservice enterprise platform (halal certification, audit planning, ticketing and assets, maintenance, master data, B2B catalogue), in TypeScript, Express, Sequelize and PostgreSQL under Domain-Driven Design.',
    tags: ['TypeScript', 'Express', 'Sequelize', 'PostgreSQL', 'Redis', 'BullMQ', 'SSE'],
    points: [
      {
        lead: 'Owner of the audit planning service',
        detail:
          'Built over half of the audit resource planning and auditor management service: scheduling and assignment, honorarium, refunds and reimbursement, samples and post-audit reports.'
      },
      {
        lead: 'Service-to-service sync',
        detail:
          'Pre-assessments and certification numbers synced across the CRM, audit-planning and ticketing services, secured with API-key middleware.'
      },
      {
        lead: 'Maintenance service from the first commit',
        detail: 'Built most of its domain model and migrated the legacy data into the new schema.'
      },
      {
        lead: 'Polling replaced with Server-Sent Events',
        detail:
          'Per-user broadcast, multi-tab fan-out and dead-connection reaping, so a notification can never take down its transaction.'
      },
      {
        lead: 'Lower database load',
        detail:
          'Removed N+1 queries on busy endpoints, moved pagination, filtering and sorting into the query layer, and added fail-safe Redis caching.'
      },
      {
        lead: 'Background jobs and safe writes',
        detail:
          'Async jobs with BullMQ and cron, and financial write paths hardened with managed transactions and ownership checks.'
      }
    ]
  },
  {
    company: 'Alan Creative',
    role: 'Web Developer',
    from: '2024-02',
    to: '2025-05',
    place: 'Depok',
    tags: ['Laravel', 'React', 'Redux', 'Socket.io', 'WordPress'],
    points: [
      {
        lead: 'Custom web apps, end to end',
        detail: 'A Laravel back end and a React front end with Redux and React Router.'
      },
      {
        lead: 'Admin dashboards',
        detail: 'Full CRUD, bulk import and export, email notifications and real-time updates over Socket.io.'
      },
      {
        lead: 'WordPress and WooCommerce sites',
        detail:
          'Company profiles, portfolios, landing pages and stores with Elementor, with the stack picked per client by scope, timeline and budget.'
      }
    ]
  },
  {
    company: 'Suitmedia Digital Agency',
    role: 'Software Engineer Intern',
    from: '2022-08',
    to: '2022-12',
    place: 'Jakarta',
    tags: ['Laravel', 'Livewire', 'Alpine.js', 'MySQL'],
    points: [
      {
        lead: 'Live client projects',
        detail:
          'In an agile scrum team through the Kampus Merdeka programme: fixed production bugs and shipped features from UI changes to mid-sized modules, under code review and branching standards.'
      }
    ]
  }
];

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'PHP'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Laravel', 'GraphQL'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { group: 'Frontend', items: ['React', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { group: 'Tools', items: ['Docker', 'Git', 'Postman'] }
];
