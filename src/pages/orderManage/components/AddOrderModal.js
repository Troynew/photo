import React, { PureComponent } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const Option = Select.Option;

const babyStatus = [
  { key: 0, value: '未跟进' },
  { key: 1, value: '洽谈中' },
  { key: 2, value: '已签单' },
  { key: 3, value: '无意向' },
];

@Form.create()
export default class AddOrderModal extends PureComponent {
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
    validateFields((err, values) => {
      if (err) return;
      onModalOK(values);
    });
  };

  phoneRegex = value => {
    const regex = /^1(3|4|5|7|8|9)\d{9}$/;
    return regex.test(value);
  };

  validatePhone1 = (rule, value, callback) => {
    if (value !== this.props.initData.fatherPhoneNum) {
      if (!value) {
        callback();
      }
      if (!this.phoneRegex(value)) {
        callback('请输入正确的手机号码');
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  validatePhone2 = (rule, value, callback) => {
    if (value !== this.props.initData.motherPhoneNum) {
      if (!value) {
        callback();
      }
      if (!this.phoneRegex(value)) {
        callback('请输入正确的手机号码');
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2) || 0;
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
      productList,
    } = this.props;

    const { product } = this.state;

    console.log('props', this.props);

    return (
      <Modal
        title={modalType === 'add' ? '新增订单' : '编辑订单'}
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
              initialValue: modalType === 'edit' ? initData.packageId : null,
            })(
              <Select placeholder="请选择">
                {productList.map(item => (
                  <Option key={String(item.id)} value={item.id}>
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
              initialValue: modalType === 'edit' ? initData.paidMoney : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="未付金额">
            {getFieldDecorator('unPaidMoney', {
              initialValue: modalType === 'edit' ? initData.unPaidMoney : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="余额">
            {getFieldDecorator('balance', {
              initialValue: modalType === 'edit' ? this.showTwoDemical(initData.balance) : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第一期">
            {getFieldDecorator('first', {
              initialValue: modalType === 'edit' ? initData.first : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第二期">
            {getFieldDecorator('second', {
              initialValue: modalType === 'edit' ? initData.second : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第三期">
            {getFieldDecorator('third', {
              initialValue: modalType === 'edit' ? initData.third : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="备注">
            {getFieldDecorator('remark', {
              initialValue: modalType === 'edit' ? initData.remark : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
