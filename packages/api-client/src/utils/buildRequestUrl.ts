import type { GetSuggestionsRequest } from '../autosuggestAPI';
import {
  ENDPOINT_AUTOSUGGEST_API,
  ENDPOINT_PRODUCT_SEARCH_API,
  ENDPOINT_WIDGETS_API,
  FIELD_LIST_DEFAULT,
  FIELD_LIST_WIDGETS,
  NO_ENCODE_PARAMETERS
} from '../constants';
import type { GetSearchResultsRequest } from '../getSearchResultsAPI';
import type { GetWidgetRequest } from '../recommendationWidgetsAPI';

function buildQueryParameters(apiCallParameters: { [key: string]: string | string[] | boolean | number }): string {
  return `?${Object.keys(apiCallParameters)
    .reduce<string[]>(
      (queryParameters: string[], parameterName: string): string[] => [
        ...queryParameters,
        `${parameterName}=${NO_ENCODE_PARAMETERS.includes(
          parameterName
        )
          ? apiCallParameters[parameterName]
          : encodeURIComponent(
            apiCallParameters[parameterName] as string
          )
        }`,
      ],
      []
    )
    .join('&')}`;
}

export function buildSearchRequestUrl(parameters: GetSearchResultsRequest): string {
  const apiParameters = { ...parameters };
  const endpoint = apiParameters?.endpoint || ENDPOINT_PRODUCT_SEARCH_API;
  if (apiParameters?.endpoint) delete apiParameters?.endpoint;
  if (!apiParameters?.fl) apiParameters.fl = FIELD_LIST_DEFAULT;
  return `${endpoint}${buildQueryParameters(apiParameters)}`;
}

export function buildAutosuggestRequestUrl(parameters: GetSuggestionsRequest): string {
  const apiParameters = { ...parameters };
  const endpoint = apiParameters?.endpoint || ENDPOINT_AUTOSUGGEST_API;
  if (apiParameters?.endpoint) delete apiParameters?.endpoint;
  return `${endpoint}${buildQueryParameters(apiParameters)}`;
}

export function buildRecommendationWidgetsRequestUrl(parameters: GetWidgetRequest): string {
  const apiParameters = { ...parameters } as Partial<GetWidgetRequest>;
  const endpoint = `${apiParameters.endpoint || ENDPOINT_WIDGETS_API}${apiParameters.type}/${apiParameters.id}`;
  if (apiParameters.endpoint) delete apiParameters.endpoint;
  if (apiParameters.type) delete apiParameters.type;
  if (apiParameters.id) delete apiParameters.id;
  if (!apiParameters.fields) apiParameters.fields = FIELD_LIST_WIDGETS;
  return `${endpoint}${buildQueryParameters(apiParameters)}`;
}
