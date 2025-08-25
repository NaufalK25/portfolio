import DownloadCVButton from '../../DownloadCVButton';
import SectionTitle from '../SectionTitle';

const DownloadCV = () => {
  return (
    <section className='container mx-auto flex flex-col items-center justify-center gap-y-8 py-20 px-6 bg-slate-300 dark:bg-slate-700 rounded-2xl shadow-md'>
      <SectionTitle title='Download CV' />
      <p className='text-slate-700 dark:text-slate-200 text-lg text-center max-w-xl'>
        You can download my updated CV below to learn more about my experience
        and skills.
      </p>
      <DownloadCVButton />
    </section>
  );
};

export default DownloadCV;
