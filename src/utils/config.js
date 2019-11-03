// global config
module.exports = {
  systemName: 'i-baby',
  authorityName: 'i-baby',
  copyrightMesssage: `2019`,
  rowProps: { gutter: { md: 8, lg: 24, xl: 48 } },
  colProps: { md: 8, sm: 24 },
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  },
  modalFormItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 13 },
    },
  },
  pagination: {
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30'],
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: function(total) {
      return `共 ${total} 条记录 第 ${this.current} / ${Math.ceil(total / this.pageSize)} 页`;
    },
    total: 0,
  },
  uploadAction: '/file/uploadFile',
  select: {
    allowClear: true,
    showSearch: true,
    placeholder: '请选择',
    optionFilterProp: 'children',
    filterOption: (input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  },
};
