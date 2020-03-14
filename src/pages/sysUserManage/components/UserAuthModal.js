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
          { title: '列表', key: 'user:list' },
          { title: '新增会员', key: 'user:add' },
          { title: '编辑会员', key: 'user:edit' },
          { title: '删除会员', key: 'user:delete' },
          { title: '新增订单', key: 'order:add' },
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
          { title: '新增用户', key: 'sysUser:add' },
          { title: '编辑用户', key: 'sysUser:edit' },
          { title: '删除用户', key: 'sysUser:delete' },
          { title: '用户权限设置', key: 'sysUser:permission' },
        ],
      },

      {
        title: '订单管理页面',
        key: 'order',
        children: [
          { title: '列表', key: 'order:list' },
          { title: '编辑订单', key: 'order:edit' },
          { title: '删除订单', key: 'order:delete' },
        ],
      },
    ],
    checkedKeys: [],
    expandedKeys: ['user', 'sysUser', 'product', 'order'],
  };

  componentDidMount() {
    const {
      initData: { permission = '' },
    } = this.props;
    const checkedKeys = (permission || '').split(',').filter(item => item !== '') || [];
    this.setState({ checkedKeys });
  }

  onCheck = e => {
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
    const { onModalOK } = this.props;
    if (checkedKeys.length === 0) {
      message.warn('请至少选择一个权限');
    } else {
      onModalOK(checkedKeys);
    }
  };

  handleExpandedChange = data => {
    console.log('expended', data);
    this.setState({ expandedKeys: data });
  };

  render() {
    const { onModalCancel, showModal } = this.props;
    const { permissionTree, checkedKeys, expandedKeys } = this.state;
    return (
      <Modal
        title="设置用户权限"
        visible={showModal}
        onOk={this.handleModalOk}
        onCancel={onModalCancel}
        maskClosable
        okText="保存"
        destroyOnClose
      >
        <Tree
          checkable
          autoExpandParent={false}
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}
          expandedKeys={expandedKeys}
          defaultCheckedKeys={checkedKeys}
          onExpand={this.handleExpandedChange}
        >
          {this.renderTreeNodes(permissionTree)}
        </Tree>
      </Modal>
    );
  }
}
