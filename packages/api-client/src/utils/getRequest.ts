// /utils/getRequest.ts

/**
 * Method used to initiate the API request
 * @remarks The Assignment of the API specific promise is set in the respective API
 * @param {string} url
 * @param {{}} options
 * @returns {Promise<any>}
 */
export async function getRequest(url:string, options:object) {

  /**
   * Use of Client-Side Fetch API to retrieve the response
   * @type {Response}
   */
  const response = await fetch(url, options);

  /**
   * Formats the response as json and returns the typed promise
   * @type {any}
   */
  const result = (await response.json());

  /**
   * Sets the type for the promise
   */
  return result;
}
