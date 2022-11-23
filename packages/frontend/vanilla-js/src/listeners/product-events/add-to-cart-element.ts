
declare const window: any;

function buildAddToCartElementClickListener(addToCartElement: HTMLElement) {
  const {
    blmAddToCartSku,
    blmAddToCartProdId
  } = addToCartElement.dataset;
  return () => {
    (window.BrTrk || {})?.getTracker()?.logEvent('cart', 'click-add', {
      prod_id: blmAddToCartProdId,
      sku: blmAddToCartSku
    });
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
