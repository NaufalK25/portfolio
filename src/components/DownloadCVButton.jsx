const DownloadCVButton = () => {
  return (
    <a
      href='pdf/MUHAMMAD_NAUFAL_KATENI_FINAL.pdf'
      type='application/pdf'
      title='Download CV'
      className='bg-slate-800 text-slate-200 rounded-md p-1.5 hover:bg-slate-700 active:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 dark:active:bg-slate-300 shadow-lg'
      download
    >
      Download CV
    </a>
  );
};

export default DownloadCVButton;
