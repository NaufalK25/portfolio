import SectionTitle from '../SectionTitle';
import SkillList from '../../SkillList';

const MySkills = ({ componentRef }) => {
  return (
    <section
      className='flex flex-col justify-center items-center mt-24 gap-y-10 bg-slate-300 dark:bg-slate-600 py-10'
      ref={componentRef}
    >
      <SectionTitle title='My Skills' />
      <section className='flex text-center gap-10 flex-wrap w-full justify-center'>
        <SkillList
          title='Programming Language'
          stacks={['JavaScript', 'TypeScript', 'PHP']}
        />
        <SkillList
          title='Front End'
          stacks={['HTML5', 'CSS3', 'Tailwind CSS', 'React']}
        />
        <SkillList
          title='Back End'
          stacks={['Node.js', 'Express', 'NestJS', 'Laravel']}
        />
        <SkillList
          title='Database'
          stacks={['MySQL', 'PostgreSQL', 'MongoDB']}
        />
        <SkillList
          title='Other'
          stacks={['Git', 'Postman', 'GraphQL']}
        />
      </section>
    </section>
  );
};

export default MySkills;
