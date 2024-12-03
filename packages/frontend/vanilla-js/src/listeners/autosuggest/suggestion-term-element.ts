import type { AutosuggestModuleConfig } from '../../types';
import { getAutosuggestResultsContainerElement, getAutosuggestSearchInputElement } from '../../utils';

export function addSuggestionTermElementClickListener(config: AutosuggestModuleConfig) {
  getAutosuggestResultsContainerElement()
    .querySelectorAll('.blm-autosuggest__suggestion-term-link')
    .forEach((suggestionTermElement: HTMLElement) => {
      if (!suggestionTermElement.getAttribute('hasListener')) {
        const { suggestionText } = suggestionTermElement.dataset;
        const { originalQuery } = getAutosuggestSearchInputElement(config).dataset;
        suggestionTermElement.addEventListener('click', () => suggestionTermElement.dispatchEvent(
          new CustomEvent('brSuggestClick',
            {
              bubbles: true,
              detail: {
                aq: originalQuery,
                q: suggestionText,
              }
            }
          ))
        );
        suggestionTermElement.setAttribute('hasListener', 'true');
      }
    });
}
