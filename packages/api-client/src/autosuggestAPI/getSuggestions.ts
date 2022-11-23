import type { GetSuggestionsRequest, AutosuggestResponseV1, AutosuggestResponseV2 } from './types';
import { getRequest } from '../utils/getRequest';
import { requestOptions } from '../utils/requestOptions';
import { buildAutosuggestRequestUrl } from '../utils';

/**
 * Get suggestions API
 * @returns {Promise<AutosuggestResponseV1 | AutosuggestResponseV2>}
 */
async function getSuggestions(params:GetSuggestionsRequest):Promise<AutosuggestResponseV1 | AutosuggestResponseV2> {
  const url = buildAutosuggestRequestUrl(params);
  const options = requestOptions;

  return getRequest(url, options);
  };

export {getSuggestions};
