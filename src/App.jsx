import { useRef } from 'react';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  const refs = {
    aboutMeRef: useRef(null),
    mySkillsRef: useRef(null),
    myProjectsRef: useRef(null)
  };

  const handleNavClick = ref => {
    window.scrollTo({
      top: ref.current.offsetTop - 25,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Header
        refs={refs}
        onNavClick={handleNavClick}
      />
      <Content refs={refs} />
      <Footer />
    </>
  );
};

export default App;
