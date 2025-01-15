import { globalBloomreachModules } from './global-bloomreach-modules';
import { buildPixelEventsModule } from './builders';

declare const window: any;
const pixelEventsModule = buildPixelEventsModule();

window.BloomreachModules = {
  ...globalBloomreachModules,
  pixelEvents: pixelEventsModule,
};

// pixelEventsModule.load().catch(console.error);
