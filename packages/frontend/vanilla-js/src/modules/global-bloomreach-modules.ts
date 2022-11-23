declare const window: any;

export const globalBloomreachModules = {
  ...(window.BloomreachModules ? window.BloomreachModules : {}),
  version: 'VERSION',
};
