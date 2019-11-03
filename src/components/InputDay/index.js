import React, { PureComponent } from 'react';
import { InputNumber, Select } from 'antd';

import styles from './index.less';

const { Option } = Select;

export default class index extends PureComponent {
  static defaultProps = {
    options: [{ label: '天', value: 'day' }],
  };

  state = {
    inputValue: undefined,
    unit: undefined,
  };

  static getDerivedStateFromProps(nextProps) {
    const { value } = nextProps;
    return {
      inputValue: value,
    };
  }

  handleValueChange = value => {
    this.setState({ inputValue: value });
    this.triggerChange(value);
  };

  handleUnitChange = value => {
    this.setState({ unit: value });
    this.triggerChange(value);
  };

  triggerChange(changedValue) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const { options, disabled, ...restProps } = this.props;
    const { inputValue, unit } = this.state;
    return (
      <span className={styles.inputDay}>
        <InputNumber
          {...restProps}
          value={inputValue}
          disabled={disabled}
          onChange={this.handleValueChange}
        />
        <Select disabled value={unit || 'day'} onChange={this.handleUnitChange}>
          {options.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </span>
    );
  }
}
