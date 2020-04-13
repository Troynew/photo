import { logout, login, editPassword, saveAttachment, queryAttachment } from './../services/common';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    user: {},
    permissionLoaded: false,
    permission: [],
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // dispatch({ type: 'login/login' });
    // },
  },

  effects: {
    *logout({ payload }, { call }) {
      const data = yield call(logout, payload);
      if (data) {
        setAuthority([]);
        return data;
      }
    },

    *login({ payload }, { call, put }) {
      const data = yield call(login, payload);
      if (data) {
        setAuthority(((data || {}).permission || '').split(','));
        reloadAuthorized();
        yield put({
          type: 'fetchUserSuccess',
          payload: { permission: data.permission || [] },
        });
        return data;
      }
    },

    *editPassword({ payload }, { call }) {
      const data = yield call(editPassword, payload);
      if (data) return data;
    },

    *saveAttachment({ payload }, { call }) {
      const data = yield call(saveAttachment, payload);
      if (data) return data;
    },

    *queryAttachment({ payload }, { call }) {
      const data = yield call(queryAttachment, payload);
      if (data) {
        return data;
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },

    fetchUserSuccess(state, { payload }) {
      const { permission } = payload;
      let permissionArr = [];
      if (typeof permission === 'string') {
        permissionArr = (permission || '').split(',');
      } else {
        permissionArr = permission;
      }
      console.log('permission', permissionArr);
      return { ...state, permission: permissionArr, permissionLoaded: true };
    },
  },
};
