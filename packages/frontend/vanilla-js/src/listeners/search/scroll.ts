import { PARAMETER_NAME_PAGE } from '../../constants';
import { initiateSearch } from '../../modules/builders';
import type { SearchModuleConfig } from '../../types';
import {
  decrementParameterInUrl,
  getSearchResultsContainerElement,
  incrementParameterInUrl
} from '../../utils';

declare const window: any;
// @ts-ignore
function buildIntersectionListener(config: SearchModuleConfig): IntersectionObserverCallback {
  return (entries: IntersectionObserverEntry[]) => {
    if (!entries[0]?.isIntersecting) {
      return;
    }

    if (!entries[0].target.querySelector('.blm-scroll-indicator__loading')) {
      return;
    }

    const connectorConfigObject = window?.bloomreachConnector?.config || {};
    const currentStart = connectorConfigObject.start || 0;
    connectorConfigObject.start = currentStart + config.search.items_per_page;
    incrementParameterInUrl(PARAMETER_NAME_PAGE);

    initiateSearch(config).catch(error => {
      connectorConfigObject.start = currentStart;
      decrementParameterInUrl(PARAMETER_NAME_PAGE);
      console.error(error);
    });
  };
}

export function addScrollListener(config: SearchModuleConfig) {
  if (
    config.search?.infinite_scroll &&
    !document.querySelector('.blm-scroll-indicator')
  ) {
    const searchResultsContainerElement = getSearchResultsContainerElement(config);
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
