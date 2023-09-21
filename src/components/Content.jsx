import ScrollToTopButton from './contents/ScrollToTopButton';
import AboutMe from './contents/sections/AboutMe';
import DownloadCV from './contents/sections/DownloadCV';
import MyProjects from './contents/sections/MyProjects';
import MySkills from './contents/sections/MySkills';

const Content = () => {
  return (
    <main className='flex-1 mt-32'>
      <ScrollToTopButton />
      <AboutMe />
      <MySkills />
      <MyProjects />
      <DownloadCV />
    </main>
  );
};

export default Content;
