
import type { RecommendationsModuleConfig } from '.';
import { Widget } from '@bloomreach/discovery-api-client/src/recommendationWidgetsAPI/types';

export interface RecommendationsTemplateDataProduct {
  title: string
  image: string
  link: string
  id: string
  price: number
  sale_price: number
}

export interface RecommendationsTemplateData {
  products: RecommendationsTemplateDataProduct[]
  config: RecommendationsModuleConfig
  widgetMetadata: Widget
}
