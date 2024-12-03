
declare const window: any;

export function addProductQuickviewEventListener() {
  document.addEventListener(
    'brProductQuickview',
    (event: CustomEvent) => {
      event.stopImmediatePropagation();
      const { prod_id, prod_name, sku } = event.detail;
      (window.BrTrk || {})?.getTracker()?.logEvent('product', 'quickview', {
        prod_id,
        prod_name,
        sku,
      });
    }
  );
}
