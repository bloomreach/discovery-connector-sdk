import { PARAMETER_NAME_PAGE } from '../../constants';
import { updateCurrentAutosuggestRequestState } from '../../modules/builders';
import {
  getAutosuggestResultsContainerElement,
  getAutosuggestSearchInputElement,
  updateParameterInUrl
} from '../../utils';

declare const window: any;

function buildCategoryLinkElementClickListener() {
  return (event: Event) => {
    event.preventDefault();
    const clickedElement = event.target as HTMLAnchorElement;
    const categoryId = clickedElement.dataset?.categoryId || '';

    if (window.BloomreachModules && window.BloomreachModules.search) {
      updateParameterInUrl(PARAMETER_NAME_PAGE, '1');
      window.BloomreachModules.search.load(categoryId).then(() => {
        getAutosuggestSearchInputElement().value = clickedElement?.textContent || '';
        getAutosuggestResultsContainerElement().innerHTML = '';
        updateCurrentAutosuggestRequestState({ last_template_data: null });

        return true;
      }).catch(console.error);
    }
  };
}

export function addCategoryLinkElementClickListener() {
  getAutosuggestResultsContainerElement()
    .querySelectorAll('.blm-autosuggest__suggestion-term-link--category')
    .forEach((categoryLinkElement) => {
      if (!categoryLinkElement.getAttribute('hasListener')) {
        categoryLinkElement.addEventListener('click', buildCategoryLinkElementClickListener());
        categoryLinkElement.setAttribute('hasListener', 'true');
      }
    });
}
