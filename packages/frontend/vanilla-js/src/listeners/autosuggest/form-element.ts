import type { AutosuggestModuleConfig } from '../../types';
import { getAutosuggestSearchFormElement, getAutosuggestSearchInputElement } from '../../utils';

export function addFormElementSubmitListener(config: AutosuggestModuleConfig) {
  const element = getAutosuggestSearchFormElement(config);
  if (element && !element.getAttribute('hasListener')) {
    element.addEventListener(
      'submit',
      () => element.dispatchEvent(new CustomEvent('brSuggestSubmit',
        {
          bubbles: true,
          detail: {
            q: getAutosuggestSearchInputElement(config).value,
          }
        }
      ))
    );
    element.setAttribute('hasListener', 'true');
  }
}
