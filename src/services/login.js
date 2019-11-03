import request from '@/utils/request';

export async function fetchUser() {
  return request(`/jyhUser`);
}

export async function fetchRole() {
  return request(`/currentUser/roles`);
}

export async function fetchPermission() {
  return request(`/currentUser/premissionsWithNone`);
}

export async function logout(redirect) {
  return request(`/logout?redirect=${redirect}`);
}
