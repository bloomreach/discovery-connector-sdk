import { PARAMETER_NAME_PAGE } from '../../constants';
import { initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import type { SearchModuleConfig } from '../../types';
import { decrementParameterInUrl, incrementParameterInUrl, resetLoadingIndicator, updateParameterInUrl } from '../../utils';

function buildPaginationContainerClickListener(config: SearchModuleConfig) {
  return (event: Event) => {
    resetLoadingIndicator();
    const clickedPaginationValue = (event.target as HTMLButtonElement)
      .dataset.value;

    if (clickedPaginationValue) {
      switch ((event.target as HTMLButtonElement).dataset.value) {
        case 'previous':
          decrementParameterInUrl(PARAMETER_NAME_PAGE);
          break;
        case 'next':
          incrementParameterInUrl(PARAMETER_NAME_PAGE);
          break;
        default:
          updateParameterInUrl(
            PARAMETER_NAME_PAGE,
            clickedPaginationValue
          );
      }
      initiateSearch(config, { toReplace: true }).catch(console.error);
    }
  };
}

export function addPaginationContainerClickListener(config: SearchModuleConfig) {
  const currentSearchRequestState = getCurrentSearchRequestState();

  // Listen to pagination events
  const paginationContainer = document.querySelector(
    `.blm-product-search-pagination__pages--${currentSearchRequestState.request_id}`
  );
  if (paginationContainer) {
    if (!paginationContainer.getAttribute('hasListener')) {
      paginationContainer.addEventListener('click', buildPaginationContainerClickListener(config));
      paginationContainer.setAttribute('hasListener', 'true');
    }
  }
}
