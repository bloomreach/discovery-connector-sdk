import '../styles/recommendations.scss';
import { globalBloomreachModules } from './global-bloomreach-modules';
import { buildRecommendationsModule } from './builders';

declare const window: any;
const recommendationsModule = buildRecommendationsModule();

window.BloomreachModules = {
  ...globalBloomreachModules,
  pathwaysRecommendations: recommendationsModule,
};

// window.recommendationsReady = recommendationsModule.load().catch(console.error);
