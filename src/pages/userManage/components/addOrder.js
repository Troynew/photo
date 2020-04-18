import React, { PureComponent } from 'react';
import { Form, Input, Modal, Radio, Select } from 'antd';
import config from '@/utils/config';
import Product from '@/pages/productManage';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const Option = Select.Option;
const payTypeList = [
  { key: 1, value: '微信' },
  { key: 2, value: '支付宝' },
  { key: 3, value: '现金' },
  { key: 4, value: '卡扣' },
  { key: 5, value: 'POS' },
  { key: 6, value: '网付' },
];
@Form.create()
export default class AddUserModal extends PureComponent {
  state = {
    product: [
      { key: 'extraMv', value: '', id: 'MV' },
      { key: 'extraPainting', value: '', id: '挂画' },
      { key: 'extraVideo', value: '', id: '微视' },
      { key: 'extraMonolithic', value: '', id: '单片' },
      { key: 'extraPhotoWall', value: '', id: '照片墙' },
      { key: 'extraIdPhoto', value: '', id: '证件照' },
    ],
  };

  handleModalOk = () => {
    const {
      form: { validateFields },
      onModalOK,
    } = this.props;
    const { product } = this.state;
    validateFields((err, values) => {
      if (err) return;
      values.extra = product
        .filter(item => item.value)
        .map(item => item.id + ':' + item.value)
        .toLocaleString();
      console.log('values', values);
      onModalOK(values);
    });
  };

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2);
  };

  handleProductChange = (value, type) => {
    console.log('ddddddddddddddddd', value, type);
    const { product } = this.state;
    const newProduct = product.map(item => {
      if (item.key === type) {
        item.value = value !== undefined ? value : '';
      }
      return item;
    });
    console.log('newProduct', newProduct);
    this.setState({ product: newProduct });
  };

  render() {
    const {
      form: { getFieldDecorator },
      onModalCancel,
      showModal,
      productList = [],
      mvList = [],
      paintingList = [],
      videoList = [],
      monolithicList = [],
      photoWallList = [],
      idPhotoList = [],
    } = this.props;

    const { product } = this.state;
    const extra = product
      .filter(item => item.value)
      .map(item => item.id + ':' + item.value)
      .toLocaleString();

    console.log('props', this.props);
    return (
      <Modal
        title="新增订单"
        visible={showModal}
        onOk={this.handleModalOk}
        onCancel={onModalCancel}
        maskClosable={true}
        okText="保存"
        destroyOnClose
        width={1024}
      >
        <Form>
          <FormItem {...modalFormItemLayout} label="套餐名称">
            {getFieldDecorator('packageId', {
              initialValue: null,
              rules: [{ required: true, message: '请选择套餐类型' }],
            })(
              <Select placeholder="请选择">
                {productList.map(item => (
                  <Option key={String(item.id)} value={String(item.id)}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem {...modalFormItemLayout} label="额外赠送（总监特批）">
            <div style={{ height: '32px', width: '100%', border: '1px solid #d9d9d9' }}>
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
              <div style={{ width: '33%', textAlign: 'center' }}>MV</div>
              <div style={{ width: '33%', textAlign: 'center' }}>挂画</div>
              <div style={{ width: '33%', textAlign: 'center' }}>微视</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {getFieldDecorator('extraMv', {
                initialValue: null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraMv')}
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

              {getFieldDecorator('extraPainting', {
                initialValue: null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraPainting')}
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

              {getFieldDecorator('extraVideo', {
                initialValue: null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraVideo')}
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
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <div style={{ width: '33%', textAlign: 'center' }}>单片</div>
              <div style={{ width: '33%', textAlign: 'center' }}>照片墙</div>
              <div style={{ width: '33%', textAlign: 'center' }}>证件照</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {getFieldDecorator('extraMonolithic', {
                initialValue: null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraMonolithic')}
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

              {getFieldDecorator('extraPhotoWall', {
                initialValue: null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraPhotoWall')}
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

              {getFieldDecorator('extraIdPhoto', {
                initialValue: null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraIdPhoto')}
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

          <FormItem {...modalFormItemLayout} label="实付金额">
            {getFieldDecorator('paidMoney', {
              initialValue: null,
              rules: [{ required: true, message: '请输入实付金额' }],
            })(<Input type="number" placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="未付金额">
            {getFieldDecorator('unPaidMoney', {
              initialValue: null,
              rules: [{ required: true, message: '请输入未付金额' }],
            })(<Input type="number" placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="付款方式">
            {getFieldDecorator('payType', {
              initialValue: null,
              rules: [{ required: true, message: '请选择付款方式' }],
            })(
              <Select placeholder="请选择">
                {payTypeList.map(item => (
                  <Option key={String(item.key)} value={item.key}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第一期">
            {getFieldDecorator('firstStage')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第二期">
            {getFieldDecorator('secondStage')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第三期">
            {getFieldDecorator('thirdStage')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="备注">
            {getFieldDecorator('remark')(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
