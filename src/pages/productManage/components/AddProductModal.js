import React, { PureComponent } from 'react';
import { Form, Input, Modal, Radio, Select } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@Form.create()
export default class AddUserModal extends PureComponent {
  state = { product: '' };

  componentDidMount() {
    const {
      initData: { product },
    } = this.props;
    if (product && product !== '' && product !== null) {
      this.setState({ product });
    }
  }

  handleModalOk = () => {
    const {
      form: { validateFields },
      onModalOK,
    } = this.props;
    const { product } = this.state;
    validateFields((err, values) => {
      if (err) return;
      values.product = product;
      onModalOK(values);
    });
  };

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2);
  };

  handleProductChange = value => {
    const { product } = this.state;
    if (product === '') {
      this.setState({ product: value });
    } else {
      this.setState({ product: product + ',' + value });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      onModalCancel,
      showModal,
      initData,
      modalType,
      photoList = [],
      ceramicList = [],
      plateList = [],
      easelMaskList = [],
      mvList = [],
      paintingList = [],
      videoList = [],
      monolithicList = [],
      photoWallList = [],
      idPhotoList = [],
    } = this.props;

    const { product } = this.state;

    return (
      <Modal
        title={modalType === 'add' ? '新建套餐' : '编辑套餐'}
        visible={showModal}
        onOk={this.handleModalOk}
        onCancel={onModalCancel}
        maskClosable={true}
        okText="保存"
        destroyOnClose
        width={1024}
      >
        <Form>
          <FormItem {...modalFormItemLayout} label="产品">
            <div style={{ height: '32px', width: '100%', border: '1px solid #d9d9d9' }}>
              {product}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <div style={{ width: '20%', textAlign: 'center' }}>相册</div>
              <div style={{ width: '20%', textAlign: 'center' }}>摆台</div>
              <div style={{ width: '20%', textAlign: 'center' }}>底片</div>
              <div style={{ width: '20%', textAlign: 'center' }}>放大框</div>
              <div style={{ width: '20%', textAlign: 'center' }}>MV</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {getFieldDecorator('photo', {
                initialValue: modalType === 'edit' ? initData.photo : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {photoList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('ceramic', {
                initialValue: modalType === 'edit' ? initData.ceramic : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {ceramicList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('plate', {
                initialValue: modalType === 'edit' ? initData.plate : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {plateList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('easelmask', {
                initialValue: modalType === 'edit' ? initData.easelmask : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {easelMaskList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('mv', {
                initialValue: modalType === 'edit' ? initData.mv : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {mvList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <div style={{ width: '20%', textAlign: 'center' }}>挂画</div>
              <div style={{ width: '20%', textAlign: 'center' }}>微视</div>
              <div style={{ width: '20%', textAlign: 'center' }}>单片</div>
              <div style={{ width: '20%', textAlign: 'center' }}>照片墙</div>
              <div style={{ width: '20%', textAlign: 'center' }}>证件照</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {getFieldDecorator('painting', {
                initialValue: modalType === 'edit' ? initData.painting : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {paintingList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('vedio', {
                initialValue: modalType === 'edit' ? initData.vedio : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {videoList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('monolithic', {
                initialValue: modalType === 'edit' ? initData.monolithic : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {monolithicList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('photowall', {
                initialValue: modalType === 'edit' ? initData.photowall : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {photoWallList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('idphoto', {
                initialValue: modalType === 'edit' ? initData.idphoto : null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {idPhotoList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </div>
          </FormItem>

          <FormItem {...modalFormItemLayout} label="价格">
            {getFieldDecorator('price', {
              initialValue: modalType === 'edit' ? this.showTwoDemical(initData.price) : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="套餐名称">
            {getFieldDecorator('name', {
              initialValue: modalType === 'edit' ? initData.name : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="入册张数">
            {getFieldDecorator('photoNum', {
              initialValue: modalType === 'edit' ? initData.photoNum : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="底片张数">
            {getFieldDecorator('negativeNum', {
              initialValue: modalType === 'edit' ? initData.negativeNum : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
