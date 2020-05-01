import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd';
import AddProductModal from './components/AddProductModal';
import { Authorized } from '@/components/Authorized';
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
    photoList: [],
    ceramicList: [],
    plateList: [],
    easelMaskList: [],
    mvList: [],
    paintingList: [],
    videoList: [],
    monolithicList: [],
    photoWallList: [],
    idPhotoList: [],
  };

  query = this.props.location.query;

  columns = [
    {
      title: '产品',
      dataIndex: 'product',
      render: text =>
        text
          .split(',')
          .filter(item => item)
          .toLocaleString(),
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
          <Authorized authority={'product:edit'}>
            <a onClick={() => this.handleEditProduct(record)}>编辑</a>
          </Authorized>
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

  // componentDidMount() {
  //   router.push({
  //     pathname: '/productManage',
  //     query: { pageNum: '1', pageSize: '10' },
  //   });
  // }

  componentWillMount() {
    this.initData();
  }

  initData = () => {
    this.props
      .dispatch({
        type: 'global/queryAttachment',
      })
      .then(res => {
        console.log('res', res);
        const {
          photo = '',
          ceramic = '',
          plate = '',
          easelMask = '',
          mv = '',
          painting = '',
          video = '',
          monolithic = '',
          photoWall = '',
          idPhoto = '',
        } = res;
        const photoList = photo.split(',');
        const ceramicList = ceramic.split(',');
        const plateList = plate.split(',');
        const easelMaskList = easelMask.split(',');
        const mvList = (mv || '').split(',');
        const paintingList = (painting || '').split(',');
        const videoList = (video || '').split(',');
        const monolithicList = (monolithic || '').split(',');
        const photoWallList = (photoWall || '').split(',');
        const idPhotoList = (idPhoto || '').split(',');
        this.setState({
          photoList,
          ceramicList,
          plateList,
          easelMaskList,
          mvList,
          paintingList,
          videoList,
          monolithicList,
          photoWallList,
          idPhotoList,
        });
      });
  };

  handleSearch = params => {
    router.push({
      pathname: '/productManage',
      query: params,
    });
  };

  handleShowAddModal = () => this.setState({ showAddModal: true, modalType: 'add' });

  handleCloseAddModal = () => this.setState({ showAddModal: false });

  handleAddProduct = productData => {
    console.log('productData', productData);
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
      photoList: this.state.photoList,
      ceramicList: this.state.ceramicList,
      plateList: this.state.plateList,
      easelMaskList: this.state.easelMaskList,
      mvList: this.state.mvList,
      paintingList: this.state.paintingList,
      videoList: this.state.videoList,
      monolithicList: this.state.monolithicList,
      photoWallList: this.state.photoWallList,
      idPhotoList: this.state.idPhotoList,
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
              <Authorized authority={'product:add'}>
                <Button
                  icon="plus"
                  type="primary"
                  onClick={this.handleShowAddModal}
                  style={{ display: 'inLine-block' }}
                >
                  新增
                </Button>
              </Authorized>
              <Authorized authority={'product:delete'}>
                <Button
                  icon="minus"
                  type="primary"
                  onClick={this.handleDeleteProduct}
                  style={{ display: 'inLine-block' }}
                >
                  删除
                </Button>
              </Authorized>
            </div>
          }
          listInst={<ListTable {...tableProps} />}
        />
        {this.state.showAddModal && <AddProductModal {...modalProps} />}
      </>
    );
  }
}
