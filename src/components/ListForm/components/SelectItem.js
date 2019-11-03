import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

import { propTypes, defaultProps, formItemLayout, modalFormItemLayout } from '../utils/props';
import { _UNITE_SELECT_ALL } from '../utils/constants';

const FormItem = Form.Item;
const Option = Select.Option;

const onChange = (configOnChange, value) => {
  if (typeof configOnChange === 'function') {
    if (
      value === _UNITE_SELECT_ALL ||
      (Array.isArray(value) && value.includes(_UNITE_SELECT_ALL)) ||
      (typeof value === 'object' && value['key'] === undefined && value['label'] === undefined)
    ) {
      configOnChange();
    } else if (value === undefined) {
      configOnChange('');
    } else {
      configOnChange(value);
    }
  } else {
    return;
  }
};

const onSearch = (configOnSearch, value) => {
  if (typeof configOnSearch === 'function') {
    if (value === '') {
      configOnSearch();
    } else {
      configOnSearch(value);
    }
  } else {
    return;
  }
};

const initialValue = (mode = false, labelInValue = false) => {
  if (mode || labelInValue) {
    if (mode) {
      return [_UNITE_SELECT_ALL];
    } else {
      return { key: _UNITE_SELECT_ALL, label: '全部' };
    }
  } else {
    return _UNITE_SELECT_ALL;
  }
};

const formatEmptyValue = initialValue => {
  if (initialValue === '') {
    return undefined;
  }
  return initialValue;
};

const SelectItem = ({ config, innerModal, getFieldDecorator }) => (
  <FormItem label={config.label} {...(innerModal ? modalFormItemLayout : formItemLayout)}>
    {getFieldDecorator(config.name, {
      initialValue:
        formatEmptyValue(config.initialValue) || initialValue(config.mode, config.labelInValue),
      normalize: config.normalize,
    })(
      <Select
        mode={config.mode}
        allowClear={config.allowClear || false}
        showSearch={config.showSearch}
        placeholder={config.placeholder || '请选择'}
        labelInValue={config.labelInValue}
        style={{ width: '100%' }}
        onChange={value => onChange(config.onChange, value)}
        onSearch={value => onSearch(config.onSearch, value)}
        onBlur={config.onBlur}
        filterOption={
          config.filterOption
            ? false
            : (input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option key={_UNITE_SELECT_ALL} value={_UNITE_SELECT_ALL}>
          全部
        </Option>
        {config.extraOptions &&
          config.extraOptions.map(item => (
            <Option key={String(item.key || item.value)} value={String(item.value || item.key)}>
              {item.name}
            </Option>
          ))}
        {(config.options || []).map(item => (
          <Option key={String(item.key || item.value)} value={String(item.value || item.key)}>
            {item.name}
          </Option>
        ))}
      </Select>
    )}
  </FormItem>
);

SelectItem.propTypes = propTypes;
SelectItem.default = defaultProps;

export default SelectItem;
