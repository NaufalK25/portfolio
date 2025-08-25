import { Download } from 'react-feather';

const DownloadCVButton = () => {
  return (
    <div
      className='tooltip tooltip-bottom'
      data-tip='Download CV'
    >
      <a
        href='https://drive.google.com/drive/folders/1sEMyvGzp0gc0PcztVR8UJWMeKEG7gkmW?usp=drive_linkf'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-2 bg-slate-800 text-slate-200
                   rounded-md px-3 py-2 text-sm font-medium
                   hover:bg-slate-700 active:bg-slate-700
                   dark:bg-slate-200 dark:text-slate-800
                   dark:hover:bg-slate-300 dark:active:bg-slate-300
                   shadow-lg transition-colors duration-200'
      >
        <Download
          size={18}
          strokeWidth={2}
        />
        <span>CV</span>
      </a>
    </div>
  );
};

export default DownloadCVButton;
