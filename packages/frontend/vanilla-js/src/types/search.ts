import type { CurrentSearchRequestState } from '.';

export interface ProductSearchModule {
  load: (queryToLoad?: string) => Promise<void>,
  setCurrentSearchRequestState: (state: CurrentSearchRequestState) => void
  getCurrentSearchRequestState: () => CurrentSearchRequestState,
}
