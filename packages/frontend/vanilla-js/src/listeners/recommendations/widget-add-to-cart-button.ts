import { getCurrentRecommendationsUiState } from '../../modules/builders';

declare const window: any;

function buildWidgetAddToCartButtonClickListener(parameters: {
  widgetRid: string,
  widgetId: string,
  widgetType: string,
  blmWidgetAddToCartProdId: string,
  query?: string,
  blmWidgetAddToCartSku: string
}) {
  const widgetAddToCartEventData = {
    wrid: parameters.widgetRid,
    wid: parameters.widgetId,
    wty: parameters.widgetType,
    item_id: parameters.blmWidgetAddToCartProdId,
    ...(parameters.query
      ? {wq: parameters.query}
      : {}),
    sku: parameters.blmWidgetAddToCartSku
  };

  return () => {
    (window.BrTrk || {})?.getTracker()?.logEvent(
      'cart',
      'widget-add',
      widgetAddToCartEventData
    );
  };
}

export function addWidgetAddToCartButtonClickListener() {
  getCurrentRecommendationsUiState().widgets.forEach(widgetData => {
    const widgetElement = widgetData.node as HTMLElement;

    const widgetContentElement = widgetElement.querySelector(
      '.blm-recommendation-widget-content'
    );
    const {
      id: widgetId = '',
      type: widgetType = '',
      rid: widgetRid = ''
    } = (widgetContentElement as HTMLElement).dataset;

    widgetElement
      .querySelectorAll('[data-blm-widget-add-to-cart]')
      .forEach((addToCartElement: HTMLElement) => {
        const { blmWidgetAddToCartSku = '', blmWidgetAddToCartProdId = '' } = addToCartElement.dataset;

        if (!addToCartElement.getAttribute('hasListener')) {
          addToCartElement.addEventListener(
            'click',
            buildWidgetAddToCartButtonClickListener({
              widgetRid,
              widgetId,
              widgetType,
              blmWidgetAddToCartSku,
              blmWidgetAddToCartProdId,
              query: widgetElement?.dataset?.query
            })
          );
          addToCartElement.setAttribute('hasListener', 'true');
        }
      });
  });
}
