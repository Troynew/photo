import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button, Icon } from 'antd';
import classnames from 'classnames';

import InputItem from './components/InputItem';
import NumRangeItem from './components/NumRangeItem';
import SelectItem from './components/SelectItem';
import DatePickerItem from './components/DatePickerItem';
import RangePickerItem from './components/RangePickerItem';
import CascaderItem from './components/CascaderItem';
import { resetValues } from './utils/reset';
import { _UNITE_SELECT_ALL } from './utils/constants';
import styles from './index.less';

@Form.create()
class ListForm extends PureComponent {
  state = {
    extend: false,
  };

  _transformValues = values => {
    console.log('values', values);
    // eslint-disable-next-line
    const _values = {};
    // eslint-disable-next-line
    for (let key in values) {
      if ({}.hasOwnProperty.call(values, key)) {
        if (
          values[key] === undefined ||
          values[key] === _UNITE_SELECT_ALL ||
          (Array.isArray(values[key]) && values[key].includes(_UNITE_SELECT_ALL)) ||
          (typeof values[key] === 'object' &&
            values[key] !== null &&
            values[key]['key'] === _UNITE_SELECT_ALL)
        )
          continue;
        // eslint-disable-next-line
        const _key = key.replace(/@/g, '.');
        // eslint-disable-next-line
        _values[_key] = values[key];
      }
    }
    return _values;
  };

  handleToggleForm = () => {
    this.setState(prevState => ({
      extend: !prevState.extend,
    }));
  };

  handleSearch = e => {
    e.preventDefault();

    const {
      shouldValidate,
      onSearch,
      form: { getFieldsValue, validateFields },
    } = this.props;

    if (shouldValidate) {
      validateFields({ first: true }, (err, values) => {
        if (err) return;
        onSearch && onSearch(this._transformValues(values));
      });
    } else {
      const values = getFieldsValue();
      onSearch && onSearch(this._transformValues(values));
    }
  };

  handleReset = () => {
    const {
      dataSource,
      form: { setFieldsValue },
      onReset,
    } = this.props;
    // const { extend } = this.state;
    setFieldsValue(
      dataSource.reduce((prev, item) => {
        prev[item.name.replace(/\./g, '@')] = item.resetValue || resetValues[item.type];
        return prev;
      }, {})
    );
    if (typeof onReset === 'function') {
      this.props.onReset();
    }
  };

  renderFormItem = item => {
    const {
      innerModal,
      form: { getFieldDecorator },
    } = this.props;

    let Comp = null;
    switch (item.type) {
      case 'input':
        Comp = InputItem;
        break;
      case 'select':
        Comp = SelectItem;
        break;
      case 'datePicker':
        Comp = DatePickerItem;
        break;
      case 'datePickerRange':
        Comp = RangePickerItem;
        break;
      case 'numRange':
        Comp = NumRangeItem;
        break;
      case 'cascader':
        Comp = CascaderItem;
        break;
      default:
        break;
    }

    const _item = {
      ...item,
      name: item.name.replace(/\./g, '@'),
      label: (
        <span style={{ display: 'inline-block', width: innerModal ? 'auto' : 85 }}>
          {item.label}
        </span>
      ),
    };

    return React.createElement(Comp, {
      config: _item,
      innerModal,
      getFieldDecorator,
    });
  };

  getDisplay = index => {
    return !this.state.extend && index > 1 ? 'none' : 'block';
  };

  render() {
    const { dataSource, innerModal } = this.props;
    const { extend } = this.state;

    const dataSourceLen = dataSource.length;

    return (
      <Form
        onSubmit={this.handleSearch}
        layout="inline"
        className={classnames(styles.common, {
          [styles.innerModalForm]: innerModal,
        })}
      >
        <Row type="flex" gutter={innerModal ? 0 : { md: 8, lg: 24, xl: 48 }}>
          {dataSource.map((item, index) => (
            <Col key={item.name} md={8} sm={24} style={{ display: this.getDisplay(index) }}>
              {this.renderFormItem(item)}
            </Col>
          ))}
          <Col
            md={8}
            sm={24}
            offset={
              extend ? (dataSourceLen % 3 === 0 && 16) || (dataSourceLen % 3 === 1 && 8) || 0 : 0
            }
          >
            <span
              className={classnames(styles.submitButtons, {
                [styles.alignRight]: extend,
                [styles.innerModal]: innerModal,
              })}
            >
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
              </Button>
              {dataSource.length > 2 && (
                <a style={{ marginLeft: 8 }} onClick={this.handleToggleForm}>
                  {extend ? '收起' : '展开'} <Icon type={extend ? 'up' : 'down'} />
                </a>
              )}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ListForm;
