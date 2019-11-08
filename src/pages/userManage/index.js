import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Button, message } from 'antd';
import AddUserModal from './components/AddUserModal';

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
    userInfo: {},
    modalType: null,
    idList: [],
    allIdList: [],
    deleteAll: false,
  };

  query = this.props.location.query;

  columns = [
    {
      title: '宝贝姓名',
      dataIndex: 'babyName',
    },
    {
      title: '性别',
      dataIndex: 'babySex',
      render: text => <span>{text === 1 ? '男' : '女'}</span>,
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
  ];

  listFormData = [
    {
      name: 'babyName',
      label: '宝贝名字',
      type: 'input',
      initialValue: this.query.babyName,
    },
    {
      name: 'solarBirthdayDate',
      label: '新历生日',
      type: 'datePicker',
      initialValue: this.query.solarBirthdayDate,
      format: 'YYYY-MM-DD',
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
    const { solarBirthdayDate } = params;
    router.push({
      pathname: '/userManage',
      query: {
        ...this.props.location.query,
        ...params,
        solarBirthdayDate: solarBirthdayDate
          ? moment(solarBirthdayDate).format('YYYY-MM-DD')
          : null,
      },
    });
  };

  handleShowAddModal = () => this.setState({ showAddModal: true, modalType: 'add' });

  handleCloseAddModal = () => this.setState({ showAddModal: false });

  handleAddUser = userData => {
    if (this.state.modalType === 'add') {
      console.log('add===>', userData);
      const { babySex, lunarBirthdayDate, solarBirthdayDate } = userData;
      this.props
        .dispatch({
          type: 'userManage/addUser',
          payload: {
            ...userData,
            babySex: babySex === '男' ? 1 : 2,
            solarBirthdayDate: solarBirthdayDate
              ? moment(solarBirthdayDate).format('YYYY-MM-DD')
              : null,
            lunarBirthdayDate: lunarBirthdayDate
              ? moment(lunarBirthdayDate).format('YYYY-MM-DD')
              : null,
          },
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
            solarBirthdayDate: solarBirthdayDate
              ? moment(solarBirthdayDate).format('YYYY-MM-DD')
              : null,
            lunarBirthdayDate: lunarBirthdayDate
              ? moment(lunarBirthdayDate).format('YYYY-MM-DD')
              : null,
            createBy: null,
            params: null,
            searchValue: null,
            updateBy: null,
            updataTime: null,
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

  handleDeleteUser = () => {
    const { idList } = this.state;
    if (idList.length === 0) {
      message.warn('请选择要删除的用户');
      return;
    } else {
      this.props
        .dispatch({
          type: 'userManage/deleteUser',
          payload: { ids: idList },
        })
        .then(res => {
          message.success('删除成功');
          router.push({
            pathname: '/userManage',
            query: this.props.location.query,
          });
        });
    }
  };

  handleEditUser = () => {
    const { idList } = this.state;
    if (idList.length === 0) {
      message.warn('请选择一个会员');
      return;
    } else if (idList.length > 1) {
      message.warn('只能选择一个会员');
      return;
    } else {
      this.setState({ showAddModal: true, modalType: 'edit' });
    }
  };

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2);
  };

  handleSelectChange = (idList, rowData) => this.setState({ idList, userInfo: rowData });
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
                icon="user-add"
                type="primary"
                onClick={this.handleShowAddModal}
                style={{ display: 'inLine-block' }}
              >
                新增
              </Button>
              <Button
                icon="user-add"
                type="primary"
                onClick={this.handleEditUser}
                style={{ display: 'inLine-block' }}
              >
                编辑
              </Button>
              <Button
                icon="user-delete"
                type="primary"
                onClick={this.handleDeleteUser}
                style={{ display: 'inLine-block' }}
              >
                删除
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
