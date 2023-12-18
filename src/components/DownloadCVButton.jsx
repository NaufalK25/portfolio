import { Download } from 'react-feather';

const DownloadCVButton = () => {
  return (
    <div className='tooltip tooltip-bottom' data-tip='Download CV'>
      <a
        href='https://drive.google.com/drive/folders/1sEMyvGzp0gc0PcztVR8UJWMeKEG7gkmW?usp=drive_linkf'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-x-1 bg-slate-800 text-slate-200 rounded-md p-1.5 hover:bg-slate-700 active:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 dark:active:bg-slate-300 shadow-lg'
      >
        <Download /> CV
      </a>
    </div>
  );
};

export default DownloadCVButton;
