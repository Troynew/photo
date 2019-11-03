import router from 'umi/router';
import { message, notification } from 'antd';

import { speech } from './baiduAI';

const noop = () => {};

const heartCheck = {
  timeout: 5 * 60 * 1000,
  timeoutId: null,
  reset: function(socket) {
    clearTimeout(this.timeoutId);
    this.start(socket);
  },
  start: function(socket) {
    this.timeoutId = setTimeout(() => {
      socket.send('Heart Beat');
    }, this.timeout);
  },
};

const memoryInfo = {
  userId: null,
  companyId: null,
  stationId: null,
};

function createWebSocket(
  userId = memoryInfo.userId,
  companyId = memoryInfo.companyId,
  stationId = memoryInfo.stationId
) {
  memoryInfo.userId = userId;
  memoryInfo.companyId = companyId;
  memoryInfo.stationId = stationId;

  if (!WebSocket) {
    message.warn('当前浏览器不支持 WebSocket');
    return noop;
  }

  const socket = new WebSocket(
    `${DOMAIN.replace(/^http/, 'ws')}/websocket/${companyId}/${stationId}/${userId}`
  );

  socket.onopen = function() {
    console.log('WebSocket 已连接');
    heartCheck.start(socket);
  };

  socket.onclose = function() {
    console.log('WebSockte 已关闭');
    window.removeEventListener('unload', socket.close);
    socket.close();
    createWebSocket();
  };

  socket.onerror = function(e) {
    // message.warn(e.message);
  };

  socket.onmessage = function(e) {
    console.log('WebSocket 收到消息', e);
    heartCheck.reset(socket);
    if (typeof e.data !== 'string' || e.data === '') return;

    try {
      const { operation, message: msg } = JSON.parse(e.data);
      const { getState, dispatch } = window.g_app._store;
      const { workbench } = getState();

      if (operation === 'close') {
        window.location.href = 'about:blank';
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
    } catch (e) {
      console.log('WebSocket 收到非json数据');
    }
  };

  window.addEventListener('unload', socket.close);
}

export default createWebSocket;
