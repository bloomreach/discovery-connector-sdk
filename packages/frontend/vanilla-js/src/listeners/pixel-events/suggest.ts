declare const window: any;

export function addSuggestClickEventListener() {
  document.addEventListener('brSuggestClick', (event: CustomEvent) => {
    event.stopImmediatePropagation();
    const { aq, q } = event.detail;

    const suggestionData = {
      aq,
      q,
    };

    (window.BrTrk || {})
      ?.getTracker()
      ?.logEvent('suggest', 'click', suggestionData, {}, true);
  });
}
