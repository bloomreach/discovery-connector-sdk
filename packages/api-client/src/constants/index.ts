// api-client/constants

// todo Refactor vanilla js / react implementation to either use or not use the constants config

export const ENDPOINT_AUTOSUGGEST_API =
    'https://suggest.dxpapi.com/api/v2/suggest/';
export const ENDPOINT_PRODUCT_SEARCH_API =
    'https://core.dxpapi.com/api/v1/core/';
export const ENDPOINT_WIDGETS_API =
    'https://pathways.dxpapi.com/api/v2/widgets/';

export const NO_ENCODE_PARAMETERS = [
  '_br_uid_2',
  'fq',
  'sort'
];

export const FIELD_LIST_DEFAULT =
    'pid,title,brand,price,sale_price,thumb_image,sku_thumb_images,sku_swatch_images,sku_color_group,url,price_range,sale_price_range,description,is_live,score,skuid,group';
export const FIELD_LIST_WIDGETS = 'pid,price,sale_price,title,thumb_image,url';
