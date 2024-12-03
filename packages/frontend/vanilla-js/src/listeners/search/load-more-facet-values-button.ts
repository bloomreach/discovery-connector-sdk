import type { SearchModuleConfig } from '../../types';

function buildLoadMoreFacetValuesButtonClickListener(config: SearchModuleConfig) {
  const numberOfDisplayedFacetValues = Number(config.search?.initial_number_of_facet_values);
  let showFilterItems = numberOfDisplayedFacetValues;
  const incrementFilterBy = numberOfDisplayedFacetValues;

  return (event: Event) => {
    const itemIndex = (event.target as HTMLElement).getAttribute('data-item');
    const facetBlock: any = document.getElementById(
      `blm-facet-block-item-${itemIndex}`
    );
    const filterListItems = facetBlock.getElementsByTagName('li');
    // eslint-disable-next-line functional/no-loop-statement
    for (
      let i = showFilterItems;
      i < showFilterItems + incrementFilterBy;
      i++
    ) {
      if (filterListItems[i]) {
        filterListItems[i].style.display = 'block';
      }
    }
    showFilterItems += incrementFilterBy;
    if (showFilterItems >= filterListItems.length) {
      (event.target as HTMLElement).style.display = 'none';
    }
  };
}

export function addLoadMoreFacetValuesButtonClickListener(config: SearchModuleConfig) {
  document
    .querySelectorAll('.blm-product-search-load-more')
    .forEach(item => {
      if (!item.getAttribute('hasListener')) {
        item.addEventListener('click', buildLoadMoreFacetValuesButtonClickListener(config));
        item.setAttribute('hasListener', 'true');
      }
    });
}
