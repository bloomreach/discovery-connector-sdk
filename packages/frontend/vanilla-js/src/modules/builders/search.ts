import invariant from 'tiny-invariant';
import type {
  ProductSearchModule,
  CurrentSearchRequestState,
  SearchTemplateData,
  Facet
} from '../../types';
import {
  PARAMETER_NAME_SIZE,
  PARAMETER_NAME_PAGE,
  COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS,
  PARAMETER_NAME_FILTERS_PANEL,
  MAX_COLOR_SWATCHES,
} from '../../constants';

import * as listeners from '../../listeners';
import {
  resetFacetGroups,
  getSearchResultsContainerElement,
  restoreScrollPosition,
  setupSavingScrollPosition,
  getFacetsFromUrl,
  convertFacetsToQueryString,
  extractSegmentationCookie,
  escapeSpecialCharacters,
  isMobileView,
  getSelectedColors,
  getSearchResultsListContainerElement,
  decrementParameterInUrl,
  buildSearchConfig,
  applyKeywordRedirection,
  buildPaginationData
} from '../../utils';
import { mapSearchApiResponse } from '../../mappers';
import * as ejs from 'ejs';
import type { GetSearchResultsRequest, SearchResponse } from '@bloomreach/discovery-api-client';
import { generateRequestId, getSearchResults } from '@bloomreach/discovery-api-client';

declare const window: any;

export function buildProductSearchModule({ isCategoryPage } = { isCategoryPage: false }): ProductSearchModule {
  let currentSearchRequestState: CurrentSearchRequestState = {
    request_id: 0,
    price_range_max_value: 0,
    price_range_min_value: 0,
    is_first_request: true,
    is_category_page: isCategoryPage,
    category_to_load: '',
  };

  return {
    setCurrentSearchRequestState: (requestState) => {
      currentSearchRequestState = requestState;
    },

    getCurrentSearchRequestState: () => currentSearchRequestState,

    load: async (categoryToLoad?: string) => {
      if (isCategoryPage && categoryToLoad) {
        updateCurrentSearchRequestState({ category_to_load: categoryToLoad });
      }

      if (!areRequirementsMet()) {
        return;
      }

      storeSegmentationPixelData();

      // add mutation observer on container,
      // so it needs to be here before the first actual API call
      afterElementsLoaded(() => {
        // Add a class to show that the module's content has loaded
        getSearchResultsContainerElement().classList.add(
          'blm-has-loaded'
        );

        setupSavingScrollPosition();

        // if infinite scroll is on then add intersection observer
        listeners.addScrollListener();

        addChangeListeners();
      });

      // initiate search with config values and URL parameters
      await initiateSearch();

      restoreScrollPosition();
    },
  };
}

function areRequirementsMet() {
  const config = buildSearchConfig();

  invariant(config.account_id, 'account_id must be set');
  invariant(config.domain_key, 'domain_key must be set');
  invariant(
    config.default_search_parameter,
    'default_search_parameter must be set'
  );
  invariant(
    config?.search?.selector,
    'the selector of search results container element must be set'
  );

  // this checks if the element is in the DOM
  getSearchResultsContainerElement();

  const urlParameters = new URLSearchParams(window.location.search as string);
  const searchPageHasQueryToLoad = config.search.is_search_page &&
    urlParameters.has(config.default_search_parameter);
  const categoryPageHasCategoryToLoad = config.search.is_category_page &&
    (urlParameters.has(config.default_search_parameter) || config.search.category_id);

  return searchPageHasQueryToLoad || categoryPageHasCategoryToLoad;
}

function storeSegmentationPixelData() {
  const segmentationData = extractSegmentationCookie();
  if (segmentationData) {
    const br_data = window.br_data || {};
    br_data[COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS] = segmentationData;
  }
}

export async function initiateSearch(options = { toReplace: false }) {
  updateCurrentSearchRequestState({
    request_id: generateRequestId(),
  });

  const config = buildSearchConfig();

  const apiCallParameters = buildApiCallParameters();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  // @ts-ignore
  const response = await getSearchResults(apiCallParameters);

  if (response?.keywordRedirect) {
    applyKeywordRedirection(response);
    return;
  }

  // builds template data
  const templateData = buildTemplateData(response);

  // takes care of scroll loader
  const scrollLoader = document.querySelector(
    '.blm-scroll-indicator__loading'
  );
  const notEnoughProducts = templateData?.grouped_products
    ? (templateData?.grouped_products?.groups || []).length < Number(apiCallParameters.rows)
    : (!templateData.products.length || templateData.number_of_results < Number(apiCallParameters.rows));

  if (scrollLoader && notEnoughProducts) {
    scrollLoader.remove();
    decrementParameterInUrl(PARAMETER_NAME_PAGE);
  }

  const currentSearchRequestState = getCurrentSearchRequestState();

  if (currentSearchRequestState.is_first_request || !config.search.infinite_scroll || options.toReplace) {

    getSearchResultsContainerElement().innerHTML = ejs.render(
      (config.search?.template || '')
        .replace(
          '%%-PRODUCT_LIST_TEMPLATE-%%',
          (config.search?.product_list_template || '')
        )
        .replace(/%%-REQUEST_ID-%%/g, currentSearchRequestState.request_id.toString()),
      templateData
    );

    window.scrollTo(0, 0);

  } else if (config.search.infinite_scroll) {

    const resultElements = ejs.render(
      (config.search?.product_list_template || ''),
      templateData
    );
    getSearchResultsListContainerElement().insertAdjacentHTML('beforeend', resultElements);

  }

  // adds swatch hover listener to newly added elements as well
  listeners.addSwatchElementHoverListener();

  // marks as initial call happened
  updateCurrentSearchRequestState({ is_first_request: false });
}

export function getCurrentSearchRequestState() {
  return (window.BloomreachModules.search as ProductSearchModule).getCurrentSearchRequestState();
}

export function updateCurrentSearchRequestState(state: Partial<CurrentSearchRequestState>) {
  (window.BloomreachModules.search as ProductSearchModule).setCurrentSearchRequestState({
    ...getCurrentSearchRequestState(),
    ...state,
  });
}

function afterElementsLoaded(afterLoadCallback: () => void) {
  const mutationObserverConfig = { childList: true, subtree: true };
  const mutationObserverCallback = (mutationsList: MutationRecord[]) => {
    const productListAdded = mutationsList.find(
      (mutationRecord) =>
        mutationRecord.type === 'childList' &&
        Array.from(mutationRecord.addedNodes).find(
          (node) =>
            (node as HTMLElement).classList &&
            (node as HTMLElement).classList.contains('blm-results')
        )
    );

    if (productListAdded) {
      // ! Here we can be sure that the template is rendered into the DOM
      afterLoadCallback();
    }
  };

  const observer = new MutationObserver(mutationObserverCallback);
  observer.observe(
    getSearchResultsContainerElement(),
    mutationObserverConfig
  );
}

function addChangeListeners() {
  // When we're going back in history, we want to initiate
  // the search again according to the current URL state
  window.onpopstate = async () => {
    await initiateSearch({ toReplace: true });
  };

  listeners.addPriceRangeChangeListeners();
  listeners.addClearPriceRangeValueButtonClickListener();
  listeners.addClearSelectedFacetButtonClickListener();
  listeners.addClearAllSelectedFacetsButtonClickListener();

  if (document.querySelector('.blm-product-search-sidebar')) {
    listeners.addSidebarControlButtonClickListener();
    listeners.addFacetCheckboxChangeListener();
    listeners.addLoadMoreFacetGroupsButtonClickListener();
    listeners.addLoadMoreFacetValuesButtonClickListener();
    listeners.addFacetSearchInputChangeListener();

    // Show the initial number of facets on load
    resetFacetGroups();
  }

  listeners.addPageSizeSelectChangeListener();
  listeners.addSortSelectChangeListener();
  listeners.addGroupbySelectChangeListener();
  listeners.addPaginationContainerClickListener();
  listeners.addSwatchElementHoverListener();
}

function buildTemplateData(response: SearchResponse): SearchTemplateData {
  const config = buildSearchConfig();
  // map values from API response
  const templateData = mapSearchApiResponse(response);

  // add stored keyword redirection info
  const storedKeywordRedirect = JSON.parse(
    localStorage.getItem('keywordRedirect') || '{}'
  );
  if (storedKeywordRedirect?.redirected_query) {
    templateData.keywordRedirect = storedKeywordRedirect;
    localStorage.removeItem('keywordRedirect');
  }

  const urlParameters = new URLSearchParams(window.location.search as string);
  // eslint-disable-next-line functional/no-loop-statement
  for (const [key, value] of urlParameters.entries()) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    if (!Object.keys(templateData).includes(key as string)) {
      templateData[key] = value;
    }
  }

  if (urlParameters.has(PARAMETER_NAME_SIZE)) {
    templateData.size = Number.parseInt(
      urlParameters.get(PARAMETER_NAME_SIZE) || '', 10
    );
  } else {
    templateData.size = Number.parseInt(
      config.search.items_per_page.toString(), 10
    );
  }

  templateData.checkedFacets = getFacetsFromUrl();

  templateData.selectedFilterItems = (templateData?.facets || []).reduce(
    (all, facet: Facet) => {
      if (facet.section.length > 0) {
        facet.section.forEach((item: { id: string; name: string }) => {
          if (
            templateData.checkedFacets &&
            facet.original_title in templateData.checkedFacets &&
            templateData.checkedFacets?.[facet.original_title]?.includes?.(
              escapeSpecialCharacters(item.id)
            )
          ) {
            (all || []).push({
              checkbox_id: `${facet.original_title
                }[${escapeSpecialCharacters(item.name)}]`,
              label: item.name
            });
          }
        });
      }
      return all;
    },
    [] as SearchTemplateData['selectedFilterItems']
  );

  let currentSearchRequestState = getCurrentSearchRequestState();
  if (
    'minPrice' in templateData &&
    'maxPrice' in templateData &&
    currentSearchRequestState.price_range_min_value === 0 &&
    currentSearchRequestState.price_range_max_value === 0
  ) {
    updateCurrentSearchRequestState({
      price_range_min_value: Math.floor(Number(templateData.minPrice)),
      price_range_max_value: Math.ceil(Number(templateData.maxPrice)),
    });
  }

  currentSearchRequestState = getCurrentSearchRequestState();
  templateData.priceRangeFacet = {
    start: currentSearchRequestState.price_range_min_value,
    end: currentSearchRequestState.price_range_max_value
  };

  if (!config?.search?.infinite_scroll) {
    templateData.paginationData = buildPaginationData(templateData);
  }

  templateData.isFiltersPanelOpened = urlParameters.has(
    PARAMETER_NAME_FILTERS_PANEL
  );

  templateData.defaultMaxColorSwatches = MAX_COLOR_SWATCHES;

  templateData.mobileView = isMobileView;

  templateData.escapeSpecialCharacters = escapeSpecialCharacters;

  templateData.selectedColors = getSelectedColors();

  return templateData;
}

function buildApiCallParameters() {
  const config = buildSearchConfig();
  const urlParameters = new URLSearchParams(window.location.search as string);
  const currentSearchRequestState = getCurrentSearchRequestState();
  const apiParameters: Partial<GetSearchResultsRequest> = {
    ...(config.search?.endpoint ? { endpoint: config.search.endpoint } : {}),
    ...(config.search?.groupby ? { groupby: config.search.groupby } : {}),
    ...(config.search?.group_limit ? { group_limit: config.search.group_limit } : {}),
    q: urlParameters.get(config.default_search_parameter || '') ||
      config.search.category_id ||
      '',
    rows: config.search?.items_per_page,
    sort: config?.sort,
    start: config.start,
    account_id: config.account_id,
    domain_key: config.domain_key,
    request_id: currentSearchRequestState.request_id,
    _br_uid_2: config.tracking_cookie,
    ref_url: config.ref_url,
    url: config.url,
    request_type: config.request_type,
    search_type: config.search_type,
    fl: config.search?.fields,
    'facet.range': config['facet.range'],
    'stats.field': config['stats.field'],
  };

  const pageUrlParameter = urlParameters.get(PARAMETER_NAME_PAGE);
  if (pageUrlParameter) {
    if (config.search.infinite_scroll && currentSearchRequestState.is_first_request) {
      apiParameters.start = 0;
      apiParameters.rows = Number.parseInt(pageUrlParameter, 10) * config.search.items_per_page;
    } else {
      apiParameters.start = (Number.parseInt(pageUrlParameter, 10) - 1) * config.search.items_per_page;
    }
  }

  const facets = getFacetsFromUrl();

  if (Object.keys(facets).length) {
    /*
      And we're setting the 'fq' parameter value as:
      'colors:"gray" OR "black"&fq=reviews:"4.7" OR "5.0"'

      so we can use multiple parameter instances in the API call
    */
    apiParameters.fq = convertFacetsToQueryString(facets);
  }

  // add URL parameters
  // eslint-disable-next-line functional/no-loop-statement
  for (const [key, value] of urlParameters.entries()) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,  @typescript-eslint/no-unsafe-argument
    if (!Object.keys(apiParameters).includes(key as string)) {
      apiParameters[key] = value;
    }
  }

  const segmentationData = extractSegmentationCookie();
  if (segmentationData) {
    apiParameters.brSeg = `seg:${segmentationData}`;
    apiParameters.segment = `customer_profile:${segmentationData}`;
    apiParameters.cdp_segments = segmentationData;
  }

  if (config.search.force_v3_facets) {
    apiParameters['facet.version'] = '3.0';
  }

  return apiParameters;
}
