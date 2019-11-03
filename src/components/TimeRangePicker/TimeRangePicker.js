import React, { PureComponent } from 'react';
import moment from 'moment';
import { TimePicker, message } from 'antd';

export default class index extends PureComponent {
  static defaultProps = {
    value: {},
  };

  handleStartTimeChange = time => {
    const {
      value: { endTime },
    } = this.props;
    let startTime = time;
    if (endTime && moment(time) > moment(endTime)) {
      startTime = null;
      message.warning('起始时间不能大于结束时间');
    }
    this.triggerChange({ startTime });
  };

  handleEndTimeChange = time => {
    const {
      value: { startTime },
    } = this.props;
    let endTime = time;
    if (startTime && moment(time) < moment(startTime)) {
      endTime = null;
      message.warning('结束时间不能小于起始时间');
    }
    this.triggerChange({ endTime });
  };

  triggerChange = changeValue => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange(Object.assign({}, value, changeValue));
    }
  };

  render() {
    const { value, disabled } = this.props;
    const { startTime, endTime } = value;
    const startTimeProps = {
      disabled,
      value: startTime,
      onChange: this.handleStartTimeChange,
    };

    const endTimeProps = {
      disabled,
      value: endTime,
      onChange: this.handleEndTimeChange,
    };

    return (
      <React.Fragment>
        <TimePicker {...startTimeProps} /> -- <TimePicker {...endTimeProps} />
      </React.Fragment>
    );
  }
}
