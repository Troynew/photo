import React from 'react';
import { Form, Cascader } from 'antd';

import { propTypes, defaultProps, formItemLayout, modalFormItemLayout } from '../utils/props';

const FormItem = Form.Item;

const SelectItem = ({ config, innerModal, getFieldDecorator }) => (
  <FormItem label={config.label} {...(innerModal ? modalFormItemLayout : formItemLayout)}>
    {getFieldDecorator(config.name, {
      initialValue: config.initialValue,
    })(<Cascader options={config.options} disabled={config.disabled} />)}
  </FormItem>
);

SelectItem.propTypes = propTypes;
SelectItem.default = defaultProps;

export default SelectItem;
