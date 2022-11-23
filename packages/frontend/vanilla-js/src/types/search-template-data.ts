
import type { SearchModuleConfig } from './search-module-config';
import type { SortByOptions } from '@bloomreach/discovery-api-client/src/types/global';

export interface Variant {
  sku_color_group: string
  sku_swatch_images: string[]
  sku_thumb_images: string[]
  sku_sale_price?: number
  sku_price?: number
}

export interface Product {
  title: string
  image: string
  link: string
  id: string
  price: number
  sale_price: number
  variants?: Variant[]
  variant_name?: string
}

export interface PaginationNode {
  value: string
  label?: string
  disabled?: boolean
  active?: boolean
}

export interface Keywords {
  original_query: string
  redirected_query: string
  redirected_url: string
}

export interface Section {
  count: number
  name: string
  id: string
}

export interface Facet {
  original_title: string
  title: string
  section: Section[]
}

export interface PriceRange {
  count: number
  start: string
  end: string
}
export interface FacetRange {
  price?: PriceRange[]
}

export interface SelectedFilterItem {
  checkbox_id: string;
  label: string;
}

export interface GroupCategoryGroupDoclist {
  products: Product[]
}

export interface GroupCategoryGroup {
  doclist: GroupCategoryGroupDoclist
}

export interface GroupCategory {
  group_category_id: string
  groups: GroupCategoryGroup[]
}

export interface GroupedProducts {
  group_category_id: string
  groups: {
    title: string
    products: Product[]
  }[]
}
export interface SearchTemplateData {
  facets: Facet[]
  products: Product[]
  // group_categories?: GroupCategory[]
  grouped_products?: GroupedProducts
  did_you_mean: string[]
  number_of_results: number
  start: number
  config: SearchModuleConfig
  page?: number
  sort?: SortByOptions
  size?: number
  paginationData?: PaginationNode[]
  originalQuery?: string
  keywordRedirect?: Keywords
  checkedFacets?: {[key: string]: string[]}
  priceRanges?: PriceRange[]
  priceRangeFacet?: {start: number; end: number}
  maxPrice?: number
  minPrice?: number
  defaultCurrency?: string
  isFiltersPanelOpened?: boolean
  mobileView?: {matches: boolean}
  defaultMaxColorSwatches?: number
  formatMoney?: (price: number) => string
  escapeSpecialCharacters?: (value: string) => string
  selectedColors?: string[]
  selectedFilterItems?: SelectedFilterItem[]
}
