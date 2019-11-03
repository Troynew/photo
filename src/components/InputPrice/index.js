import React, { PureComponent } from 'react';
import { InputNumber } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

export default class index extends PureComponent {
  static defaultProps = {
    prefix: '￥',
  };

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { prefix, className, disabled, ...restProps } = this.props;
    const inputNumberCls = classnames(styles.inputNumber, {
      [className]: !!className,
    });
    return (
      <span className={styles.inputPrice}>
        <span className={styles.prefix} disabled={disabled}>
          {prefix}
        </span>
        <InputNumber
          className={inputNumberCls}
          disabled={disabled}
          onChange={this.handleChange}
          min={0}
          formatter={v => `${v}`}
          parser={v => v.replace(/[^0-9.]/g, '')}
          precision={2}
          {...restProps}
        />
      </span>
    );
  }
}
