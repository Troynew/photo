import React, { PureComponent } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import config from '@/utils/config';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class AddOrderModal extends PureComponent {
  state = {
    product: [
      { key: 'extraMv', value: '', id: 'MV' },
      { key: 'extraPainting', value: '', id: '挂画' },
      { key: 'extraVideo', value: '', id: '微视' },
      { key: 'extraMonolithic', value: '', id: '单片' },
      { key: 'extraPhotoWall', value: '', id: '照片墙' },
      { key: 'extraIdPhoto', value: '', id: '证件照' },
    ],
  };

  componentDidMount() {
    const {
      initData: {
        extraMv,
        extraPainting,
        extraVideo,
        extraMonolithic,
        extraPhotoWall,
        extraIdPhoto,
      },
    } = this.props;
    let newProductLlist = [
      { key: 'extraMv', value: extraMv, id: 'MV' },
      { key: 'extraPainting', value: extraPainting, id: '挂画' },
      { key: 'extraVideo', value: extraVideo, id: '微视' },
      { key: 'extraMonolithic', value: extraMonolithic, id: '单片' },
      { key: 'extraPhotoWall', value: extraPhotoWall, id: '照片墙' },
      { key: 'extraIdPhoto', value: extraIdPhoto, id: '证件照' },
    ];
    console.log('newProduct', newProductLlist);
    this.setState({ product: newProductLlist });
  }

  handleModalOk = () => {
    const {
      form: { validateFields },
      onModalOK,
    } = this.props;
    const { product } = this.state;
    validateFields((err, values) => {
      if (err) return;
      values.extra = product
        .filter(item => item.value)
        .map(item => item.id + ':' + item.value)
        .toLocaleString();
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

  handleProductChange = (value, type) => {
    const { product } = this.state;
    const newProduct = product.map(item => {
      if (item.key === type) {
        item.value = value !== undefined ? value : '';
      }
      return item;
    });
    console.log('change', newProduct);
    this.setState({ product: newProduct });
  };

  render() {
    const {
      form: { getFieldDecorator },
      onModalCancel,
      showModal,
      initData,
      modalType,
      productList,
      mvList = [],
      paintingList = [],
      videoList = [],
      monolithicList = [],
      photoWallList = [],
      idPhotoList = [],
    } = this.props;

    const { product } = this.state;
    const extra = product
      .filter(item => item.value)
      .map(item => item.id + ':' + item.value)
      .toLocaleString();

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
            <div style={{ height: '64px', width: '100%', border: '1px solid #d9d9d9' }}>
              {extra}
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
              {getFieldDecorator('extraMv', {
                initialValue: modalType === 'edit' ? initData.extraMv : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraMv')}
                  allowClear
                >
                  {mvList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('extraPainting', {
                initialValue: modalType === 'edit' ? initData.extraPainting : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraPainting')}
                  allowClear
                >
                  {paintingList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('extraVideo', {
                initialValue: modalType === 'edit' ? initData.extraVideo : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraVideo')}
                  allowClear
                >
                  {videoList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
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
              {getFieldDecorator('extraMonolithic', {
                initialValue: modalType === 'edit' ? initData.extraMonolithic : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraMonolithic')}
                  allowClear
                >
                  {monolithicList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('extraPhotoWall', {
                initialValue: modalType === 'edit' ? initData.extraPhotoWall : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraPhotoWall')}
                  allowClear
                >
                  {photoWallList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}

              {getFieldDecorator('extraIdPhoto', {
                initialValue: modalType === 'edit' ? initData.extraIdPhoto : null,
              })(
                <Select
                  placeholder="请选择"
                  onChange={value => this.handleProductChange(value, 'extraIdPhoto')}
                  allowClear
                >
                  {idPhotoList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
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
            {getFieldDecorator('firstState', {
              initialValue: modalType === 'edit' ? initData.firstStage : '',
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第二期">
            {getFieldDecorator('secondStage', {
              initialValue: modalType === 'edit' ? initData.secondStage : '',
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...modalFormItemLayout} label="第三期">
            {getFieldDecorator('thirdStage', {
              initialValue: modalType === 'edit' ? initData.thirdStage : '',
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
