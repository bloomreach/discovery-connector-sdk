/* eslint-disable */
declare module '*.module.css';
declare module '*.css';


/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
 */
type EmptyHTMLElement =
    | HTMLAreaElement
    | HTMLBaseElement
    | HTMLBRElement
    | HTMLTableColElement
    | HTMLEmbedElement
    | HTMLHRElement
    | HTMLImageElement
    | HTMLInputElement
    | HTMLLinkElement
    | HTMLMetaElement
    | HTMLParamElement
    | HTMLSourceElement
    | HTMLTrackElement;

interface SyntheticEvent<T = Element> {
    /* ... */
    target: T extends EmptyHTMLElement
        ? EventTarget & T
        : EventTarget;
}
