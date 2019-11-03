import request from '@/utils/request';
import qs from 'qs';

export async function queryOilStationList(params) {
  return request('/api/oilStation/list', {
    method: 'POST',
    body: params,
    isFormData: true,
  });
}

export async function queryOilStationOptions() {
  return request('/api/oilStation/query/user', {
    method: 'POST',
    body: {},
  });
}

export async function queryGoodsLevel() {
  return request('/goods/getGoodsLevel');
}

export async function queryGoodsCategory() {
  return request('/goods/getGoodsCategory');
}

export async function queryGoodsUnit() {
  return request('/goods/getGoodsUnit');
}

export async function queryGoodsOptions(params) {
  const queryParams = qs.stringify(params, { addQueryPrefix: true });
  return request(`/goods/list${queryParams}`, {
    method: 'POST',
    body: params,
  });
}

export async function queryCompany(params) {
  return request('/api/company/query/user', {
    method: 'POST',
    body: params,
  });
}

// 当前用户关联公司
export async function queryCompanyList(params) {
  return request(`/api/company/query/user`, {
    method: 'POST',
    body: params,
  });
}

// 当前用户关联油站列表
export async function queryOilStationByUser() {
  return request('/api/oilStation/query/user', {
    method: 'POST',
  });
}

// 企业下组别
export async function queryGroupByCompany(params) {
  return request(`/api/memberGroup/byCompany`, {
    method: 'POST',
    body: params,
  });
}

// 查询会员详细信息
export async function userDetailInfo(id) {
  return request(`/api/member/${id}`);
}

// 查询油站详细信息
export async function oilStationDetailInfo(id) {
  return request(`/api/oilStation/${id}`);
}

/* 获取微信功能链接 - 所有的链接 */
export async function getAllUrl() {
  return request('/wechat/functionUrl/getAllUrl', {
    method: 'GET',
  });
}

/* 获取微信公众号所有的模板的编号和标题 */
export async function queryTemplateCodeList(params) {
  return request('/wechat/template/queryTemplate', {
    method: 'POST',
    body: params,
  });
}

// 查询来源渠道
export async function querySourceChannel() {
  return request(`/api/stationCode/sourceChannel`, {
    method: 'POST',
    body: {},
  });
}

// 查询订单详情
export async function queryOrderDetailInfo(id) {
  return request(`/api/order/item/${id}`);
}

// 获取百度语音 token
export async function fetchAIToken() {
  return request('/api/baidu/speech/api/token');
}

// 查看公司支持充值类型
export async function queryChargeTypes(companyId) {
  return request(`/api/member/recharge/chargeTypeCheck/${companyId}`);
}

// 查看订余额详情
export async function queryBalanceDetail(orderNo) {
  return request(`/api/order/consuming/${orderNo}`);
}
