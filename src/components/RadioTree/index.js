import React, { PureComponent } from 'react';
import { Input, Radio } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

const { Search } = Input;
const RadioGroup = Radio.Group;

const filterDataSource = (dataSource, text) => {
  return dataSource
    .map(data => {
      if (data.children) {
        // eslint-disable-next-line
        data.children = data.children.filter(
          item => item.label.indexOf(text) > -1 || data.label.indexOf(text) > -1
        );
      }
      return data;
    })
    .filter(data => {
      if (data.children.length) {
        return true;
      }
      return data.label.indexOf(text) > -1;
    });
};

export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  static defaultProps = {
    dataSource: [],
  };

  handleSearch = value => {
    this.setState({
      searchText: value,
    });
  };

  handleRadioChange = e => {
    this.props.onChange(e.target.value);
  };

  renderTreeNodes = (data, checkedValue) => (
    <RadioGroup onChange={this.handleRadioChange} value={checkedValue}>
      {data.map(item => {
        if (item.children) {
          return (
            <li key={item.value}>
              <p style={{ marginBottom: 0 }}>{item.label}</p>
              <ul>{this.renderTreeNodes(item.children, checkedValue)}</ul>
            </li>
          );
        }
        return (
          <li key={item.value} style={{ padding: '2px 0' }}>
            <Radio value={item.value}>{item.label}</Radio>
          </li>
        );
      })}
    </RadioGroup>
  );

  render() {
    const { dataSource, 'data-__field': dataField, value } = this.props;
    const { searchText } = this.state;
    const showDataSource = filterDataSource(JSON.parse(JSON.stringify(dataSource)), searchText);
    const searchCheckboxCls = classnames(styles.checkboxTree, {
      [styles.hasError]: dataField && dataField.errors,
    });

    return (
      <div className={searchCheckboxCls}>
        <div className={styles.body}>
          <Search placeholder="请输入搜索内容" onSearch={this.handleSearch} />
          <ul className={styles.treeContainer}>{this.renderTreeNodes(showDataSource, value)}</ul>
        </div>
      </div>
    );
  }
}
