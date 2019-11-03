import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

const CheckboxGroup = Checkbox.Group;

class index extends PureComponent {
  static defaultProps = {
    checkedList: [],
    options: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      indeterminate: false,
      checkAll: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { value, options } = nextProps;

    let updateState = { checkedList: [], indeterminate: false, checkAll: false };
    if (Array.isArray(value)) {
      updateState = {
        checkedList: value,
        indeterminate: value.length > 0 && value.length < options.length,
        checkAll: value.length >= options.length,
      };
    }
    return updateState;
  }

  onChange = checkedList => {
    const { options } = this.props;
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < options.length,
      checkAll: checkedList.length === options.length,
    });
    this.triggerChange(checkedList);
  };

  onCheckAllChange = e => {
    const { options } = this.props;
    const checkedList = e.target.checked ? options.map(option => option.value) : [];

    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: e.target.checked,
    });

    this.triggerChange(checkedList);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { checkedList, indeterminate, checkAll } = this.state;
    const { options, title, className, disabled, 'data-__field': dataField } = this.props;
    if (!options.length) {
      return null;
    }

    const cls = classnames(className, {
      [styles.container]: true,
      [styles.hasError]: dataField && dataField.errors,
    });
    return (
      <div className={cls}>
        {title && (
          <Checkbox
            disabled={disabled}
            indeterminate={indeterminate}
            onChange={this.onCheckAllChange}
            checked={checkAll}
          >
            {title}
          </Checkbox>
        )}
        <br />
        <CheckboxGroup
          disabled={disabled}
          options={options}
          value={checkedList}
          onChange={this.onChange}
          className={styles.checkboxGroup}
        />
      </div>
    );
  }
}

export default index;
