import React from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { propTypes, defaultProps, formItemLayout } from '../utils/props';

const FormItem = Form.Item;

const DatePickerItem = ({ config, getFieldDecorator }) => (
  <FormItem label={config.label} {...formItemLayout}>
    {getFieldDecorator(config.name, {
      initialValue: config.initialValue && moment(config.initialValue),
    })(<DatePicker format={config.format} />)}
  </FormItem>
);

DatePickerItem.propTypes = propTypes;
DatePickerItem.defaultProps = defaultProps;

export default DatePickerItem;
