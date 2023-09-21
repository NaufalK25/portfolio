import DownloadCVButton from '../../DownloadCVButton';
import SectionTitle from '../SectionTitle';

const DownloadCV = () => {
  return (
    <section className='flex justify-center py-10 mt-24 flex-col items-center gap-y-10 bg-slate-300 dark:bg-slate-600'>
      <SectionTitle title='Download CV' />
      <DownloadCVButton />
    </section>
  );
};

export default DownloadCV;
