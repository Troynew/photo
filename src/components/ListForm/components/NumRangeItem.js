import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber } from 'antd';

import { propTypes, defaultProps, formItemLayout, modalFormItemLayout } from '../utils/props';
import styles from './NumRangeItem.less';

const FormItem = Form.Item;

const toNum = v => {
  if (v == null || v == '') return false;
  return Number(v);
};

const formatValues = (num, index, another, cb) => {
  const _num = toNum(num),
    _another = toNum(another);
  if (_num === false || _another === false) return;
  if (index === 0 && _num > _another) {
    cb([another, num]);
  }
  if (index === 1 && _num < _another) {
    cb([num, another]);
  }
};

class NumRangeView extends PureComponent {
  render() {
    const {
      value: values = [],
      min = -Infinity,
      max = Infinity,
      placeholder = '请输入',
      onChange,
    } = this.props;
    return (
      <div className={styles.numRangeView}>
        <InputNumber
          className={styles.inputNumber}
          value={values[0]}
          min={0}
          onChange={v => onChange([v, values[1]])}
          onBlur={e => formatValues(e.target.value, 0, values[1], onChange)}
          placeholder={placeholder}
        />
        <span className={styles.separator}>—</span>
        <InputNumber
          className={styles.inputNumber}
          value={values[1]}
          min={0}
          onChange={v => onChange([values[0], v])}
          onBlur={e => formatValues(e.target.value, 1, values[0], onChange)}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

const NumRangeItem = ({ config, innerModal, getFieldDecorator }) => (
  <FormItem label={config.label} {...(innerModal ? modalFormItemLayout : formItemLayout)}>
    {getFieldDecorator(config.name, {
      initialValue: config.initialValue,
    })(<NumRangeView min={config.min} max={config.max} placeholder={config.placeholder} />)}
  </FormItem>
);

NumRangeItem.propTypes = propTypes;
NumRangeItem.defaultProps = defaultProps;

export default NumRangeItem;
