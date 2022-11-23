import type { AutosuggestTemplateData } from '.';

export interface CurrentSearchRequestState {
  request_id: number;
  price_range_max_value: number;
  price_range_min_value: number;
  is_first_request: boolean;
  is_category_page: boolean;
  category_to_load: string;
}

export interface CurrentAutosuggestRequestState {
  request_id: number;
  last_template_data: AutosuggestTemplateData | null;
}

export interface CurrentRecommendationsRequestState {
  request_id: number;
}
