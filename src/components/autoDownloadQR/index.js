import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { message } from 'antd';

const autoDownloadQR = Children =>
  class AutoDownloadQR extends Component {
    state = {
      downloadText: '',
    };

    handleDownload = (text, errorMsg = '无下载内容') => {
      if (!text) {
        message.warn(errorMsg);
        return;
      }
      this.setState(
        {
          downloadText: String(text),
        },
        () => {
          this.triggerDownload();
        }
      );
    };

    triggerDownload = () => {
      this.setState(
        {
          downloadLink: document.getElementById('__download--qrcode').toDataURL('image/png'),
        },
        () => {
          document.getElementById('__download--qrcode--a').click();
        }
      );
    };

    render() {
      const { downloadText, downloadLink } = this.state;
      return (
        <>
          <QRCode
            id="__download--qrcode"
            style={{ display: 'none' }}
            value={downloadText}
            includeMargin
            size={390}
          />
          <a id="__download--qrcode--a" style={{ display: 'none' }} href={downloadLink} download />
          <Children {...this.props} onDownload={this.handleDownload} />
        </>
      );
    }
  };

export default autoDownloadQR;
