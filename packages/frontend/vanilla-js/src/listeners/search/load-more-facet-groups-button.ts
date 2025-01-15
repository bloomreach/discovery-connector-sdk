import type { SearchModuleConfig } from '../../types';
import { getLoadMoreFacetGroupsElement, loadMoreFacetGroups } from '../../utils';

function buildLoadMoreFacetGroupsButtonClickListener(config: SearchModuleConfig) {
  return () => {
    loadMoreFacetGroups(config);
  };
}

export function addLoadMoreFacetGroupsButtonClickListener(config: SearchModuleConfig) {
  const element = getLoadMoreFacetGroupsElement();
  if (element && !element.getAttribute('hasListener')) {
    element.addEventListener('click', buildLoadMoreFacetGroupsButtonClickListener(config));
    element.setAttribute('hasListener', 'true');
  }
}
