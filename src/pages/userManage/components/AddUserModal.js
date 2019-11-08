import React, { PureComponent } from 'react';
import { Form, Input, Modal, Radio, DatePicker } from 'antd';
import moment from 'moment';
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
    console.log('cufk', this.props);
    validateFields((err, values) => {
      if (err) return;
      console.log('fuck');
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
        title={modalType === 'add' ? '新建客户' : '编辑用户'}
        visible={showModal}
        onOk={this.handleModalOk}
        onCancel={onModalCancel}
        maskClosable={true}
        okText="保存"
        destroyOnClose
      >
        <Form>
          <FormItem {...modalFormItemLayout} label="宝贝姓名">
            {getFieldDecorator('babyName', {
              initialValue: modalType === 'edit' ? initData.babyName : null,
              rules: [{ required: true, message: '请输入宝贝姓名' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="性别">
            {getFieldDecorator('babySex', {
              initialValue: modalType === 'edit' ? initData.babySex : null,
              rules: [{ required: true, message: '请选择宝贝性别' }],
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="农历生日">
            {getFieldDecorator('lunarBirthdayDate', {
              initialValue:
                modalType === 'edit'
                  ? initData.lunarBirthdayDate
                    ? moment(initData.lunarBirthdayDate)
                    : null
                  : null,
            })(<DatePicker format={'YYYY-MM-DD'} />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="新历生日">
            {getFieldDecorator('solarBirthdayDate', {
              initialValue: modalType === 'edit' ? moment(initData.solarBirthdayDate) : null,
              rules: [
                {
                  required: true,
                  message: '请输入新历生日',
                },
              ],
            })(<DatePicker format={'YYYY-MM-DD'} />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="父亲">
            {getFieldDecorator('fatherName', {
              initialValue: modalType === 'edit' ? initData.fatherName : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="母亲">
            {getFieldDecorator('motherName', {
              initialValue: modalType === 'edit' ? initData.motherName : null,
              rules: [
                {
                  required: true,
                  message: '请输入母亲姓名或者父亲姓名',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="父亲电话">
            {getFieldDecorator('fatherPhoneNum', {
              initialValue: modalType === 'edit' ? initData.fatherPhoneNum : null,
              rules: [
                {
                  validator: this.validatePhone1,
                },
              ],
            })(<Input maxLength={11} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="母亲电话">
            {getFieldDecorator('motherPhoneNum', {
              initialValue: modalType === 'edit' ? initData.motherPhoneNum : null,
              validator: this.validatePhone,
              rules: [
                {
                  required: true,
                  message: '请输入组别母亲或者父亲电话电话',
                },
                {
                  validator: this.validatePhone2,
                },
              ],
            })(<Input maxLength={11} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="家庭住址">
            {getFieldDecorator('address', {
              initialValue: modalType === 'edit' ? initData.address : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="客户来源">
            {getFieldDecorator('customerSource', {
              initialValue: modalType === 'edit' ? initData.customerSource : null,
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
