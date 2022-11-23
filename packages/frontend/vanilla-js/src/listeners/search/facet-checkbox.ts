import { PARAMETER_NAME_FACETS, PARAMETER_NAME_PAGE } from '../../constants';
import { initiateSearch } from '../../modules/builders';
import { resetLoadingIndicator, updateMultipleInstanceParametersInUrl, getCheckedFacetValues, buildPriceUrlParameterObject, updateParameterInUrl } from '../../utils';

function buildFacetCheckboxChangeListener() {
  return () => {
    resetLoadingIndicator();

    /*
      If the checkedFacets is
      { colors: ["gray", "black"], reviews: ["4.7", "5.0"] }

      then we're setting these values in the URL in this format:
      &fq=colors%3Agray%2Cblack&fq=reviews%3A4.7%2C5.0

      because it's easier to read it like that when we're performing the search,
      than it would be if we'd store it in the format how we're using them
      in the API call's URL parameter list
    */
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

export function addFacetCheckboxChangeListener() {
  const facetCheckboxes = document.querySelectorAll(
    '.blm-product-search-filter-item__checkbox'
  );
  if (facetCheckboxes) {
    facetCheckboxes.forEach((checkbox) => {
      if (!checkbox.getAttribute('hasListener')) {
        checkbox.addEventListener('change', buildFacetCheckboxChangeListener());
        checkbox.setAttribute('hasListener', 'true');
      }
    });
  }
}
