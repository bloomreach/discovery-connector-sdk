import { PARAMETER_NAME_GROUPBY } from '../../constants';
import { initiateSearch, getCurrentSearchRequestState } from '../../modules/builders';
import type { SearchModuleConfig } from '../../types';
import { updateParameterInUrl, resetLoadingIndicator } from '../../utils';

function buildGroupbySelectChangeListener(config: SearchModuleConfig) {
  return (event: Event) => {
    updateParameterInUrl(
      PARAMETER_NAME_GROUPBY,
      (event?.target as HTMLSelectElement)?.value
    );
    resetLoadingIndicator();
    initiateSearch(config, { toReplace: true }).catch(console.error);
  };
}

export function addGroupbySelectChangeListener(config: SearchModuleConfig) {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const groupbySelector = document.querySelector(
    `#groupby-${currentSearchRequestState.request_id}`
  );

  if (groupbySelector) {
    if (!groupbySelector.getAttribute('hasListener')) {
      groupbySelector.addEventListener('change', buildGroupbySelectChangeListener(config));
      groupbySelector.setAttribute('hasListener', 'true');
    }
  }
}
