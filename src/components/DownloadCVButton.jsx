function DownloadCVButton() {
  return (
    <a
      href='pdf/MUHAMMAD_NAUFAL_KATENI_FINAL.pdf'
      type='application/pdf'
      title='Download'
      className='bg-slate-800 text-slate-100 rounded-md p-1.5 hover:bg-slate-700 active:bg-slate-700 hover:font-bold active:font-bold dark:bg-slate-100 dark:text-slate-800 dark:hover:bg-slate-300 dark:active:bg-slate-300 shadow-lg focus:font-bold'
      download
    >
      Download
    </a>
  );
}

export default DownloadCVButton;
