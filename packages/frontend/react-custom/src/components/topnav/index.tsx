import type { FunctionalComponent } from 'preact';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from '../../styles/TopNav.module.css';

const Topnav: FunctionalComponent = (): h.JSX.Element => {
    return (
        <span className={styles.topnav}>
            <nav>
                <Link activeClassName={styles.active} href="/">
                    Home
                </Link>
                <Link activeClassName={styles.active} href="/profile">
                    Me
                </Link>
                <Link activeClassName={styles.active} href="/profile/john">
                    John
                </Link>
            </nav>
        </span>
    );
};
export default Topnav;
