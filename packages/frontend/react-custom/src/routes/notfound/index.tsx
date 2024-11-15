// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Notfound: FunctionalComponent = () => {
  return (
    <div className={style.notfound}>
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link href="/">
        <h4>Back to Home</h4>
      </Link>
    </div>
  );
};

export default Notfound;
