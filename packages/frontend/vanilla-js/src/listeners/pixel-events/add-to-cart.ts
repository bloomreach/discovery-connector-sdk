
declare const window: any;

export function addCartClickAddEventListener() {
  document.addEventListener(
    'brCartClickAdd',
    (event: CustomEvent) => {
      event.stopImmediatePropagation();
      const { prod_id, sku } = event.detail;
      (window.BrTrk || {})?.getTracker()?.logEvent('cart', 'click-add', {
        prod_id,
        sku,
      });
    }
  );
}

export function addCartWidgetAddEventListener() {
  document.addEventListener('brCartWidgetAdd', (event: CustomEvent) => {
    event.stopImmediatePropagation();
    const { wrid, wid, wty, item_id, wq, sku } = event.detail;
    const eventData = {
      wrid,
      wid,
      wty,
      item_id,
      sku,
      ...(wq ? { wq } : {}),
    };

    (window.BrTrk || {})?.getTracker()?.logEvent(
      'cart',
      'widget-add',
      eventData
    );
  });
}

