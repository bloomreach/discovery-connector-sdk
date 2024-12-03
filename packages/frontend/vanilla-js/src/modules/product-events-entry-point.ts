import { globalBloomreachModules } from './global-bloomreach-modules';
import { buildProductEventsModule } from './builders';

declare const window: any;
const productEventsModule = buildProductEventsModule();

window.BloomreachModules = {
  ...globalBloomreachModules,
  productEvents: productEventsModule,
};

// pproductsEventsModule.load().catch(console.error);
