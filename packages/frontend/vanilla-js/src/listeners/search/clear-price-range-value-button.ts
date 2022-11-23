import { PARAMETER_NAME_FACETS, PARAMETER_NAME_PAGE } from '../../constants';
import { updateCurrentSearchRequestState, initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import { updateMultipleInstanceParametersInUrl, getCheckedFacetValues, updateParameterInUrl, resetLoadingIndicator } from '../../utils';

function buildClearPriceRangeValueButtonClickListener() {
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
    initiateSearch({ toReplace: true }).catch(console.error);
  };
}

export function addClearPriceRangeValueButtonClickListener() {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const priceRangeValueClearButton = document.querySelector(
    `.blm-range-slider__clear-values-button--${currentSearchRequestState.request_id}`
  );
  if (priceRangeValueClearButton) {
    if (!priceRangeValueClearButton.getAttribute('hasListener')) {
      priceRangeValueClearButton.addEventListener('click', buildClearPriceRangeValueButtonClickListener());
      priceRangeValueClearButton.setAttribute('hasListener', 'true');
    }
  }
}
