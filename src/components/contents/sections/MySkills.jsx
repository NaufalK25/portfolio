import SectionTitle from '../SectionTitle';
import { skills } from '../../../utils/data';

const MySkills = ({ componentRef }) => {
  return (
    <section
      className='flex flex-col justify-center items-center mt-24 gap-y-10 bg-slate-300 dark:bg-slate-600 py-10'
      ref={componentRef}
    >
      <SectionTitle title='My Skills' />
      <section className='flex text-center gap-10 flex-wrap w-full justify-center'>
        {skills.map(skill => (
          <section
            key={skill.name}
            className='lg:p-16 p-8 lg:w-1/4 w-full md:w-1/3 gap-y-5 rounded-md flex flex-col items-center'
            title={skill.name}
          >
            <h4 className='font-bold text-xl text-slate-800 dark:text-slate-200'>
              {skill.name}
            </h4>
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
