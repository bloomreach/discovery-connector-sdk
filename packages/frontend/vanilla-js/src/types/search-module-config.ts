import type { WithRequiredProp } from '.';
import type { ConnectorConfig } from './connector-config';

export interface SearchModuleConfig extends WithRequiredProp<ConnectorConfig, 'search'> {
  request_type: string;
  search_type: string;
  start: number;
  'facet.range': string;
  'stats.field': string;
  sort?: string;
  search: ConnectorConfig['search'] & {
    category_id?: string;
    is_category_page?: boolean;
  }
}
