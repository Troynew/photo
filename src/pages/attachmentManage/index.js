import React, { PureComponent } from 'react';
import { Form, Input, Modal, Select, Table, Button } from 'antd';
import { connect } from 'dva';
import config from '@/utils/config';
import ListTable from '@/components/ListTable';
import styles from './index.less';

const { modalFormItemLayout } = config;
const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ loading, global }) => ({
  loading: loading.effects['global/saveAttachment'],
}))
@Form.create()
export default class AttachmentManage extends PureComponent {
  state = {
    list: [
      {
        id: 'photo',
        key: '相册',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'ceramic',
        key: '摆台',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'plate',
        key: '底片',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'easelmask',
        key: '放大框',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'mv',
        key: 'MV',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'painting',
        key: '挂画',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'vedio',
        key: '微视',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'monolithic',
        key: '单片',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'photowall',
        key: '照片墙',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
      {
        id: 'idphoto',
        key: '证件照',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
      },
    ],
  };

  handleChange = (record, index, e) => {
    console.log('record', record);
    console.log('e', e.target.value);
    const { list } = this.state;
    const newList = list.map(item => {
      if (item.id === record.id) {
        item[`${index}`] = e.target.value;
      }
      return item;
    });
    this.setState({ list: newList });
  };

  handleSave = () => {
    const { list } = this.state;
    let obj = {
      photo: '',
      ceramic: '',
      plate: '',
      easelmask: '',
      mv: '',
      painting: '',
      vedio: '',
      monolithic: '',
      photowall: '',
      idphoto: '',
    };
    list.map(item => {
      let values = '';
      for (let i = 1; i < 9; i++) {
        const keys = 'value' + String(i);
        if (item[`${keys}`] && values === '') {
          values = item[`${keys}`];
        } else if (item[`${keys}`] && values !== '') {
          values = values + ',' + item[`${keys}`];
        }
      }
      obj[`${item.id}`] = values;
    });
    this.props.dispatch({
      type: 'global/saveAttachment',
      payload: { attachment: JSON.stringify(obj) },
    });
  };

  columns = [
    {
      title: '配件名称',
      dataIndex: 'key',
      width: 100,
    },
    {
      title: '',
      dataIndex: 'value1',
      render: (text, record) => (
        <Input
          defaultValue={text}
          className={styles.inputStyle}
          onInput={e => this.handleChange(record, 'value1', e)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'value2',
      render: (text, record) => (
        <Input
          defaultValue={text}
          className={styles.inputStyle}
          onInput={e => this.handleChange(record, 'value2', e)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'value3',
      render: (text, record) => (
        <Input
          defaultValue={text}
          className={styles.inputStyle}
          onInput={e => this.handleChange(record, 'value3', e)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'value4',
      render: (text, record) => (
        <Input
          defaultValue={text}
          className={styles.inputStyle}
          onInput={e => this.handleChange(record, 'value4', e)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'value5',
      render: (text, record) => (
        <Input
          defaultValue={text}
          className={styles.inputStyle}
          onInput={e => this.handleChange(record, 'value5', e)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'value6',
      render: (text, record) => (
        <Input
          defaultValue={text}
          className={styles.inputStyle}
          onInput={e => this.handleChange(record, 'value6', e)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'value7',
      render: (text, record) => (
        <Input
          defaultValue={text}
          className={styles.inputStyle}
          onInput={e => this.handleChange(record, 'value7', e)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'value8',
      render: (text, record) => (
        <Input
          defaultValue={text}
          className={styles.inputStyle}
          onInput={e => this.handleChange(record, 'valu8', e)}
        />
      ),
    },
  ];

  render() {
    const tableProps = {
      columns: this.columns,
      dataSource: this.state.list,
      loading: this.props.loading,
      pagination: false,
      bordered: true,
    };

    return (
      <div>
        <Button type="primary" onClick={this.handleSave} style={{ marginBottom: '10px' }}>
          保存
        </Button>
        <Table {...tableProps} />
      </div>
    );
  }
}
