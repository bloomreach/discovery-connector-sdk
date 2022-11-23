export interface CurrentAutosuggestUiState {
  mouseDownEventHappenedInsideAutosuggestResultsContainer: boolean;
}

export interface WidgetInDom {
  loaded: boolean;
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  node: Node;
}

export interface CurrentRecommendationsUiState {
  widgets: WidgetInDom[]
}
