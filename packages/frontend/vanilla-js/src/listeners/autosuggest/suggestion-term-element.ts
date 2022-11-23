import { getAutosuggestResultsContainerElement, getAutosuggestSearchInputElement } from '../../utils';

declare const window: any;

function buildSuggestionTermElementClickListener(suggestionTermElement: HTMLElement) {
  return () => {
    const { suggestionText } = suggestionTermElement.dataset;
    const { originalQuery } = getAutosuggestSearchInputElement().dataset;

    const suggestionData = {
      aq: originalQuery,
      q: suggestionText,
      catalogs: [{name: 'example_en'}]
    };

    ;(window.BrTrk || {})
      ?.getTracker()
      ?.logEvent('suggest', 'click', suggestionData, {}, true);
  };
}

export function addSuggestionTermElementClickListener() {
  getAutosuggestResultsContainerElement()
    .querySelectorAll('.blm-autosuggest__suggestion-term-link')
    .forEach((suggestionTermElement: HTMLElement) => {
      if (!suggestionTermElement.getAttribute('hasListener')) {
        suggestionTermElement.addEventListener(
          'click',
          buildSuggestionTermElementClickListener(suggestionTermElement)
        );
        suggestionTermElement.setAttribute('hasListener', 'true');
      }
    });
}
