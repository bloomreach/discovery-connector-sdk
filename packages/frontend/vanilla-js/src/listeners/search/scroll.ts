import { PARAMETER_NAME_PAGE } from '../../constants';
import { initiateSearch } from '../../modules/builders';
import type { SearchModuleConfig } from '../../types';
import {
  buildSearchConfig,
  decrementParameterInUrl,
  getSearchResultsContainerElement,
  incrementParameterInUrl
} from '../../utils';

declare const window: any;
// @ts-ignore
function buildIntersectionListener(config: SearchModuleConfig): IntersectionObserverCallback {
  return (entries) => {
    if (entries[0].intersectionRatio <= 0) {
      return;
    }

    const connectorConfigObject = window?.bloomreachConnector?.config || {};
    const currentStart = connectorConfigObject.start || 0;
    connectorConfigObject.start = currentStart + config.search.items_per_page;
    incrementParameterInUrl(PARAMETER_NAME_PAGE);

    initiateSearch().catch(error => {
      connectorConfigObject.start = currentStart;
      decrementParameterInUrl(PARAMETER_NAME_PAGE);
      console.error(error);
    });
  };
}

export function addScrollListener() {
  const config = buildSearchConfig();

  if (
    config.search?.infinite_scroll &&
    !document.querySelector('.blm-scroll-indicator')
  ) {
    const searchResultsContainerElement = getSearchResultsContainerElement();
    const indicatorElement = document.createElement('div');
    indicatorElement.classList.add('blm-scroll-indicator');
    const loaderElement = document.createElement('div');
    loaderElement.classList.add('blm-scroll-indicator__loading');
    indicatorElement.appendChild(loaderElement);
    searchResultsContainerElement?.parentNode?.insertBefore(
      indicatorElement,
      searchResultsContainerElement.nextSibling
    );

    const scrollIndicator = document.querySelector('.blm-scroll-indicator');
    const intersectionObserver = new IntersectionObserver(buildIntersectionListener(config));
    if (scrollIndicator) {
      intersectionObserver.observe(scrollIndicator);
    }
  }
}
