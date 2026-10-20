import { useEffect, useState } from 'react';
import { useData } from '../data/context';

const NotFound = ({ path }) => {
  const { projects } = useData();
  // The 404 shell is prerendered once for every missing address: fill the path in on the client.
  const [shown, setShown] = useState('');
  useEffect(() => setShown(path), [path]);
  return (
    <article className='missing grid'>
      <p className='missing__error notation'>ERROR: insert or update violates foreign key constraint “page_path_fkey”</p>
      <h1
        className='missing__title'
        data-split='chars'
        data-intro
      >
        404
      </h1>
      <p className='missing__detail notation'>
        DETAIL: Key (path)=({shown}) is not present in table “page”.
      </p>
      <p
        className='missing__lede'
        data-split='lines'
        data-intro
        data-delay='0.2'
      >
        No row has this key. The address may be old, or a typo. These rows do exist:
      </p>
      <ul className='missing__rows'>
        <li>
          <a
            className='join-link'
            href='/'
          >
            <span className='join-link__name'>Home</span>
            <span className='join-link__on notation'>developer</span>
          </a>
        </li>
        {projects.slice(0, 4).map(p => (
          <li key={p.slug}>
            <a
              className='join-link'
              href={`/work/${p.slug}`}
            >
              <span className='join-link__name'>{p.name}</span>
              <span className='join-link__on notation'>project</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default NotFound;
