import type {
  SearchResponse,
  SearchResponseDoc,
  SearchResponseFacetCounts,
  SearchResponseFacetCountsFacetFieldsCategory,
  SearchResponseFacetCountsFacetFieldsGeneral,
  SearchResponseFacetCountsV3,
  SearchResponseStats,
  SearchResponseFacetCountsV3FacetsCategory as V3FacetsCategory,
  SearchResponseFacetCountsV3FacetsGeneral as V3FacetsGeneral,
  SearchResponseFacetCountsV3FacetsRange as V3FacetsRange,
  SearchResponseFacetCountsV3FacetsStats as V3FacetsStats,
} from '@bloomreach/discovery-api-client/src/getSearchResultsAPI';
import type * as TemplateData from '../types/search-template-data';
import { buildSearchConfig } from '../utils';

export function mapSearchApiResponse(
  responseData: SearchResponse
): TemplateData.SearchTemplateData {

  const config = buildSearchConfig();
  const facets = responseData?.facet_counts ? (
    isV3Facets(responseData.facet_counts) ? mapFacetsV3(responseData.facet_counts) : mapFacets(responseData.facet_counts, responseData.stats)
  ) : { facets: [] };
  return {
    ...facets,

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

function isV3Facets(facetCounts: SearchResponseFacetCounts | SearchResponseFacetCountsV3): facetCounts is SearchResponseFacetCountsV3 {
  return 'facets' in facetCounts;
}

type FacetsType = Pick<TemplateData.SearchTemplateData, 'facets' | 'priceRanges' | 'maxPrice' | 'minPrice'>;

function mapFacets(facetCounts: SearchResponseFacetCounts, stats?: SearchResponseStats): FacetsType {
  return {
    facets: Object.entries(facetCounts.facet_fields as object || {}).map(
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

    ...(facetCounts.facet_ranges?.price
      ? {
          priceRanges: facetCounts.facet_ranges.price.map(
            (range) => ({
              count: range.count,
              start: range.start.toString(),
              end: range.end.toString()
            })
          )
        }
      : {}),

    ...(stats?.stats_fields?.price
      ? {
          maxPrice: stats.stats_fields.price.max,
          minPrice: stats.stats_fields.price.min
        }
      : {}),

    ...(stats?.stats_fields?.sale_price
      ? {
          maxPrice: stats.stats_fields.sale_price.max,
          minPrice: stats.stats_fields.sale_price.min
        }
      : {}),
  };
}

function mapFacetsV3(facetCounts: SearchResponseFacetCountsV3): FacetsType {
  const facets = facetCounts.facets?.filter((facet): facet is V3FacetsCategory | V3FacetsGeneral => (facet.type === 'text' || facet.type === 'number'))
    .filter(facet => facet.value.length)
    .map(facet => ({
      original_title: facet.name,
      title: facet.name
        .replace('_', ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      section: facet.value.map((value: SearchResponseFacetCountsFacetFieldsCategory | SearchResponseFacetCountsFacetFieldsGeneral) => {
        let name: string;
        let id: string;
        if ('name' in value) {
          if (value.name === 'true') {
            name = 'Yes';
          } else if (value.name === 'false') {
            name = 'No';
          } else {
            name = value.name;
          }
          id = name;
        } else {
          name = value.cat_name ?? '';
          id = value.cat_id ?? '';
        }

        return {
          count: value.count ?? 0,
          name,
          id,
        };
      }),
    })) ?? [];

  const priceRanges = facetCounts.facets?.filter((facet): facet is V3FacetsRange => facet.type === 'number_range')
    .find(facet => facet.name.toLowerCase() === 'price')?.value.map(range => ({
      count: range.count,
      start: range.start.toString(),
      end: range.end.toString(),
    }));

  const stats = facetCounts.facets?.filter((facet): facet is V3FacetsStats => facet.type === 'number_stats')
    .map(facet => ({ name: facet.name.toLowerCase(), value: facet.value }));
  const statsValue = (stats?.find(facet => facet.name === 'sale price' || facet.name === 'sale_price') ?? stats?.find(facet => facet.name === 'price'))?.value;
  const priceStats = statsValue ? {
    maxPrice: statsValue.end,
    minPrice: statsValue.start,
  } : undefined;

  return {
    facets,
    ...(priceRanges ? { priceRanges } : {}),
    ...(priceStats ?? {}),
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
