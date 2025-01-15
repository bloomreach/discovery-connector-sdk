import type {
  PixelEventsModule,
} from '../../types';
import * as listeners from '../../listeners/pixel-events';

export function buildPixelEventsModule(): PixelEventsModule {
  return {
    load: async () => {
      listeners.addCartClickAddEventListener();
      listeners.addProductQuickviewEventListener();
      listeners.addSearchSubmitEventListener();
      listeners.addSuggestClickEventListener();
      listeners.addCartWidgetAddEventListener();
      listeners.addWidgetClickEventListener();
      listeners.addWidgetViewEventListener();
    },
  };
}
