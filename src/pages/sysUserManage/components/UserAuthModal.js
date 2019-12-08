import React, { Component } from 'react';
import { Modal, Tree, message } from 'antd';

const { TreeNode } = Tree;

export default class AddUserAuthModal extends Component {
  state = {
    permissionTree: [
      {
        title: '会员管理页面',
        key: 'user',
        children: [
          { title: '列表', key: 'user:lsit' },
          { title: '新增会员', key: 'user:add' },
          { title: '编辑会员', key: 'user:edit' },
          { title: '删除会员', key: 'user:delete' },
        ],
      },

      {
        title: '套餐管理页面',
        key: 'product',
        children: [
          { title: '列表', key: 'product:list' },
          { title: '新增套餐', key: 'product:add' },
          { title: '编辑套餐', key: 'product:edit' },
          { title: '删除套餐', key: 'product:delete' },
        ],
      },

      {
        title: '用户管理页面',
        key: 'sysUser',
        children: [
          { title: '列表', key: 'sysUser:list' },
          { title: '删除用户', key: 'sysUser:add' },
          { title: '编辑用户', key: 'sysUser:edit' },
          { title: '删除用户', key: 'sysUser:delete' },
          { title: '用户权限设置', key: ' sysUser:permission' },
        ],
      },
    ],
    checkedKeys: [],
  };

  componentDidMount() {
    const {
      initData: { permission = '' },
    } = this.props;
    const checkedKeys = permission.split(',') || [];
    this.setState({ checkedKeys });
  }

  onCheck = e => {
    console.log('check', e);
    this.setState({ checkedKeys: e });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  handleModalOk = () => {
    const { checkedKeys } = this.state;
    if (checkedKeys.length === 0) {
      message.warn('请至少选择一个权限');
      return;
    } else {
      this.props.onModalOK(checkedKeys);
    }
  };

  render() {
    const { onModalCancel, showModal, initData } = this.props;
    const { permissionTree } = this.state;
    console.log('this.state', this.state);
    return (
      <Modal
        title="设置用户权限"
        visible={showModal}
        onOk={this.handleModalOk}
        onCancel={onModalCancel}
        maskClosable={true}
        okText="保存"
        destroyOnClose
      >
        <Tree
          checkable
          autoExpandParent
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          expandedKeys={['user', 'sysUser', 'product']}
          defaultCheckedKeys={this.state.checkedKeys}
        >
          {this.renderTreeNodes(permissionTree)}
        </Tree>
      </Modal>
    );
  }
}
