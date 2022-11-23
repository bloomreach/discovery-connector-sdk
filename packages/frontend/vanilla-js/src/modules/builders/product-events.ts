import type {
  ProductEventsModule,
} from '../../types';
import * as listeners from '../../listeners/product-events';

export function buildProductEventsModule(): ProductEventsModule {
  return {
    load: async () => {
      listeners.addAddToCartElementClickListener();
      listeners.addQuickviewElementClickListener();
    },
  };
}
