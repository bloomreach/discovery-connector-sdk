import { MAX_PAGINATION_NUMBER_BEFORE_CURRENT, MAX_PAGINATION_NUMBER_AFTER_CURRENT } from '../constants';
import type { SearchTemplateData, PaginationNode } from '../types';

export function buildPaginationData(
  results: SearchTemplateData
): PaginationNode[] {
  if ('grouped_products' in results) return buildGroupedPaginationData(results);
  return buildRegularPaginationData(results);
}

function buildRegularPaginationData(
  results: SearchTemplateData
): PaginationNode[] {
  const pageSize = results.size || 1;

  if (results.number_of_results <= pageSize) {
    return [];
  }

  const page = Math.ceil((results.start + 1) / pageSize);
  const numberOfAllPages = Math.ceil(results.number_of_results / pageSize);
  const beforeNumbers = Array(page - 1)
    .fill(null)
    .map((_, index) => index + 1)
    .slice(-MAX_PAGINATION_NUMBER_BEFORE_CURRENT);
  const afterNumbers = Array(numberOfAllPages - page)
    .fill(null)
    .map((_, index) => index + (page + 1))
    .slice(0, MAX_PAGINATION_NUMBER_AFTER_CURRENT);

  return [
    ...(page > 1 ? [{ value: 'previous', label: '&larr;' }] : []),
    ...(page - 1 > MAX_PAGINATION_NUMBER_BEFORE_CURRENT
      ? [
        {
          label: '&hellip;',
          value: (
            page -
            MAX_PAGINATION_NUMBER_BEFORE_CURRENT -
            1
          ).toString()
        }
      ]
      : []),
    ...beforeNumbers.map((number) => ({ value: number.toString() })),
    { value: page.toString(), disabled: true, active: true },
    ...afterNumbers.map((number) => ({ value: number.toString() })),
    ...(page + MAX_PAGINATION_NUMBER_AFTER_CURRENT < numberOfAllPages
      ? [
        {
          label: '&hellip;',
          value: (page + MAX_PAGINATION_NUMBER_AFTER_CURRENT + 1).toString()
        }
      ]
      : []),
    ...(page < numberOfAllPages ? [{ value: 'next', label: '&rarr;' }] : [])
  ];
}

function buildGroupedPaginationData(
  results: SearchTemplateData
  ): PaginationNode[] {
  const page = Number(results.page || 1);
  const pageSize = results.size || 1;
  const numberOfGroups = (results?.grouped_products?.groups || []).length;
  return [
    { value: 'previous', label: 'Previous', disabled: page <= 1 },
    { value: 'next', label: 'Next', disabled: numberOfGroups < pageSize }
  ];
}

export const escapeSpecialCharacters = (value: string): string =>
    value.replace(/"/g, '&quot;').replace(/,/g, '%%-COMMA-%%');

export const decodeSpecialCharacters = (value: string): string =>
    value.replace(/%%-COMMA-%%/g, ',').replace(/&quot;/g, '"');

export const convertFacetsToQueryString = (facets: {
    [facetName: string]: string[];
}): string => {
    return Object.keys(facets)
        .map((facetName: string) => {
            if (facetName === 'price') {
                return encodeURIComponent(
                    // @ts-ignore
                    `${facetName}:[${facets[facetName]
                        .map((value: string) => `${value || '*'}`)
                        .join(' TO ')}]`
                );
            }
            return encodeURIComponent(
                // @ts-ignore
                `${facetName}:${facets[facetName]
                    .map(
                        (value: string) => `"${decodeSpecialCharacters(value)}"`
                    )
                    .join(' OR ')}`
            );
        })
        .join('&fq=');
};

/**
 * Formats a value returned as a double into currency
 * @param {number} cents
 * @param {string} currencySign
 * @param {boolean} onFront
 * @returns {string}
 */
 export const formatAsCurrency = (
  cents: number,
  currencySign = '$',
  onFront = true
): string =>
  `${onFront ? currencySign : ''}${(cents / 100.0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}${!onFront ? ` ${currencySign}` : ''}`;
