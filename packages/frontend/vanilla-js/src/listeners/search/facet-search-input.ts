import { debounce } from 'lodash';
import { getLoadMoreFacetGroupsElement, resetFacetGroups } from '../../utils';
import type { SearchModuleConfig } from '../../types';

function buildFacetSearchInputChangeListener(config: SearchModuleConfig) {
  return (event: Event) => {
    const inputValue = (
      (event?.target as HTMLInputElement)?.value || ''
      ).trim();

    document.querySelectorAll(
      '.blm-dynamic-filter'
    ).forEach(facetBox => {
      let displayedItems = 0;

      facetBox.querySelectorAll(
        '.blm-product-search-filter-item'
      ).forEach(facetItem => {
        const label = facetItem.querySelector('label')?.textContent || '';
        const shouldDisplay =
          !inputValue ||
          label.toLowerCase().includes(inputValue.toLowerCase());
        const displayStyle = shouldDisplay ? 'block' : 'none';
        displayedItems += shouldDisplay ? 1 : 0;
        (facetItem as HTMLElement).style.display = displayStyle;
      });

      (facetBox as HTMLElement).style.display = displayedItems
        ? 'block'
        : 'none';
    });

    document.querySelectorAll(
      '.blm-product-search-load-more'
    ).forEach(loadMoreLink => {
      (loadMoreLink as HTMLElement).style.display = 'none';
    });

    getLoadMoreFacetGroupsElement().style.display = 'none';

    if (!inputValue) {
      resetFacetGroups(config);
    }
  };
}

export function addFacetSearchInputChangeListener(config: SearchModuleConfig) {
  const facetSearchInput = document.querySelector(
    '#blm-product-search-search-filters__input'
    );
  if (facetSearchInput) {
    if (!facetSearchInput.getAttribute('hasInputListener')) {
      facetSearchInput.addEventListener(
        'input',
        // @ts-ignore
        debounce(buildFacetSearchInputChangeListener(config), 500) as EventListener
      );
      facetSearchInput.setAttribute('hasInputListener', 'true');
    }
  }
}
