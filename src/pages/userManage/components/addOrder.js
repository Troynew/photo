import React, { PureComponent } from 'react';
import { Form, Input, Modal, Radio, Select } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const Option = Select.Option;

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
      productList = [],
    } = this.props;

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
      >
        <Form>
          <FormItem {...modalFormItemLayout} label="套餐名称">
            {getFieldDecorator('productId', {
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
          <FormItem {...modalFormItemLayout} label="实付金额">
            {getFieldDecorator('payedMoney', {
              initialValue: null,
              rules: [{ required: true, message: '请输入实付金额' }],
            })(<Input type="number" placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="未付金额">
            {getFieldDecorator('unPyaMoney', {
              initialValue: null,
              rules: [{ required: true, message: '请输入未付金额' }],
            })(<Input type="number" placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="付款方式">
            {getFieldDecorator('payType', {
              initialValue: null,
              rules: [{ required: true, message: '请输入付款方式' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="备注">
            {getFieldDecorator('remark')(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
