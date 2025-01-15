import { PARAMETER_NAME_SORT } from '../../constants';
import { initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import type { SearchModuleConfig } from '../../types';
import { updateParameterInUrl, resetLoadingIndicator } from '../../utils';

function buildSortSelectChangeListener(config: SearchModuleConfig) {
  return (event: Event) => {
    updateParameterInUrl(
      PARAMETER_NAME_SORT,
      (event?.target as HTMLSelectElement)?.value
    );
    resetLoadingIndicator();
    initiateSearch(config, { toReplace: true }).catch(console.error);
  };
}

export function addSortSelectChangeListener(config: SearchModuleConfig) {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const sortSelector = document.querySelector(
    `#sort-by-${currentSearchRequestState.request_id}`
  );

  if (sortSelector) {
    if (!sortSelector.getAttribute('hasListener')) {
      sortSelector.addEventListener('change', buildSortSelectChangeListener(config));
      sortSelector.setAttribute('hasListener', 'true');
    }
  }
}
