import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Spin } from 'antd';

import pagesRoutes from '@/utils/pagesRoutes';

const pagesRoutesEntries = Object.entries(pagesRoutes);

const Loading = ({ location }) => {
  if (location.pathname === '/') {
    router.replace('./userManage');
  }
  return <Spin spinning={true} />;
};

export default Loading;
