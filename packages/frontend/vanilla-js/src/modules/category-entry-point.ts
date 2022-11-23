import '../styles/category.scss';
import { globalBloomreachModules } from './global-bloomreach-modules';
import { buildProductSearchModule } from './builders';

declare const window: any;
const categoryModule = buildProductSearchModule({ isCategoryPage: true });

window.BloomreachModules = {
  ...globalBloomreachModules,
  search: categoryModule,
};

categoryModule.load().catch(console.error);
