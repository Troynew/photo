import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import closePng from '@/assets/images/activity/phone_close.png';
import ellipsisPng from '@/assets/images/activity/phone_ellipsis.png';
import styles from './index.less';

const hidePageContentScroll = () => {
  document.body.style.paddingRight = '17px';
  document.body.style.overflow = 'hidden';
};

const showPageContentScroll = () => {
  document.body.style.paddingRight = '0px';
  document.body.style.overflow = 'auto';
};

const PhonePreview = ({ visible, title, onClose, children }) => {
  if (visible) {
    hidePageContentScroll();
  } else {
    showPageContentScroll();
  }

  return visible ? (
    <div className={styles.phonePreview}>
      <div className={styles.mask} onClick={onClose} />
      <div className={styles.phone}>
        <div className={styles.header} />
        <div className={styles.body}>
          <div className={styles.left} />
          <div className={styles.inner}>
            <div className={styles.innerHeader}>
              <div className={styles.menu}>
                <img className={styles.close} src={closePng} alt="关闭" />
                {title}
              </div>
              <img className={styles.ellipsis} src={ellipsisPng} alt="更多" />
            </div>
            <div className={styles.content}>{children}</div>
          </div>
          <div className={styles.right} />
        </div>
        <div className={styles.footer} />
        <div className={styles.closeTag} onClick={onClose}>
          关闭预览
        </div>
      </div>
    </div>
  ) : null;
};

PhonePreview.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default React.memo(PhonePreview);
