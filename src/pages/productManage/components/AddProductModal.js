import React, { PureComponent } from 'react';
import { Form, Input, Modal, Radio, Select } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@Form.create()
export default class AddUserModal extends PureComponent {
  state = {
    product: [
      { key: 'photo', value: '', id: '相册' },
      { key: 'ceramic', value: '', id: '摆台' },
      { key: 'plate', value: '', id: '底片' },
      { key: 'easelMask', value: '', id: '放大框' },
      { key: 'mv', value: '', id: 'MV' },
      { key: 'painting', value: '', id: '挂画' },
      { key: 'video', value: '', id: '微视' },
      { key: 'monolithic', value: '', id: '单片' },
      { key: 'photoWall', value: '', id: '照片墙' },
      { key: 'idPhoto', value: '', id: '证件照' },
    ],
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
    h: '',
    i: '',
    j: '',
  };

  componentWillUnmount() {
    this.setState({
      product: [
        { key: 'photo', value: '', id: '相册' },
        { key: 'ceramic', value: '', id: '摆台' },
        { key: 'plate', value: '', id: '底片' },
        { key: 'easelMask', value: '', id: '放大框' },
        { key: 'mv', value: '', id: 'MV' },
        { key: 'painting', value: '', id: '挂画' },
        { key: 'video', value: '', id: '微视' },
        { key: 'monolithic', value: '', id: '单片' },
        { key: 'photoWall', value: '', id: '照片墙' },
        { key: 'idPhoto', value: '', id: '证件照' },
      ],
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: '',
      h: '',
      i: '',
      j: '',
    });
  }

  componentDidMount() {
    const {
      initData: { product },
    } = this.props;
    if (product && product !== '' && product !== null) {
      const [a, b, c, d, e, f, g, h, i, j] = (this.props.initData.product || '').split(',');
      const product = [
        { key: 'photo', value: a, id: '相册' },
        { key: 'ceramic', value: b, id: '摆台' },
        { key: 'plate', value: c, id: '底片' },
        { key: 'easelMask', value: d, id: '放大框' },
        { key: 'mv', value: e, id: 'MV' },
        { key: 'painting', value: f, id: '挂画' },
        { key: 'video', value: g, id: '微视' },
        { key: 'monolithic', value: h, id: '单片' },
        { key: 'photoWall', value: i, id: '照片墙' },
        { key: 'idPhoto', value: j, id: '证件照' },
      ];
      this.setState({ a, b, c, d, e, f, g, h, i, j, product });
    }
  }

  handleModalOk = () => {
    const {
      form: { validateFields },
      onModalOK,
    } = this.props;
    const { product } = this.state;
    const extra = product.map(item => item.value).toLocaleString();
    console.log('extra_on_OK', extra);
    validateFields((err, values) => {
      if (err) return;
      values.product = extra;
      onModalOK(values);
    });
  };

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2);
  };

  handleProductChange = (value, type) => {
    const { product } = this.state;
    const newProduct = product.map(item => {
      if (item.key === type) {
        item.value = value !== undefined ? value : '';
      }
      return item;
    });
    console.log('change', newProduct);
    this.setState({ product: newProduct });
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

    const { product, a, b, c, d, e, f, g, h, i, j } = this.state;

    const extra = product
      .filter(item => item.value)
      .map(item => item.id + ':' + item.value)
      .toLocaleString();

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
            <div style={{ height: '64px', width: '100%', border: '1px solid #d9d9d9' }}>
              {extra}
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
                initialValue: modalType === 'edit' ? a : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'photo')}
                  allowClear
                >
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
                initialValue: modalType === 'edit' ? b : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'ceramic')}
                  allowClear
                >
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
                initialValue: modalType === 'edit' ? c : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'plate')}
                  allowClear
                >
                  {plateList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('easelMask', {
                initialValue: modalType === 'edit' ? d : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'easelMask')}
                  allowClear
                >
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
                initialValue: modalType === 'edit' ? e : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'mv')}
                  allowClear
                >
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
                initialValue: modalType === 'edit' ? f : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'painting')}
                  allowClear
                >
                  {paintingList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('video', {
                initialValue: modalType === 'edit' ? g : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'video')}
                  allowClear
                >
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
                initialValue: modalType === 'edit' ? h : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'monolithic')}
                  allowClear
                >
                  {monolithicList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('photoWall', {
                initialValue: modalType === 'edit' ? i : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'photoWall')}
                  allowClear
                >
                  {photoWallList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('idPhoto', {
                initialValue: modalType === 'edit' ? j : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'idPhoto')}
                  allowClear
                >
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
