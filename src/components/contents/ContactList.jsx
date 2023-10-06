import { contacts } from '../../utils/data';

const ContactList = () => {
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
};

export default ContactList;
