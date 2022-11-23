function buildClearSelectedFacetButtonClickListener() {
  return (event: Event) => {
    const checkboxId = (
      (event?.target as HTMLElement)?.parentNode as HTMLElement
    )?.dataset?.filterCheckboxId;

    if (checkboxId) {
      document.getElementById(checkboxId)?.click();
    };
  };
}

export function addClearSelectedFacetButtonClickListener() {
  const clearSelectedFacetButtons = document.querySelectorAll(
    '.blm-product-search-selected-filter__clear'
  );
  clearSelectedFacetButtons.forEach((button) => {
    if (!button.getAttribute('hasListener')) {
      button.addEventListener(
        'click',
        buildClearSelectedFacetButtonClickListener()
      );
      button.setAttribute('hasListener', 'true');
    }
  });
};
