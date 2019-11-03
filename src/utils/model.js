import modelExtend from 'dva-model-extend';

import config from './config';

// base model
export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

// base page model
export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: config.pagination,
  },
  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },
});
