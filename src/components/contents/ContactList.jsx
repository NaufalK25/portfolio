import githubLogo from '../../assets/contacts/github.svg';
import gitlabLogo from '../../assets/contacts/gitlab.svg';
import gmailLogo from '../../assets/contacts/gmail.svg';
import instagramLogo from '../../assets/contacts/instagram.svg';
import linkedInLogo from '../../assets/contacts/linkedin.svg';
import replitLogo from '../../assets/contacts/replit.svg';
import twitterLogo from '../../assets/contacts/twitter.svg';
import whatsAppLogo from '../../assets/contacts/whatsapp.svg';

function ContactList() {
  const contacts = [
    {
      name: 'GitHub',
      contact: 'NaufalK25',
      url: 'https://github.com/NaufalK25',
      svg: githubLogo
    },
    {
      name: 'GitLab',
      contact: 'NaufalK25',
      url: 'https://gitlab.com/NaufalK25',
      svg: gitlabLogo
    },
    {
      name: 'LinkedIn',
      contact: 'Muhammad Naufal kateni',
      url: 'https://www.linkedin.com/in/muhammad-naufal-kateni/',
      svg: linkedInLogo
    },
    {
      name: 'Twitter',
      contact: 'NaufalK2511',
      url: 'https://twitter.com/NaufalK2511',
      svg: twitterLogo
    },
    {
      name: 'Instagram',
      contact: 'naufalkateni',
      url: 'https://www.instagram.com/naufalkateni',
      svg: instagramLogo
    },
    {
      name: 'Repl.it',
      contact: '@NaufalK25',
      url: 'https://replit.com/@NaufalK25',
      svg: replitLogo
    },
    {
      name: 'GMail',
      contact: 'naufalkateni2001@gmail.com',
      url: 'mailto:naufalkateni2001@gmail.com',
      svg: gmailLogo
    },
    {
      name: 'WhatsApp',
      contact: '+62 816 382001',
      url: 'https://wa.me/62816382001',
      svg: whatsAppLogo
    }
  ];

  return (
    <section className='flex gap-x-3 bg-slate-400 dark:bg-slate-300 rounded-md p-1.5 shadow-lg'>
      {contacts.map(contact => (
        <a
          key={contact.name}
          href={contact.url}
          target='_blank'
          rel='noopener noreferrer'
          title={contact.contact}
        >
          <img
            src={contact.svg}
            alt={contact.name}
          />
        </a>
      ))}
    </section>
  );
}

export default ContactList;
