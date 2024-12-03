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
import type { AutosuggestModuleConfig } from '../../types';

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

function buildSearchInputElementKeyupListener(searchInputElement: HTMLElement, config: AutosuggestModuleConfig) {
  return (event: KeyboardEvent) => {
    const query = (event.target as HTMLInputElement).value;

    if (query.length >= AUTOSUGGEST_MINIMUM_QUERY_LENGTH) {
      searchInputElement.dataset.originalQuery = query;
      suggest(query, config).catch(console.error);
    } else {
      getAutosuggestResultsContainerElement().innerHTML = '';
      searchInputElement.dataset.originalQuery = '';
      updateCurrentAutosuggestRequestState({ last_template_data: null });
    }
  };
}

function addSearchInputElementBlurListener(element: HTMLElement) {
  if (!document.body.getAttribute('hasMousedownListener')) {
    document.body.addEventListener('mousedown', buildGeneralClickListenerForSearchInputBlur());
    document.body.setAttribute('hasMousedownListener', 'true');
  }

  if (!element.getAttribute('hasBlurListener')) {
    element.addEventListener(
      'blur',
      buildSearchInputElementBlurListener()
    );
    element.setAttribute('hasBlurListener', 'true');
  }
}

function addSearchInputElementFocusListener(element: HTMLElement) {
  if (!element.getAttribute('hasFocusListener')) {
    element.addEventListener(
      'focus',
      buildSearchInputElementFocusListener()
    );
    element.setAttribute('hasFocusListener', 'true');
  }
}

function addSearchInputElementKeyupListener(element: HTMLElement, config: AutosuggestModuleConfig) {
  if (!element.getAttribute('hasKeyupListener')) {

    element.addEventListener(
      'keyup',
      // @ts-ignore
      debounce(buildSearchInputElementKeyupListener(element, config), 500) as EventListener
    );
    element.setAttribute('hasKeyupListener', 'true');
  }
}

export function addSearchInputElementListeners(config: AutosuggestModuleConfig) {
  const element = getAutosuggestSearchInputElement(config);
  addSearchInputElementBlurListener(element);
  addSearchInputElementFocusListener(element);
  addSearchInputElementKeyupListener(element, config);
}
