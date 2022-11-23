// autosuggestAPI/buildQueryParams.ts

import type { GetBestsellerResultsRequest } from './types';
import type {RequestConstructor} from '../types/global';
import { nodeEnv } from '../utils/nodeEnvConstant';

/**
 * Builds query parameters based on the properties assigned to GetSuggestionsRequest interface
 * @param {GetBestsellerResultsRequest} requestParams
 * @returns {RequestConstructor}
 */
export function buildBestsellerRequest(requestParams:GetBestsellerResultsRequest):RequestConstructor {

  /**
   * Sets each of the params defined as property in request type as URL param
   * @type {string}
   */
  const queryString: string = Object.keys(requestParams).map(key =>
    `${key}=${requestParams[key]}`
  ).join('&');

  /**
   * @remarks Set Search URL based on environment
   * @returns {string}
   */
  let BASE_URL: string;

  function setBaseUrl() {
    if (nodeEnv === 'development') {
      BASE_URL = 'https://core.dxpapi.com/api/v1/core/?';
      console.log(`NODE_ENV = ${nodeEnv}`);
    } else {
      BASE_URL = 'https://staging-core.dxpapi.com/api/v1/core/?';
    }
    return BASE_URL;
  }

  /**
   * Creates the querystring
   * @type {string}
   */
  const uri = `${setBaseUrl()}${queryString}`;

  /**
   * Encodes the full URI string
   * @type {string}
   */
  // TODO build a debug feature
  const requestUrl = encodeURI(uri);
  /* if (nodeEnv === 'development') {
    console.log(`CONSTRUCTED URL = ${requestUrl}`);
  } */

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return {
    url: requestUrl,
    options: requestOptions
  };
}

