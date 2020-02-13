import React from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { propTypes, defaultProps, modalFormItemLayout } from '../utils/props';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const RangePickerItem = ({ config, innerModal, getFieldDecorator }) => (
  <FormItem label={config.label} {...(innerModal ? modalFormItemLayout : formItemLayout)}>
    {getFieldDecorator(config.name, {
      initialValue: config.initialValue && [
        config.initialValue[0] && moment(config.initialValue[0]),
        config.initialValue[1] && moment(config.initialValue[1]),
      ],
    })(
      <RangePicker
        format={config.format}
        showTime={config.showTime}
        disabledDate={config.disabledDate}
        style={{ width: '100%' }}
      />
    )}
  </FormItem>
);

RangePickerItem.propTypes = propTypes;
RangePickerItem.defaultProps = defaultProps;

export default RangePickerItem;
