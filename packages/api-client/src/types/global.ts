export type NODE_ENV = string;

export interface RequestConstructor {
  url: string
  options: object
}

export type SortByOptions =
  | ''
  | 'price+asc'
  | 'price+desc'
  | 'sale_price+asc'
  | 'sale_price+desc'
  | 'title+asc'
  | 'title+desc'
