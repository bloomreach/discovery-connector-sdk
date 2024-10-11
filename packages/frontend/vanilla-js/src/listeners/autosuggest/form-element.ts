import { findUpElementByTagName, getAutosuggestSearchInputElement } from '../../utils';

declare const window: any;

function buildFormElementSubmitListener() {
  return () => {
    const searchData = {
      q: getAutosuggestSearchInputElement().value,
      catalogs: [{name: 'example_en'}]
    };

    (window.BrTrk || {})
      ?.getTracker()
      ?.logEvent('suggest', 'submit', searchData, {}, true);
  };
}

export function addFormElementSubmitListener() {
  const element = (findUpElementByTagName(
    getAutosuggestSearchInputElement(),
    'form'
  ) as HTMLFormElement);
  if (element && !element.getAttribute('hasListener')) {
    element.addEventListener(
      'submit',
      buildFormElementSubmitListener()
    );
    element.setAttribute('hasListener', 'true');
  }
}
