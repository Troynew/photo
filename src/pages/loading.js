import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Spin } from 'antd';

import pagesRoutes from '@/utils/pagesRoutes';

const pagesRoutesEntries = Object.entries(pagesRoutes);

const Loading = ({ location }) => {
  if (location.pathname === '/') {
    const token = localStorage.getItem('token');
    if (!token || Number(token) + 604800000 < new Date().getTime()) {
      localStorage.removeItem('token');
      router.replace('/login');
    } else {
      router.replace('/userManage');
    }
  }
  return <Spin spinning={true} />;
};

export default Loading;
