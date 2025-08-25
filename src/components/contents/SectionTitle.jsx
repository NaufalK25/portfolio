const SectionTitle = ({ title }) => {
  return (
    <h3
      className='text-3xl md:text-4xl font-extrabold tracking-tight
                   text-slate-800 dark:text-slate-200 text-center relative mb-8'
    >
      {title}
      <span className='block w-16 h-1 bg-green-500 rounded-full mx-auto mt-3'></span>
    </h3>
  );
};

export default SectionTitle;
