// recommendationWidgetsAPI/types.ts

import type { SortByOptions } from '..';

export type WidgetTypes =
  | 'category'
  | 'keyword'
  | 'item'
  | 'personalized'
  | 'global';

export interface GetCategoryWidgetRequest {
  endpoint?: string
  id: string
  auth_key?: string
  account_id: number
  domain_key: string
  request_id: number
  _br_uid_2: string
  ref_url: string
  url: string
  sort?: SortByOptions
  fields?: string
  rows: number;
  start: number;
  brSeg?: string;
  segment?: string;
  cdp_segments?: string;
  cat_id: string;
}

export interface GetKeywordWidgetRequest {
  endpoint?: string
  id: string
  auth_key?: string
  account_id: number
  domain_key: string
  request_id: number
  _br_uid_2: string
  ref_url: string
  url: string
  sort?: SortByOptions
  fields?: string
  rows: number;
  start: number;
  brSeg?: string;
  segment?: string;
  cdp_segments?: string;
  query: string;
}

export interface GetGlobalWidgetRequest {
  endpoint?: string
  id: string
  auth_key?: string
  account_id: number
  domain_key: string
  request_id: number
  _br_uid_2: string
  ref_url: string
  url: string
  sort?: SortByOptions
  fields?: string
  rows: number;
  start: number;
  brSeg?: string;
  segment?: string;
  cdp_segments?: string;
}

export interface GetPersonalizedWidgetRequest {
  endpoint?: string
  id: string
  auth_key?: string
  account_id: number
  domain_key: string
  request_id: number
  _br_uid_2: string
  ref_url: string
  url: string
  sort?: SortByOptions
  fields?: string
  rows: number;
  start: number;
  brSeg?: string;
  segment?: string;
  cdp_segments?: string;
  user_id?: string;
}

export interface GetItemWidgetRequest {
  endpoint?: string
  id: string
  auth_key?: string
  account_id: number
  domain_key: string
  request_id: number
  _br_uid_2: string
  ref_url: string
  url: string
  sort?: SortByOptions
  fields?: string
  rows: number;
  start: number;
  brSeg?: string;
  segment?: string;
  cdp_segments?: string;
  item_ids?: string[];
}

export type GetWidgetRequest =
  { type: WidgetTypes } & (GetCategoryWidgetRequest
  | GetKeywordWidgetRequest
  | GetGlobalWidgetRequest
  | GetPersonalizedWidgetRequest
  | GetItemWidgetRequest);

export interface Query {} // eslint-disable-line @typescript-eslint/no-empty-interface

export interface MetadataResponse {
  personalized_results: boolean
  fallback: string
  recall: string
}

export interface Widget {
  id: string
  name: string
  description: string
  type: string
  rid: string
}

export interface Metadata {
  widget: Widget
  query: Query
  response: MetadataResponse
}

export interface WidgetResponseDoc {
  price: number
  url: string
  pid: string
  sale_price: number
  thumb_image: string
  title: string
}

export interface WidgetResponse {
  numFound: number
  start: number
  docs: WidgetResponseDoc[]
}

export interface RecommendationWidgetsResponseV2 {
  response: WidgetResponse
  metadata: Metadata
}
