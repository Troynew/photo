import React from 'react';
import { FormattedMessage } from 'umi/locale';
import { Spin, Menu, Icon, Dropdown, Avatar } from 'antd';
import styles from './index.less';

const GlobalHeaderRight = ({ user, onMenuClick, theme }) => {
  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <Icon type="logout" />
        <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
      </Menu.Item>
      <Menu.Item key="editPassword">
        <Icon type="edit" />
        <FormattedMessage id="menu.password.edit" defaultMessage="logout" />
      </Menu.Item>
    </Menu>
  );
  let className = styles.right;
  if (theme === 'dark') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <div className={className}>
      {true ? (
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} icon="user" alt="avatar" />
            <span className={styles.name}>{user && user.name}</span>
          </span>
        </Dropdown>
      ) : (
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      )}
    </div>
  );
};

export default React.memo(GlobalHeaderRight);
