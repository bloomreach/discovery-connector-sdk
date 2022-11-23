import { RecommendationWidgetsResponseV2 } from '@bloomreach/discovery-api-client/src/recommendationWidgetsAPI';
import type { RecommendationsTemplateData } from '../types';
import { buildRecommendationsConfig } from '../utils';

export function mapRecommendationsApiResponse(
  responseData: RecommendationWidgetsResponseV2
): RecommendationsTemplateData {

  const config = buildRecommendationsConfig();
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
