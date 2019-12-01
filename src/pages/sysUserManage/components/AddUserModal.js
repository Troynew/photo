import React, { PureComponent } from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
export default class AddUserModal extends PureComponent {
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
        title={modalType === 'add' ? '新建用户' : '编辑用户'}
        visible={showModal}
        onOk={this.handleModalOk}
        onCancel={onModalCancel}
        maskClosable={true}
        okText="保存"
        destroyOnClose
      >
        <Form>
          <FormItem {...modalFormItemLayout} label="角色">
            {getFieldDecorator('userType', {
              initialValue: modalType === 'edit' ? initData.userType : null,
              rules: [{ required: true, message: '请输入角色' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="用户名">
            {getFieldDecorator('loginName', {
              initialValue: modalType === 'edit' ? initData.loginName : null,
              rules: [{ required: true, message: '用户名' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="密码">
            {getFieldDecorator('password', {
              initialValue: modalType === 'edit' ? initData.password : null,
              rules: [{ required: true, message: '请输入密码' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="电话">
            {getFieldDecorator('phoneNumber', {
              initialValue: modalType === 'edit' ? initData.phoneNumber : null,
              rules: [
                {
                  required: true,
                  message: '请输入电话',
                },
                {
                  validator: this.validatePhone2,
                },
              ],
            })(<Input maxLength={11} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="是否启用">
            {getFieldDecorator('status', {
              initialValue: modalType === 'edit' ? initData.status : null,
              rules: [{ required: true, message: '请选择启用状态' }],
            })(
              <RadioGroup>
                <Radio value={0}>启用</Radio>
                <Radio value={1}>禁用</Radio>
              </RadioGroup>
            )}
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
