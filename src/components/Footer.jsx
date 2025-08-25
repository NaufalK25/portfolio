import { Mail } from 'react-feather';
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';

const Footer = () => {
  return (
    <footer className='mt-12 border-t border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md'>
      <div className='container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between'>
        {/* Copyright */}
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          © {new Date().getFullYear()} Muhammad Naufal Kateni. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
