
import { COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS } from '../constants';
import type { SearchResponse } from '@bloomreach/discovery-api-client/src/getSearchResultsAPI/types';

/**
 * Extracts the segmentation value from the Bloomreach segmentation pixel
 * @remarks Designed to check for the cookie,and if not present will set a default
 * @returns {string}
 */
 export function extractSegmentationCookie(): string {
  const cookiePrefix = `${COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS}=`;
  const segmentationCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(cookiePrefix));
  return (segmentationCookie || '').replace(cookiePrefix, '');
}

export function applyKeywordRedirection(response: SearchResponse) {
  if (response?.keywordRedirect) {
    localStorage.setItem(
      'keywordRedirect',
      JSON.stringify({
        original_query:
          response.keywordRedirect['original query'],
        redirected_query:
          response.keywordRedirect['redirected query'],
        redirected_url: response.keywordRedirect['redirected url']
      })
    );
    const redirectedUrl = response.keywordRedirect?.['redirected url'] || '';
    window.location.href = `${!redirectedUrl.startsWith('http') ? 'https://' : ''
      }${redirectedUrl}`;
  }
}
