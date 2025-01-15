
function buildAddToCartElementClickListener(addToCartElement: HTMLElement) {
  const {
    blmAddToCartSku,
    blmAddToCartProdId
  } = addToCartElement.dataset;
  return () => {
    addToCartElement.dispatchEvent(new CustomEvent('brCartClickAdd', {
      bubbles: true,
      detail: {
        prod_id: blmAddToCartProdId,
        sku: blmAddToCartSku,
      }
    }));
  };
}

export function addAddToCartElementClickListener() {
  document
    .querySelectorAll('[data-blm-add-to-cart]')
    .forEach((addToCartElement: HTMLElement) => {
      if (!addToCartElement.getAttribute('hasListener')) {
        addToCartElement.addEventListener(
          'click',
          buildAddToCartElementClickListener(addToCartElement)
        );
        addToCartElement.setAttribute('hasListener', 'true');
      }
    });
}
