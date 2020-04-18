import modelExtend from 'dva-model-extend';
import { pageModel } from '@/utils/model';
import { queryOrderList, addOrder, editOrder, deleteOrder, queryProductList } from '../service';

export default modelExtend(pageModel, {
  namespace: 'orderManage',

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/orderManage') {
          dispatch({
            type: 'queryOrderList',
            payload: { pageSize: '10', pageNum: '1', ...location.query },
          });
        }
      });
    },
  },

  effects: {
    *queryOrderList({ payload }, { call, put }) {
      const { pageSize, pageNum } = payload;
      const data = yield call(queryOrderList, payload);
      if (data.status) {
        // const list = data.rows.map(item => {
        //   item.id = item.babyId;
        //   return item;
        // });
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.rows,
            pagination: { current: Number(pageNum), pageSize: Number(pageSize), total: data.total },
          },
        });
      }
    },

    *addOrder({ payload }, { call }) {
      const data = yield call(addOrder, payload);
      if (data.status) return data;
    },

    *editOrder({ payload }, { call }) {
      const data = yield call(editOrder, payload);
      if (data.status) return data;
    },

    *deleteOrder({ payload }, { call }) {
      const data = yield call(deleteOrder, payload);
      if (data.status) return data;
    },
    *queryProductList({ payload }, { call, put }) {
      const data = yield call(queryProductList, payload);
      if (data.status) {
        // yield put({
        //   type: 'querySuccess',
        //   payload: {
        //     productList: data.rows,
        //   },
        // });
        return data.rows;
      }
    },
  },
});
