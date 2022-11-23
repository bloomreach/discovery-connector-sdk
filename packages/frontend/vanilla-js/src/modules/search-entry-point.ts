import '../styles/search.scss';
import { globalBloomreachModules } from './global-bloomreach-modules';
import { buildProductSearchModule } from './builders';

declare const window: any;
const productSearchModule = buildProductSearchModule();

window.BloomreachModules = {
  ...globalBloomreachModules,
  search: productSearchModule,
};

productSearchModule.load().catch(console.error);
