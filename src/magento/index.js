import axios from 'axios';
import {REST_API_BASE_URL as BASE_URL, WEB_SERVICE_ADMIN_TOKEN, WEB_SERVICE_CATEGORY, WEB_SERVICE_PRODUCT_LIST_FOR_CATEGORY, WEB_SERVICE_PRODUCT} from '../constants';

export const getCategories = async () => {
    const tokenResult = await axios({
        url:`${BASE_URL}${WEB_SERVICE_ADMIN_TOKEN}`,
        method: 'post',
        data:{
          username: 'api_consumer',
          password: 'wtf_changeme2'
        }
      });

      const categoriesResult = await axios.get(`${BASE_URL}${WEB_SERVICE_CATEGORY}`,{
          headers: {
            Authorization: `Bearer ${tokenResult.data}`,
          }
        })

    return await categoriesResult.data;
}

function createProductsUrl(categoryId){
  return `${BASE_URL}${WEB_SERVICE_PRODUCT_LIST_FOR_CATEGORY}${categoryId}&searchCriteria[filterGroups][0][filters][0][field]=visibility&searchCriteria[filterGroups][0][filters][0][value]=4&searchCriteria[filterGroups][0][filters][0][conditionType]=eq`;
}

export const getProducts = async (categoryId) => {
  const tokenResult = await axios({
    url:`${BASE_URL}${WEB_SERVICE_ADMIN_TOKEN}`,
    method: 'post',
    data:{
      username: 'api_consumer',
      password: 'wtf_changeme2'
    }
  });

  const productsResult = await axios.get(createProductsUrl(categoryId),{
      headers: {
        Authorization: `Bearer ${tokenResult.data}`,
      }
    })

  return await productsResult.data;
}

export const getProduct = async (sku) => {
  const tokenResult = await axios({
    url:`${BASE_URL}${WEB_SERVICE_ADMIN_TOKEN}`,
    method: 'post',
    data:{
      username: 'api_consumer',
      password: 'wtf_changeme2'
    }
  });

  console.log(`${BASE_URL}${WEB_SERVICE_PRODUCT}/${sku}`)
  const productResult = await axios.get(`${BASE_URL}${WEB_SERVICE_PRODUCT}/${sku}`,{
      headers: {
        Authorization: `Bearer ${tokenResult.data}`,
      }
    })

  return await productResult.data;
}