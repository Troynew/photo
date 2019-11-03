import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import { Checkbox, Input, Radio } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { Search } = Input;

export default class index extends PureComponent {
  static defaultProps = {
    dataSource: [],
    title: '全选',
  };

  constructor(props) {
    super(props);

    this.getFilterDataSource = memoizeOne(this.filterDataSource);
    this.state = {
      checkedList: [],
      indeterminate: false,
      checkAll: false,
      searchText: '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { value, dataSource } = nextProps;
    let updateState = null;
    if (Array.isArray(value)) {
      updateState = {
        checkedList: value,
        indeterminate: value.length > 0 && value.length < dataSource.length,
        checkAll: value.length >= dataSource.length,
        initial: true,
      };
    }
    return updateState;
  }

  filterDataSource = (dataSource, text) => dataSource.filter(data => data.label.indexOf(text) > -1);

  onChange = checkedList => {
    const { dataSource } = this.props;
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < dataSource.length,
      checkAll: checkedList.length === dataSource.length,
    });
    this.triggerChange(checkedList);
  };

  handleRadioGoupChange = e => {
    const { value } = e.target;
    this.triggerChange(value);
  };

  onCheckAllChange = e => {
    const { dataSource } = this.props;
    const checkedList = e.target.checked ? dataSource.map(data => data.value) : [];

    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: e.target.checked,
    });

    this.triggerChange(checkedList);
  };

  handleSearch = value => {
    this.setState({
      searchText: value,
    });
  };

  handleSearchChange = e => {
    const { value } = e.target;
    this.handleSearch(value);
  };

  triggerChange(changedValue) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const {
      dataSource,
      'data-__field': dataField,
      title,
      type,
      disabled,
      value,
      style,
    } = this.props;

    const { checkedList, indeterminate, checkAll, searchText } = this.state;

    const filterDataSource = this.getFilterDataSource(dataSource, searchText);
    const searchCheckboxCls = classnames(styles.searchCheckbox, {
      [styles.hasError]: dataField && dataField.errors,
    });

    return (
      <div className={searchCheckboxCls} style={style}>
        {type !== 'radio' && (
          <div className={styles.header}>
            <Checkbox
              disabled={disabled}
              indeterminate={indeterminate}
              onChange={this.onCheckAllChange}
              checked={checkAll}
            >
              {title}
            </Checkbox>
          </div>
        )}
        <div className={styles.body}>
          <Search
            disabled={disabled}
            placeholder="请输入搜索内容"
            onSearch={this.handleSearch}
            onChange={this.handleSearchChange}
          />
          {type !== 'radio' && (
            <CheckboxGroup
              disabled={disabled}
              options={filterDataSource}
              value={checkedList}
              onChange={this.onChange}
            />
          )}
          {type === 'radio' && (
            <RadioGroup
              disabled={disabled}
              options={filterDataSource}
              value={value}
              onChange={this.handleRadioGoupChange}
            />
          )}
        </div>
      </div>
    );
  }
}
