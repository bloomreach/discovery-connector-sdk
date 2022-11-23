import type {
  GetCategoryWidgetRequest,
  GetGlobalWidgetRequest,
  GetItemWidgetRequest,
  GetKeywordWidgetRequest,
  GetPersonalizedWidgetRequest,
  RecommendationWidgetsResponseV2,
} from './types';
import { getRequest } from '../utils/getRequest';
import { requestOptions } from '../utils/requestOptions';
import { buildRecommendationWidgetsRequestUrl } from '../utils';

/**
 * Get category widget API
 * @returns {Promise<RecommendationWidgetsResponse>}
 */
async function getCategoryWidget(params:GetCategoryWidgetRequest):Promise<RecommendationWidgetsResponseV2> {
  const url = buildRecommendationWidgetsRequestUrl({ ...params, type: 'category' });
  const options = requestOptions;

  return getRequest(url, options);
};

/**
 * Get keyword widget API
 * @returns {Promise<RecommendationWidgetsResponse>}
 */
async function getKeywordWidget(params:GetKeywordWidgetRequest):Promise<RecommendationWidgetsResponseV2> {
  const url = buildRecommendationWidgetsRequestUrl({ ...params, type: 'keyword' });
  const options = requestOptions;

  return getRequest(url, options);
};

/**
 * Get global widget API
 * @returns {Promise<RecommendationWidgetsResponse>}
 */
async function getGlobalWidget(params:GetGlobalWidgetRequest):Promise<RecommendationWidgetsResponseV2> {
  const url = buildRecommendationWidgetsRequestUrl({ ...params, type: 'global' });
  const options = requestOptions;

  return getRequest(url, options);
};

/**
 * Get personalized widget API
 * @returns {Promise<RecommendationWidgetsResponse>}
 */
async function getPersonalizedWidget(params:GetPersonalizedWidgetRequest):Promise<RecommendationWidgetsResponseV2> {
  const url = buildRecommendationWidgetsRequestUrl({ ...params, type: 'personalized' });
  const options = requestOptions;

  return getRequest(url, options);
};

/**
 * Get item widget API
 * @returns {Promise<RecommendationWidgetsResponse>}
 */
async function getItemWidget(params:GetItemWidgetRequest):Promise<RecommendationWidgetsResponseV2> {
  const url = buildRecommendationWidgetsRequestUrl({ ...params, type: 'item' });
  const options = requestOptions;

  return getRequest(url, options);
};

export {
  getCategoryWidget,
  getKeywordWidget,
  getGlobalWidget,
  getPersonalizedWidget,
  getItemWidget
};
