import React, { PureComponent } from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
    return Number(value).toFixed(2);
  };

  render() {
    const {
      form: { getFieldDecorator },
      onModalCancel,
      showModal,
      initData,
      modalType,
    } = this.props;

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
          <FormItem {...modalFormItemLayout} label="家长姓名">
            {getFieldDecorator('babyName', {
              initialValue: modalType === 'edit' ? initData.babyName : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="宝贝姓名">
            {getFieldDecorator('babyName', {
              initialValue: modalType === 'edit' ? initData.babyName : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="农历生日">
            {getFieldDecorator('lunarBirthdayDate', {
              initialValue: modalType === 'edit' ? initData.lunarBirthdayDate : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="新历生日">
            {getFieldDecorator('solarBirthdayDate', {
              initialValue: modalType === 'edit' ? initData.solarBirthdayDate : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="联系电话">
            {getFieldDecorator('phoneNum', {
              initialValue: modalType === 'edit' ? initData.phoneNum : null,
              rules: [
                {
                  validator: this.validatePhone1,
                },
              ],
            })(<Input maxLength={11} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="套餐名称">
            {getFieldDecorator('productName', {
              initialValue: modalType === 'edit' ? initData.productName : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="实付金额">
            {getFieldDecorator('payedMoney', {
              initialValue: modalType === 'edit' ? initData.payedMoney : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="未付金额">
            {getFieldDecorator('unPayMoney', {
              initialValue: modalType === 'edit' ? initData.unPayMoney : null,
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
