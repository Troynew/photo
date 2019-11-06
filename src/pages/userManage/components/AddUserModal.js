import React, { PureComponent } from 'react';
import { Form, Input, Modal } from 'antd';

import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;

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
      >
        <Form>
          <FormItem {...modalFormItemLayout} label="宝贝姓名">
            {getFieldDecorator('babyName', {
              initialValue: modalType === 'edit' ? initData.babyName : null,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="性别">
            {getFieldDecorator('babySex', {
              initialValue: modalType === 'edit' ? initData.babySex : null,
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
              rules: [
                {
                  required: true,
                  message: '请输入新历生日',
                },
              ],
            })(<Input placeholder="请输入" />)}
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
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="母亲电话">
            {getFieldDecorator('motherPhoneNum', {
              initialValue: modalType === 'edit' ? initData.motherPhoneNUm : null,

              rules: [
                {
                  required: true,
                  message: '请输入组别母亲或者父亲电话电话',
                },
              ],
            })(<Input placeholder="请输入" />)}
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
