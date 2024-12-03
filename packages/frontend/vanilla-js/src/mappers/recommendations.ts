import type { RecommendationWidgetsResponseV2 } from '@bloomreach/discovery-api-client/src/recommendationWidgetsAPI';
import type { RecommendationsModuleConfig, RecommendationsTemplateData } from '../types';

export function mapRecommendationsApiResponse(
  responseData: RecommendationWidgetsResponseV2,
  config: RecommendationsModuleConfig
): RecommendationsTemplateData {

  return {
    config,
    products: [
      ...(responseData.response.docs
        ? responseData.response.docs.map((product) => ({
          ...product,
          id: product.pid,
          image: product.thumb_image,
          title: product.title,
          link: product.url,
          sale_price: product.sale_price,
          price: product.price
        }))
        : [])
    ],
    widgetMetadata: responseData.metadata.widget
  };
}
