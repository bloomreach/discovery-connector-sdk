// getSearchResultsAPI/types.ts

/**
 * @export
 * @interface GetSearchResultsRequest
 * Provides the types to be leveraged for the getSearchResults method
 */
export interface GetSearchResultsRequest {
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
  auth_key?: string

  /**
   * First Party cookie that provides unique identifier
   */
  _br_uid_2: string

  /**
   * Site domain ID which is provided by Bloomreach
   */
  domain_key: string

  /**
   * Filtered list of attributes you want returned in your API response (i.e. productID, price).
   * Multiple values should be comma separated
   * All fl parameters for Product Search or Category requests must include pid as one of their value
   */
  fl?: string

  /**
   * Partial search query
   */
  q: string;

  /**
   * URL of the page or HTTP referrer where request started
   */
  ref_url?: string;

  /**
   * ID to track site visitor clicks
   */
  request_id?: number;

  /**
   * The type of API request. Value should be search for Product & Category Search.
   * @default search
   */
  request_type: string

  /**
   * The number of matching items to return per results page in the API response.
   * The maximum value is 200.
   */
  rows?: number;

  /**
   * The type of search. Value should be "keyword" for Product Search requests, category for "Category" requests.
   * @default keyword
   */
  search_type: string;

  /**
   * The number of the first item on a page of results.
   * For example, the first item on the first page is 0, making the start value also 0.
   * The maximum value is 10000.
   * @default 0
   */
  start: number;

  /**
   *
   * Absolute URL of the page where the request initiated
   */
  url: string;

  /**
   * Indicates whether data wrapped in the function for CORS requests
   */
  callback?: string;

  /**
   * Extends the filtered query and applies a complex boolean filter to search results to include or exclude items that fit your parameter values.
   * Any product attribute in your product feed is valid, such as brand names and sizes.
   */
  efq?: string;

  /**
   * Return a count of ranged facets, such as price and sale price. Use numeric attributes only.
   * You need to parse the values that are in the facets_counts section of the response.
   */
  'facet.range'?: string;

  /**
   * The fq parameter applies a faceted filter to the returned products,
   * searching for products that fit your parameter values.
   * Use fq=store_lat_lon to enable filtering by distance for BOPIS.
   */
  fq?: string;

  /**
   * The latitude-longitude of the end-customer used for the Buy Online Pick-up In Store (BOPIS) feature.
   * Value should be provided as latitude,longitude. For example, ll=11.09,10.018.
   */
  ll?: string;

  /**
   * Sorts results based on the field value in ascending, descending, or another combination of orders.
   * You can sort any fl field.
   * Value is a field name, followed by asc/desc for ascending/descending order respectively.
   */
  sort?: string;

  /**
   * This parameter allows you to display the maximum and minimum values of any numeric field in your data set for a user query.
   * With this parameter, you can get all the documents matching a query and display the minimum and maximum values of single-valued,
   * numeric attributes such as price, sale_price, length, width, reviews, etc.
   */
  'stats.field'?: string;

  /**
   * The universal customer ID of the user. You only need to pass this field if your particular integration tracks customers this way.
   * The parameter captures user IDs from the customer side, and reuses the information when powering apps or enhancing cross-device linking. In this way,
   * Bloomreach recognizes users in a way that's aligned with your system. Use an anonymous string. Don't use email or other personally identifiable information.
   * If you do not track users this way, then omit this field.
   */
  'user_id'?: string;

  /**
   * A unique identifier for a specific view of your product catalog.
   * If you have multiple versions of your site, each with their own product catalog characteristics like product titles and prices,
   * then add view_id to your call.
   * Bloomreach uses your view_id parameter value to display the right product information for your customers based on their individual site views.
   * You can enter any string value to identify the specific site catalog view. This string must be consistent in your pixel, API, and product catalog.
   */
  'view_id'?: string;

  /**
   * A customer segmentation parameter
   */
  brSeg?: string;

  /**
   * A customer segmentation parameter
   */
  segment?: string;

  /**
   * A customer segmentation parameter
   */
  cdp_segments?: string;

  /**
   * Determines how to group the results.
   */
  groupby?: string;

  /**
   * Number of items in a group when grouping parameter exists.
   */
  group_limit?: number;

}; typeof {};

/**
 *
 * @export
 * @interface SearchResponseFacetCountsFacetFieldsCategory
 */
export interface SearchResponseFacetCountsFacetFieldsCategory {
  /**
   *
   * @type {number}
   * @memberof SearchResponseFacetCountsFacetFieldsCategory
   */
  count?: number;
  /**
   *
   * @type {string}
   * @memberof SearchResponseFacetCountsFacetFieldsCategory
   */
  crumb?: string;
  /**
   *
   * @type {string}
   * @memberof SearchResponseFacetCountsFacetFieldsCategory
   */
  parent?: string;
  /**
   *
   * @type {string}
   * @memberof SearchResponseFacetCountsFacetFieldsCategory
   */
  cat_id?: string;
  /**
   *
   * @type {string}
   * @memberof SearchResponseFacetCountsFacetFieldsCategory
   */
  cat_name?: string;
  /**
   *
   * @type {string}
   * @memberof SearchResponseFacetCountsFacetFieldsCategory
   */
  tree_path?: string;
}

/**
 *
 * @export
 * @interface SearchResponseFacetCountsFacetFieldsGeneral
 */
export interface SearchResponseFacetCountsFacetFieldsGeneral {
  /**
   *
   * @type {number}
   * @memberof SearchResponseFacetCountsFacetFieldsGeneral
   */
  count: number;
  /**
   *
   * @type {string}
   * @memberof SearchResponseFacetCountsFacetFieldsGeneral
   */
  name: string;
}
/**
 *
 * @export
 * @type SearchResponseFacetCountsFacetFields
 */
export type SearchResponseFacetCountsFacetFields = {
  /**
   *
   * @type {Array<SearchResponseFacetCountsFacetFieldsCategory>}
   * @memberof ProductSearchResponseFacetCountsFacetFields
   */
  category?: SearchResponseFacetCountsFacetFieldsCategory[];
} & {
  [key: string]: SearchResponseFacetCountsFacetFieldsGeneral[];
}
/**
 *
 * @export
 * @type SearchResponseFacetCountsFacetRangesPrice
 */
export interface SearchResponseFacetCountsFacetRangesPrice {
  /**
   *
   * @type {number}
   * @memberof SearchResponseFacetCountsFacetRangesPrice
   */
  count: number;
  /**
   *
   * @type {number}
   * @memberof SearchResponseFacetCountsFacetRangesPrice
   */
  start: number;
  /**
   *
   * @type {number}
   * @memberof SearchResponseFacetCountsFacetRangesPrice
   */
  end: number;
}
/**
 *
 * @export
 * @type SearchResponseFacetCountsFacetRanges
 */
export interface SearchResponseFacetCountsFacetRanges {
  /**
   *
   * @type {Array<SearchResponseFacetCountsFacetRangesPrice>}
   * @memberof SearchResponseFacetCountsFacetRanges
   */
  price?: SearchResponseFacetCountsFacetRangesPrice[]
}
/**
 *
 * @export
 * @interface SearchResponseFacetCounts
 */
export interface SearchResponseFacetCounts {
  /**
   *
   * @type {SearchResponseFacetCountsFacetRanges}
   * @memberof SearchResponseFacetCounts
   */
  facet_ranges?: SearchResponseFacetCountsFacetRanges;
  /**
   *
   * @type {SearchResponseFacetCountsFacetFields}
   * @memberof SearchResponseFacetCounts
   */
  facet_fields?: SearchResponseFacetCountsFacetFields;
  /**
   *
   * @type {object}
   * @memberof SearchResponseFacetCounts
   */
  facet_queries?: object;
}
/**
 *
 * @export
 * @interface Variant
 */
export interface Variant {
  /**
   *
   * @type {string}
   * @memberof Variant
   */
  skuid?: string
  /**
   *
   * @type {string}
   * @memberof Variant
   */
  sku_color_group: string
  /**
   *
   * @type {Array<string>}
   * @memberof Variant
   */
  sku_swatch_images: string[]
  /**
   *
   * @type {Array<string>}
   * @memberof Variant
   */
  sku_thumb_images: string[]
  /**
   *
   * @type {number}
   * @memberof Variant
   */
   sku_sale_price?: number
  /**
   *
   * @type {number}
   * @memberof Variant
   */
   sku_price?: number
}
/**
 *
 * @export
 * @interface SearchResponseDoc
 */
export interface SearchResponseDoc {
  /**
   *
   * @type {number}
   * @memberof SearchResponseDoc
   */
  sale_price: number
  /**
   *
   * @type {number}
   * @memberof SearchResponseDoc
   */
  price: number
  /**
   *
   * @type {string}
   * @memberof SearchResponseDoc
   */
  description: string
  /**
   *
   * @type {string}
   * @memberof SearchResponseDoc
   */
  title: string
  /**
   *
   * @type {string}
   * @memberof SearchResponseDoc
   */
  url: string
  /**
   *
   * @type {string}
   * @memberof SearchResponseDoc
   */
  brand: string
  /**
   *
   * @type {string}
   * @memberof SearchResponseDoc
   */
  pid: string
  /**
   *
   * @type {string}
   * @memberof SearchResponseDoc
   */
  thumb_image: string
  /**
   *
   * @type {Array<number>}
   * @memberof SearchResponseDoc
   */
  sale_price_range: number[]
  /**
   *
   * @type {Array<number>}
   * @memberof SearchResponseDoc
   */
  price_range: number[]
  /**
   *
   * @type {Array<Variant>}
   * @memberof SearchResponseDoc
   */
  variants: Variant[]
  /**
   *
   * @type {Array<string>}
   * @memberof SearchResponseDoc
   */
  promotions?: string[]
  /**
   *
   * @type {number}
   * @memberof SearchResponseDoc
   */
  score?: number
}
/**
 *
 * @export
 * @interface SearchResponseResponse
 */
export interface SearchResponseResponse {
  /**
   *
   * @type {number}
   * @memberof SearchResponseResponse
   */
  numFound?: number;
  /**
   *
   * @type {number}
   * @memberof SearchResponseResponse
   */
  start?: number;
  /**
   *
   * @type {Array<object>}
   * @memberof SearchResponseResponse
   */
  docs?: SearchResponseDoc[];
  /**
   *
   * @type {number}
   * @memberof SearchResponseResponse
   */
  maxScore?: number;
}
/**
 *
 * @export
 * @interface SearchResponseGroupResponseGroupListGroup
 */
 export interface SearchResponseGroupResponseGroupListGroup {
  /**
   *
   * @type {string}
   * @memberof SearchResponseResponse
   */
  groupValue: string;
  /**
   *
   * @type {Array<object>}
   * @memberof SearchResponseResponse
   */
  doclist?: SearchResponseResponse;
}
/**
 *
 * @export
 * @interface SearchResponseGroupResponseGroupList
 */
 export interface SearchResponseGroupResponseGroupList {
  /**
   *
   * @type {number}
   * @memberof SearchResponseGroupResponseGroupList
   */
  matches: number;
  /**
   *
   * @type {Array<SearchResponseGroupResponseGroupListGroup>}
   * @memberof SearchResponseGroupResponseGroupList
   */
  groups: SearchResponseGroupResponseGroupListGroup[]
}
/**
 *
 * @export
 * @interface SearchResponseGroupResponse
 */
 export interface SearchResponseGroupResponse {
  /**
   *
   * @type {SearchResponseGroupResponseGroupList}
   * @memberof SearchResponseGroupResponse
   */
  [groupName: string]: SearchResponseGroupResponseGroupList;
}
/**
 *
 * @export
 * @interface SearchResponseStatsStatsFieldsPrice
 */
export interface SearchResponseStatsStatsFieldsPrice {
  /**
   *
   * @type {number}
   * @memberof SearchResponseStatsStatsFieldsPrice
   */
  max: number;
  /**
   *
   * @type {number}
   * @memberof SearchResponseStatsStatsFieldsPrice
   */
  min: number;
}
/**
 *
 * @export
 * @interface SearchResponseStatsStatsFields
 */
export interface SearchResponseStatsStatsFields {
  /**
   *
   * @type {SearchResponseStatsStatsFieldsPrice}
   * @memberof SearchResponseStatsStatsFields
   */
  price?: SearchResponseStatsStatsFieldsPrice
  /**
   *
   * @type {SearchResponseStatsStatsFieldsPrice}
   * @memberof SearchResponseStatsStatsFields
   */
  sale_price?: SearchResponseStatsStatsFieldsPrice
}
/**
 *
 * @export
 * @interface SearchResponseStats
 */
export interface SearchResponseStats {
  /**
   *
   * @type {SearchResponseStatsStatsFields}
   * @memberof SearchResponseStats
   */
  stats_fields: SearchResponseStatsStatsFields
}
/**
 *
 * @export
 * @interface SearchResponseKeywords
 */
export interface SearchResponseKeywords {
  /**
   *
   * @type {string}
   * @memberof SearchResponseKeywords
   */
  'original query': string;
  /**
   *
   * @type {string}
   * @memberof SearchResponseKeywords
   */
  'redirected query': string;
  /**
   *
   * @type {string}
   * @memberof SearchResponseKeywords
   */
  'redirected url': string;
}
/**
 *
 * @export
 * @interface SearchResponse
 */
export interface SearchResponse {
  /**
   *
   * @type {SearchResponseResponse}
   * @memberof SearchResponse
   */
  response?: SearchResponseResponse;
  /**
   *
   * @type {SearchResponseGroupResponse}
   * @memberof SearchResponse
   */
  group_response?: SearchResponseGroupResponse;
  /**
   *
   * @type {SearchResponseFacetCounts}
   * @memberof SearchResponse
   */
  facet_counts?: SearchResponseFacetCounts;
  /**
   *
   * @type {object}
   * @memberof SearchResponse
   */
  category_map?: object;
  /**
   *
   * @type {Array<string>}
   * @memberof SearchResponse
   */
  did_you_mean?: string[];
  /**
   *
   * @type {SearchResponseStats}
   * @memberof SearchResponse
   */
  stats?: SearchResponseStats;
  /**
   *
   * @type {string}
   * @memberof SearchResponse
   */
  autoCorrectQuery?: string;
  /**
   *
   * @type {SearchResponseKeywords}
   * @memberof SearchResponse
   */
  keywordRedirect?: SearchResponseKeywords;
}
