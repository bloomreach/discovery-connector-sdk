import type { AutosuggestModuleConfig } from '.';

export interface ProductSuggestion {
  id: string
  image: string
  title: string
  link: string
  sale_price: number
  price?: number
}

export interface Category {
  name: string
  value: string
  type: string
}

export interface Term {
  text: string
  displayText: string
  categories?: Category[]
  processedText?: string
}

export interface AutosuggestTemplateData {
  originalQuery?: string
  terms: Term[]
  productSuggestions: ProductSuggestion[]
  config?: AutosuggestModuleConfig
  defaultCurrency?: string
}
