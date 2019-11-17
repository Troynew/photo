import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd';
import AddProductModal from './components/AddProductModal';

import ListPageWrapper from '@/components/ListPageWrapper';
import ListForm from '@/components/ListForm';
import ListTable from '@/components/ListTable';
import NotBubbleBlock from '@/components/NotBubbleBlock';
import { _UNITE_SELECT_ALL } from '@/components/ListForm/utils/constants';

@connect(({ loading, productManage }) => ({
  loading: loading.effects['productManage/queryProductList'],
  list: productManage.list,
  pagination: productManage.pagination,
}))
export default class Product extends Component {
  state = {
    showAddModal: false,
    productInfo: {},
    modalType: null,
    idList: [],
    deleteAll: false,
  };

  query = this.props.location.query;

  columns = [
    {
      title: '产品',
      dataIndex: 'product',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: text => Number(text).toFixed(2),
    },
    {
      title: '套餐名称',
      dataIndex: 'name',
    },
    {
      title: '入册张数',
      dataIndex: 'photoNum',
    },
    {
      title: '底片张数',
      dataIndex: 'negativeNum',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => (
        <NotBubbleBlock>
          <a onClick={() => this.handleEditProduct(record)}>编辑</a>
        </NotBubbleBlock>
      ),
    },
  ];

  listFormData = [
    {
      name: 'name',
      label: '套餐名称',
      type: 'input',
      initialValue: this.query.name,
    },
    {
      name: 'price',
      label: '价格',
      type: 'input',
      initialValue: this.query.price,
    },
  ];

  componentDidMount() {
    router.push({
      pathname: '/productManage',
      query: { pageNum: '1', pageSize: '10' },
    });
  }

  handleSearch = params => {
    router.push({
      pathname: '/productManage',
      query: params,
    });
  };

  handleShowAddModal = () => this.setState({ showAddModal: true, modalType: 'add' });

  handleCloseAddModal = () => this.setState({ showAddModal: false });

  handleAddProduct = productData => {
    if (this.state.modalType === 'add') {
      this.props
        .dispatch({
          type: 'productManage/addProduct',
          payload: productData,
        })
        .then(res => {
          message.success('新增套餐成功');
          router.push({
            pathname: '/productManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    } else {
      const { productInfo } = this.state;
      this.props
        .dispatch({
          type: 'productManage/editProduct',
          payload: {
            ...productInfo,
            ...productData,
            createBy: null,
            params: null,
            searchValue: null,
            updateBy: null,
            createTime: null,
            updateTime: null,
          },
        })
        .then(res => {
          message.success('修改套餐成功');
          router.push({
            pathname: '/productManage',
            query: this.props.location.query,
          });
          this.setState({ showAddModal: false });
        });
    }
  };

  handleDeleteProduct = () => {
    const { idList } = this.state;
    const that = this;
    if (idList.length === 0) {
      message.warn('请勾选要删除的套餐');
      return;
    } else {
      Modal.confirm({
        title: '确定删除该套餐嘛?',
        okText: '确定',
        cancelText: '取消',
        content: '',
        onOk() {
          that.props
            .dispatch({
              type: 'productManage/deleteProduct',
              payload: { ids: idList },
            })
            .then(res => {
              message.success('删除成功');
              router.push({
                pathname: '/productManage',
                query: that.props.location.query,
              });
            });
        },
        onCancel() {},
      });
    }
  };

  handleEditProduct = productInfo => {
    this.setState({ showAddModal: true, modalType: 'edit', productInfo });
  };

  showTwoDemical = (value = 0) => {
    return Number(value).toFixed(2);
  };

  handleSelectChange = (idList, rowData) => {
    console.log('row', idList, rowData);
    this.setState({ idList, productInfo: rowData });
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
      onModalOK: this.handleAddProduct,
      initData: this.state.productInfo,
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
                新增
              </Button>
              <Button
                icon="minus"
                type="primary"
                onClick={this.handleDeleteProduct}
                style={{ display: 'inLine-block' }}
              >
                删除
              </Button>
            </div>
          }
          listInst={<ListTable {...tableProps} />}
        />
        <AddProductModal {...modalProps} />
      </>
    );
  }
}
