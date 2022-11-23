import {buildBestsellerRequest} from './buildQueryParams';
import type { GetBestsellerResultsRequest, BestSellerResponse } from './types';

/**
 * Get suggestions API
 * @returns {Promise<BestSellerResponse>}
 */
async function getBestsellerResults(params:GetBestsellerResultsRequest) {
  // Retrieves the URL and Options from the buildQueryParams function
  const getBestSellerInit = buildBestsellerRequest(params);
  const url = getBestSellerInit.url;
  const options = getBestSellerInit.options;

  /**
   * Fetch API to retrieve the response
   * @type {Response}
   */
  const response = await fetch(url, options);

  /**
   * Formats the response as json and returns the typed promise
   * @type {any}
   */
  const result = (await response.json()) as BestSellerResponse;

  /**
   * Sets the type for the promise
   */
  return result;
};

export {getBestsellerResults};

