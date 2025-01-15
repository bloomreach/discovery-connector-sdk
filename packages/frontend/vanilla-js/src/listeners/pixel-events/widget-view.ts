declare const window: any;

export function addWidgetViewEventListener() {
  document.addEventListener('brWidgetView', (event: CustomEvent) => {
    event.stopImmediatePropagation();
    const { wrid, wid, wty, wq } = event.detail;
    const eventData = {
      wrid,
      wid,
      wty,
      ...(wq ? { wq } : {}),
    };

    (window.BrTrk || {})?.getTracker()?.logEvent(
      'widget',
      'widget-view',
      eventData
    );
  });
}
