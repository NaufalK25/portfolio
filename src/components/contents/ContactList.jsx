import { GitHub, Linkedin, Mail, Phone, Twitter } from 'react-feather';

const ContactList = () => {
  return (
    <section className='flex gap-x-3 bg-slate-100 dark:bg-slate-700 rounded-md p-1.5 shadow-lg'>
      <div
        className='tooltip'
        data-tip='NaufalK25'
      >
        <a
          href='https://github.com/NaufalK25'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHub />
        </a>
      </div>
      <div
        className='tooltip'
        data-tip='Muhammad Naufal kateni'
      >
        <a
          href='https://www.linkedin.com/in/muhammad-naufal-kateni/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Linkedin />
        </a>
      </div>
      <div
        className='tooltip'
        data-tip='NaufalK2511'
      >
        <a
          href='https://twitter.com/NaufalK2511'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Twitter />
        </a>
      </div>
      <div
        className='tooltip'
        data-tip='naufalkateni2001@gmail.com'
      >
        <a
          href='mailto:naufalkateni2001@gmail.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Mail />
        </a>
      </div>
      <div
        className='tooltip'
        data-tip='+62 816 382001'
      >
        <a
          href='https://wa.me/62816382001'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Phone />
        </a>
      </div>
    </section>
  );
};

export default ContactList;
