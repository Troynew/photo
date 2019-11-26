import React from 'react';
import router from 'umi/router';
import { Spin, message } from 'antd';

const Loading = ({ location }) => {
  if (location.pathname === '/') {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      message.warn('登录失效，请重新登录', 2).then(() => router.replace('/login'));
    } else {
      router.replace('/userManage');
    }
  }
  return <Spin spinning={true} />;
};

export default Loading;
