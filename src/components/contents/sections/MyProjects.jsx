import { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle';
import githubLogo from '../../../assets/contacts/github.svg';
import urlLogo from '../../../assets/url.svg';
import { getRepoStacks } from '../../../utils/data';

const MyProjects = ({ componentRef }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
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
        setLoading(false);
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
      {loading && (
        <div className='flex items-center'>
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5 text-slate-800 dark:text-slate-200'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <p>Fetching repos...</p>
        </div>
      )}
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
