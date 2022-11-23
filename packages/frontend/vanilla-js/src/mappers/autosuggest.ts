import type {
    AutosuggestResponseV1,
    AutosuggestResponseV2,
} from '../../../../api-client/src';
import ejs from 'ejs';
import { AUTOSUGGEST_TYPED_QUERY_TEMPLATE } from '../constants';
import type * as TemplateData from '../types/autosuggest-template-data';
import { buildAutosuggestConfig } from '../utils';

export function mapAutosuggestApiResponse(
    responseData: AutosuggestResponseV1 | AutosuggestResponseV2
): TemplateData.AutosuggestTemplateData {
    return isV2Response(responseData)
        ? mapV2Response(responseData)
        : mapV1Response(responseData);
}

export function mapV2Response(
    responseData: AutosuggestResponseV2
): TemplateData.AutosuggestTemplateData {
    const config = buildAutosuggestConfig();

    const productSuggestions = responseData?.suggestionGroups?.[0]?.searchSuggestions || [];
    const suggestions = responseData?.suggestionGroups?.[0]?.querySuggestions || [];
    const categorySuggestions = responseData?.suggestionGroups?.[0]?.attributeSuggestions || [];

    const mappedApiResponse = {
        ...(responseData?.queryContext?.originalQuery
            ? { originalQuery: responseData.queryContext.originalQuery }
            : {}),
        terms: [
            ...(suggestions.map((term, index) => ({
              ...term,
              text: term.query,
              displayText: term.displayText,
              link: `${config.search_page_url}?${
                  config.default_search_parameter
              }=${encodeURIComponent(term.query)}`,
              ...(index === 0 && categorySuggestions
                  ? {
                        categories: categorySuggestions
                            .map((category) => ({
                                ...category,
                                name: category.name,
                                value: category.value,
                                type: category.attributeType,
                            }))
                            .slice(
                                0,
                                config.autosuggest
                                    ?.number_of_collections
                            ),
                    }
                  : {}),
          }))),
        ].slice(0, config.autosuggest?.number_of_terms),
        productSuggestions: [
            ...(productSuggestions.map((product) => ({
              ...product,
              id: product.pid,
              image: product.thumb_image,
              title: product.title,
              link: product.url,
              sale_price: Number(product?.sale_price || '0'),
          }))),
        ].slice(0, config.autosuggest?.number_of_products),
        config,
    };

    return highlightQueryInTermLabels(mappedApiResponse);
}

function isV2Response(
  responseData: AutosuggestResponseV1 | AutosuggestResponseV2
): responseData is AutosuggestResponseV2 {
  return 'suggestionGroups' in responseData;
}

function mapV1Response(
    responseData: AutosuggestResponseV1
): TemplateData.AutosuggestTemplateData {
    const config = buildAutosuggestConfig();
    const mappedApiResponse = {
        ...(responseData.response.q
            ? { originalQuery: responseData.response.q }
            : {}),
        terms: [
            ...(responseData.response.suggestions
                ? responseData.response.suggestions.map((term) => ({
                      ...term,
                      text: term.q,
                      displayText: term.dq,
                      link: `${config.search_page_url}?${
                          config.default_search_parameter
                      }=${encodeURIComponent(term.q)}`,
                      ...(term.filters
                          ? {
                                categories: term.filters
                                    .map((category) => ({
                                        ...category,
                                        name: category.name,
                                        value: category.value,
                                        type: category.key,
                                    }))
                                    .slice(
                                        0,
                                        config.autosuggest
                                            ?.number_of_collections
                                    ),
                            }
                          : {}),
                  }))
                : []),
        ].slice(0, config.autosuggest?.number_of_terms),
        productSuggestions: [
            ...(responseData.response.products
                ? responseData.response.products.map((product) => ({
                      ...product,
                      id: product.pid,
                      image: product.thumb_image,
                      title: product.title,
                      link: product.url,
                      sale_price: (!Number.isNaN(product.sale_price)
                          ? product.sale_price
                          : !Number.isNaN(product.price)
                          ? product.price
                          : '0') as number,
                      ...('price' in product && 'sale_price' in product
                          ? { price: product.price }
                          : {}),
                  }))
                : []),
        ].slice(0, config.autosuggest?.number_of_products),
        config,
    };

    return highlightQueryInTermLabels(mappedApiResponse);
}

function highlightQueryInTermLabels(
    results: TemplateData.AutosuggestTemplateData
): TemplateData.AutosuggestTemplateData {
    const processedResults = { ...results };
    results.terms.forEach((term: TemplateData.Term, index: number) => {
        const typedQueryHtml = ejs
            .render(AUTOSUGGEST_TYPED_QUERY_TEMPLATE, {
                query: results.originalQuery,
            })
            .trim();
        (
            processedResults.terms[index] || ({} as TemplateData.Term)
        ).processedText = term.text.replace(
            results.originalQuery || '',
            typedQueryHtml
        );
    });
    return processedResults;
}
