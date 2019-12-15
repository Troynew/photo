import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Button, message, Modal, Switch } from 'antd';
import AddUserModal from './components/AddUserModal';
import UserAuthModal from './components/UserAuthModal';
import { Authorized } from '@/components/Authorized';
import ListPageWrapper from '@/components/ListPageWrapper';
import ListForm from '@/components/ListForm';
import ListTable from '@/components/ListTable';
import NotBubbleBlock from '@/components/NotBubbleBlock';
import { _UNITE_SELECT_ALL } from '@/components/ListForm/utils/constants';

@connect(({ loading, sysUserManage }) => ({
  loading: loading.effects['sysUserManage/queryUserList'],
  list: sysUserManage.list,
  pagination: sysUserManage.pagination,
}))
export default class User extends Component {
  state = {
    showAddModal: false,
    showAuthModal: false,
    userInfo: {},
    modalType: null,
    idList: [],
    deleteAll: false,
  };

  query = this.props.location.query;

  columns = [
    {
      title: '角色',
      dataIndex: 'roles',
      render: text => String(text),
      showAll: true,
    },
    {
      title: '用户名',
      dataIndex: 'loginName',
      showAll: true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      showAll: true,
    },
    {
      title: '电话',
      dataIndex: 'phoneNumber',
      showAll: true,
    },

    {
      title: '启用状态',
      dataIndex: 'status',
      showAll: true,
      render: (text, record) => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="停用"
            defaultChecked={text === '0' ? true : false}
            onChange={() => this.handleSysUserStatusChange(record)}
            // checked={text === 0 ? true : false}
          />
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      showAll: true,
    },
    {
      title: '权限',
      dataIndex: 'permission',
      showAll: true,
      render: (text = [], record) => (
        <NotBubbleBlock>
          <Authorized authority={'sysUser:permission'}>
            <a onClick={() => this.handleShowAuthModal(record)}>
              {(text || []).length > 0 ? '编辑' : '新增'}
            </a>
          </Authorized>
        </NotBubbleBlock>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      showAll: true,
      render: (text, record) => (
        <NotBubbleBlock>
          <Authorized authority={'sysUser:edit'}>
            <a onClick={() => this.handleEditUser(record)}>编辑</a>
          </Authorized>
        </NotBubbleBlock>
      ),
    },
  ];

  listFormData = [
    {
      name: 'sysUserName',
      label: '用户名',
      type: 'input',
      initialValue: this.query.sysUserName,
    },
  ];

  handleAddUser = userData => {
    console.log('userData', userData);
    if (this.state.modalType === 'add') {
      this.props
        .dispatch({
          type: 'sysUserManage/addUser',
          payload: { ...userData, permission: '', userType: '00' },
        })
        .then(res => {
          message.success('新增系统用户资料成功');
          router.push({
            pathname: '/sysUserManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    } else {
      const { userInfo } = this.state;
      this.props
        .dispatch({
          type: 'sysUserManage/editUser',
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
            loginIp: null,
            loginDate: null,
            roles: [],
            roleIds: null,
            postIds: null,
          },
        })
        .then(res => {
          message.success('修改系统用户资料成功');
          router.push({
            pathname: '/sysUserManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    }
  };

  handleDeleteUser = () => {
    const { idList } = this.state;
    const that = this;
    if (idList.length === 0) {
      message.warn('请勾选要删除的用户');
      return;
    } else {
      Modal.confirm({
        title: '确定删除系统用户资料嘛?',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          that.props
            .dispatch({
              type: 'sysUserManage/deleteUser',
              payload: { ids: idList },
            })
            .then(res => {
              if (res.code === 0) {
                message.success('删除成功');
                router.push({
                  pathname: '/sysUserManage',
                  query: that.props.location.query,
                });
              } else {
                message.warn(`${res.msg}`);
                return;
              }
            });
        },
        onCancel() {},
      });
    }
  };

  handleSysUserStatusChange = userInfo => {
    this.props
      .dispatch({
        type: 'sysUserManage/editUser',
        payload: {
          ...userInfo,
          status: userInfo.status === '0' ? '1' : '0',
          createBy: null,
          params: null,
          searchValue: null,
          updateBy: null,
          updataTime: null,
          createTime: null,
          updateTime: null,
          loginIp: null,
          loginDate: null,
          roles: [],
          roleIds: null,
          postIds: null,
        },
      })
      .then(res => res.status && message.success('修改用户状态成功'));
  };

  handleEditUserAuth = newPermission => {
    const { userInfo } = this.state;
    this.props
      .dispatch({
        type: 'sysUserManage/editUser',
        payload: {
          ...userInfo,
          permission: String(newPermission),
          createBy: null,
          params: null,
          searchValue: null,
          updateBy: null,
          updataTime: null,
          createTime: null,
          updateTime: null,
          loginIp: null,
          loginDate: null,
          roles: [],
          roleIds: null,
          postIds: null,
        },
      })
      .then(res => {
        res.status && message.success('修改用户权限成功');
      });
  };

  handleSearch = params => {
    router.push({
      pathname: '/sysUserManage',
      query: params,
    });
  };

  handleShowAddModal = () => this.setState({ showAddModal: true, modalType: 'add' });

  handleShowAuthModal = userInfo => this.setState({ showAuthModal: true, userInfo });

  handleCloseAddModal = () => this.setState({ showAddModal: false });

  handleCloseAuthModal = () => this.setState({ showAuthModal: false });

  handleEditUser = userInfo => {
    this.setState({ showAddModal: true, modalType: 'edit', userInfo });
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

    const authModalProps = {
      showModal: this.state.showAuthModal,
      onModalCancel: this.handleCloseAuthModal,
      onModalOK: this.handleEditUserAuth,
      initData: this.state.userInfo,
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
              <Authorized authority={'sysUser:add'}>
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
              <Authorized authority={'sysUser:delete'}>
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
        {this.state.showAuthModal && <UserAuthModal {...authModalProps} />}
      </>
    );
  }
}
