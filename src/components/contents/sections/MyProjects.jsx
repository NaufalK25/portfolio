import { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle';
import githubLogo from '../../../assets/contacts/github.svg';
import urlLogo from '../../../assets/url.svg';
import { getRepoStacks } from '../../../utils/data';

const MyProjects = ({ componentRef }) => {
  const [repos, setRepos] = useState([]);
  const [showedRepos, setShowedRepos] = useState(3);
  const [totalRepos, setTotalRepos] = useState(0);
  const [loading, setLoading] = useState(false);
  const repoNameFilter = [
    'anime-episode-tracker',
    'bookmark-api',
    'endcrypt',
    'foodgallery',
    'news-portal',
    'pdf-digital-signature',
    'poltekkespalembang',
    'portfolio',
    'priplan-server',
    'secondhand-api',
    'travdir-api',
    'user-game-api'
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
        setTotalRepos(repos.length);
        setLoading(false);
      } catch (err) {
        setRepos([]);
      }
    };

    fetchRepos();
  }, []);

  const handleLoadMoreBtnClick = () => {
    setShowedRepos(prevState => prevState + 3);
  };

  const handleCollapseBtnClick = () => {
    setShowedRepos(3);
  };

  return (
    <section
      className='flex justify-center mt-24 flex-col items-center gap-y-10 bg-slate-200 text-slate-800 dark:bg-gray-800 dark:text-slate-100'
      ref={componentRef}
    >
      <SectionTitle title='My Projects' />
      <section className='flex text-center flex-wrap gap-10 w-full justify-center'>
        {loading ? (
          <>
            <div className='lg:w-1/4 w-3/4 md:w-1/3 gap-y-3 flex flex-col py-1.5 justify-between'>
              <div className='skeleton h-4 w-full px-3 pt-1.5'></div>
              <div className='skeleton h-60 w-full px-3 pb-3'></div>
              <div className='p-1 flex flex-col gap-y-3'>
                <div className='skeleton h-4 w-full'></div>
                <div className='flex justify-center'>
                  <div className='skeleton h-12 w-32'></div>
                </div>
              </div>
            </div>
            <div className='lg:w-1/4 w-3/4 md:w-1/3 gap-y-3 flex flex-col py-1.5 justify-between'>
              <div className='skeleton h-4 w-full px-3 pt-1.5'></div>
              <div className='skeleton h-60 w-full px-3 pb-3'></div>
              <div className='p-1 flex flex-col gap-y-3'>
                <div className='skeleton h-4 w-full'></div>
                <div className='flex justify-center'>
                  <div className='skeleton h-12 w-32'></div>
                </div>
              </div>
            </div>
            <div className='lg:w-1/4 w-3/4 md:w-1/3 gap-y-3 flex flex-col py-1.5 justify-between'>
              <div className='skeleton h-4 w-full px-3 pt-1.5'></div>
              <div className='skeleton h-60 w-full px-3 pb-3'></div>
              <div className='p-1 flex flex-col gap-y-3'>
                <div className='skeleton h-4 w-full'></div>
                <div className='flex justify-center'>
                  <div className='skeleton h-12 w-32'></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          repos.slice(0, showedRepos).map(repo => (
            <section
              key={repo.name}
              className='lg:w-1/4 w-3/4 md:w-1/3 gap-y-3 flex flex-col items-center py-1.5 justify-between'
            >
              <TopSection repo={repo} />
              <MiddleSection repo={repo} />
              <BottomSection repo={repo} />
            </section>
          ))
        )}
      </section>

      {!loading && showedRepos < totalRepos ? (
        <div
          className='flex items-center gap-x-1 border rounded-md py-2 px-4 text-lg cursor-pointer border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 fill-slate-800 dark:fill-slate-200'
          onClick={handleLoadMoreBtnClick}
        >
          <p>Load More</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 -960 960 960'
            width='24'
          >
            <path d='M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z' />
          </svg>
        </div>
      ) : (
        <div
          className='flex items-center gap-x-1 border rounded-md py-2 px-4 text-lg cursor-pointer border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 fill-slate-800 dark:fill-slate-200'
          onClick={handleCollapseBtnClick}
        >
          <p>Collapse</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 -960 960 960'
            width='24'
          >
            <path d='m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z' />
          </svg>
        </div>
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
