import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryProductList(params) {
  return request(`photo/product/list${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
  });
}

export async function addProduct(params) {
  return request(`photo/product/add`, {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function editProduct(params) {
  return request(`photo/product/edit`, {
    method: 'PUT',
    body: params,
    isFormData: true,
  });
}

export async function deleteProduct(params) {
  return request(`photo/product/delete`, {
    method: 'DELETE',
    body: params,
    isFormData: true,
  });
}
