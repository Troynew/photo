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
    validateFields((err, values) => {
      if (err) return;
      onModalOK(values);
    });
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
        title={modalType === 'add' ? '新建套餐' : '编辑套餐'}
        visible={showModal}
        onOk={this.handleModalOk}
        onCancel={onModalCancel}
        maskClosable={true}
        okText="保存"
        destroyOnClose
      >
        <Form>
          <FormItem {...modalFormItemLayout} label="产品">
            {getFieldDecorator('product', {
              initialValue: modalType === 'edit' ? initData.product : null,
            })(<Input placeholder="请输入" />)}
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
