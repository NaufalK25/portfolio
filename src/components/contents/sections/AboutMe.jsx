import { ReactTyped } from 'react-typed';
import ContactList from '../ContactList';

const AboutMe = ({ componentRef }) => {
  return (
    <section
      ref={componentRef}
      className='container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 px-6 py-20'
    >
      {/* Text Section */}
      <div className='flex flex-col lg:w-1/2 gap-6 text-center lg:text-left'>
        <h3 className='text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100'>
          Hello, I’m{' '}
          <span className='text-green-500'>Muhammad Naufal Kateni</span>
        </h3>

        <ReactTyped
          strings={[
            'I am a Web Developer',
            'I am a Fullstack Developer',
            'I am a Backend Developer',
            'I am a Softwre Engineer'
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
          className='text-xl font-medium text-green-600 dark:text-green-400'
        />

        <p className='text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0'>
          Hi! I'm a fullstack developer with ~2 years of experience, focused on
          backend development. I work with Node.js (Express, NestJS,
          TypeScript), build RESTful APIs, and use Redis for caching and Docker
          for containerization. I also have experience with database design,
          Git, and API documentation/testing. On the frontend/CMS side, I've
          worked with React, Laravel, and WordPress. Nice to meet you!
        </p>

        {/* Contact List */}
        <div className='mt-6 flex justify-center lg:justify-start'>
          <ContactList />
        </div>
      </div>

      {/* Image Section */}
      <div className='flex justify-center lg:w-1/2'>
        <img
          src='img/muhammad-naufal-kateni.jpg'
          alt='Muhammad Naufal Kateni'
          className='w-64 md:w-80 h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300'
        />
      </div>
    </section>
  );
};

export default AboutMe;
