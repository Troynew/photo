import React, { Component } from 'react';
import Clipboard from 'clipboard';
import { message } from 'antd';

class Copy extends Component {
  componentDidMount() {
    this.clipboard = new Clipboard(`.auto-copy-${this.props.uid}`);
    this.clipboard.on('success', e => {
      message.success('复制成功');
      e.clearSelection();
    });

    this.clipboard.on('error', e => {
      message.error('复制失败');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    const { uid, text, children } = this.props;

    return (
      <span
        className={`auto-copy-${uid}`}
        data-clipboard-text={text}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </span>
    );
  }
}

export default Copy;
