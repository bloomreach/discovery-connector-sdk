import type { SortByOptions } from '@bloomreach/discovery-api-client/src/types/global';

export interface ConnectorConfig {
  account_id: number;
  domain_key: string;
  auth_key: string;
  tracking_cookie?: string;
  ref_url?: string;
  url?: string;
  default_search_parameter?: string;
  search_page_url?: string;
  format_money?: (priceInCents: number) => string;
  default_currency?: string;
  search?: {
    enabled: boolean;
    endpoint: string;
    items_per_page: number;
    facets_included: boolean;
    initial_number_of_facets: number;
    initial_number_of_facet_values: number;
    infinite_scroll: boolean;
    selector: string;
    sorting_options: { label: string; value: string }[];
    groupby_options?: { label: string; value: string }[];
    is_search_page?: boolean;
    display_variants: boolean;
    template?: string;
    product_list_template?: string;
    fields?: string;
    groupby?: string;
    group_limit?: number;
  };
  autosuggest?: {
    enabled: boolean;
    number_of_terms: number;
    number_of_products: number;
    number_of_collections: number;
    endpoint?: string;
    selector: string;
    template?: string;
    catalog_views?: string;
    sort?: SortByOptions;
  };
  category?: {
    enabled: boolean;
    endpoint: string;
    category_id: string;
    items_per_page: number;
    facets_included: boolean;
    initial_number_of_facets: number;
    initial_number_of_facet_values: number;
    infinite_scroll: boolean;
    selector: string;
    sorting_options: { label: string; value: string }[];
    groupby_options?: { label: string; value: string }[];
    is_category_page: boolean;
    display_variants: boolean;
    template?: string;
    product_list_template?: string;
    fields?: string;
    groupby?: string;
    group_limit?: number;
  };
  widget?: {
    endpoint?: string;
    fields?: string;
    template?: string;
  }
}
