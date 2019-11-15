import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryProductList(params) {
  return request(`photo/package/list${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
  });
}

export async function addProduct(params) {
  return request(`photo/package/add`, {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function editProduct(params) {
  return request(`photo/package/edit`, {
    method: 'PUT',
    body: params,
    isFormData: true,
  });
}

export async function deleteProduct(params) {
  return request(`photo/package/delete`, {
    method: 'DELETE',
    body: params,
    isFormData: true,
  });
}
