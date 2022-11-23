import { SearchResponse, SearchResponseDoc } from '@bloomreach/discovery-api-client/src/getSearchResultsAPI';
import type * as TemplateData from '../types/search-template-data';
import { buildSearchConfig } from '../utils';

export function mapSearchApiResponse(
  responseData: SearchResponse
): TemplateData.SearchTemplateData {

  const config = buildSearchConfig();
  return {
    facets: Object.entries(responseData?.facet_counts?.facet_fields as object || {}).map(
      (fieldName) => {
        return {
          original_title: fieldName[0],
          title: fieldName[0]
            .replace('_', ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          section: fieldName[1].map((section: any) => {
            if (section.name === 'true') {
              section.name = 'Yes';
            } else if (section.name === 'false') {
              section.name = 'No';
            }
            return {
              count: section.count,
              name: section.cat_name || section.name,
              id: section.cat_id || section.name
            };
          })
        };
      }
    ).filter(facet => facet.section.length),

    ...(responseData?.facet_counts?.facet_ranges?.price
      ? {
          priceRanges: responseData.facet_counts.facet_ranges.price.map(
            (range) => ({
              count: range.count,
              start: range.start.toString(),
              end: range.end.toString()
            })
          )
        }
      : {}),

    ...(responseData?.stats?.stats_fields?.price
      ? {
          maxPrice: responseData.stats.stats_fields.price.max,
          minPrice: responseData.stats.stats_fields.price.min
        }
      : {}),

    ...(responseData?.stats?.stats_fields?.sale_price
      ? {
          maxPrice: responseData.stats.stats_fields.sale_price.max,
          minPrice: responseData.stats.stats_fields.sale_price.min
        }
      : {}),

    products: processDocs(responseData.response?.docs || []),

    // TODO delete this in case we don't need any other attribute from the grouped response
    /* ...(responseData?.group_response ? {
      group_categories: Object.keys(responseData?.group_response as object).reduce((allGroupCategories, groupCategoryId) => {
        return [
          ...allGroupCategories,
          {
            group_category_id: groupCategoryId,
            ...responseData.group_response?.[groupCategoryId],
            groups: responseData.group_response?.[groupCategoryId]?.groups?.map(group => ({
              ...group,
              doclist: {
                ...group.doclist,
                products: processDocs(group.doclist?.docs as SearchResponseDoc[]),
              }
            })) || []
          },
        ];
      }, [])
    } : {}), */

    ...(responseData?.group_response ? {
      grouped_products: Object.keys(responseData?.group_response as object).reduce((_, groupCategoryId) => {
        // Assuming we have only one group category in the group response object
        return {
          group_category_id: groupCategoryId,
          ...responseData.group_response?.[groupCategoryId],
          groups: responseData.group_response?.[groupCategoryId]?.groups?.map(group => ({
            title: group.groupValue,
            products: processDocs((group?.doclist?.docs || [])),
          })) || []
        };
      }, {} as TemplateData.GroupedProducts)
    } : {}),

    did_you_mean: responseData.did_you_mean || [],

    number_of_results: Number(responseData.response?.numFound),

    start: Number(responseData.response?.start),

    config,

    ...(responseData.keywordRedirect
      ? {
        keywordRedirect: {
          original_query:
            responseData.keywordRedirect['original query'],
          redirected_query:
            responseData.keywordRedirect['redirected query'],
          redirected_url: responseData.keywordRedirect['redirected url']
        }
      }
      : {}
    )
  };
}

function processDocs(docs: SearchResponseDoc[]): TemplateData.Product[] {
  const config = buildSearchConfig();
  return docs.reduce(
    (allProducts, currentProduct) => {
      return [
        ...allProducts,
        ...(config.search.display_variants
          ? extractVariants(currentProduct)
          : [
            transformProductResponseToProductData(
              currentProduct
            )
          ]
        )
      ];
    },
    []
  );
}

function extractVariants(productResponse: SearchResponseDoc): TemplateData.Product[] {
  if (!productResponse.variants || !productResponse.variants.length) {
    return [
      transformProductResponseToProductData(
        productResponse
      )
    ];
  }

  return (
    transformProductResponseToProductData(productResponse).variants || []
  ).map((variant, index) => ({
    ...transformProductResponseToProductData(
      productResponse
    ),
    ...variant,
    variant_index: index
  }));
}

function transformProductResponseToProductData(
  productResponse: SearchResponseDoc
): TemplateData.Product {
  return {
    ...productResponse,
    title: productResponse.title,
    image: productResponse.thumb_image,
    link: productResponse.url,
    id: productResponse.pid,
    price: productResponse.price,
    sale_price: productResponse.sale_price,
    ...(productResponse.variants
      ? {
          variants: productResponse.variants.map((variant) => ({
            ...variant,
            sku_color_group: variant.sku_color_group,
            sku_swatch_images: variant.sku_swatch_images,
            sku_thumb_images: variant.sku_thumb_images,
            sku_sale_price: variant.sku_sale_price,
            sku_price: variant.sku_price,
            image:
              variant.sku_thumb_images &&
              Array.isArray(variant.sku_thumb_images)
                ? variant.sku_thumb_images[0]
                : variant.sku_swatch_images[0],
            variant_name: variant.sku_color_group
          }))
        }
      : {})
  };
}
