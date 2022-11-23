import { getLoadMoreFacetGroupsElement, loadMoreFacetGroups } from '../../utils';

function buildLoadMoreFacetGroupsButtonClickListener() {
  return () => {
    loadMoreFacetGroups();
  };
}

export function addLoadMoreFacetGroupsButtonClickListener() {
  const element = getLoadMoreFacetGroupsElement();
  if (element && !element.getAttribute('hasListener')) {
    element.addEventListener('click', buildLoadMoreFacetGroupsButtonClickListener());
    element.setAttribute('hasListener', 'true');
  }
}
