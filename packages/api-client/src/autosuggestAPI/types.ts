// autosuggestAPI/types.ts

import type { SortByOptions } from '..';

/**
 * @export
 * @interface GetSuggestionsRequest
 * Provides the types to be leveraged for the getProductSuggestions method
 */
export interface GetSuggestionsRequest {
    [key: string]: any;

    /**
     * API endpoint
     */
    endpoint?: string
    /**
     * Account ID
     */
    account_id: number
    /**
     * Authentication Key
     */
    auth_key: string
    /**
     * First Party cookie that provides unique identifier
     */
    _br_uid_2: string
    /**
     * A list of catalog views that you want to see in your suggestions.
     * Can contain a list which is separated by a colon
     */
    catalog_views: string;

    /**
     * Partial search query
     */
    q: string;

    /**
     * URL of the page or HTTP referrer where request started
     */
    ref_url: string;

    /**
     * ID to track site visitor clicks
     */
    request_id: number;

    /**
     * Type of API request
     */
    request_type: string;

    /**
     * Absolute URL of the page where the request initiated
     */
    url: string;

    /**
     * Indicates whether data wrapped in the function for CORS requests
     */
    callback?: string;

    /**
     * Provides the sort order designation
     */
    sort?: SortByOptions;
}

/**
* @export
* @interface AutosuggestResponseQueryContext
*/
export interface AutosuggestResponseQueryContext {
    /**
     *
     * @type {string}
     * @memberof AutosuggestResponseQueryContext
     */
    originalQuery?: string;
}

/**
 * @export
 * @interface AutosuggestResponseQuerySuggestions
 */
export interface AutosuggestResponseQuerySuggestions {
    /**
     * @type {string}
     * @memberof AutosuggestResponseQuerySuggestions
     */
    query: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseQuerySuggestions
     */
    displayText: string;
}

export interface AutosuggestResponseSearchSuggestions {
    /**
     * @type {string}
     * @memberof AutosuggestResponseSearchSuggestions
     */
    sale_price: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseSearchSuggestions
     */
    url: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseSearchSuggestions
     */
    pid: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseSearchSuggestions
     */
    thumb_image: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseSearchSuggestions
     */
    title: string;
}

export interface AutosuggestResponseAttributeSuggestions {
    /**
     * @type {string}
     * @memberof AutosuggestResponseAttributeSuggestions
     */
    name: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseAttributeSuggestions
     */
    value: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseAttributeSuggestions
     */
    attributeType: string;
}

export interface AutosuggestResponseSuggestionGroups {
    /**
     * @remarks Query suggestion items which are filtered from the Bloomreach dictionaries.
     * @type {Array<AutosuggestResponseQuerySuggestions>}
     * @memberof AutosuggestResponseSuggestionGroups
     */
    querySuggestions?: AutosuggestResponseQuerySuggestions[];
    /**
     * @remarks Contains search documents, supported for product or content catalogs.
     * @type {Array<AutosuggestResponseSearchSuggestions>}
     * @memberof AutosuggestResponseSuggestionGroups
     */
    searchSuggestions?: AutosuggestResponseSearchSuggestions[];
    /**
     * @remarks If autosuggest query includes categories, then this array helps your site visitors to filter their search results according to categories.
     * @type {Array<AutosuggestResponseSearchSuggestions>}
     * @memberof AutosuggestResponseSuggestionGroups
     */
    attributeSuggestions?: AutosuggestResponseAttributeSuggestions[];
    /**
     * @type {string}
     * @memberof AutosuggestResponseSuggestionGroups
     */
    catalogName?: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseSuggestionGroups
     */
    view?: string;
    /**
     * @type {string}
     * @memberof AutosuggestResponseSuggestionGroups
     */
    product_suggest_query?: string;
}

/**
 * @export
 * @interface AutosuggestResponseV2
 */
export interface AutosuggestResponseV2 {
    /**
     * @type {AutosuggestResponseQueryContext}
     * @memberof AutosuggestResponse
     */
    queryContext?: AutosuggestResponseQueryContext;
    /**
     * @type {Array<AutosuggestResponseSuggestionGroups>}
     * @memberof AutosuggestResponse
     */
    suggestionGroups?: AutosuggestResponseSuggestionGroups[];
}

export interface AutosuggestResponseV1Product {
  price?: number
  sale_price: number
  url: string
  pid: string
  thumb_image: string
  title: string
}

export interface AutosuggestResponseV1Filter {
  name: string
  value: string
  key: string
}

export interface AutosuggestResponseV1ResponseHeader {
  zkConnected: boolean
  status: number
  QTime: number
}

export interface AutosuggestResponseV1Suggestion {
  q: string
  dq: string
  filters?: AutosuggestResponseV1Filter[]
}

export interface AutosuggestResponseV1Response {
  q?: string
  suggestions?: AutosuggestResponseV1Suggestion[]
  numFound?: number
  products?: AutosuggestResponseV1Product[]
}

export interface AutosuggestResponseV1 {
  responseHeader: AutosuggestResponseV1ResponseHeader
  response: AutosuggestResponseV1Response
}
