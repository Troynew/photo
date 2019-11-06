import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Button } from 'antd';
import AddUserModal from './components/AddUserModal';

import ListPageWrapper from '@/components/ListPageWrapper';
import ListForm from '@/components/ListForm';
import ListTable from '@/components/ListTable';
import NotBubbleBlock from '@/components/NotBubbleBlock';
import { _UNITE_SELECT_ALL } from '@/components/ListForm/utils/constants';

@connect(({ loading, userManage }) => ({
  loading: loading.effects['userManage/queryUserList'],
  list: userManage.list,
  pagination: userManage.pagination,
}))
export default class User extends Component {
  state = { showAddModal: false, userInfo: {}, modalType: null };

  query = this.props.location.query;

  columns = [
    {
      title: '宝贝姓名',
      dataIndex: 'babyName',
    },
    {
      title: '性别',
      dataIndex: 'babySex',
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
      title: '编辑',
      dataIndex: 'edit',
      render: (text, record) => {
        return (
          <div>
            <NotBubbleBlock>
              <a onClick={() => this.handleEditUser(record)}>编辑</a>
            </NotBubbleBlock>
            <NotBubbleBlock>
              <a onClick={() => this.handleDeleteUser(record)}>删除</a>
            </NotBubbleBlock>
          </div>
        );
      },
    },
  ];

  listFormData = [
    {
      name: 'babyName',
      label: '宝贝名字',
      type: 'input',
      initialValue: this.query.babyName,
    },
  ];

  componentDidMount() {
    router.push({
      pathname: '/userManage',
      query: { pageNum: '1', pageSize: '10' },
    });
  }

  handleSearch = params => {
    console.log('params', params);
    router.push({
      pathname: '/userManage',
      query: { ...this.props.location.query, ...params },
    });
  };

  handleShowAddModal = () => this.setState({ showAddModal: true, modalType: 'add' });

  handleCloseAddModal = () => this.setState({ showAddModal: false });

  handleAddUser = userData => {
    if (this.state.modalType === 'add') {
      console.log('add===>', userData);
      this.props
        .dispatch({
          type: 'userManage/addUser',
          payload: userData,
        })
        .then(res => {
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
          payload: { ...userInfo, ...userData },
        })
        .then(res => {
          router.push({
            pathname: '/userManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    }
  };

  handleDeleteUser = data => {
    this.props.dispatch({
      type: 'userManage/deleteUser',
      payload: { babyId: data.babyId },
    });
  };

  handleEditUser = data => this.setState({ showAddModal: true, userInfo: data, modalType: 'edit' });

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2);
  };

  render() {
    const { pagination, loading, list } = this.props;

    const tableProps = {
      columns: this.columns,
      dataSource: list,
      loading,
      pagination,
    };

    const modalProps = {
      showModal: this.state.showAddModal,
      onModalCancel: this.handleCloseAddModal,
      onModalOK: this.handleAddUser,
      initData: this.state.userInfo,
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
              <Button
                icon="plus"
                type="primary"
                onClick={this.handleShowAddModal}
                style={{ display: 'inLine-block' }}
              >
                新增用户
              </Button>
            </div>
          }
          listInst={<ListTable {...tableProps} />}
        />
        <AddUserModal {...modalProps} />
      </>
    );
  }
}
