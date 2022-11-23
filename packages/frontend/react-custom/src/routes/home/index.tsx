import type { FunctionalComponent } from 'preact';
import { h } from 'preact';
import style from './style.css';

const Home: FunctionalComponent = () => {
  return (
    <div className={style.home}>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
