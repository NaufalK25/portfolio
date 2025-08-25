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
      } catch (err) {
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section
      ref={componentRef}
      className='container mx-auto flex flex-col items-center gap-y-10 py-20 px-6 bg-slate-200 dark:bg-gray-800'
    >
      <SectionTitle title='My Projects' />

      <section className='grid gap-8 w-full max-w-7xl sm:grid-cols-2 lg:grid-cols-3'>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : repos.slice(0, showedRepos).map(repo => (
              <ProjectCard
                key={repo.name}
                repo={repo}
              />
            ))}
      </section>

      {totalRepos > 3 && !loading && (
        <button
          onClick={() =>
            showedRepos < totalRepos
              ? setShowedRepos(showedRepos + 3)
              : setShowedRepos(3)
          }
          className='flex items-center gap-x-2 border rounded-lg py-2 px-5 text-lg font-medium
                     border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200
                     hover:bg-slate-300 dark:hover:bg-slate-700 transition'
        >
          {showedRepos < totalRepos ? (
            <>
              Load More <ChevronDown />
            </>
          ) : (
            <>
              Collapse <ChevronUp />
            </>
          )}
        </button>
      )}
    </section>
  );
};

/* === Components === */

const ProjectCard = ({ repo }) => (
  <div className='flex flex-col bg-slate-100 dark:bg-slate-700 rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl'>
    {/* Top */}
    <div className='flex justify-between items-center px-4 py-2 border-b border-slate-300 dark:border-slate-600'>
      <h4 className='text-base font-bold text-slate-800 dark:text-slate-200 truncate'>
        {repo.name}
      </h4>
      {repo.licenseName && (
        <a
          href={repo.licenseUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-xs hover:underline text-slate-600 dark:text-slate-300'
        >
          {repo.licenseName}
        </a>
      )}
    </div>

    {/* Middle (thumbnail + links) */}
    <div
      className='relative h-48 bg-cover bg-center'
      style={{ backgroundImage: `url(${repo.thumbnail})` }}
    >
      <div className='absolute bottom-3 right-3 flex gap-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-2 rounded-lg shadow'>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLink
              size={18}
              className='text-slate-800 dark:text-slate-200'
            />
          </a>
        )}
        <a
          href={repo.htmlUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHub
            size={18}
            className='text-slate-800 dark:text-slate-200'
          />
        </a>
      </div>
    </div>

    {/* Bottom (desc + stacks) */}
    <div className='flex flex-col gap-y-3 px-4 py-3'>
      {repo.description && (
        <p className='text-sm text-slate-700 dark:text-slate-300 line-clamp-3'>
          {repo.description}
        </p>
      )}
      <div className='flex justify-center'>
        <div className='flex flex-wrap gap-2 bg-slate-200 dark:bg-slate-600 p-2 rounded-lg shadow'>
          {repo.stacks.map(stack => (
            <div
              key={stack}
              className='tooltip'
              data-tip={stack}
            >
              <StackIcon
                stack={stack}
                size={22}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className='flex flex-col bg-slate-100 dark:bg-slate-700 rounded-xl shadow animate-pulse'>
    <div className='h-6 bg-slate-300 dark:bg-slate-600 rounded-t-xl'></div>
    <div className='h-48 bg-slate-300 dark:bg-slate-600'></div>
    <div className='p-4 space-y-3'>
      <div className='h-4 bg-slate-300 dark:bg-slate-600 rounded'></div>
      <div className='h-4 bg-slate-300 dark:bg-slate-600 rounded w-2/3'></div>
    </div>
  </div>
);

export default MyProjects;
