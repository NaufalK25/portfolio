import { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle';
import githubLogo from '../../../assets/contacts/github.svg';
import urlLogo from '../../../assets/url.svg';

function MyProjects() {
  const [repos, setRepos] = useState([]);

  function getRepoStacks(repoName) {
    let stacks = [];
    switch (repoName) {
      case 'portfolio':
        stacks = ['JavaScript', 'React', 'Vite'];
        break;
      case 'pdf-digital-signature':
        stacks = ['Node.js', 'Express', 'MySQL'];
        break;
      case 'endcrypt':
        stacks = ['TypeScript', 'Webpack'];
        break;
      case 'mc-regbeh':
        stacks = ['Python', 'Flask'];
        break;
      case 'secondhand-api':
        stacks = ['Node.js', 'Express', 'PostgreSQL'];
        break;
      case 'JavaScriptAlgorithmsandDataStructures':
      case 'gamiverse-bot':
        stacks = ['JavaScript'];
        break;
      case 'BackEndDevelopmentandAPIs':
        stacks = ['JavaScript', 'Node.js', 'Express', 'MongoDB'];
        break;
      case 'travdir-api':
        stacks = ['TypeScript', 'Node.js', 'Express', 'MongoDB'];
        break;
      case 'img-converter':
        stacks = [
          'Tailwind CSS',
          'TypeScript',
          'Node.js',
          'Express',
          'MongoDB'
        ];
        break;
      case 'old-portfolio':
        stacks = [
          'Tailwind CSS',
          'TypeScript',
          'Node.js',
          'Express',
          'MongoDB'
        ];
        break;
      case 'todo-app':
        stacks = [
          'Tailwind CSS',
          'TypeScript',
          'Node.js',
          'Express',
          'PostgreSQL'
        ];
        break;
      case 'hangnimal':
        stacks = ['TypeScript'];
        break;
      case 'user-game-api':
        stacks = ['Bootstrap', 'Node.js', 'Express', 'PostgreSQL'];
        break;
      case 'apache2-nodejs':
        stacks = ['Node.js', 'Express', 'Apache2'];
        break;
      case 'GloomForest':
        stacks = ['C#', 'Unity'];
        break;
      case 'foodgallery':
        stacks = ['Bootstrap', 'PHP', 'CodeIgniter', 'MySQL'];
        break;
      default:
        stacks = [];
        break;
    }
    return stacks;
  }

  useEffect(() => {
    async function fetchRepo() {
      const response = await fetch(
        'https://api.github.com/users/naufalk25/repos?sort=created'
      );
      return await response.json();
    }

    return async () => {
      setRepos(await fetchRepo());
    };
  }, []);

  return (
    <section
      id='my-projects'
      className='flex justify-center mt-24 flex-col items-center gap-y-10'
    >
      <SectionTitle title='My Projects' />
      {repos && (
        <section
          id='my-project-list'
          className='flex text-center gap-10 flex-wrap w-full justify-center'
        >
          {repos
            .filter(repo => repo.name !== 'NaufalK25' && !repo.fork)
            .map(repo => (
              <section
                key={repo.name}
                className='lg:w-1/4 w-3/4 md:w-1/3 gap-y-3 flex flex-col items-center py-1.5'
                title={repo.name}
              >
                <section className='flex justify-between w-full px-3 pt-1.5'>
                  <h4 className='text-sm font-bold text-slate-800 dark:text-slate-100'>
                    {repo.name}
                  </h4>
                  {repo.license && (
                    <a
                      href={repo.license.url}
                      className='text-sm hover:underline hover:font-bold active:font-bold focus:font-bold text-slate-800 dark:text-slate-100'
                      title={repo.license.name}
                    >
                      {repo.license.name}
                    </a>
                  )}
                </section>
                <section
                  className='h-60 flex items-end justify-between w-full px-3 pb-3 bg-cover bg-center bg-no-repeat'
                  style={{
                    backgroundImage: `url(img/repositories/${repo.name}.jpg)`
                  }}
                >
                  <section className='flex gap-x-2 bg-gray-300 rounded-md p-1.5 shadow-lg shadow-gray-500/50 text-slate-800 dark:text-slate-800'>
                    <details>
                      <summary
                        className='text-sm font-bold cursor-pointer'
                        title='Stacks'
                      >
                        Stacks
                      </summary>
                      <ul>
                        {getRepoStacks(repo.name).map(stack => (
                          <li
                            key={stack}
                            className='text-sm'
                            title={stack}
                          >
                            {stack}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </section>
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
                <section className='p-1'>
                  <p className='text-sm text-slate-800 dark:text-slate-100'>
                    {repo.description}
                  </p>
                </section>
              </section>
            ))}
        </section>
      )}
    </section>
  );
}

export default MyProjects;
