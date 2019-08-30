import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './grandsonColumns.js';
import Toolbar from '../../../components/Toolbar';
import Panel from '../../../components/Panel';
import RealtimeTable from './realtimeTable.js';
//实例
@inject('informationStore', 'fsu_devicemanagementStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.realtimeClick = this.realtimeClick.bind(this);
    this.historyClick = this.historyClick.bind(this);
    this.remoteControlClick = this.remoteControlClick.bind(this);
    this.controlClick = this.controlClick.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.state = {
      realtimeShow: false,
    };
  }
  editClick(item) {
    const {sunEditChange} = this.props;
    sunEditChange(item);
  }
  deleteClick(item) {
    const {
      sunDeleteChange,
      fsu_devicemanagementStore: {expandedRows},
    } = this.props;
    sunDeleteChange(item, toJS(expandedRows));
  }
  detailClick(item) {
    const {sunDetailChange} = this.props;
    sunDetailChange(item);
  }
  onRowDoubleClick(item) {
    const {sunEditChange} = this.props;
    sunEditChange(item);
  }
  //实时数据
  realtimeClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_devicemanagementStore, realtimeChange} = this.props;
    const params = {
      keywords: '',
      page: 1,
      F_DeviceID: item.subDeviceID,
    };
    fsu_devicemanagementStore.getRealtimeTable(params);
    realtimeChange();
  }
  historyClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_devicemanagementStore, historyChange} = this.props;
    const params = {
      F_DeviceID: item.subDeviceID,
    };
    fsu_devicemanagementStore.getByDevice(params);
    historyChange();
  }
  controlClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_devicemanagementStore, controlChange} = this.props;
    const params = {
      F_DeviceID: item.subDeviceID,
    };
    fsu_devicemanagementStore.getControlChannel(params).then(data => {
      data && controlChange();
    });
  }
  remoteControlClick(item, e) {
    const {fsu_devicemanagementStore, remoteControlClick} = this.props;
    const params = {
      deviceID: item.deviceID,
      spID: item.spID,
      suID: item.suID,
    };
    remoteControlClick(item);
    // fsu_devicemanagementStore.getRegulatChannel(params).then(data => {
    //   data && rumorClick();
    // });
  }

  componentDidMount() {
    $('.ant-table-expanded-row .ant-table-expanded-row > td:last-child').attr(
      'colspan',
      JSON.parse(localStorage.getItem('FsuTypeID')) === 3 ? 10 : 8,
    );
  }
  render() {
    const {fsu_devicemanagementStore} = this.props;
    const g_tableData = toJS(fsu_devicemanagementStore.g_tableData);
    const tableData = g_tableData || [];
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      detailClick: this.detailClick,
      realtimeClick: this.realtimeClick,
      historyClick: this.historyClick,
      controlClick: this.controlClick,
      remoteControlClick: this.remoteControlClick,
      _this: this,
    });
    return (
      <div className={'cl_grandson'} style={{padding: '20px'}}>
        <Table
          className={'aaaa'}
          pagination={false}
          loading={fsu_devicemanagementStore.g_loading}
          columns={columns}
          data={tableData}
          onRowDoubleClick={this.onRowDoubleClick}
        />
      </div>
    );
  }
}

export default Regional;
