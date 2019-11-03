import React, { PureComponent } from 'react';
import { Table, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import omit from 'omit.js';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import Ellipsis from '@/components/Ellipsis';

function noop() {}
function emptyObj() {
  return {};
}

@withRouter
class index extends PureComponent {
  static defaultProps = {
    onSelectChange: noop,
    onSelectAllChange: noop,
    closeRowSelection: true,
  };

  constructor(props) {
    super(props);
    this.uid = props.uid || 'id' || 'babyId';
  }

  state = {
    selectedTableRowKeys: [],
  };

  static getDerivedStateFromProps(nextProps) {
    const { rowSelection = {} } = nextProps;
    const { selectedRowKeys } = rowSelection;
    let newState = null;
    if (Array.isArray(selectedRowKeys)) {
      newState = {
        selectedTableRowKeys: selectedRowKeys,
      };
    }
    return newState;
  }

  handleSelect = (record, selected) => {
    const { selectedTableRowKeys } = this.state;
    const { onSelectChange } = this.props;
    let newSelectedTableRowKeys;
    if (selected) {
      newSelectedTableRowKeys = selectedTableRowKeys.concat(record[this.uid]);
      this.setState({
        selectedTableRowKeys: newSelectedTableRowKeys,
      });
    } else {
      newSelectedTableRowKeys = selectedTableRowKeys.filter(key => key !== record[this.uid]);
      this.setState({
        selectedTableRowKeys: newSelectedTableRowKeys,
      });
    }
    onSelectChange(newSelectedTableRowKeys, record);
  };

  handleSelectAll = (selected, selectedRows, changeRows) => {
    const { selectedTableRowKeys } = this.state;
    const { onSelectAllChange } = this.props;
    let newSelectedTableRowKeys;
    const changeRowKeys = changeRows.map(record => record[this.uid]);
    if (selected) {
      newSelectedTableRowKeys = selectedTableRowKeys.concat(changeRowKeys);
      this.setState({
        selectedTableRowKeys: newSelectedTableRowKeys,
      });
    } else {
      newSelectedTableRowKeys = selectedTableRowKeys.filter(key => !changeRowKeys.includes(key));
      this.setState({
        selectedTableRowKeys: newSelectedTableRowKeys,
      });
    }
    onSelectAllChange(newSelectedTableRowKeys, selected, changeRows);
  };

  handleClick = (e, record) => {
    const { selectedTableRowKeys } = this.state;
    const selected = selectedTableRowKeys.some(key => key === record[this.uid]);
    this.handleSelect(record, !selected);
  };

  handleRowEvent = record => ({
    onClick: e => {
      this.handleClick(e, record);
    },
  });

  handleChange = (pagination, filters, sorter) => {
    const { location } = this.props;

    const { current, pageSize } = pagination;
    let queryParams = {
      ...location.query,
      pageIndex: current,
      pageSize,
    };

    // 排序
    if (!isEmpty(sorter)) {
      const { field, order } = sorter;
      queryParams = {
        ...queryParams,
        sortField: field,
        sortOrder:
          order === 'ascend' ? order.toUpperCase().slice(0, 3) : order.toUpperCase().slice(0, 4),
      };
    } else {
      queryParams = omit(queryParams, ['sortField', 'sortOrder']);
    }

    router.push({
      pathname: location.pathname,
      query: queryParams,
    });
  };

  formatColumns = columns => {
    return columns.map(c => {
      const { onHeaderCell = emptyObj, onCell = emptyObj, render, ellipsis } = c;
      c.onHeaderCell = () => ({
        ...onHeaderCell(),
        style: { whiteSpace: 'nowrap' },
      });
      if (c.showAll) {
        c.onCell = () => ({
          ...onCell(),
          style: { whiteSpace: 'nowrap' },
        });
      } else if (!ellipsis) {
        c.ellipsis = true; // 防止重复生成
        c.render = (...args) => (
          <Ellipsis tooltip lines={1}>
            {render ? render(...args) : args[0]}
          </Ellipsis>
        );
      }
      return c;
    });
  };

  render() {
    /**
     * closeRowSelection: 设置表格是否可选择
     * true - 不可选择（不展示选择框）
     * false - 默认值，可选择（展示选择框）
     */
    const {
      rowSelection: rowSelectionFromParent,
      closeRowSelection,
      columns,
      ...restProps
    } = this.props;
    const { selectedTableRowKeys } = this.state;
    const rowSelection = closeRowSelection
      ? null
      : {
          selectedRowKeys: selectedTableRowKeys,
          onSelect: this.handleSelect,
          onSelectAll: this.handleSelectAll,
          ...rowSelectionFromParent,
        };
    const tableProps = {
      columns: this.formatColumns(columns),
      rowSelection,
      onRow: this.handleRowEvent,
      onChange: this.handleChange,
      ...restProps,
      rowKey: record => record[this.uid],
    };
    return <Table {...tableProps} />;
  }
}

export default index;
