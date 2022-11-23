import { PARAMETER_NAME_GROUPBY } from '../../constants';
import { initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import { updateParameterInUrl, resetLoadingIndicator } from '../../utils';

function buildGroupbySelectChangeListener() {
  return (event: Event) => {
    updateParameterInUrl(
      PARAMETER_NAME_GROUPBY,
      (event?.target as HTMLSelectElement)?.value
    );
    resetLoadingIndicator();
    initiateSearch({ toReplace: true }).catch(console.error);
  };
}

export function addGroupbySelectChangeListener() {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const groupbySelector = document.querySelector(
    `#groupby-${currentSearchRequestState.request_id}`
  );

  if (groupbySelector) {
    if (!groupbySelector.getAttribute('hasListener')) {
      groupbySelector.addEventListener('change', buildGroupbySelectChangeListener());
      groupbySelector.setAttribute('hasListener', 'true');
    }
  }
}
