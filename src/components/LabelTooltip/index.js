import React from 'react';
import { Tooltip, Icon } from 'antd';

import styles from './index.less';

const index = props => {
  const { children, suffix, title } = props;
  return (
    <span className={styles.labelTooltip}>
      <span>{children}</span>
      <Tooltip title={title}>{suffix}</Tooltip>
    </span>
  );
};

index.defaultProps = {
  suffix: <Icon type="info-circle-o" />,
};

export default React.memo(index);
