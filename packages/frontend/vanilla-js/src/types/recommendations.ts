import type { CurrentRecommendationsRequestState, CurrentRecommendationsUiState } from '.';

export interface RecommendationsModule {
  load: () => Promise<void>,
  setCurrentRecommendationsRequestState: (state: CurrentRecommendationsRequestState) => void
  getCurrentRecommendationsRequestState: () => CurrentRecommendationsRequestState,
  setCurrentRecommendationsUiState: (state: CurrentRecommendationsUiState) => void
  getCurrentRecommendationsUiState: () => CurrentRecommendationsUiState,
}
