import type { ConnectorConfig } from './connector-config';

export interface AutosuggestModuleConfig extends ConnectorConfig {
  request_type: string;
}
