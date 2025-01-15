declare const window: any;

export function addSearchSubmitEventListener() {
  document.addEventListener('brSuggestSubmit', (event: CustomEvent) => {
    event.stopImmediatePropagation();
    const searchData = {
      q: event.detail.q,
    };

    (window.BrTrk || {})
      ?.getTracker()
      ?.logEvent('suggest', 'submit', searchData, {}, true);
  });
}
