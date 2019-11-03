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
    setup({ dispatch, history }) {
      // dispatch({ type: 'login/login' });
    },
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    fetchUserSuccess(state, { payload }) {
      const { user = {}, role, permission = [] } = payload;
      return { ...state, user, role, permission, permissionLoaded: true };
    },
  },
};
