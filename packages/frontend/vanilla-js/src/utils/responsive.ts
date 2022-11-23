declare const window: any;

export enum breakpoints {
  small = '480px',
  medium = '680px',
  large = '750px',
  xlarge = '875px',
  xxlarge = '1000px',
  xxxlarge = '1200px'
}

export const isMobileView = window.matchMedia(
  `(max-width: ${breakpoints.medium})`
);

export const isTabletView = window.matchMedia(
  `(min-width:${breakpoints.medium}) and (max-width: ${breakpoints.xlarge})`
);
