import { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle';
import githubLogo from '../../../assets/contacts/github.svg';
import urlLogo from '../../../assets/url.svg';
import bootstrapLogo from '../../../assets/skills/bootstrap.svg';
import codeigniterLogo from '../../../assets/skills/codeigniter.svg';
import expressLogo from '../../../assets/skills/express.svg';
import javascriptLogo from '../../../assets/skills/javascript.svg';
import mongodbLogo from '../../../assets/skills/mongodb.svg';
import mysqlLogo from '../../../assets/skills/mysql.svg';
import nodejsLogo from '../../../assets/skills/nodejs.svg';
import phpLogo from '../../../assets/skills/php.svg';
import postgresqlLogo from '../../../assets/skills/postgresql.svg';
import reactLogo from '../../../assets/skills/react.svg';
import tailwindcssLogo from '../../../assets/skills/tailwindcss.svg';
import typescriptLogo from '../../../assets/skills/typescript.svg';
import webpackLogo from '../../../assets/skills/webpack.svg';
import viteLogo from '../../../assets/skills/vite.svg';

const MyProjects = ({ componentRef }) => {
  const [repos, setRepos] = useState([]);
  const repoNameFilter = [
    'portfolio',
    'pdf-digital-signature',
    'endcrypt',
    'secondhand-api',
    'user-game-api',
    'hangnimal',
    'todo-app',
    'old-portfolio',
    'img-converter',
    'travdir-api',
    'foodgallery',
    'poltekkespalembang',
    'priplan-server'
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const userResponse = await fetch(
          'https://api.github.com/users/naufalk25/repos'
        );
        const userRepos = await userResponse.json();

        const orgResponse = await fetch(
          'https://api.github.com/orgs/primum-coertus/repos'
        );
        const orgRepos = await orgResponse.json();

        const repos = [...userRepos, ...orgRepos]
          .filter(repo => repoNameFilter.includes(repo.name))
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRepos(repos);
      } catch (err) {
        setRepos([]);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section
      className='flex justify-center mt-24 flex-col items-center gap-y-10'
      ref={componentRef}
    >
      <SectionTitle title='My Projects' />
      {repos && (
        <section className='flex text-center gap-10 flex-wrap w-full justify-center'>
          {repos
            .filter(repo => repoNameFilter.includes(repo.name))
            .map(repo => (
              <section
                key={repo.name}
                className='lg:w-1/4 w-3/4 md:w-1/3 gap-y-3 flex flex-col items-center py-1.5'
              >
                <TopSection repo={repo} />
                <MiddleSection repo={repo} />
                <BottomSection repo={repo} />
              </section>
            ))}
        </section>
      )}
    </section>
  );
};

const TopSection = ({ repo }) => {
  return (
    <section className='flex justify-between w-full px-3 pt-1.5'>
      <h4 className='text-sm font-bold text-slate-800 dark:text-slate-200'>
        {repo.name}
      </h4>
      {repo.license && (
        <a
          href={repo.license.url}
          className='text-sm hover:underline hover:font-bold active:font-bold focus:font-bold text-slate-800 dark:text-slate-200'
          title={repo.license.name}
        >
          {repo.license.name}
        </a>
      )}
    </section>
  );
};

const MiddleSection = ({ repo }) => {
  return (
    <section
      className='h-60 flex items-end justify-end w-full px-3 pb-3 bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(img/repositories/${repo.name}.jpg)`
      }}
    >
      <section className='flex gap-x-2 bg-gray-300 p-1.5 rounded-md shadow-lg shadow-gray-500/50'>
        {repo.homepage && (
          <a
            href={repo.homepage}
            className='-rotate-45'
            target='_blank'
            title='Homepage'
            rel='noopener noreferrer'
          >
            <img
              src={urlLogo}
              alt=''
            />
          </a>
        )}

        <a
          href={repo.html_url}
          target='_blank'
          title='Repository'
          rel='noopener noreferrer'
        >
          <img
            src={githubLogo}
            alt=''
          />
        </a>
      </section>
    </section>
  );
};

const BottomSection = ({ repo }) => {
  const getRepoStacks = repoName => {
    let stacks = [];
    switch (repoName) {
      case 'portfolio':
        stacks = [
          { logo: javascriptLogo, name: 'JavaScript' },
          { logo: reactLogo, name: 'React' },
          { logo: viteLogo, name: 'Vite' }
        ];
        break;
      case 'pdf-digital-signature':
        stacks = [
          { logo: nodejsLogo, name: 'Node.js' },
          { logo: expressLogo, name: 'Express' },
          { logo: mysqlLogo, name: 'MySQL' }
        ];
        break;
      case 'endcrypt':
        stacks = [
          { logo: typescriptLogo, name: 'TypeScript' },
          { logo: webpackLogo, name: 'Webpack' }
        ];
        break;
      case 'secondhand-api':
        stacks = [
          { logo: nodejsLogo, name: 'Node.js' },
          { logo: expressLogo, name: 'Express' },
          { logo: postgresqlLogo, name: 'PostgreSQL' }
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
      case 'hangnimal':
        stacks = [{ logo: typescriptLogo, name: 'TypeScript' }];
        break;
      case 'todo-app':
        stacks = [
          { logo: tailwindcssLogo, name: 'Tailwind CSS' },
          { logo: typescriptLogo, name: 'TypeScript' },
          { logo: nodejsLogo, name: 'Node.js' },
          { logo: expressLogo, name: 'Express' },
          { logo: postgresqlLogo, name: 'PostgreSQL' }
        ];
        break;
      case 'old-portfolio':
        stacks = [
          { logo: tailwindcssLogo, name: 'Tailwind CSS' },
          { logo: typescriptLogo, name: 'TypeScript' },
          { logo: nodejsLogo, name: 'Node.js' },
          { logo: expressLogo, name: 'Express' },
          { logo: mongodbLogo, name: 'MongoDB' }
        ];
        break;
      case 'img-converter':
        stacks = [
          { logo: tailwindcssLogo, name: 'Tailwind CSS' },
          { logo: typescriptLogo, name: 'TypeScript' },
          { logo: nodejsLogo, name: 'Node.js' },
          { logo: expressLogo, name: 'Express' },
          { logo: mongodbLogo, name: 'MongoDB' }
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
      case 'foodgallery':
        stacks = [
          { logo: bootstrapLogo, name: 'Bootstrap' },
          { logo: phpLogo, name: 'PHP' },
          { logo: codeigniterLogo, name: 'CodeIgniter' },
          { logo: mysqlLogo, name: 'MySQL' }
        ];
        break;
      case 'poltekkespalembang':
        stacks = [
          { logo: phpLogo, name: 'PHP' },
          { logo: codeigniterLogo, name: 'CodeIgniter' },
          { logo: postgresqlLogo, name: 'PostgreSQL' }
        ];
        break;
      case 'priplan-server':
        stacks = [
          { logo: nodejsLogo, name: 'Node.js' },
          { logo: expressLogo, name: 'Express' },
          { logo: mongodbLogo, name: 'MongoDB' }
        ];
        break;
      default:
        stacks = [];
        break;
    }
    return stacks;
  };

  return (
    <section className='p-1 flex flex-col gap-y-3'>
      {repo.description && (
        <p className='text-sm text-slate-800 dark:text-slate-200'>
          {repo.description}
        </p>
      )}
      <section className='flex justify-center'>
        <section className='flex gap-x-3 flex-row bg-slate-400 dark:bg-slate-300 p-1.5 rounded-md shadow-lg'>
          {getRepoStacks(repo.name).map(stack => (
            <img
              key={`${repo.name}-${stack.name}`}
              src={stack.logo}
              alt={stack.name}
              title={stack.name}
            />
          ))}
        </section>
      </section>
    </section>
  );
};

export default MyProjects;
