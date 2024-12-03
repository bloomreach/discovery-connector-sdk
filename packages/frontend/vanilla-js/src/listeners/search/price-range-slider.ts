import { PARAMETER_NAME_FACETS, PARAMETER_NAME_PAGE } from '../../constants';
import { initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import type { SearchModuleConfig } from '../../types';
import { resetLoadingIndicator, updateMultipleInstanceParametersInUrl, getCheckedFacetValues, buildPriceUrlParameterObject, updateParameterInUrl } from '../../utils';

function buildPriceRangeChangeListener(config: SearchModuleConfig) {
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
    initiateSearch(config, { toReplace: true }).catch(console.error);
  };
}

function buildPriceRangeInputListener(querySelector: string, config: SearchModuleConfig) {
  return (event: Event) => {
    const sliderValue = document.querySelector(querySelector);
    if (sliderValue) {
      sliderValue.innerHTML = config.format_money?.((Number((event.target as HTMLInputElement).value) * 100)) ?? (event.target as HTMLInputElement).value;
    }
  };
}

export function addPriceRangeChangeListeners(config: SearchModuleConfig) {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const priceRangeLowerBoundaryInput = document.querySelector(
    `.blm-price-range-input--lower-${currentSearchRequestState.request_id}`
  );
  const priceRangeUpperBoundaryInput = document.querySelector(
    `.blm-price-range-input--upper-${currentSearchRequestState.request_id}`
  );

  if (priceRangeLowerBoundaryInput && priceRangeUpperBoundaryInput) {
    if (!priceRangeLowerBoundaryInput.getAttribute('hasListener')) {
      priceRangeLowerBoundaryInput.addEventListener('change', buildPriceRangeChangeListener(config));
      priceRangeLowerBoundaryInput.addEventListener('input', buildPriceRangeInputListener('.blm-range-slider__values--min', config));
      priceRangeLowerBoundaryInput.setAttribute('hasListener', 'true');
    }
    if (!priceRangeUpperBoundaryInput.getAttribute('hasListener')) {
      priceRangeUpperBoundaryInput.addEventListener('change', buildPriceRangeChangeListener(config));
      priceRangeUpperBoundaryInput.addEventListener('input', buildPriceRangeInputListener('.blm-range-slider__values--max', config));
      priceRangeUpperBoundaryInput.setAttribute('hasListener', 'true');
    }
  }
}
