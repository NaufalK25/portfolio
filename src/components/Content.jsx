import ScrollToTopButton from './contents/ScrollToTopButton';
import AboutMe from './contents/sections/AboutMe';
import Download from './contents/sections/Download';
import MyProjects from './contents/sections/MyProjects';
import MySkills from './contents/sections/MySkills';

const Content = () => {
  return (
    <main className='flex-1 mt-32'>
      <ScrollToTopButton />
      <AboutMe />
      <MySkills />
      <MyProjects />
      <Download />
    </main>
  );
};

export default Content;
