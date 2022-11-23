import '../styles/autosuggest.scss';
import { globalBloomreachModules } from './global-bloomreach-modules';
import { buildAutosuggestModule } from './builders';

declare const window: any;
const autosuggestModule = buildAutosuggestModule();

window.BloomreachModules = {
  ...globalBloomreachModules,
  autosuggest: autosuggestModule,
};

autosuggestModule.load().catch(console.error);