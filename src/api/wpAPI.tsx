import { CategorySearchParams, EventSearchParams, PostSearchParams, PageSearchParams, SearchParams } from './wordpress.d';
import { ProductSearchParams, ProductCategoriesSearchParams, WooSearchParams } from './woocommerce.d';
import config from '../env';

const MakeSearchParamsGeneric  = (params: SearchParams ) =>{

  let args = '';
  args += params.per_page? '?per_page=' + params.per_page : "?per_page=10";
  args += params.id? '&id=' + params.id : "";
  args += params.search? '&search=' + params.search : "";
  
  return (args);
}

const MakeWooSearchParamsGeneric  = (params: WooSearchParams ) =>{

  let args = '';
  args += params.per_page? '?per_page=' + params.per_page : "?per_page=10";
  args += params.id? '&id=' + params.id : "";
  args += params.search? '&search=' + params.search : "";
  args += '&consumer_key=' + config.woo_key;
  args += '&consumer_secret=' + config.woo_secret;
  
  return (args);
}

export const  wpGetCategoriesUrl  = (params: CategorySearchParams ) =>{

  let args = '';
  args = MakeSearchParamsGeneric(params);
  args += params.slug? '&slug=' + params.slug : "";

  const url = `${config.wp_endpoint}categories/${args}`;      
  console.log(`Querying API: Categories: ${url}`);
  return (url);
}

export const  wpGetEventsUrl  = (params: EventSearchParams ) =>{

  let args = '';
  args = MakeSearchParamsGeneric(params);

  const url = `${config.wp_endpoint}event/${args}`;      
  console.log(`Querying API: Events: ${url}`);
  return (url);
}

export const  wpGetPostsUrl  = (params: PostSearchParams ) =>{

  let args = '';
  args = MakeSearchParamsGeneric(params);

  const url = `${config.wp_endpoint}posts/${args}`;      
  console.log(`Querying API: Posts: ${url}`);
  return (url);
}

export const  wpGetPagesUrl  = (params: PageSearchParams ) =>{

  let args = '';
  args = MakeSearchParamsGeneric(params);

  const url = `${config.wp_endpoint}pages/${args}`;      
  console.log(`Querying API: Pages: ${url}`);
  return (url);
}

export const  wooGetProductsUrl  = (params: ProductSearchParams ) =>{

  let args = '';
  args = MakeWooSearchParamsGeneric(params);

  const url = `${config.woo_endpoint}products/${args}`;      
  console.log(`Querying WooCommerce API: Products: ${url}`);
  return (url);
}

export const  wooGetProductCategoriesUrl  = (params: ProductCategoriesSearchParams ) =>{

  let args = '';
  args = MakeWooSearchParamsGeneric(params);

  const url = `${config.woo_endpoint}products/categories/${args}`;      
  console.log(`Querying WooCommerce API: Product Categories: ${url}`);
  return (url);
}


