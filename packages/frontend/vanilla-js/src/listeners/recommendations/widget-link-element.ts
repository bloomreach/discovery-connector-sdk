import { getCurrentRecommendationsUiState } from '../../modules/builders';
import { findUpElementWithClassName } from '../../utils';

function buildWidgetLinkElementClickListener(widgetElement: HTMLElement, parameters: {
  widgetRid: string,
  widgetId: string,
  widgetType: string,
  productId: string,
  query?: string
}) {
  return () => {
    const widgetClickEventData = {
      wrid: parameters.widgetRid,
      wid: parameters.widgetId,
      wty: parameters.widgetType,
      item_id: parameters.productId,
      ...(parameters.query
        ? {wq: parameters.query}
        : {})
    };

    widgetElement.dispatchEvent(new CustomEvent('brWidgetClick', {
      bubbles: true,
      detail: {
        ...widgetClickEventData,
      }
    }));
  };
}

export function addWidgetLinkElementClickListener() {
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
      .querySelectorAll('.blm-widget-link')
      .forEach((linkElement: HTMLElement) => {
        const productElement = findUpElementWithClassName(
          linkElement,
          'blm-recommendation__product'
        ) as HTMLElement;
        const productId = productElement.dataset.id || '';

        if (!linkElement.getAttribute('hasListener')) {
          linkElement.addEventListener(
            'click',
            buildWidgetLinkElementClickListener(linkElement, {
              widgetRid,
              widgetId,
              widgetType,
              productId,
              query: widgetElement?.dataset?.query
            })
          );
          linkElement.setAttribute('hasListener', 'true');
        }
      });
  });
}
