import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryUserList(params) {
  return request(`baby/basic/list${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
  });
}

export async function addUser(params) {
  return request(`baby/basic/add`, {
    method: 'POST',
    body: params,
  });
}
