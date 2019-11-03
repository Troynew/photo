import router from 'umi/router';
import { notification } from 'antd';

import { createConnect, heartBeat, getNotification } from '@/services/poll';
import { speech } from './baiduAI';

export default async function createPoll(companyId, stationId, userId) {
  const connectData = await createConnect(companyId, stationId, userId);
  if (!connectData.status) return;

  const heartBeatIntervalId = setInterval(async () => {
    heartBeat(companyId, stationId, userId);
  }, 10000);

  const getNotificationIntervalId = setInterval(async () => {
    const notificationData = await getNotification(companyId, stationId, userId);

    if (!notificationData || typeof notificationData !== 'object' || !notificationData.status)
      return;

    let body;
    try {
      body = JSON.parse(notificationData.body);
    } catch (e) {
      body = null;
    }
    if (!body) return;

    const { operation, message: msg } = body;
    const { getState, dispatch } = window.g_app._store;
    const { workbench } = getState();

    if (operation === 'close') {
      window.location.href = 'about:blank';
      window.__jyhForceLogouted = true;
      clearInterval(heartBeatIntervalId);
      clearInterval(getNotificationIntervalId);
    } else if (operation === 'order_create') {
      if (
        window.g_history.location.pathname === '/workbench' &&
        ['receipt', 'addOilOrder'].includes(workbench.activeBtn)
      ) {
        window.g_app._store.dispatch({
          type: 'addOilOrder/query',
          payload: {
            ...window.history.state,
          },
        });
      }

      notification.success({
        message: '订单创建成功',
        description: msg,
      });
      speech(msg);
    } else if (operation === 'member_recharge') {
      if (
        window.g_history.location.pathname === '/workbench' &&
        ['manualRecharge', 'rechargeRecord'].includes(workbench.activeBtn)
      ) {
        const params = (window.history.state && window.history.state.state) || {};
        window.g_app._store.dispatch({
          type: 'rechargeRecord/query',
          payload: params,
        });
      }
    }
  }, 3000);

  window.addEventListener('unload', () => {
    clearInterval(heartBeatIntervalId);
    clearInterval(getNotificationIntervalId);
  });
}
