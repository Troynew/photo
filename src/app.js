/* eslint-disable */
import { message } from 'antd';

const plugins = [];

// 非生产环境添加 logger
if (process.env.NODE_ENV !== 'production') {
  plugins.push(
    require('dva-logger')({
      collapsed: true,
    })
  );
}

export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      message.error(e.message);
    },
  },
  plugins,
};
