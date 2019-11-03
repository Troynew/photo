import request from '@/utils/request';

export async function createConnect(companyId, stationId, userId) {
  return request(`/notice/connect/${companyId}/${stationId}/${userId}`);
}

export async function heartBeat(companyId, stationId, userId) {
  return request(`/notice/heartBeat/${companyId}/${stationId}/${userId}`);
}

export async function getNotification(companyId, stationId, userId) {
  return request(`/notice/${companyId}/${stationId}/${userId}`);
}
