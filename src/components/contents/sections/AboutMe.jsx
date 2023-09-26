import ContactList from '../ContactList';

const AboutMe = () => {
  return (
    <section
      id='about-me'
      className='flex flex-col-reverse lg:flex-row items-center gap-y-5'
    >
      <section className='flex flex-col lg:w-1/2 gap-y-3 justify-center items-center px-10'>
        <h3 className='text-2xl font-bold text-center'>
          Hello, My Name is Muhammad Naufal Kateni
        </h3>
        <p>
          Good day! I am a fresh graduate who has an interest in Back End
          Development. Skilled and know the technique about identifying
          database, fundamental programming, version control system, and API
          management. Have experience in building website with Node.js, Express
          and a bit of TypeScript. Nice to meet you!
        </p>
        <ContactList />
      </section>
      <section className='flex justify-center lg:w-1/2'>
        <a
          href='img/muhammad-naufal-kateni.jpg'
          target='_blank'
          rel='noopener noreferrer'
          className='w-5/12'
        >
          <img
            src='img/muhammad-naufal-kateni.jpg'
            alt='Muhammad Naufal Kateni'
            title='Muhammad Naufal Kateni'
            className='rounded-b-full'
          />
        </a>
      </section>
    </section>
  );
};

export default AboutMe;
