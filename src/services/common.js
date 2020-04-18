import request from '@/utils/request';

export async function login(params) {
  return request(`login`, {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function logout() {
  return request('out');
}

export async function editPassword(params) {
  return request('editPassword', {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function saveAttachment(params) {
  return request(`photo/attachment/add`, {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function editAttachment(params) {
  return request(`photo/attachment/edit`, {
    method: 'PUT',
    body: params,
    isFormData: true,
  });
}

export async function queryAttachment() {
  return request(`photo/attachment/list`, {
    method: 'GET',
  });
}
