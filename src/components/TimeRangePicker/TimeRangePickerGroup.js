import React, { PureComponent } from 'react';
import { Icon } from 'antd';

import TimeRangePicker from './index';

import styles from './index.less';

export default class TimeRangePickerGroup extends PureComponent {
  static defaultProps = {
    dataSource: [],
  };

  static getDerivedStateFromProps(nextProps) {
    const { value } = nextProps;
    const dataSource =
      Array.isArray(value) && value.length > 0 ? value : [{ startTime: null, endTime: null }];
    return { dataSource };
  }

  state = {};

  handleChange = (changeValue, index) => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1, changeValue);
    this.triggleChange(dataSource);
  };

  handleAdd = (e, index) => {
    const { dataSource } = this.state;
    dataSource.splice(index + 1, 0, {
      startTime: null,
      endTime: null,
    });
    this.triggleChange(dataSource);
  };

  handleDel = (e, index) => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.triggleChange(dataSource);
  };

  triggleChange = changeValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changeValue);
    }
  };

  render() {
    const { dataSource } = this.state;
    const { disabled } = this.props;
    return (
      <ul className={styles.timeRangePickerGroup}>
        {dataSource.map((data, index) => (
          <li key={index}>
            <TimeRangePicker
              disabled={disabled}
              value={data}
              onChange={changeValue => {
                this.handleChange(changeValue, index);
              }}
            />{' '}
            <span className={styles.action}>
              <Icon
                type="plus-circle"
                onClick={e => {
                  this.handleAdd(e, index);
                }}
              />
              {index > 0 && (
                <Icon
                  type="minus-circle"
                  onClick={e => {
                    this.handleDel(e, index);
                  }}
                />
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}
