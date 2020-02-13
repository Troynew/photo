import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryOrderList(params) {
  return request(`photo/order/list${stringify(params, { addQueryPrefix: true })}`, {
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

export async function editOrder(params) {
  return request(`photo/order/edit`, {
    method: 'PUT',
    body: params,
    isFormData: true,
  });
}

export async function deleteOrder(params) {
  return request(`photo/order/delete`, {
    method: 'DELETE',
    body: params,
    isFormData: true,
  });
}
