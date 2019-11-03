import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const ListPageWrapper = ({
  listHeaderInst,
  listFormInst,
  listOperatorInst,
  listInst,
  hiddenBreadcrumb,
}) => (
  <PageHeaderWrapper hiddenBreadcrumb={hiddenBreadcrumb}>
    <div className={styles.list}>
      {listHeaderInst}
      <div className={styles.listForm}>{listFormInst}</div>
      <div className={styles.listOperator}>{listOperatorInst}</div>
      <div className={styles.listInst}>{listInst}</div>
    </div>
  </PageHeaderWrapper>
);

export default ListPageWrapper;
