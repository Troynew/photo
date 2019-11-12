import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryProductList(params) {
  return request(`product/basic/list${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
  });
}

export async function addProduct(params) {
  return request(`product/basic/add`, {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function editProduct(params) {
  return request(`product/basic/edit`, {
    method: 'PUT',
    body: params,
    isFormData: true,
  });
}

export async function deleteProduct(params) {
  return request(`product/basic/delete`, {
    method: 'DELETE',
    body: params,
    isFormData: true,
  });
}
