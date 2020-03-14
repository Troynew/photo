import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd';
import AddUserModal from './components/AddUserModal';
import AddOrder from './components/addOrder';
import { Authorized } from '@/components/Authorized';
import ListPageWrapper from '@/components/ListPageWrapper';
import ListForm from '@/components/ListForm';
import ListTable from '@/components/ListTable';
import NotBubbleBlock from '@/components/NotBubbleBlock';
import { _UNITE_SELECT_ALL } from '@/components/ListForm/utils/constants';
import moment from 'moment';

@connect(({ loading, userManage }) => ({
  loading: loading.effects['userManage/queryUserList'],
  list: userManage.list,
  pagination: userManage.pagination,
}))
export default class User extends Component {
  state = {
    showAddModal: false,
    showAddOrderModal: false,
    userInfo: {},
    modalType: null,
    idList: [],
    deleteAll: false,
    productList: [],
  };

  query = this.props.location.query;

  columns = [
    {
      title: '宝贝姓名',
      dataIndex: 'babyName',
      render: (text, record) => (
        <NotBubbleBlock>
          <a onClick={() => this.handleViewUserOrder(record)}>{text}</a>
        </NotBubbleBlock>
      ),
    },
    {
      title: '性别',
      dataIndex: 'babySex',
      render: text => <span>{text === 1 ? '男' : '女'}</span>,
    },
    {
      title: '宝贝年龄',
      dataIndex: 'babyAge',
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
      title: '父亲',
      dataIndex: 'fatherName',
    },
    {
      title: '父亲电话',
      dataIndex: 'fatherPhoneNum',
    },
    {
      title: '母亲',
      dataIndex: 'motherName',
    },
    {
      title: '母亲电话',
      dataIndex: 'motherPhoneNum',
    },
    {
      title: '余额',
      dataIndex: 'balance',
      showAll: true,
      render: text => this.showTwoDemical(text),
    },
    {
      title: '家庭住址',
      dataIndex: 'address',
    },
    {
      title: '客户来源',
      dataIndex: 'customerSource',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      showAll: true,
      render: (text, record) => (
        <NotBubbleBlock>
          <Authorized authority={'user:edit'}>
            <a onClick={() => this.handleEditUser(record)} style={{ marginRight: '10px' }}>
              编辑
            </a>
          </Authorized>
          <Authorized authority={'order:add'}>
            <a onClick={() => this.handleAddOrder(record)}>新增订单</a>
          </Authorized>
        </NotBubbleBlock>
      ),
    },
  ];

  listFormData = [
    {
      name: 'babyName',
      label: '宝贝名字',
      type: 'input',
      initialValue: this.query.babyName,
    },
    {
      name: 'babyAge',
      label: '宝贝年龄',
      type: 'input',
      initialValue: this.query.babyAge,
    },
    {
      name: 'solarBirthdayDate',
      label: '新历生日',
      type: 'datePicker',
      initialValue: this.query.solarBirthdayDate,
      format: 'YYYY-MM-DD',
    },
  ];

  // componentDidMount() {
  //   router.push({
  //     pathname: '/userManage',
  //     query: { pageNum: '1', pageSize: '10' },
  //   });
  // }

  handleSearch = params => {
    let query = {};
    for (let key in params) {
      if (key === 'solarBirthdayDate' && params[key] === null) continue;
      if (key === 'solarBirthdayDate' && params[key] !== null) {
        query[key] = moment(params[key]).format('YYYY-MM-DD');
        continue;
      }
      query[key] = params[key];
    }
    router.push({
      pathname: '/userManage',
      query: {
        ...query,
      },
    });
  };

  handleShowAddModal = () => this.setState({ showAddModal: true, modalType: 'add' });

  handleCloseAddModal = () => this.setState({ showAddModal: false });

  handleCloseAddOrderModal = () => this.setState({ showAddOrderModal: false });

  handleAddUser = userData => {
    console.log('userData', userData);
    if (this.state.modalType === 'add') {
      this.props
        .dispatch({
          type: 'userManage/addUser',
          payload: userData,
        })
        .then(res => {
          message.success('新增宝贝资料成功');
          router.push({
            pathname: '/userManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    } else {
      const { userInfo } = this.state;
      this.props
        .dispatch({
          type: 'userManage/editUser',
          payload: {
            ...userInfo,
            ...userData,
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
          message.success('修改宝贝资料成功');
          router.push({
            pathname: '/userManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    }
  };

  handleAddOrderOk = orderData => {
    console.log('orderData', orderData);
    const {
      userInfo: { id },
    } = this.state;
    this.props
      .dispatch({
        type: 'userManage/addOrder',
        payload: {
          ...orderData,
          babyId: id,
        },
      })
      .then(res => {
        message.success('新增订单成功');
        router.push({
          pathname: '/orderManage',
          query: {
            userId: id,
          },
        });
        this.setState({ showAddOrderModal: false });
      });
  };

  handleDeleteUser = () => {
    const { idList } = this.state;
    const that = this;
    if (idList.length === 0) {
      message.warn('请勾选要删除的用户');
      return;
    } else {
      Modal.confirm({
        title: '确定删除宝贝资料嘛?',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          that.props
            .dispatch({
              type: 'userManage/deleteUser',
              payload: { ids: idList },
            })
            .then(res => {
              message.success('删除成功');
              router.push({
                pathname: '/userManage',
                query: that.props.location.query,
              });
            });
        },
        onCancel() {},
      });
    }
  };

  handleEditUser = userInfo => {
    const { id, ...rest } = userInfo;
    this.setState({ showAddModal: true, modalType: 'edit', userInfo: rest });
  };

  handleAddOrder = userInfo => {
    this.props
      .dispatch({
        type: 'userManage/queryProductList',
        payload: { pageSize: '100', pageNum: '1' },
      })
      .then(data => {
        data && this.setState({ showAddOrderModal: true, userInfo, productList: data });
      });
  };

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2);
  };

  handleSelectChange = (idList, rowData) => {
    const { id, ...rest } = rowData;
    this.setState({ idList, userInfo: rest });
  };

  handleSelectAllChange = (idList, isSelected, rowData) => this.setState({ idList });

  handleViewUserOrder = userData => {
    const { id } = userData;
    router.push({ pathname: '/orderManage', query: { userId: id } });
  };

  render() {
    const { pagination, loading, list } = this.props;
    console.log('list===>', list);

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
      onModalOK: this.handleAddUser,
      initData: this.state.userInfo,
      modalType: this.state.modalType,
    };

    const orderModalProps = {
      showModal: this.state.showAddOrderModal,
      onModalCancel: this.handleCloseAddOrderModal,
      onModalOK: this.handleAddOrderOk,
      initData: this.state.userInfo,
      productList: this.state.productList,
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
              <Authorized authority={'user:add'}>
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
                onClick={this.handleEditUser}
                style={{ display: 'inLine-block' }}
              >
                编辑
              </Button> */}
              <Authorized authority={'user:delete'}>
                <Button
                  icon="user-delete"
                  type="primary"
                  onClick={this.handleDeleteUser}
                  style={{ display: 'inLine-block' }}
                >
                  删除
                </Button>
              </Authorized>
            </div>
          }
          listInst={<ListTable {...tableProps} />}
        />
        <AddUserModal {...modalProps} />
        <AddOrder {...orderModalProps} />
      </>
    );
  }
}
