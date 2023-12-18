import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, GitHub } from 'react-feather';
import SectionTitle from '../SectionTitle';
import StackIcon from '../../StackIcon';

const MyProjects = ({ componentRef }) => {
  const [repos, setRepos] = useState([]);
  const [showedRepos, setShowedRepos] = useState(3);
  const [totalRepos, setTotalRepos] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/repo`);
        let { data } = await response.json();

        data = data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setRepos(data);
        setTotalRepos(data.length);
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

      {totalRepos > 3 ? (
        !loading && showedRepos < totalRepos ? (
          <div
            className='flex items-center gap-x-1 border rounded-md py-2 px-4 text-lg cursor-pointer border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 fill-slate-800 dark:fill-slate-200'
            onClick={handleLoadMoreBtnClick}
          >
            <p>Load More</p>
            <ChevronDown />
          </div>
        ) : (
          <div
            className='flex items-center gap-x-1 border rounded-md py-2 px-4 text-lg cursor-pointer border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 fill-slate-800 dark:fill-slate-200'
            onClick={handleCollapseBtnClick}
          >
            <p>Collapse</p>
            <ChevronUp />
          </div>
        )
      ) : null}
    </section>
  );
};

const TopSection = ({ repo }) => {
  return (
    <section className='flex justify-between w-full px-3 pt-1.5'>
      <h4 className='text-sm font-bold text-slate-800 dark:text-slate-200'>
        {repo.name}
      </h4>
      {repo.licenseName ? (
        <a
          href={repo.licenseUrl}
          className='text-sm hover:underline hover:font-bold active:font-bold focus:font-bold text-slate-800 dark:text-slate-200'
          title={repo.licenseName}
        >
          {repo.licenseName}
        </a>
      ) : null}
    </section>
  );
};

const MiddleSection = ({ repo }) => {
  return (
    <section
      className='h-60 flex items-end justify-end w-full px-3 pb-3 bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(${repo.thumbnail})`
      }}
    >
      <section className='flex items-center gap-x-2 bg-gray-300 p-1.5 rounded-md shadow-lg shadow-gray-500/50'>
        {repo.homepage ? (
          <a
            href={repo.homepage}
            target='_blank'
            title='Homepage'
            rel='noopener noreferrer'
          >
            <div
              className='tooltip'
              data-tip='Homepage'
            >
              <ExternalLink color='black' />
            </div>
          </a>
        ) : null}

        <a
          href={repo.htmlUrl}
          target='_blank'
          title='Repository'
          rel='noopener noreferrer'
        >
          <div
            className='tooltip'
            data-tip='Repository'
          >
            <GitHub color='black' />
          </div>
        </a>
      </section>
    </section>
  );
};

const BottomSection = ({ repo }) => {
  return (
    <section className='p-1 flex flex-col gap-y-3'>
      {repo.description ? (
        <p className='text-sm text-slate-800 dark:text-slate-200'>
          {repo.description}
        </p>
      ) : null}
      <section className='flex justify-center'>
        <section className='flex gap-x-3 flex-row bg-slate-100 dark:bg-slate-700 p-1.5 rounded-md shadow-lg'>
          {repo.stacks.map(stack => (
            <div
              className='tooltip'
              data-tip={stack}
              key={stack}
            >
              <StackIcon
                stack={stack}
                color='hex'
              />
            </div>
          ))}
        </section>
      </section>
    </section>
  );
};

export default MyProjects;
