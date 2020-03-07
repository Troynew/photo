import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryUserList(params) {
  return request(`photo/baby/list${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
  });
}

export async function addUser(params) {
  return request(`photo/baby/add`, {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function editUser(params) {
  return request(`photo/baby/edit`, {
    method: 'PUT',
    body: params,
    isFormData: true,
  });
}

export async function deleteUser(params) {
  return request(`photo/baby/delete`, {
    method: 'DELETE',
    body: params,
    isFormData: true,
  });
}

export async function queryProductList(params) {
  return request(`photo/package/list${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
  });
}

export async function addOrder(params) {
  return request(`photo/order/add`, {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}
