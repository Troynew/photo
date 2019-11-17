import { login, logout } from '../service';

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { call }) {
      const data = yield call(login, payload);
      if (data) return data;
    },

    *logout({ payload }, { call }) {
      const data = yield call(logout, payload);
      if (data) return data;
    },
  },
};
