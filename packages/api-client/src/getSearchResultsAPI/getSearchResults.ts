import type { GetSearchResultsRequest, SearchResponse } from './types';
import { requestOptions } from '../utils/requestOptions';
import { getRequest } from '../utils/getRequest';
import { buildSearchRequestUrl } from '../utils';

/**
 * Get suggestions API
 * @returns {Promise<SearchResponse>}
 */
async function getSearchResults(params: GetSearchResultsRequest): Promise<SearchResponse> {
  // Retrieves the URL and Options from the buildQueryParams function
  const url = buildSearchRequestUrl(params);
  const options = requestOptions;

  return getRequest(url, options);
};

export { getSearchResults };
