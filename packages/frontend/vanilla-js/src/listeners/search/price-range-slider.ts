import { PARAMETER_NAME_FACETS, PARAMETER_NAME_PAGE } from '../../constants';
import { initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import { resetLoadingIndicator, updateMultipleInstanceParametersInUrl, getCheckedFacetValues, buildPriceUrlParameterObject, updateParameterInUrl, buildSearchConfig } from '../../utils';

function buildPriceRangeChangeListener() {
  return () => {
    resetLoadingIndicator();

    updateMultipleInstanceParametersInUrl(
      PARAMETER_NAME_FACETS,
      {
        ...getCheckedFacetValues(),
        ...buildPriceUrlParameterObject()
      }
    );
    updateParameterInUrl(PARAMETER_NAME_PAGE, '1');
    initiateSearch({ toReplace: true }).catch(console.error);
  };
}

function buildPriceRangeInputListener(querySelector: string) {
  const config = buildSearchConfig();
  return (event: Event) => {
    const sliderValue = document.querySelector(querySelector);
    if (sliderValue) {
      sliderValue.innerHTML = config.format_money?.((Number((event.target as HTMLInputElement).value) * 100)) ?? (event.target as HTMLInputElement).value;
    }
  };
}

export function addPriceRangeChangeListeners() {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const priceRangeLowerBoundaryInput = document.querySelector(
    `.blm-price-range-input--lower-${currentSearchRequestState.request_id}`
  );
  const priceRangeUpperBoundaryInput = document.querySelector(
    `.blm-price-range-input--upper-${currentSearchRequestState.request_id}`
  );

  if (priceRangeLowerBoundaryInput && priceRangeUpperBoundaryInput) {
    if (!priceRangeLowerBoundaryInput.getAttribute('hasListener')) {
      priceRangeLowerBoundaryInput.addEventListener('change', buildPriceRangeChangeListener());
      priceRangeLowerBoundaryInput.addEventListener('input', buildPriceRangeInputListener('.blm-range-slider__values--min'));
      priceRangeLowerBoundaryInput.setAttribute('hasListener', 'true');
    }
    if (!priceRangeUpperBoundaryInput.getAttribute('hasListener')) {
      priceRangeUpperBoundaryInput.addEventListener('change', buildPriceRangeChangeListener());
      priceRangeUpperBoundaryInput.addEventListener('input', buildPriceRangeInputListener('.blm-range-slider__values--max'));
      priceRangeUpperBoundaryInput.setAttribute('hasListener', 'true');
    }
  }
}
