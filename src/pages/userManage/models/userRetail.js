import modelExtend from 'dva-model-extend';
import { pageModel } from '@/utils/model';
import { queryUserList, addUser, editUser, deleteUser } from '../service';

export default modelExtend(pageModel, {
  namespace: 'userManage',

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/userManage') {
          dispatch({
            type: 'queryUserList',
            payload: { pageSize: '10', pageNum: '1', ...location.query },
          });
        }
      });
    },
  },

  effects: {
    *queryUserList({ payload }, { call, put }) {
      const { pageSize, pageNum } = payload;
      const data = yield call(queryUserList, payload);

      if (data.status) {
        const list = data.rows.map(item => {
          item.id = item.babyId;
          return item;
        });
        yield put({
          type: 'querySuccess',
          payload: {
            list,
            pagination: { current: Number(pageNum), pageSize: Number(pageSize), total: data.total },
          },
        });
      }
    },

    *addUser({ payload }, { call }) {
      const data = yield call(addUser, payload);
      if (data.status) return data;
    },

    *editUser({ payload }, { call }) {
      const data = yield call(editUser, payload);
      if (data.status) return data;
    },

    *deleteUser({ payload }, { call }) {
      const data = yield call(deleteUser, payload);
      if (data.status) return data;
    },
  },
});
