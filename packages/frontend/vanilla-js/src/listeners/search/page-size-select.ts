import { PARAMETER_NAME_SIZE, PARAMETER_NAME_PAGE } from '../../constants';
import { initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import { updateParameterInUrl, resetLoadingIndicator } from '../../utils';

function buildPageSizeSelectChangeListener() {
  return (event: Event) => {
    updateParameterInUrl(
      PARAMETER_NAME_SIZE,
      (event.target as HTMLSelectElement).value
    );
    updateParameterInUrl(PARAMETER_NAME_PAGE, '1');
    resetLoadingIndicator();
    initiateSearch({ toReplace: true }).catch(console.error);
  };
}

export function addPageSizeSelectChangeListener() {
  const currentSearchRequestState = getCurrentSearchRequestState();

  // Listen to page size select field changes
  const sizeSelector = document.querySelector(
    `#sort-size-${currentSearchRequestState.request_id}`
  );
  if (sizeSelector) {
    if (!sizeSelector.getAttribute('hasListener')) {
      sizeSelector.addEventListener('change', buildPageSizeSelectChangeListener());
      sizeSelector.setAttribute('hasListener', 'true');
    }
  }
}
