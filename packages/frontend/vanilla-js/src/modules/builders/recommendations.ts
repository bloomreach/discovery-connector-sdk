import type {
  CurrentRecommendationsRequestState,
  CurrentRecommendationsUiState,
  RecommendationsModule,
  RecommendationsTemplateData,
} from '../../types';
import * as listeners from '../../listeners/recommendations';
import { buildRecommendationsConfig, extractSegmentationCookie, isMobileView, isTabletView } from '../../utils';
import {
  COOKIE_NAME_SEGMENTATION_CUSTOMER_PROFILE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_START
} from '../../constants';

import { mapRecommendationsApiResponse } from '../../mappers';
import ejs from 'ejs';
import {
  getCategoryWidget,
  getGlobalWidget,
  getItemWidget,
  getKeywordWidget,
  getPersonalizedWidget,
  generateRequestId
} from '@bloomreach/discovery-api-client';
import type { GetCategoryWidgetRequest, GetGlobalWidgetRequest,
  GetItemWidgetRequest, GetKeywordWidgetRequest, GetPersonalizedWidgetRequest, RecommendationWidgetsResponseV2 } from '@bloomreach/discovery-api-client/src/recommendationWidgetsAPI';

declare const window: any;

export function buildRecommendationsModule(): RecommendationsModule {
  let currentRecommendationsRequestState: CurrentRecommendationsRequestState = {
    request_id: 0,
  };

  let currentRecommendationsUiState: CurrentRecommendationsUiState = {
    widgets: [],
  };

  return {
    setCurrentRecommendationsRequestState: (requestState) => {
      currentRecommendationsRequestState = requestState;
    },

    getCurrentRecommendationsRequestState: () => currentRecommendationsRequestState,

    setCurrentRecommendationsUiState: (uiState) => {
      currentRecommendationsUiState = uiState;
    },

    getCurrentRecommendationsUiState: () => currentRecommendationsUiState,

    load: async () => {
      updateCurrentRecommendationsRequestState({
        request_id: generateRequestId(),
      });

      storeSegmentationPixelData();

      collectWidgetsFromDom();

      // get and populate widgets data into the DOM
      const loadWidgets = getCurrentRecommendationsUiState().widgets.reduce((allPromises, widgetData) => [
        ...allPromises,
        new Promise((resolve) => {
          // build API call parameters
          const apiCallParameters = buildApiCallParameters(widgetData.node);

          // call api and get data
          let widgetResponse;
          if (isKeywordWidgetRequest(apiCallParameters)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            widgetResponse = getKeywordWidget(apiCallParameters);
          } else if (isCategoryWidgetRequest(apiCallParameters)) {
            widgetResponse = getCategoryWidget(apiCallParameters);
          } else if (isItemWidgetRequest(apiCallParameters)) {
            widgetResponse = getItemWidget(apiCallParameters);
          } else if (isPersonalizedWidgetRequest(apiCallParameters)) {
            widgetResponse = getPersonalizedWidget(apiCallParameters);
          } else {
            widgetResponse = getGlobalWidget(apiCallParameters as GetGlobalWidgetRequest);
          }

          resolve(widgetResponse);

        }).then((widgetResponse: RecommendationWidgetsResponseV2) => {

          const widgetElement = (widgetData.node as HTMLElement);
          const config = buildRecommendationsConfig();

          // build template data
          const templateData = mapRecommendationsApiResponse(widgetResponse);
          const widgetAttributes: DOMStringMap = widgetElement.dataset;
          templateData.config.number_of_items_to_show = Number(widgetAttributes.numberOfItemsToShow);

          // render widget template into its container
          widgetElement.innerHTML = ejs.render(
            (config.widget?.template || ''),
            templateData
          );

          logWidgetViewEvent(widgetElement);

          widgetElement.classList.add('blm-widget-loaded');

          return {
            widgetElement,
            templateData
          };
        })
      ], []);

      const loadedWidgets = await Promise.all(loadWidgets).catch(console.error);

      // add event listeners to loaded widget content
      listeners.addWidgetAddToCartButtonClickListener();
      listeners.addWidgetLinkElementClickListener();

      (loadedWidgets || []).forEach((
        widgetResult: {
          widgetElement: HTMLElement,
          templateData: RecommendationsTemplateData
        }) => {
          setupCarousel(widgetResult.widgetElement, widgetResult.templateData);
      });

    },
  };
}

function buildApiCallParameters(widgetNode: Node) {
  const config = buildRecommendationsConfig();
  const urlParameters = new URLSearchParams(window.location.search as string);
  const currentRecommendationsRequestState = getCurrentRecommendationsRequestState();

  const widgetAttributes: DOMStringMap = (widgetNode as HTMLElement).dataset;

  const apiParameters: { [key: string]: any } = {
    ...(config?.widget?.endpoint ? { endpoint: config.widget.endpoint } : {}),
    account_id: config.account_id,
    domain_key: config.domain_key,
    request_id: currentRecommendationsRequestState.request_id,
    _br_uid_2: config.tracking_cookie,
    ref_url: config.ref_url,
    url: config.url,
    rows: Number(widgetAttributes.numberOfItemsToFetch) || DEFAULT_PAGE_SIZE,
    start: DEFAULT_START,
    ...widgetAttributes
  };

  // add URL parameters
  // eslint-disable-next-line functional/no-loop-statement
  for (const [key, value] of urlParameters.entries()) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
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

  switch (widgetAttributes.type) {
    case 'keyword':
      apiParameters.query = widgetAttributes.query;
      return apiParameters as GetKeywordWidgetRequest;
    case 'category':
      apiParameters.cat_id = widgetAttributes.categoryId;
      return apiParameters as GetCategoryWidgetRequest;
    case 'item':
      apiParameters.item_ids = widgetAttributes.itemIds;
      return apiParameters as GetItemWidgetRequest;
    case 'personalized':
      apiParameters.user_id = widgetAttributes.userId;
      return apiParameters as GetPersonalizedWidgetRequest;
    case 'global':
      return apiParameters as GetGlobalWidgetRequest;

    default:
      return new Error(`Invalid widget type: "${widgetAttributes.type}"`);
  }
}

export function getCurrentRecommendationsUiState() {
  return (window.BloomreachModules.pathwaysRecommendations as RecommendationsModule).getCurrentRecommendationsUiState();
}

export function updateCurrentRecommendationsUiState(state: Partial<CurrentRecommendationsUiState>) {
  (window.BloomreachModules.pathwaysRecommendations as RecommendationsModule).setCurrentRecommendationsUiState({
    ...getCurrentRecommendationsUiState(),
    ...state,
  });
}

export function getCurrentRecommendationsRequestState() {
  return (window.BloomreachModules.pathwaysRecommendations as RecommendationsModule).getCurrentRecommendationsRequestState();
}

export function updateCurrentRecommendationsRequestState(state: Partial<CurrentRecommendationsRequestState>) {
  (window.BloomreachModules.pathwaysRecommendations as RecommendationsModule).setCurrentRecommendationsRequestState({
    ...getCurrentRecommendationsRequestState(),
    ...state,
  });
}

function collectWidgetsFromDom() {
  const widgets: CurrentRecommendationsUiState['widgets'] = [];

  document.querySelectorAll(
    '.blm-recommendations-widget'
  ).forEach((widgetNode) => {
    widgets.push({ loaded: false, node: widgetNode });
  });

  updateCurrentRecommendationsUiState({ widgets });
}

function storeSegmentationPixelData() {
  const segmentationData = extractSegmentationCookie();
  if (segmentationData) {
    const br_data = window.br_data || {};
    br_data[COOKIE_NAME_SEGMENTATION_CUSTOMER_PROFILE] = segmentationData;
  }
}

function isKeywordWidgetRequest(apiCallParameters: any): apiCallParameters is GetKeywordWidgetRequest {
  return 'query' in apiCallParameters;
}

function isCategoryWidgetRequest(apiCallParameters: any): apiCallParameters is GetCategoryWidgetRequest {
  return 'cat_id' in apiCallParameters;
}

function isItemWidgetRequest(apiCallParameters: any): apiCallParameters is GetItemWidgetRequest {
  return 'item_ids' in apiCallParameters;
}

function isPersonalizedWidgetRequest(apiCallParameters: any): apiCallParameters is GetPersonalizedWidgetRequest {
  return 'user_id' in apiCallParameters;
}

function logWidgetViewEvent(widgetElement: HTMLElement) {
  const widgetContentElement = widgetElement.querySelector(
    '.blm-recommendation-widget-content'
  );
  const {
    id: widgetId = '',
    type: widgetType = '',
    rid: widgetRid = ''
  } = (widgetContentElement as HTMLElement).dataset;
  const widgetViewEventData = {
    wrid: widgetRid,
    wid: widgetId,
    wty: widgetType,
    ...(widgetElement.dataset.query ? { wq: widgetElement.dataset.query } : {})
  }
    ; (window.BrTrk || {})?.getTracker()?.logEvent(
      'widget',
      'widget-view',
      widgetViewEventData,
      true
    );
}

function setupCarousel(widgetElement: HTMLElement, templateData: RecommendationsTemplateData) {
  const carouselPrevious = widgetElement.querySelector(
    '.blm-carousel-previous'
  );
  const carouselNext = widgetElement.querySelector('.blm-carousel-next');
  // @ts-ignore
  const products: NodeListOf<HTMLElement> = widgetElement.querySelectorAll(
    '.blm-recommendation__product'
  );

  const displayedProducts = Number(isMobileView.matches
    ? 1
    : isTabletView.matches
      ? 2
      : templateData.config.number_of_items_to_show);

  const productPage = Math.ceil(products.length / displayedProducts);
  let productCardWidth = 0;
  if (products.length) {
    const productsContainer = widgetElement.querySelector(
      '.blm-recommendation__products'
    );
    const computedStyles = window.getComputedStyle(productsContainer);
    productCardWidth =
      Number(computedStyles.width.replace('px', '')) / displayedProducts;
  }

  let eachItemWidth = 0;
  const movePer = productCardWidth;
  const maxMove = (products.length - displayedProducts) * productCardWidth;

  const adjustArrowVisibilities = () => {
    if (products?.[0]?.style?.left === '0px') {
      carouselPrevious?.classList.add('blm-invisible');
    } else {
      carouselPrevious?.classList.remove('blm-invisible');
    }

    if (products?.[0]?.style?.left === `-${maxMove}px`) {
      carouselNext?.classList.add('blm-invisible');
    } else {
      carouselNext?.classList.remove('blm-invisible');
    }
  };

  const moveRight = () => {
    eachItemWidth = eachItemWidth + movePer;
    if (products.length === 1) {
      eachItemWidth = 0;
    }

    // eslint-disable-next-line functional/no-loop-statement
    for (const product of products) {
      if (eachItemWidth > maxMove) {
        eachItemWidth = eachItemWidth - movePer;
      }
      product.style.left = `-${eachItemWidth}px`;
    }

    adjustArrowVisibilities();
  };

  const moveLeft = () => {
    eachItemWidth = eachItemWidth - movePer;
    if (eachItemWidth <= 0) {
      eachItemWidth = 0;
    }

    // eslint-disable-next-line functional/no-loop-statement
    for (const product of products) {
      if (productPage > 1) product.style.left = `-${eachItemWidth}px`;
    }

    adjustArrowVisibilities();
  };

  if (carouselPrevious !== null && carouselNext !== null) {
    carouselPrevious.addEventListener('click', () => {
      moveLeft();
    });
    carouselNext.addEventListener('click', () => {
      moveRight();
    });
  }
}
