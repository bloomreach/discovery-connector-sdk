import type {
  SearchResponse,
  SearchResponseDoc,
  SearchResponseFacetCounts,
  SearchResponseFacetCountsFacetFieldsCategory,
  SearchResponseFacetCountsFacetFieldsGeneral,
  SearchResponseFacetCountsFacetRanges,
  SearchResponseFacetCountsV3,
  SearchResponseFacetCountsV3Facets,
  SearchResponseStats,
  SearchResponseStatsStatsFieldsPrice,
  SearchResponseFacetCountsV3FacetsCategory as V3FacetsCategory,
  SearchResponseFacetCountsV3FacetsGeneral as V3FacetsGeneral,
  SearchResponseFacetCountsV3FacetsRange as V3FacetsRange,
  SearchResponseFacetCountsV3FacetsStats as V3FacetsStats,
} from '@bloomreach/discovery-api-client/src/getSearchResultsAPI';
import type * as TemplateData from '../types/search-template-data';
import type { SearchModuleConfig } from '../types';

export function mapSearchApiResponse(
  responseData: SearchResponse,
  config: SearchModuleConfig,
): TemplateData.SearchTemplateData {

  const facets = responseData?.facet_counts ? (
    isV3Facets(responseData.facet_counts) ? mapFacetsV3(responseData.facet_counts) : mapFacets(responseData.facet_counts, responseData.stats)
  ) : { facets: [] };
  return {
    ...facets,

    products: processDocs(responseData.response?.docs || [], config),

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
            products: processDocs((group?.doclist?.docs || []), config),
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
    facets: Object.entries(facetCounts.facet_fields || {})
      .filter((facetField) => facetField[1].length)
      .map<TemplateData.Facet>(mapFacet),

    ...mapPriceRanges(facetCounts.facet_ranges),

    ...mapPriceStats(stats?.stats_fields?.price),

    ...mapPriceStats(stats?.stats_fields?.sale_price),
  };
}

function mapFacet(facetField: [string, SearchResponseFacetCountsFacetFieldsGeneral[] | SearchResponseFacetCountsFacetFieldsCategory[]]): TemplateData.Facet {
  return {
    original_title: facetField[0],
    title: facetField[0]
      .replace('_', ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    section: facetField[1].map<TemplateData.Section>(mapFacetSection),
  };
}

function mapFacetSection(section: SearchResponseFacetCountsFacetFieldsGeneral | SearchResponseFacetCountsFacetFieldsCategory): TemplateData.Section {
  if ('name' in section) {
    let name = section.name ?? '';
    if (section.name === 'true') {
      name = 'Yes';
    } else if (section.name === 'false') {
      name = 'No';
    }

    return {
      count: section.count ?? 0,
      name,
      id: name,
    };
  }

  return {
    count: section.count ?? 0,
    name: section.cat_name ?? '',
    id: section.cat_id ?? '',
  };
}

function mapPriceRanges(facetRanges?: SearchResponseFacetCountsFacetRanges): Pick<TemplateData.SearchTemplateData, 'priceRanges'> {
  if (facetRanges?.price) {
    return {
      priceRanges: facetRanges.price.map<TemplateData.PriceRange>(
        (range) => ({
          count: range.count,
          start: range.start.toString(),
          end: range.end.toString()
        })
      ),
    };
  }

  return {};
}

function mapPriceStats(facetStatsPrice?: SearchResponseStatsStatsFieldsPrice): Pick<TemplateData.SearchTemplateData, 'maxPrice' | 'minPrice'> {
  return facetStatsPrice ? {
    maxPrice: facetStatsPrice.max,
    minPrice: facetStatsPrice.min,
  } : {};
}

function mapFacetsV3(facetCounts: SearchResponseFacetCountsV3): FacetsType {
  return {
    facets: facetCounts.facets?.filter((facet): facet is V3FacetsCategory | V3FacetsGeneral => (facet.type === 'text' || facet.type === 'number'))
      .filter(facet => facet.value.length)
      .map(mapFacetV3) ?? [],

    ...mapPriceRangesV3(facetCounts.facets),

    ...mapPriceStatsV3(facetCounts.facets),
  };
}

function mapFacetV3(facet: V3FacetsCategory | V3FacetsGeneral): TemplateData.Facet {
  return {
    original_title: facet.name,
    title: facet.name
      .replace('_', ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    section: facet.value.map<TemplateData.Section>(mapFacetSection),
  };
}

function mapPriceRangesV3(facets?: SearchResponseFacetCountsV3Facets[]): Pick<TemplateData.SearchTemplateData, 'priceRanges'> {
  const priceRanges =
    facets?.filter<V3FacetsRange>((facet): facet is V3FacetsRange => facet.type === 'number_range')
      .find(facet => facet.name.toLowerCase() === 'price')
      ?.value
      .map<TemplateData.PriceRange>(range => ({
        count: range.count,
        start: range.start.toString(),
        end: range.end.toString(),
      }));

  return priceRanges ? { priceRanges } : {};
}

function mapPriceStatsV3(facets?: SearchResponseFacetCountsV3Facets[]): Pick<TemplateData.SearchTemplateData, 'maxPrice' | 'minPrice'> {
  const facetStats = facets?.filter<V3FacetsStats>((facet): facet is V3FacetsStats => facet.type === 'number_stats')
    .map(facet => ({ name: facet.name.toLowerCase(), value: facet.value }));

  // If `sale_price` stats exists, use it as price stats. Otherwise, use `price` stats
  const facetStatsPrice = facetStats?.find(facet => facet.name === 'sale price' || facet.name === 'sale_price') ?? facetStats?.find(facet => facet.name === 'price');
  return facetStatsPrice?.value ? {
    maxPrice: facetStatsPrice.value.end,
    minPrice: facetStatsPrice.value.start,
  } : {};
}

function processDocs(docs: SearchResponseDoc[], config: SearchModuleConfig): TemplateData.Product[] {
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
