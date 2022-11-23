export type WithRequiredProp<Type, Key extends keyof Type> = Omit<Type, Key> & Required<Pick<Type, Key>>;
export * from './autosuggest';
export * from './autosuggest-module-config';
export * from './autosuggest-template-data';
export * from './connector-config';
export * from './current-request-state';
export * from './current-ui-state';
export * from './product-events';
export * from './recommendations';
export * from './recommendations-module-config';
export * from './recommendations-template-data';
export * from './search';
export * from './search-module-config';
export * from './search-template-data';