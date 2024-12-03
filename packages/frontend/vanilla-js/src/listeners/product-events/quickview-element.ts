
function buildQuickviewElementClickListener(quickviewElement: HTMLElement) {
  const {
    blmQuickviewSku,
    blmQuickviewProdId,
    blmQuickviewProdName
  } = quickviewElement.dataset;

  return () => {
    quickviewElement.dispatchEvent(new CustomEvent('brProductQuickview', {
      bubbles: true,
      detail: {
        prod_id: blmQuickviewProdId,
        prod_name: blmQuickviewProdName,
        sku: blmQuickviewSku,
      }
    }));
  };
}

export function addQuickviewElementClickListener() {
  document
    .querySelectorAll('[data-blm-quickview]')
    .forEach((quickviewElement: HTMLElement) => {
      if (!quickviewElement.getAttribute('hasListener')) {
        quickviewElement.addEventListener(
          'click',
          buildQuickviewElementClickListener(quickviewElement)
        );
        quickviewElement.setAttribute('hasListener', 'true');
      }
    });
}
