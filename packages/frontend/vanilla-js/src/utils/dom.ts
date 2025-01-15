import invariant from 'tiny-invariant';
import { getCurrentSearchRequestState } from '../modules/builders';
import type { AutosuggestModuleConfig, SearchModuleConfig } from '../types';

export function findUpElementWithClassName(
    startElement: Node,
    className: string
): Node | null {
    let element: Node | null = startElement;
    // eslint-disable-next-line functional/no-loop-statement
    while (element && element.parentElement) {
        element = element.parentElement;
        if (
            element &&
            (element as HTMLElement).classList?.contains(className)
        ) {
            return element;
        }
    }
    console.warn(`CSS class '${className}' not found in ancestors of ${startElement.nodeName}`);
    return null;
}

export function findUpElementByTagName(
    startElement: Node,
    tagName: string
): Node | null {
    let element: Node | null = startElement;
    // eslint-disable-next-line functional/no-loop-statement
    while (element && element.parentElement) {
        element = element.parentElement;
        if (
            element &&
            (element as HTMLElement).tagName.toLowerCase() ===
                tagName.toLowerCase()
        ) {
            return element;
        }
    }
    console.warn(`'${tagName}' not found in ancestors of ${startElement.nodeName}`);
    return null;
}

export function hideAllDynamicFacetGroups() {
  [
    '.blm-dynamic-filter',
    '.blm-product-search-filter-item',
    '.blm-product-search-load-more'
  ].forEach(selector => {
    document.querySelectorAll(selector).forEach(item => {
      item.removeAttribute('style');
    });
  });
}

export function loadMoreFacetGroups(config: SearchModuleConfig, numberOfFacetGroupsParameter?: number) {
  let i = 0;
  let numberOfHiddenBoxWithVisibleChildren = 0;
  const numberOfFacetGroups = Number(
    numberOfFacetGroupsParameter || config.search?.initial_number_of_facets
  );

  document.querySelectorAll(
    '.blm-dynamic-filter:not([style*="display: block"])'
  ).forEach(item => {
    const visibleChildren = item.querySelectorAll(
      '.blm-product-search-filter-item:not([style*="display: none"]'
    );
    if (i < numberOfFacetGroups && visibleChildren.length > 0) {
      item.setAttribute('style', 'display: block');
    }
    i++;
    numberOfHiddenBoxWithVisibleChildren +=
      visibleChildren.length > 0 ? 1 : 0;
  });

  const currentSearchRequestState = getCurrentSearchRequestState();
  const loadMoreFacetGroupsElement = document.querySelector(
    `.blm-load-more-facet--${currentSearchRequestState.request_id}`
  );
  const numberOfHiddenBoxes = document.querySelectorAll(
    '.blm-dynamic-filter:not([style*="display: block"])'
  ).length;
  if (
    numberOfHiddenBoxes === 0 ||
    numberOfHiddenBoxWithVisibleChildren === 0
  ) {
    loadMoreFacetGroupsElement?.classList.add('blm-hide');
  }
};

export function getLoadMoreFacetGroupsElement(): HTMLElement {
  const currentSearchRequestState = getCurrentSearchRequestState();
  const element = document.querySelector(
    `.blm-load-more-facet--${currentSearchRequestState.request_id}`
  );
  invariant(element, 'the element for loading more facet groups must be in the DOM');

  return element as HTMLElement;
}

export function resetFacetGroups(config: SearchModuleConfig) {
  const numberOfDisplayedFacetGroups = Number(config.search?.initial_number_of_facets);
  const numberOfDisplayedFacetValues = Number(config.search?.initial_number_of_facet_values);

  hideAllDynamicFacetGroups();
  loadMoreFacetGroups(config, numberOfDisplayedFacetGroups - 1);

  // init facet items visibility
  document
    .querySelectorAll(
      `.blm-product-search-filter-item:nth-child(-n+${numberOfDisplayedFacetValues})`
    )
    .forEach(item => ((item as HTMLElement).style.display = 'block'));

  getLoadMoreFacetGroupsElement().removeAttribute('style');
}

export function getSearchResultsContainerElement(config: SearchModuleConfig): HTMLElement {
  invariant(
    config.search?.selector,
    'the selector of search results container element must be set'
  );
  const searchResultsContainerElement = document.querySelector(
    config.search.selector
  );
  return searchResultsContainerElement as HTMLElement;
}

export function getSearchResultsListContainerElement(): HTMLElement {
  const searchResultsListContainerElement = document.querySelector(
    '.blm-product-search-main'
  )?.lastElementChild;
  return searchResultsListContainerElement as HTMLElement;
}

export function getAutosuggestSearchInputElement(config: AutosuggestModuleConfig): HTMLInputElement {
  invariant(
    config.autosuggest?.selector,
    'the selector of search results container element must be set'
  );
  const autosuggestInputElement = document.querySelector(
    config.autosuggest.selector
  );
  return autosuggestInputElement as HTMLInputElement;
}

export function getAutosuggestResultsContainerElement(): HTMLElement {
  const autosuggestResultsContainerElement = document.querySelector(
    '.blm-autosuggest-search-results'
  );
  return autosuggestResultsContainerElement as HTMLElement;
}

export function getAutosuggestSearchFormElement(config: AutosuggestModuleConfig): HTMLFormElement {
  return findUpElementByTagName(getAutosuggestSearchInputElement(config), 'form') as HTMLFormElement;
}

export function resetLoadingIndicator() {
  const scrollIndicator = document.querySelector(
    '.blm-scroll-indicator'
  );
  if (scrollIndicator) {
    scrollIndicator.innerHTML = '';
    const loaderElement = document.createElement('div');
    loaderElement.classList.add('blm-scroll-indicator__loading');
    scrollIndicator.appendChild(loaderElement);
  }
};

export function getCheckedFacetValues() {
  const checkedCheckboxes = document.querySelectorAll(
    '.blm-product-search-filter-item__checkbox:checked'
  );

  return checkedCheckboxes
    ? (
      Array.from(checkedCheckboxes) as HTMLInputElement[]
    ).reduce(
      (
        all: { [key: string]: string[] },
        current: HTMLInputElement
      ) => {
        return {
          ...all,
          [current.name]: all[current.name]
            ? [...(all[current.name] || []), current.value]
            : [current.value]
        };
      },
      {}
    )
    : {};
}

export function restoreScrollPosition(): void {
  // Get saved scroll positions
  const storedScrollPositions = JSON.parse(
    window.localStorage.getItem('scrollPositions') || '{}'
  );

  // Restore it if it's found for current page
  const currentUriEncoded = encodeURI(window.location.href);
  if (currentUriEncoded in storedScrollPositions) {
    const scrollPosition = parseInt(
      storedScrollPositions[currentUriEncoded]?.scrollPosition as string,
      10
    );
    setTimeout(() => {
      document.documentElement.scrollTop = scrollPosition;
      document.body.scrollTop = scrollPosition;
    }, 250);
  }

  delete storedScrollPositions[encodeURI(window.location.href)];
  window.localStorage.setItem(
    'scrollPositions',
    JSON.stringify(storedScrollPositions)
  );
}

export function setupSavingScrollPosition() {
  window.onbeforeunload = function () {
    let scrollPosition;
    if (typeof window.pageYOffset !== 'undefined') {
      scrollPosition = window.pageYOffset;
    } else if (
      typeof document.compatMode !== 'undefined' &&
      document.compatMode !== 'BackCompat'
    ) {
      scrollPosition = document.documentElement.scrollTop;
    } else if (typeof document.body !== 'undefined') {
      scrollPosition = document.body.scrollTop;
    }
    const storedScrollPositions = JSON.parse(
      window.localStorage.getItem('scrollPositions') || '{}'
    );
    window.localStorage.setItem(
      'scrollPositions',
      JSON.stringify({
        ...storedScrollPositions,
        [encodeURI(window.location.href)]: {
          scrollPosition
        }
      })
    );
  };
}

export function injectAutosuggestDynamicStyles(config: AutosuggestModuleConfig): void {
  if (!getAutosuggestResultsContainerElement()) {
    const searchResultsContainerStyles = document.createElement('style');
    searchResultsContainerStyles.innerHTML = `.blm-autosuggest-search-results {
      width: 100%;
      position: absolute;
      z-index: 100;
      left: 0;
      transform: translateY(${getAutosuggestSearchInputElement(config).offsetHeight}px);
    }`;
    document.head.appendChild(searchResultsContainerStyles);
  }
}

export function injectAutosuggestResultsContainer(config: AutosuggestModuleConfig): void {
  if (!getAutosuggestResultsContainerElement()) {
    const searchResultsContainerElement = document.createElement('div');
    searchResultsContainerElement.classList.add(
      'blm-autosuggest-search-results'
    );
    getAutosuggestSearchInputElement(config).parentElement?.appendChild(searchResultsContainerElement);
  }
}
