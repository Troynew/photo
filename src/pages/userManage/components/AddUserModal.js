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
    } = this.props;

    return (
      <Modal
        title="新建客户"
        visible={showModal}
        onOk={this.handleModalOk}
        onCancel={onModalCancel}
        maskClosable={true}
      >
        <Form>
          <FormItem {...modalFormItemLayout} label="宝贝姓名">
            {getFieldDecorator('babyName')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="性别">
            {getFieldDecorator('babySex')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="农历生日">
            {getFieldDecorator('lunarBirthdayDate')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="新历生日">
            {getFieldDecorator('solarBirthdayDate', {
              rules: [
                {
                  required: true,
                  message: '请输入新历生日',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="父亲">
            {getFieldDecorator('fatherName')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="母亲">
            {getFieldDecorator('motherName', {
              rules: [
                {
                  required: true,
                  message: '请输入母亲姓名或者父亲姓名',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="父亲电话">
            {getFieldDecorator('fatherPhoneNum')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="母亲电话">
            {getFieldDecorator('motherPhoneNum', {
              rules: [
                {
                  required: true,
                  message: '请输入组别母亲或者父亲电话电话',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="家庭住址">
            {getFieldDecorator('address')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="客户来源">
            {getFieldDecorator('customerSource')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="备注">
            {getFieldDecorator('remark')(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
