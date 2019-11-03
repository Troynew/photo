import React, { Component } from 'react';

import styles from './index.less';
import { Icon } from 'antd';
export default class Refresh extends Component {
  refresh = () => {
    this.props.handleRefresh(this.props);
  };

  render() {
    return (
      <span>
        <span>{this.props.text}</span>
        <a onClick={this.refresh}>
          <Icon
            type="sync"
            // spin={this.props.refresh}
            style={{ color: '#1890ff', marginLeft: '5px' }}
          />
        </a>
      </span>
    );
  }
}
