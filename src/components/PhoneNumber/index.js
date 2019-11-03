import React, { PureComponent } from 'react';
import { ReactComponent as IconSee } from '@/assets/svgs/see.svg';
import { ReactComponent as IconNoSee } from '@/assets/svgs/nosee.svg';

import styles from './index.less';

export default class index extends PureComponent {
  state = {
    isShow: false,
  };

  handlePhoneNumber = phoneNumber => {
    const reg = /(\d{3})(\d{4})(\d{4})/;
    return String(phoneNumber).replace(reg, '$1****$3');
  };

  handleShow = () => {
    this.setState(({ isShow }) => ({ isShow: !isShow }));
  };

  render() {
    const { isShow } = this.state;
    const { children } = this.props;
    return (
      <div className={styles.phoneNumber}>
        {isShow ? children : this.handlePhoneNumber(children)}
        {!isShow && <IconSee className={styles.icon} onClick={this.handleShow} />}
        {isShow && <IconNoSee className={styles.icon} onClick={this.handleShow} />}
      </div>
    );
  }
}
