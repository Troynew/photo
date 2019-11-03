import React, { PureComponent } from 'react';
import { Checkbox, Input } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

const { Search } = Input;
const getParentValue = (value, tree) => {
  let parentValue;
  // eslint-disable-next-line
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.value === value)) {
        parentValue = node.value;
      } else if (getParentValue(value, node.children)) {
        parentValue = getParentValue(value, node.children);
      }
    }
  }
  return parentValue;
};

const filterDataSource = (dataSource, text) =>
  dataSource
    .map(data => {
      if (data.children) {
        // eslint-disable-next-line
        data.children = data.children.filter(item => item.label.indexOf(text) > -1);
      }
      return data;
    })
    .filter(data => {
      if (data.children.length) {
        return true;
      }
      return data.label.indexOf(text) > -1;
    });

const flatTreeData = arr =>
  [].concat(
    ...arr.map(({ children, ...restData }) =>
      Array.isArray(children) ? flatTreeData(children.concat(restData)) : restData
    )
  );

export default class index extends PureComponent {
  static defaultProps = {
    dataSource: [],
    title: '全选',
  };

  constructor(props) {
    super(props);

    this.state = {
      checkedValue: [],
      indeterminate: false,
      checkAll: false,
      searchText: '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { value, dataSource } = nextProps;
    let updateState = null;
    if (Array.isArray(value)) {
      const newValue = value.map(item => (item.value || item.value === 0 ? item.value : item));
      const flatDataSource = flatTreeData(dataSource);
      const isCheckAll = newValue.every(valueItem =>
        flatDataSource.some(item => item.value === valueItem)
      );
      const isIndeterminate = newValue.some(valueItem =>
        flatDataSource.map(data => data.value).includes(valueItem)
      );
      updateState = {
        checkedValue: newValue,
        indeterminate: isIndeterminate,
        checkAll: isCheckAll,
      };
    }
    return updateState;
  }

  handleCheckAllChange = e => {
    const { dataSource } = this.props;
    const checkedValue = e.target.checked ? dataSource.map(data => data.value) : [];

    this.setState({
      checkedValue,
      indeterminate: false,
      checkAll: e.target.checked,
    });

    this.triggerChange(checkedValue);
  };

  handleSearch = value => {
    this.setState({
      searchText: value,
    });
  };

  handleCheckboxChange = e => {
    const { checkedValue } = this.state;
    const { dataSource } = this.props;
    let newCheckedValue = [];
    const { dataRef, value, checked } = e.target;
    if (checked) {
      newCheckedValue = checkedValue.concat(value);
      if (dataRef.children) {
        // 清空子元素选中
        newCheckedValue = [value];
      } else {
        // 去除父元素选中
        const curParentValue = getParentValue(value, dataSource);
        newCheckedValue = newCheckedValue.filter(v => {
          const parentValue = getParentValue(v, dataSource);
          return curParentValue === parentValue;
        });
      }
    } else {
      newCheckedValue = checkedValue.filter(v => v !== value);
    }
    this.setState({ checkedValue: newCheckedValue });
    this.triggerChange(newCheckedValue);
  };

  getCheckedData = (dataSource, checkedValue) => {
    const flatDataSource = flatTreeData(dataSource);
    return flatDataSource.filter(data => checkedValue.includes(data.value));
  };

  triggerChange(checkedValue) {
    const { onChange, dataSource } = this.props;
    if (onChange) {
      const checkedData = this.getCheckedData(dataSource, checkedValue);
      onChange(checkedData);
    }
  }

  renderTreeNodes = (data, checkedValue, parentValue) =>
    data.map(item => {
      const checkboxProps = {
        checked: checkedValue.some(v => v === item.value),
        onChange: this.handleCheckboxChange,
        value: item.value,
        dataRef: item,
        disabled: this.props.disabled,
      };
      if (item.children) {
        return (
          <li key={item.value}>
            <Checkbox {...checkboxProps}>{item.label}</Checkbox>
            <ul>{this.renderTreeNodes(item.children, checkedValue, item.value)}</ul>
          </li>
        );
      }
      return (
        <li key={`${parentValue}-${item.value}`}>
          <Checkbox {...checkboxProps} dataRef={{ ...item, parentValue }}>
            {item.label}
          </Checkbox>
        </li>
      );
    });

  render() {
    const { dataSource, 'data-__field': dataField, title } = this.props;

    const { checkedValue, indeterminate, checkAll, searchText } = this.state;
    const showDataSource = filterDataSource(JSON.parse(JSON.stringify(dataSource)), searchText);

    const searchCheckboxCls = classnames(styles.checkboxTree, {
      [styles.hasError]: dataField && dataField.errors,
    });

    const checkAllBoxProps = {
      indeterminate,
      onChange: this.handleCheckAllChange,
      checked: checkAll,
    };

    return (
      <div className={searchCheckboxCls}>
        {/* <div className={styles.header}>
          <Checkbox {...checkAllBoxProps}>{title}</Checkbox>
        </div> */}
        <div className={styles.body}>
          <Search placeholder="请输入搜索内容" onSearch={this.handleSearch} />
          <ul className={styles.treeContainer}>
            {this.renderTreeNodes(showDataSource, checkedValue)}
          </ul>
        </div>
      </div>
    );
  }
}
