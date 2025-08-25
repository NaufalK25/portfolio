import StackIcon from './StackIcon';

const SkillList = ({ title, stacks }) => {
  return (
    <section
      className='flex flex-col items-center bg-white dark:bg-slate-800
                 shadow-md rounded-xl p-6 w-full sm:w-2/3 md:w-1/3 lg:w-1/4
                 hover:shadow-lg transition-shadow duration-300'
    >
      {/* Category Title */}
      <h4 className='font-semibold text-lg md:text-xl text-slate-800 dark:text-slate-200 mb-4'>
        {title}
      </h4>

      {/* Stack Icons */}
      <ul className='flex flex-wrap justify-center gap-4'>
        {stacks.map(stack => (
          <li
            key={stack}
            className='tooltip'
            data-tip={stack}
          >
            <StackIcon
              stack={stack}
              className='w-8 h-8 text-slate-700 dark:text-slate-300 hover:text-green-500 transition-colors duration-200'
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkillList;
