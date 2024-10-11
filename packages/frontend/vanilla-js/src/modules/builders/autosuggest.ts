import ejs from 'ejs';
import invariant from 'tiny-invariant';
import type {
  AutosuggestModule,
  CurrentAutosuggestRequestState,
  CurrentAutosuggestUiState,
} from '../../types';

import * as listeners from '../../listeners/autosuggest';
import {
  buildAutosuggestConfig,
  getAutosuggestResultsContainerElement,
  getAutosuggestSearchInputElement,
  injectAutosuggestDynamicStyles,
  injectAutosuggestResultsContainer
} from '../../utils';
import { mapAutosuggestApiResponse } from '../../mappers';
import { generateRequestId, getSuggestions} from '@bloomreach/discovery-api-client';
import type { GetSuggestionsRequest } from '@bloomreach/discovery-api-client';

declare const window: any;

export function buildAutosuggestModule(): AutosuggestModule {
  let currentAutosuggestRequestState: CurrentAutosuggestRequestState = {
    request_id: 0,
    last_template_data: null,
  };
  let currentAutosuggestUiState: CurrentAutosuggestUiState = {
    mouseDownEventHappenedInsideAutosuggestResultsContainer: false,
  };

  return {
    setCurrentAutosuggestRequestState: (requestState) => {
      currentAutosuggestRequestState = requestState;
    },

    getCurrentAutosuggestRequestState: () => currentAutosuggestRequestState,

    setCurrentAutosuggestUiState: (uiState) => {
      currentAutosuggestUiState = uiState;
    },

    getCurrentAutosuggestUiState: () => currentAutosuggestUiState,

    load: async () => {
      if (!areRequirementsMet()) {
        return;
      }

      listeners.addSearchInputElementListeners();
      listeners.addFormElementSubmitListener();

      getAutosuggestSearchInputElement().setAttribute('autocomplete', 'off');
    },
  };
}

export async function suggest(query: string): Promise<void> {
  updateCurrentAutosuggestRequestState({
    request_id: generateRequestId(),
  });

  const apiCallParameters = buildApiCallParameters(query);
  // todo remediate typescript issue
  // @ts-ignore
  const results = await getSuggestions(apiCallParameters);
  const templateData = mapAutosuggestApiResponse(results);
  const config = buildAutosuggestConfig();

  updateCurrentAutosuggestRequestState({ last_template_data: templateData });

  getAutosuggestResultsContainerElement().innerHTML = ejs.render(
    (config.autosuggest?.template || ''),
    templateData
  );

  listeners.addCategoryLinkElementClickListener();
  listeners.addSuggestionTermElementClickListener();
}

function buildApiCallParameters(query: string) {
  const config = buildAutosuggestConfig();
  const urlParameters = new URLSearchParams(window.location.search as string);
  const currentAutosuggestRequestState = getCurrentAutosuggestRequestState();
  const apiParameters: Partial<GetSuggestionsRequest> = {
    ...(config?.autosuggest?.endpoint ? { endpoint: config.autosuggest.endpoint } : {}),
    q: query || urlParameters.get(config?.default_search_parameter || '') || '',
    account_id: config.account_id,
    domain_key: config.domain_key,
    request_id: currentAutosuggestRequestState.request_id,
    _br_uid_2: config.tracking_cookie,
    ref_url: config.ref_url,
    url: config.url,
    request_type: config.request_type,
    catalog_views: config.autosuggest?.catalog_views
  };

  // add URL parameters
  // eslint-disable-next-line functional/no-loop-statement
  for (const [key, value] of urlParameters.entries()) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    if (!Object.keys(apiParameters).includes(key as string)) {
      apiParameters[key] = value;
    }
  }

  return apiParameters;
}

export function getCurrentAutosuggestRequestState() {
  return (window.BloomreachModules.autosuggest as AutosuggestModule).getCurrentAutosuggestRequestState();
}

export function updateCurrentAutosuggestRequestState(state: Partial<CurrentAutosuggestRequestState>) {
  (window.BloomreachModules.autosuggest as AutosuggestModule).setCurrentAutosuggestRequestState({
    ...getCurrentAutosuggestRequestState(),
    ...state,
  });
}

export function getCurrentAutosuggestUiState() {
  return (window.BloomreachModules.autosuggest as AutosuggestModule).getCurrentAutosuggestUiState();
}

export function updateCurrentAutosuggestUiState(state: Partial<CurrentAutosuggestUiState>) {
  (window.BloomreachModules.autosuggest as AutosuggestModule).setCurrentAutosuggestUiState({
    ...getCurrentAutosuggestUiState(),
    ...state,
  });
}

function areRequirementsMet() {
  const config = buildAutosuggestConfig();

  try {
    invariant(config.account_id, 'account_id must be set');
    invariant(config.domain_key, 'domain_key must be set');

    // these check if the elements are in the DOM
    if (!getAutosuggestSearchInputElement()) {
      throw Error('Search input element not found');
    }
    injectAutosuggestDynamicStyles();
    injectAutosuggestResultsContainer();

    if (!getAutosuggestResultsContainerElement()) {
      throw Error('Autosuggest results container element cannot be created');
    }
  } catch (e) {
    console.error(e);
    return false;
  }

  return config?.autosuggest?.enabled;
}
