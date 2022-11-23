import type { CurrentAutosuggestRequestState, CurrentAutosuggestUiState } from '.';

export interface AutosuggestModule {
  load: () => Promise<void>,
  setCurrentAutosuggestRequestState: (state: CurrentAutosuggestRequestState) => void
  getCurrentAutosuggestRequestState: () => CurrentAutosuggestRequestState,
  setCurrentAutosuggestUiState: (state: CurrentAutosuggestUiState) => void
  getCurrentAutosuggestUiState: () => CurrentAutosuggestUiState,
}
