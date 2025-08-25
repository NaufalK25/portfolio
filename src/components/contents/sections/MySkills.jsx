import SectionTitle from '../SectionTitle';
import SkillList from '../../SkillList';

const MySkills = ({ componentRef }) => {
  const skillCategories = [
    {
      title: 'Programming Language',
      stacks: ['JavaScript', 'TypeScript', 'PHP']
    },
    { title: 'Front End', stacks: ['HTML5', 'CSS3', 'Tailwind CSS', 'React'] },
    { title: 'Back End', stacks: ['Node.js', 'Express', 'NestJS', 'Laravel'] },
    { title: 'Database', stacks: ['MySQL', 'PostgreSQL', 'MongoDB'] },
    { title: 'Other', stacks: ['Git', 'Postman', 'GraphQL'] }
  ];

  return (
    <section
      ref={componentRef}
      className='container mx-auto py-20 px-6 bg-slate-50 dark:bg-slate-900 rounded-2xl'
    >
      {/* Title */}
      <SectionTitle title='My Skills' />

      {/* Skills Grid */}
      <div className='container mx-auto flex flex-wrap justify-center gap-8 px-6'>
        {skillCategories.map((category, index) => (
          <SkillList
            key={index}
            title={category.title}
            stacks={category.stacks}
          />
        ))}
      </div>
    </section>
  );
};

export default MySkills;
