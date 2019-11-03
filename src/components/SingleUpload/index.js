import React, { PureComponent } from 'react';
import { Upload, Icon, message, Modal } from 'antd';

import { isUrl } from '@/utils/utils';
import styles from './index.less';

const UploadButton = ({ loading, disabled }) => (
  <div>
    <Icon type={disabled ? 'stop' : loading ? 'loading' : 'plus'} style={{ fontSize: '32px' }} />
    <div className="ant-upload-text">上传</div>
  </div>
);

const PreviewModal = ({ fileUrl, onClick, ...rest }) => (
  <Modal {...rest} width={1000} footer={null}>
    <img className={styles.previewImg} src={fileUrl} onClick={onClick} alt="图片解析错误" />
  </Modal>
);

export default class StandardUpload extends PureComponent {
  state = {
    loading: false,
    preview: false,
    dirty: false,
    fileList: [],
  };

  handleChange = info => {
    const { onChange } = this.props;
    const {
      file: { status, response },
      fileList,
    } = info;

    if (status === 'uploading') {
      this.setState(() => ({
        loading: true,
        fileList,
      }));
      return;
    }
    if (status === 'done') {
      const { status: resStatus, message: resMsg, body: file } = response;
      if (resStatus) {
        if (file) {
          message.success('上传成功');
          onChange && onChange(file);
          this.setState(() => ({
            loading: false,
            dirty: true,
            fileList,
          }));
          return;
        } else {
          message.error('文件读取错误');
        }
      } else {
        message.error(resMsg);
      }
    }
    if (status === 'error') {
      message.error('上传失败');
    }

    this.setState(() => ({
      loading: false,
      dirty: true,
      fileList: [],
    }));
  };

  handlePreview = () => {
    this.setState(() => ({
      preview: true,
    }));
  };

  hidePreview = () => {
    this.setState(() => ({
      preview: false,
    }));
  };

  handleRemove = () => {
    const { onChange } = this.props;
    onChange && onChange();
    this.setState(() => ({
      fileList: [],
      dirty: true,
    }));
  };

  render() {
    const { action, value, disabled, onChange, ...others } = this.props;
    const { loading, preview, fileList, dirty } = this.state;

    const fUrl = (value || '').split('?')[0];
    const defaultFileList = fUrl && !dirty ? [{ url: fUrl, thumbUrl: fUrl, uid: '-1' }] : fileList;

    return (
      <div className={styles.standardUpload}>
        <Upload
          {...others}
          disabled={disabled}
          action={isUrl(action) ? action : DOMAIN + action}
          className={styles.upload}
          listType="picture-card"
          fileList={defaultFileList}
          showUploadList={{
            showPreviewIcon: !disabled,
            showRemoveIcon: !disabled,
          }}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
          withCredentials
        >
          {!fUrl && <UploadButton loading={loading} disabled={disabled} />}
        </Upload>
        <PreviewModal
          visible={preview}
          fileUrl={fUrl}
          onCancel={this.hidePreview}
          onClick={this.hidePreview}
        />
      </div>
    );
  }
}
