import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './portInfoColumnData.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('fsu_devicemanagementStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
    };
  }
  componentDidMount() {}
  render() {
    const {fsu_devicemanagementStore, theme} = this.props;
    const list = toJS(fsu_devicemanagementStore.fsuPortInfoList);
    const columns = columnData({
      _this: this,
    });
    const expandedRowRender = record => {
      let columns = [
        {title: '设备ID', dataIndex: 'deviceID'},
        {title: '设备地址', dataIndex: 'address'},
        {title: '协议', dataIndex: 'protocol'},
        {title: '协议版本', dataIndex: 'version'},
        {title: '接入时间', dataIndex: 'updateTime'},
      ];

      const data = [];
      record.deviceList &&
        _.map(record.deviceList, item => {
          data.push(item);
        });
      return <Table columns={columns} data={data} pagination={false} />;
    };
    return (
      <div style={{padding: '20px'}}>
        <Table
          columns={columns}
          theme={theme}
          loading={fsu_devicemanagementStore.p_loading}
          rowClassName={(record, index) => {
            return 'td_padding';
          }}
          nesting={{
            expandedRowRender,
          }}
          pagination={false}
          data={list}
          useDefaultRowKey={true}
        />
      </div>
    );
  }
}

export default Regional;
