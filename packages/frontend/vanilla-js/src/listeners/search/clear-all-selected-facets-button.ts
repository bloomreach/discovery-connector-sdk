import { PARAMETER_NAME_FACETS, PARAMETER_NAME_PAGE } from '../../constants';
import { initiateSearch, updateCurrentSearchRequestState } from '../../modules/builders';
import { buildPriceUrlParameterObject, resetLoadingIndicator, updateMultipleInstanceParametersInUrl, updateParameterInUrl } from '../../utils';

function buildClearAllSelectedFacetsButtonClickListener() {
  return () => {
    resetLoadingIndicator();
    updateMultipleInstanceParametersInUrl(
      PARAMETER_NAME_FACETS,
      { ...buildPriceUrlParameterObject() }
    );
    updateParameterInUrl(PARAMETER_NAME_PAGE, '1');
    // reset price range
    updateCurrentSearchRequestState({
      price_range_min_value: 0,
      price_range_max_value: 0,
    });
    initiateSearch({ toReplace: true }).catch(console.error);
  };
}

export function addClearAllSelectedFacetsButtonClickListener() {
  const selectedFiltersClearAllButton = document.querySelector(
    '.blm-product-search-selected-filters__clear-all'
  );
  if (selectedFiltersClearAllButton) {
    if (!selectedFiltersClearAllButton.getAttribute('hasListener')) {
      selectedFiltersClearAllButton.addEventListener('click', buildClearAllSelectedFacetsButtonClickListener());
      selectedFiltersClearAllButton.setAttribute('hasListener', 'true');
    }
  }
}
