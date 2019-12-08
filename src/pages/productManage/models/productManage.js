import modelExtend from 'dva-model-extend';
import { pageModel } from '@/utils/model';
import { queryProductList, addProduct, editProduct, deleteProduct } from '../service';

export default modelExtend(pageModel, {
  namespace: 'productManage',

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/productManage') {
          dispatch({
            type: 'queryProductList',
            payload: { pageSize: '10', pageNum: '1', ...location.query },
          });
        }
      });
    },
  },

  effects: {
    *queryProductList({ payload }, { call, put }) {
      const { pageSize, pageNum } = payload;
      const data = yield call(queryProductList, payload);
      if (data.status) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.rows,
            pagination: { current: Number(pageNum), pageSize: Number(pageSize), total: data.total },
          },
        });
      }
    },

    *addProduct({ payload }, { call }) {
      const data = yield call(addProduct, payload);
      if (data.status) return data;
    },

    *editProduct({ payload }, { call }) {
      const data = yield call(editProduct, payload);
      if (data.status) return data;
    },

    *deleteProduct({ payload }, { call }) {
      const data = yield call(deleteProduct, payload);
      if (data.status) return data;
    },
  },
});
