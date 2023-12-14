import bootstrapLogo from '../assets/skills/bootstrap.svg';
import codeigniterLogo from '../assets/skills/codeigniter.svg';
import css3Logo from '../assets/skills/css3.svg';
import expressLogo from '../assets/skills/express.svg';
import gitLogo from '../assets/skills/git.svg';
import githubLogo from '../assets/contacts/github.svg';
import gitlabLogo from '../assets/contacts/gitlab.svg';
import gmailLogo from '../assets/contacts/gmail.svg';
import graphqlLogo from '../assets/skills/graphql.svg';
import html5Logo from '../assets/skills/html5.svg';
import instagramLogo from '../assets/contacts/instagram.svg';
import javascriptLogo from '../assets/skills/javascript.svg';
import linkedInLogo from '../assets/contacts/linkedin.svg';
import laravelLogo from '../assets/skills/laravel.svg';
import mongodbLogo from '../assets/skills/mongodb.svg';
import mysqlLogo from '../assets/skills/mysql.svg';
import nestjsLogo from '../assets/skills/nestjs.svg';
import nodejsLogo from '../assets/skills/nodejs.svg';
import phpLogo from '../assets/skills/php.svg';
import postgresqlLogo from '../assets/skills/postgresql.svg';
import postmanLogo from '../assets/skills/postman.svg';
import reactLogo from '../assets/skills/react.svg';
import replitLogo from '../assets/contacts/replit.svg';
import tailwindcssLogo from '../assets/skills/tailwindcss.svg';
import twitterLogo from '../assets/contacts/twitter.svg';
import typescriptLogo from '../assets/skills/typescript.svg';
import webpackLogo from '../assets/skills/webpack.svg';
import whatsAppLogo from '../assets/contacts/whatsapp.svg';
import viteLogo from '../assets/skills/vite.svg';

export const contacts = [
  {
    name: 'GitHub',
    contact: 'NaufalK25',
    url: 'https://github.com/NaufalK25',
    svg: githubLogo
  },
  {
    name: 'LinkedIn',
    contact: 'Muhammad Naufal kateni',
    url: 'https://www.linkedin.com/in/muhammad-naufal-kateni/',
    svg: linkedInLogo
  },
  {
    name: 'Twitter',
    contact: 'NaufalK2511',
    url: 'https://twitter.com/NaufalK2511',
    svg: twitterLogo
  },
  {
    name: 'GMail',
    contact: 'naufalkateni2001@gmail.com',
    url: 'mailto:naufalkateni2001@gmail.com',
    svg: gmailLogo
  },
  {
    name: 'WhatsApp',
    contact: '+62 816 382001',
    url: 'https://wa.me/62816382001',
    svg: whatsAppLogo
  }
];

export const skills = [
  {
    name: 'Programming Language',
    stacks: [
      {
        name: 'JavaScript',
        svg: javascriptLogo
      },
      {
        name: 'TypeScript',
        svg: typescriptLogo
      },
      {
        name: 'PHP',
        svg: phpLogo
      }
    ]
  },
  {
    name: 'Front End',
    stacks: [
      {
        name: 'HTML5',
        svg: html5Logo
      },
      {
        name: 'CSS3',
        svg: css3Logo
      },
      {
        name: 'Bootstrap',
        svg: bootstrapLogo
      },
      {
        name: 'Tailwind CSS',
        svg: tailwindcssLogo
      }
    ]
  },
  {
    name: 'Back End',
    stacks: [
      {
        name: 'Node.js',
        svg: nodejsLogo
      },
      {
        name: 'Express',
        svg: expressLogo
      },
      {
        name: 'NestJS',
        svg: nestjsLogo
      },
      {
        name: 'CodeIgniter',
        svg: codeigniterLogo
      },
      {
        name: 'Laravel',
        svg: laravelLogo
      }
    ]
  },
  {
    name: 'Database',
    stacks: [
      {
        name: 'MySQL',
        svg: mysqlLogo
      },
      {
        name: 'PostgreSQL',
        svg: postgresqlLogo
      },
      {
        name: 'MongoDB',
        svg: mongodbLogo
      }
    ]
  },
  {
    name: 'Other',
    stacks: [
      {
        name: 'Git',
        svg: gitLogo
      },
      {
        name: 'Postman',
        svg: postmanLogo
      },
      {
        name: 'GraphQL',
        svg: graphqlLogo
      }
    ]
  }
];

export const getRepoStacks = repoName => {
  let stacks = [];
  switch (repoName) {
    case 'anime-episode-tracker':
      stacks = [
        { logo: tailwindcssLogo, name: 'Tailwind CSS' },
        { logo: typescriptLogo, name: 'TypeScript' },
        { logo: reactLogo, name: 'React' },
        { logo: viteLogo, name: 'Vite' }
      ];
      break;
    case 'bookmark-api':
      stacks = [
        { logo: typescriptLogo, name: 'TypeScript' },
        { logo: nestjsLogo, name: 'NestJS' },
        { logo: graphqlLogo, name: 'GraphQL' },
        { logo: postgresqlLogo, name: 'PostgreSQL' }
      ];
      break;
    case 'endcrypt':
      stacks = [
        { logo: typescriptLogo, name: 'TypeScript' },
        { logo: webpackLogo, name: 'Webpack' }
      ];
      break;
    case 'foodgallery':
      stacks = [
        { logo: bootstrapLogo, name: 'Bootstrap' },
        { logo: phpLogo, name: 'PHP' },
        { logo: codeigniterLogo, name: 'CodeIgniter' },
        { logo: mysqlLogo, name: 'MySQL' }
      ];
      break;
    case 'pdf-digital-signature':
      stacks = [
        { logo: nodejsLogo, name: 'Node.js' },
        { logo: expressLogo, name: 'Express' },
        { logo: mysqlLogo, name: 'MySQL' }
      ];
      break;
    case 'news-portal':
      stacks = [
        { logo: reactLogo, name: 'React' },
        { logo: tailwindcssLogo, name: 'Tailwind CSS' },
        { logo: laravelLogo, name: 'Laravel' },
        { logo: postgresqlLogo, name: 'PostgreSQL' }
      ];
      break;
    case 'poltekkespalembang':
      stacks = [
        { logo: phpLogo, name: 'PHP' },
        { logo: codeigniterLogo, name: 'CodeIgniter' },
        { logo: postgresqlLogo, name: 'PostgreSQL' }
      ];
      break;
    case 'portfolio':
      stacks = [
        { logo: tailwindcssLogo, name: 'Tailwind CSS' },
        { logo: javascriptLogo, name: 'JavaScript' },
        { logo: reactLogo, name: 'React' },
        { logo: viteLogo, name: 'Vite' }
      ];
      break;
    case 'priplan-server':
      stacks = [
        { logo: nodejsLogo, name: 'Node.js' },
        { logo: expressLogo, name: 'Express' },
        { logo: mongodbLogo, name: 'MongoDB' }
      ];
      break;
    case 'secondhand-api':
      stacks = [
        { logo: nodejsLogo, name: 'Node.js' },
        { logo: expressLogo, name: 'Express' },
        { logo: postgresqlLogo, name: 'PostgreSQL' }
      ];
      break;
    case 'travdir-api':
      stacks = [
        { logo: typescriptLogo, name: 'TypeScript' },
        { logo: nodejsLogo, name: 'Node.js' },
        { logo: expressLogo, name: 'Express' },
        { logo: mongodbLogo, name: 'MongoDB' }
      ];
      break;
    case 'user-game-api':
      stacks = [
        { logo: bootstrapLogo, name: 'Bootstrap' },
        { logo: nodejsLogo, name: 'Node.js' },
        { logo: expressLogo, name: 'Express' },
        { logo: postgresqlLogo, name: 'PostgreSQL' }
      ];
      break;
    default:
      stacks = [];
      break;
  }
  return stacks;
};
