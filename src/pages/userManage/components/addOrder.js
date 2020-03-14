import React, { PureComponent } from 'react';
import { Form, Input, Modal, Radio, Select } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const Option = Select.Option;
const payTypeList = [
  { key: 1, value: '微信' },
  { key: 2, value: '支付宝' },
  { key: 3, value: '现金' },
  { key: 4, value: '卡扣' },
  { key: 5, value: 'POS' },
];

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
          <FormItem {...modalFormItemLayout} label="备注">
            {getFieldDecorator('remark')(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
