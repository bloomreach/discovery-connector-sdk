import type { WithRequiredProp } from '.';
import type { ConnectorConfig } from './connector-config';

export interface RecommendationsModuleConfig extends WithRequiredProp<ConnectorConfig, 'widget'> {
  number_of_items_to_show?: number;
}
