declare const window: any;

export function addWidgetClickEventListener() {
  document.addEventListener('brWidgetClick', (event: CustomEvent) => {
    event.stopImmediatePropagation();
    const { wrid, wid, wty, item_id, wq } = event.detail;
    const eventData = {
      wrid,
      wid,
      wty,
      item_id,
      ...(wq ? { wq } : {}),
    };

    (window.BrTrk || {})?.getTracker()?.logEvent(
      'widget',
      'widget-click',
      eventData
    );
  });
}
