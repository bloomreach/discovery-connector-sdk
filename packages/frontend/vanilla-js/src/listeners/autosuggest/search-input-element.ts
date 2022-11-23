import ejs from 'ejs';
import { debounce } from 'lodash';
import { AUTOSUGGEST_MINIMUM_QUERY_LENGTH } from '../../constants';
import {
  getCurrentAutosuggestRequestState,
  getCurrentAutosuggestUiState,
  suggest,
  updateCurrentAutosuggestRequestState,
  updateCurrentAutosuggestUiState
} from '../../modules/builders/autosuggest';
import {
  getAutosuggestSearchInputElement,
  getAutosuggestResultsContainerElement,
  findUpElementWithClassName
} from '../../utils';
import autosuggestTemplate from '../../templates/autosuggest.ejs';

function buildSearchInputElementBlurListener() {
  return () => {
    if (getCurrentAutosuggestUiState().mouseDownEventHappenedInsideAutosuggestResultsContainer) {
      updateCurrentAutosuggestUiState({ mouseDownEventHappenedInsideAutosuggestResultsContainer: false });
      return false;
    }
    getAutosuggestResultsContainerElement().innerHTML = '';
    return true;
  };
}

function buildGeneralClickListenerForSearchInputBlur() {
  return (event: Event) => {
    const clickHappenedOnInputOrAutosuggestResultsPanel = findUpElementWithClassName(
      event.target as Node,
      'blm-autosuggest'
    );
    if (clickHappenedOnInputOrAutosuggestResultsPanel) {
      updateCurrentAutosuggestUiState({ mouseDownEventHappenedInsideAutosuggestResultsContainer: true });
    } else {
      getAutosuggestResultsContainerElement().innerHTML = '';
    }
  };
}

function buildSearchInputElementFocusListener() {
  return () => {
    const lastTemplateData = getCurrentAutosuggestRequestState().last_template_data;
    getCurrentAutosuggestRequestState();
    if (lastTemplateData) {
      getAutosuggestResultsContainerElement().innerHTML = ejs.render(
        autosuggestTemplate,
        lastTemplateData
      );
    }
  };
}

function buildSearchInputElementKeyupListener() {
  return (event: KeyboardEvent) => {
    const query = (event.target as HTMLInputElement).value;
    const searchInputElement = getAutosuggestSearchInputElement();

    if (query.length >= AUTOSUGGEST_MINIMUM_QUERY_LENGTH) {
      searchInputElement.dataset.originalQuery = query;
      suggest(query).catch(console.error);
    } else {
      getAutosuggestResultsContainerElement().innerHTML = '';
      searchInputElement.dataset.originalQuery = '';
      updateCurrentAutosuggestRequestState({ last_template_data: null });
    }
  };
}

function addSearchInputElementBlurListener() {
  if (!document.body.getAttribute('hasMousedownListener')) {
    document.body.addEventListener('mousedown', buildGeneralClickListenerForSearchInputBlur());
    document.body.setAttribute('hasMousedownListener', 'true');
  }

  const element = getAutosuggestSearchInputElement();
  if (!element.getAttribute('hasBlurListener')) {
    element.addEventListener(
      'blur',
      buildSearchInputElementBlurListener()
    );
    element.setAttribute('hasBlurListener', 'true');
  }
}

function addSearchInputElementFocusListener() {
  const element = getAutosuggestSearchInputElement();
  if (!element.getAttribute('hasFocusListener')) {
    element.addEventListener(
      'focus',
      buildSearchInputElementFocusListener()
    );
    element.setAttribute('hasFocusListener', 'true');
  }
}

function addSearchInputElementKeyupListener() {
  const element = getAutosuggestSearchInputElement();
  if (!element.getAttribute('hasKeyupListener')) {

    element.addEventListener(
      'keyup',
      // @ts-ignore
      debounce(buildSearchInputElementKeyupListener(), 500) as EventListener
    );
    element.setAttribute('hasKeyupListener', 'true');
  }
}

export function addSearchInputElementListeners() {
  addSearchInputElementBlurListener();
  addSearchInputElementFocusListener();
  addSearchInputElementKeyupListener();
}
