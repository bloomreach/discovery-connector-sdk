import {
  extractTrackingCookie,
  formatAsCurrency
} from '@bloomreach/discovery-api-client';
import {
  DEFAULT_SEARCH_PARAMETER,
  REQUEST_TYPE_SEARCH,
  SEARCH_TYPE_KEYWORD,
  DEFAULT_START,
  FIELD_NAME_PRICE,
  DEFAULT_CURRENCY,
  DEFAULT_PAGE_SIZE,
  NUMBER_OF_FACET_GROUPS,
  NUMBER_OF_FACET_VALUES,
  SELECTOR_SEARCH_RESULTS_CONTAINER,
  PARAMETER_NAME_SIZE,
  PARAMETER_NAME_SORT,
  PARAMETER_NAME_GROUPBY,
  DEFAULT_SORTING_OPTIONS,
  REQUEST_TYPE_SUGGEST,
  NUMBER_OF_AUTOSUGGEST_COLLECTIONS,
  NUMBER_OF_AUTOSUGGEST_PRODUCTS,
  NUMBER_OF_AUTOSUGGEST_TERMS,
  SELECTOR_AUTOSUGGEST_INPUT,
  SEARCH_TYPE_CATEGORY,
} from '../constants';
import type {
  AutosuggestModuleConfig,
  ConnectorConfig,
  RecommendationsModuleConfig,
  SearchModuleConfig,
} from '../types';

import searchLayoutTemplate from '../templates/search-layout.ejs';
import searchListTemplate from '../templates/search-list.ejs';
import autosuggestTemplate from '../templates/autosuggest.ejs';
import recommendationWidgetTemplate from '../templates/recommendation.ejs';
import { getCurrentSearchRequestState } from '../modules/builders';

declare const window: any;

function buildBaseConfig() {
  const connectorConfig = window?.bloomreachConnector
    ?.config as ConnectorConfig;

  const config = {
    default_search_parameter: DEFAULT_SEARCH_PARAMETER,
    url: window.location.href,
    ref_url: window.location.href,
    tracking_cookie: extractTrackingCookie(),
    format_money: (cents: number) =>
      formatAsCurrency(
        cents,
        window.bloomreachDefaultCurrency as string || DEFAULT_CURRENCY
      ),
    default_currency: window.bloomreachDefaultCurrency as string || DEFAULT_CURRENCY,
    ...connectorConfig,
  };

  return config;
}

export function buildAutosuggestConfig() {
  const baseConfig = buildBaseConfig();

  const config: AutosuggestModuleConfig = {
    request_type: REQUEST_TYPE_SUGGEST,
    ...baseConfig,
    autosuggest: {
      enabled: true,
      endpoint: '',
      number_of_terms: NUMBER_OF_AUTOSUGGEST_TERMS,
      number_of_products: NUMBER_OF_AUTOSUGGEST_PRODUCTS,
      number_of_collections: NUMBER_OF_AUTOSUGGEST_COLLECTIONS,
      selector: SELECTOR_AUTOSUGGEST_INPUT,
      template: autosuggestTemplate,
      catalog_views: '',
      ...(baseConfig?.autosuggest ?? {})
    }
  };

  return config;
}

export function buildSearchConfig() {
  const baseConfig = buildBaseConfig();
  const urlParameters = new URLSearchParams(window.location.search as string);
  const state = getCurrentSearchRequestState();

  const defaultSearchProperties = {
    display_variants: false,
    enabled: true,
    endpoint: '',
    items_per_page: DEFAULT_PAGE_SIZE,
    facets_included: true,
    initial_number_of_facets: NUMBER_OF_FACET_GROUPS,
    initial_number_of_facet_values: NUMBER_OF_FACET_VALUES,
    infinite_scroll: false,
    selector: SELECTOR_SEARCH_RESULTS_CONTAINER,
    sorting_options: DEFAULT_SORTING_OPTIONS,
    template: searchLayoutTemplate,
    product_list_template: searchListTemplate,
    ...(baseConfig?.search ? baseConfig.search : {})
  };

  const config: SearchModuleConfig = {
    ...baseConfig,
    request_type: REQUEST_TYPE_SEARCH,
    search_type: state.is_category_page ? SEARCH_TYPE_CATEGORY : SEARCH_TYPE_KEYWORD,
    start: DEFAULT_START,
    'facet.range': FIELD_NAME_PRICE,
    'stats.field': FIELD_NAME_PRICE,
    sort: urlParameters.get(PARAMETER_NAME_SORT) || '',
    search: {
      ...defaultSearchProperties,
      ...((state.is_category_page ? baseConfig.category : baseConfig.search) || {}),
      ...(state.category_to_load ? { category_id: state.category_to_load } : {})
    }
  };

  // config.search?.sorting_options?.sort?.(
  //   (option1, option2) => (option1.value > option2.value ? 1 : -1)
  // );

  if (config.search) {
    config.search = {
      ...config.search,

      items_per_page: Number(urlParameters.has(PARAMETER_NAME_SIZE)
        ? urlParameters.get(PARAMETER_NAME_SIZE)
        : config.search.items_per_page),

      groupby: urlParameters.get(PARAMETER_NAME_GROUPBY) ||
        config.search.groupby ||
        '',
    };
  }

  return config;
}

export function buildRecommendationsConfig(widgetNode: Node) {
  const baseConfig = buildBaseConfig();
  const { endpoint, fields }: DOMStringMap = (widgetNode as HTMLElement).dataset;

  const config: RecommendationsModuleConfig = {
    ...baseConfig,
    widget: {
      endpoint: '',
      fields: '',
      template: recommendationWidgetTemplate,
      ...(baseConfig?.widget ?? {}),
      ...(endpoint ? { endpoint } : {}),
      ...(fields ? { fields } : {}),
    }
  };

  return config;
}
