import { PARAMETER_NAME_SORT } from '../../constants';
import { initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import { updateParameterInUrl, resetLoadingIndicator } from '../../utils';

function buildSortSelectChangeListener() {
  return (event: Event) => {
    updateParameterInUrl(
      PARAMETER_NAME_SORT,
      (event?.target as HTMLSelectElement)?.value
    );
    resetLoadingIndicator();
    initiateSearch({ toReplace: true }).catch(console.error);
  };
}

export function addSortSelectChangeListener() {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const sortSelector = document.querySelector(
    `#sort-by-${currentSearchRequestState.request_id}`
  );

  if (sortSelector) {
    if (!sortSelector.getAttribute('hasListener')) {
      sortSelector.addEventListener('change', buildSortSelectChangeListener());
      sortSelector.setAttribute('hasListener', 'true');
    }
  }
}
