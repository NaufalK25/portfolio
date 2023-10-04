import ScrollToTopButton from './contents/ScrollToTopButton';
import AboutMe from './contents/sections/AboutMe';
import DownloadCV from './contents/sections/DownloadCV';
import MyProjects from './contents/sections/MyProjects';
import MySkills from './contents/sections/MySkills';

const Content = ({ refs }) => {
  return (
    <main className='flex-1 mt-32'>
      <ScrollToTopButton />
      <AboutMe componentRef={refs.aboutMeRef} />
      <MySkills componentRef={refs.mySkillsRef} />
      <MyProjects componentRef={refs.myProjectsRef} />
      <DownloadCV />
    </main>
  );
};

export default Content;
