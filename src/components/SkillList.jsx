import StackIcon from './StackIcon';

const SkillList = ({ title, stacks }) => {
  return (
    <section className='lg:p-16 p-8 lg:w-1/4 w-full md:w-1/3 gap-y-5 rounded-md flex flex-col items-center'>
      <h4 className='font-bold text-xl text-slate-800 dark:text-slate-200'>
        {title}
      </h4>
      <ul className='flex gap-x-3 flex-row bg-slate-100 dark:bg-slate-700 p-1.5 rounded-md shadow-lg'>
        {stacks.map(stack => (
          <li
            key={stack}
            className='tooltip'
            data-tip={stack}
          >
            <StackIcon
              stack={stack}
              className='hex'
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkillList;
