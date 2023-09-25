import SectionTitle from '../SectionTitle';
import githubLogo from '../../../assets/contacts/github.svg';
import gitlabLogo from '../../../assets/contacts/gitlab.svg';
import bootstrapLogo from '../../../assets/skills/bootstrap.svg';
import css3Logo from '../../../assets/skills/css3.svg';
import expressLogo from '../../../assets/skills/express.svg';
import gitLogo from '../../../assets/skills/git.svg';
import html5Logo from '../../../assets/skills/html5.svg';
import javascriptLogo from '../../../assets/skills/javascript.svg';
import mongodbLogo from '../../../assets/skills/mongodb.svg';
import mysqlLogo from '../../../assets/skills/mysql.svg';
import nodejsLogo from '../../../assets/skills/nodejs.svg';
import postgresqlLogo from '../../../assets/skills/postgresql.svg';
import postmanLogo from '../../../assets/skills/postman.svg';
import tailwindcssLogo from '../../../assets/skills/tailwindcss.svg';
import typescriptLogo from '../../../assets/skills/typescript.svg';
import webpackLogo from '../../../assets/skills/webpack.svg';

const MySkills = () => {
  const skills = [
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
          name: 'GitHub',
          svg: githubLogo
        },
        {
          name: 'GitLab',
          svg: gitlabLogo
        },
        {
          name: 'Postman',
          svg: postmanLogo
        },
        {
          name: 'Webpack',
          svg: webpackLogo
        }
      ]
    }
  ];

  return (
    <section
      id='my-skills'
      className='flex flex-col justify-center items-center mt-24 gap-y-10 bg-slate-300 dark:bg-slate-600 py-10'
    >
      <SectionTitle title='My Skills' />
      <section className='flex text-center gap-10 flex-wrap w-full justify-center'>
        {skills.map(skill => (
          <section
            key={skill.name}
            className='lg:p-16 p-8 lg:w-1/4 w-full md:w-1/3 gap-y-5 rounded-md flex flex-col items-center'
            title={skill.name}
          >
            <h4 className='font-bold text-xl'>{skill.name}</h4>
            <ul className='flex gap-x-3 flex-row bg-slate-400 dark:bg-slate-300 p-1.5 rounded-md shadow-lg'>
              {skill.stacks.map(stack => (
                <li key={stack.name}>
                  <p title={stack.name}>
                    <img
                      src={stack.svg}
                      alt={stack.name}
                    />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </section>
  );
};

export default MySkills;
