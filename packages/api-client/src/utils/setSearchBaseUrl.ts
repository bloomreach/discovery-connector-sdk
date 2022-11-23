// setSearchBaseUrl.ts

import { nodeEnv } from './nodeEnvConstant';

/**
 * @remarks Set Search URL based on environment
 * @returns {string}
 */
let BASE_URL: string;

export function getSearchRequestUrl(requestParams:{}) {
  function setSearchBaseUrl() {
    if (nodeEnv === 'development') {
      BASE_URL = 'https://core.dxpapi.com/api/v1/core/?';
      console.log(`NODE_ENV = ${nodeEnv}`);
    } else {
      BASE_URL = 'https://staging-core.dxpapi.com/api/v1/core/?';
    }
    return BASE_URL;
  };
  /**
   * Creates the querystring
   * @type {string}
   */
  /**
   * Sets each of the params defined as property in request type as URL param
   * @type {string}
   */
  const queryString: string = Object.keys(requestParams).map(key =>
    `${key}=${requestParams[key]}`
  ).join('&');

  const uri = `${setSearchBaseUrl()}${queryString}`;

  /**
   * Encodes the full URI string
   * @type {string}
   */
  const requestUrl = encodeURI(uri);
  /* if (nodeEnv === 'development') {
   console.log(`CONSTRUCTED URL = ${requestUrl}`);
   } */

  return requestUrl;
};
