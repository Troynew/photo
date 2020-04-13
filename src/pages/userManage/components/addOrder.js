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

const babyStatus = [
  { key: 0, value: '未跟进' },
  { key: 1, value: '洽谈中' },
  { key: 2, value: '已签单' },
  { key: 3, value: '无意向' },
];

@Form.create()
export default class AddUserModal extends PureComponent {
  state = { product: '' };

  handleModalOk = () => {
    const {
      form: { validateFields },
      onModalOK,
    } = this.props;
    const { product } = this.state;
    validateFields((err, values) => {
      if (err) return;
      values.product = product;
      const { first = '', second = '', third = '', ...rest } = values;
      rest.orderStage = first + ',' + second + ',' + third;
      onModalOK(rest);
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
      productList = [],
    } = this.props;

    const { product } = this.state;

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
              {getFieldDecorator('mv', {
                initialValue: null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {babyStatus.map(item => {
                    return (
                      <Option key={item.key} value={item.value}>
                        {item.value}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('painting', {
                initialValue: null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {babyStatus.map(item => {
                    return (
                      <Option key={item.key} value={item.value}>
                        {item.value}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('vedio', {
                initialValue: null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {babyStatus.map(item => {
                    return (
                      <Option key={item.key} value={item.value}>
                        {item.value}
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
              {getFieldDecorator('monolithic', {
                initialValue: null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {babyStatus.map(item => {
                    return (
                      <Option key={item.key} value={item.value}>
                        {item.value}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('photowall', {
                initialValue: null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {babyStatus.map(item => {
                    return (
                      <Option key={item.key} value={item.value}>
                        {item.value}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('idphoto', {
                initialValue: null,
              })(
                <Select placeholder="请选择" onChange={this.handleProductChange} allowClear>
                  {babyStatus.map(item => {
                    return (
                      <Option key={item.key} value={item.value}>
                        {item.value}
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
            {getFieldDecorator('first')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第二期">
            {getFieldDecorator('second')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第三期">
            {getFieldDecorator('third')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="备注">
            {getFieldDecorator('remark')(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
