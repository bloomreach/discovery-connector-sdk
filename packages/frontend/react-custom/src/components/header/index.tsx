// header/index.js

import type { FunctionalComponent } from 'preact';
import { h } from 'preact';
import styles from '../../styles/Header.module.css';
// eslint-disable-next-line import/no-named-as-default
import SearchComponent from '../search/index';
import LogoComponent from '../logo/index';

const HeaderComponent: FunctionalComponent = () => {
    return (
        <header className={styles.header}>
            <LogoComponent
                alt="Bloomreach Logo "
                height = {50}
                src="../../public/logo.png"
                width = {185}
            />
            <SearchComponent
                ariaLabel={'search'}
                autocomplete={'off'}
                autoCorrect={'none'}
                formType={'search'}
                iconHeight={20}
                iconWidth={20}
                minLength={2}
                minChars={2}
                name={'q'}
                placeholder={'Search...'}
                role={'search'}
                suggestions={[]}
            />
        </header>
    );
};

export default HeaderComponent;
