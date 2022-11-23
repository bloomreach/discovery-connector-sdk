// logo/index.tsx
import type { FunctionalComponent } from 'preact';
import { h } from 'preact';
import style from '../../styles/Header.module.css';

export interface LogoComponentProps {
    alt: string,
    height: number,
    width: number,
    src: string
}

/**
 * LogoComponent renders the logo elements in the header
 * @param props
 * @returns {JSX.Element}
 */
const LogoComponent: FunctionalComponent <LogoComponentProps> = (props) => {
    return (
        <span className={style.logo}>
             <img
                 alt={props.alt}
                 height={props.height}
                 src={props.src}
                 width={props.width}
                 />
        </span>
    );
};
export default LogoComponent;
