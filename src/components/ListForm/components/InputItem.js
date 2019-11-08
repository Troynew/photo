import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import { propTypes, defaultProps, formItemLayout, modalFormItemLayout } from '../utils/props';

const FormItem = Form.Item;

const InputItem = ({ config, innerModal, getFieldDecorator }) => (
  <FormItem label={config.label} {...(innerModal ? modalFormItemLayout : formItemLayout)}>
    {getFieldDecorator(config.name, {
      initialValue: config.initialValue,
    })(<Input placeholder={config.placeholder || '请输入'} />)}
  </FormItem>
);

InputItem.propTypes = propTypes;
InputItem.defaultProps = defaultProps;

export default InputItem;
