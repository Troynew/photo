import React from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { propTypes, defaultProps, formItemLayout, modalFormItemLayout } from '../utils/props';

const FormItem = Form.Item;

const DatePickerItem = ({ config, innerModal, getFieldDecorator }) => (
  <FormItem label={config.label} {...(innerModal ? modalFormItemLayout : formItemLayout)}>
    {getFieldDecorator(config.name, {
      initialValue: config.initialValue ? moment(config.initialValue) : null,
    })(<DatePicker format={config.format} />)}
  </FormItem>
);

DatePickerItem.propTypes = propTypes;
DatePickerItem.defaultProps = defaultProps;

export default DatePickerItem;
