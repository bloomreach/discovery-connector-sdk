import { PARAMETER_NAME_FACETS, PARAMETER_NAME_PAGE } from '../../constants';
import { updateCurrentSearchRequestState, initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import type { SearchModuleConfig } from '../../types';
import { updateMultipleInstanceParametersInUrl, getCheckedFacetValues, updateParameterInUrl, resetLoadingIndicator } from '../../utils';

function buildClearPriceRangeValueButtonClickListener(config: SearchModuleConfig) {
  return () => {
    resetLoadingIndicator();
    updateMultipleInstanceParametersInUrl(
      PARAMETER_NAME_FACETS,
      {
        ...getCheckedFacetValues()
      }
    );
    updateParameterInUrl(PARAMETER_NAME_PAGE, '1');
    updateCurrentSearchRequestState({
      price_range_max_value: 0,
      price_range_min_value: 0
    });
    initiateSearch(config, { toReplace: true }).catch(console.error);
  };
}

export function addClearPriceRangeValueButtonClickListener(config: SearchModuleConfig) {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const priceRangeValueClearButton = document.querySelector(
    `.blm-range-slider__clear-values-button--${currentSearchRequestState.request_id}`
  );
  if (priceRangeValueClearButton) {
    if (!priceRangeValueClearButton.getAttribute('hasListener')) {
      priceRangeValueClearButton.addEventListener('click', buildClearPriceRangeValueButtonClickListener(config));
      priceRangeValueClearButton.setAttribute('hasListener', 'true');
    }
  }
}
