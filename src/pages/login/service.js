import request from '@/utils/request';

export async function login(params) {
  return request(`login`, {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function logout(params) {
  return request('logout', {});
}
