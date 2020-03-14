import React, { PureComponent } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class AddOrderModal extends PureComponent {
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

  render() {
    const {
      form: { getFieldDecorator },
      onModalCancel,
      showModal,
      initData,
      modalType,
      productList,
    } = this.props;

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
