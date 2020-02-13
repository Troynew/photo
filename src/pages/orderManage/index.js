import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd';
import AddOrderModal from './components/AddOrderModal';
import { Authorized } from '@/components/Authorized';
import ListPageWrapper from '@/components/ListPageWrapper';
import ListForm from '@/components/ListForm';
import ListTable from '@/components/ListTable';
import NotBubbleBlock from '@/components/NotBubbleBlock';
import { _UNITE_SELECT_ALL } from '@/components/ListForm/utils/constants';
import moment from 'moment';

@connect(({ loading, orderManage }) => ({
  loading: loading.effects['orderManage/queryOrderList'],
  list: orderManage.list,
  pagination: orderManage.pagination,
}))
export default class Order extends Component {
  state = {
    showAddModal: false,
    orderInfo: {},
    modalType: null,
    idList: [],
    deleteAll: false,
  };

  query = this.props.location.query;

  columns = [
    {
      title: '家长姓名',
      dataIndex: 'parentName',
    },
    {
      title: '宝贝姓名',
      dataIndex: 'babyName',
    },
    {
      title: '农历生日',
      dataIndex: 'lunarBirthdayDate',
    },
    {
      title: '新历生日',
      dataIndex: 'solarBirthdayDate',
    },
    {
      title: '联系电话',
      dataIndex: 'phoneNum',
    },
    {
      title: '套餐名称',
      dataIndex: 'productName',
    },
    {
      title: '实付金额',
      dataIndex: 'payedMoney',
    },
    {
      title: '未付金额',
      dataIndex: 'unPayMoney',
    },
    {
      title: '付款方式',
      dataIndex: 'payType',
    },
    {
      title: '余额',
      dataIndex: 'balance',
      showAll: true,
      render: text => this.showTwoDemical(text),
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      showAll: true,
      render: (text, record) => (
        <NotBubbleBlock>
          <Authorized authority={'order:edit'}>
            <a onClick={() => this.handleEditOrder(record)}>编辑</a>
          </Authorized>
        </NotBubbleBlock>
      ),
    },
  ];

  listFormData = [
    {
      name: 'parentName',
      label: '家长姓名',
      type: 'input',
      initialValue: this.query.parentName,
    },
    {
      name: 'babyName',
      label: '宝贝姓名',
      type: 'input',
      initialValue: this.query.babyName,
    },
    {
      name: 'phoneNum',
      label: '电话',
      type: 'input',
      initialValue: this.query.phoneNum,
    },
    {
      name: 'productName',
      label: '套餐',
      type: 'input',
      initialValue: this.query.productName,
    },
    {
      name: 'solarBirthdayDate',
      label: '新历生日',
      type: 'datePickerRange',
      initialValue: this.query.solarBirthdayDate ? this.query.solarBirthdayDate.split(' ') : null,
      format: 'YYYY-MM-DD',
    },
    {
      name: 'lunarBirthdayDate',
      label: '农历生日',
      type: 'datePickerRange',
      initialValue: this.query.lunarBirthdayDate ? this.query.lunarBirthdayDate.split(' ') : null,
      format: 'YYYY-MM-DD',
    },
  ];

  // componentDidMount() {
  //   router.push({
  //     pathname: '/orderManage',
  //     query: { pageNum: '1', pageSize: '10' },
  //   });
  // }

  handleSearch = params => {
    console.log('params', params);
    let query = {};
    for (let key in params) {
      if (key === 'solarBirthdayDate' && params[key].length === 0) continue;
      if (key === 'solarBirthdayDate' && params[key].length === 2) {
        query[key] =
          moment(params[key][0]).format('YYYY-MM-DD') +
          ' ' +
          moment(params[key][1]).format('YYYY-MM-DD');
        continue;
      }
      if (key === 'lunarBirthdayDate' && params[key].length === 0) continue;
      if (key === 'lunarBirthdayDate' && params[key].length === 2) {
        query[key] =
          moment(params[key][0]).format('YYYY-MM-DD') +
          ' ' +
          moment(params[key][1]).format('YYYY-MM-DD');
        continue;
      }
      query[key] = params[key];
    }
    console.log('query', query);
    router.push({
      pathname: '/orderManage',
      query: {
        ...query,
      },
    });
  };

  handleShowAddModal = () => this.setState({ showAddModal: true, modalType: 'add' });

  handleCloseAddModal = () => this.setState({ showAddModal: false });

  handleAddOrder = orderData => {
    console.log('orderData', orderData);
    if (this.state.modalType === 'add') {
      this.props
        .dispatch({
          type: 'orderManage/addOrder',
          payload: orderData,
        })
        .then(res => {
          message.success('新增订单成功');
          router.push({
            pathname: '/orderManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    } else {
      const { orderInfo } = this.state;
      this.props
        .dispatch({
          type: 'orderManage/editOrder',
          payload: {
            ...orderInfo,
            ...orderData,
            createBy: null,
            params: null,
            searchValue: null,
            updateBy: null,
            updataTime: null,
            createTime: null,
            updateTime: null,
          },
        })
        .then(res => {
          message.success('修改订单成功');
          router.push({
            pathname: '/orderManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    }
  };

  handleDeleteOrder = () => {
    const { idList } = this.state;
    const that = this;
    if (idList.length === 0) {
      message.warn('请勾选要删除的订单');
      return;
    } else {
      Modal.confirm({
        title: '确定删除订单嘛?',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          that.props
            .dispatch({
              type: 'orderManage/deleteOrder',
              payload: { ids: idList },
            })
            .then(res => {
              message.success('删除成功');
              router.push({
                pathname: '/orderManage',
                query: that.props.location.query,
              });
            });
        },
        onCancel() {},
      });
    }
  };

  handleEditOrder = orderInfo => {
    const { id, ...rest } = orderInfo;
    this.setState({ showAddModal: true, modalType: 'edit', orderInfo: rest });
  };

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2);
  };

  handleSelectChange = (idList, rowData) => {
    const { id, ...rest } = rowData;
    this.setState({ idList, orderInfo: rest });
  };
  handleSelectAllChange = (idList, isSelected, rowData) => this.setState({ idList });

  render() {
    const { pagination, loading, list } = this.props;

    const tableProps = {
      columns: this.columns,
      dataSource: list,
      loading,
      pagination,
      closeRowSelection: false,
      onSelectChange: this.handleSelectChange,
      onSelectAllChange: this.handleSelectAllChange,
    };

    const modalProps = {
      showModal: this.state.showAddModal,
      onModalCancel: this.handleCloseAddModal,
      onModalOK: this.handleAddOrder,
      initData: this.state.orderInfo,
      modalType: this.state.modalType,
    };

    return (
      <>
        <ListPageWrapper
          listFormInst={
            <ListForm
              dataSource={this.listFormData}
              onSearch={this.handleSearch}
              ref={listForm => (this.listForm = listForm)}
            />
          }
          listOperatorInst={
            <div style={{ height: '32px' }}>
              <Authorized authority={'order:add'}>
                <Button
                  icon="user-add"
                  type="primary"
                  onClick={this.handleShowAddModal}
                  style={{ display: 'inLine-block' }}
                >
                  新增
                </Button>
              </Authorized>

              {/* <Button
                icon="user-add"
                type="primary"
                onClick={this.handleEditOrder}
                style={{ display: 'inLine-block' }}
              >
                编辑
              </Button> */}
              <Authorized authority={'order:delete'}>
                <Button
                  icon="user-delete"
                  type="primary"
                  onClick={this.handleDeleteOrder}
                  style={{ display: 'inLine-block' }}
                >
                  删除
                </Button>
              </Authorized>
            </div>
          }
          listInst={<ListTable {...tableProps} />}
        />
        <AddOrderModal {...modalProps} />
      </>
    );
  }
}
