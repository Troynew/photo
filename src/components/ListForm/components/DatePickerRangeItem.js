import React from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { propTypes, defaultProps, formItemLayout } from '../utils/props';

const FormItem = Form.Item;

const DatePickerRangeItem = ({ config, getFieldDecorator }) => (
  <FormItem label={config.label} {...formItemLayout}>
    {getFieldDecorator(config.name, {
      initialValue: Array.isArray(config.initialValue)
        ? [moment(config.initialValue[0]), moment(config.initialValue[1])]
        : null,
    })(<DatePicker.RangePicker format={config.format} />)}
  </FormItem>
);

DatePickerRangeItem.propTypes = propTypes;
DatePickerRangeItem.defaultProps = defaultProps;

export default DatePickerRangeItem;
