import { GitHub, Linkedin, Mail, Phone, Twitter } from 'react-feather';

const ContactList = () => {
  const iconStyle =
    'w-6 h-6 md:w-7 md:h-7 text-gray-600 dark:text-gray-300 hover:text-green-500 hover:scale-110 transition-transform duration-200';

  return (
    <section className='flex gap-4 bg-white/40 dark:bg-gray-800/40 rounded-xl p-3 shadow-md backdrop-blur-sm'>
      <div
        className='tooltip'
        data-tip='NaufalK25'
      >
        <a
          href='https://github.com/NaufalK25'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHub className={iconStyle} />
        </a>
      </div>
      <div
        className='tooltip'
        data-tip='Muhammad Naufal Kateni'
      >
        <a
          href='https://www.linkedin.com/in/muhammad-naufal-kateni/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Linkedin className={iconStyle} />
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
          <Twitter className={iconStyle} />
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
          <Mail className={iconStyle} />
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
          <Phone className={iconStyle} />
        </a>
      </div>
    </section>
  );
};

export default ContactList;
