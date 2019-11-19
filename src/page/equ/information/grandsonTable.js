import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {message} from 'antd';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './grandsonColumns.js';
import Toolbar from '../../../components/Toolbar';
import Panel from '../../../components/Panel';
import RealtimeTable from './realtimeTable.js';
//实例
@inject('informationStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.realtimeClick = this.realtimeClick.bind(this);
    this.historyClick = this.historyClick.bind(this);
    this.rumorClick = this.rumorClick.bind(this);
    this.controlClick = this.controlClick.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.state = {
      realtimeShow: false,
      batchIds: '',
    };
  }
  editClick(item) {
    const {sunEditChange} = this.props;
    sunEditChange(item);
  }
  deleteClick(item) {
    const {
      sunDeleteChange,
      informationStore: {expandedRows},
    } = this.props;
    sunDeleteChange(item, toJS(expandedRows));
  }
  detailClick(item) {
    const {sunDetailChange} = this.props;
    sunDetailChange(item);
  }
  disableClick(item) {
    const {
      sunDisableChange,
      informationStore: {expandedRows},
    } = this.props;
    sunDisableChange(item, toJS(expandedRows));
  }
  //实时数据
  realtimeClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {informationStore, realtimeChange} = this.props;
    const params = {
      keywords: '',
      page: 1,
      number: 10,
      F_DeviceID: item.subDeviceID,
    };
    informationStore.getRealtimeTable(params);
    realtimeChange(item);
  }
  historyClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {informationStore, historyChange} = this.props;
    const params = {
      F_DeviceID: item.subDeviceID,
    };
    informationStore.getByDevice(params);
    historyChange(item);
  }
  controlClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (item.onOff === 0) {
      message.error('离线设备不支持远程控制！');
      return;
    }
    const {informationStore, controlChange} = this.props;
    const params = {
      F_DeviceID: item.subDeviceID,
    };
    informationStore.getControlChannel(params).then(data => {
      data && controlChange();
    });
  }
  rumorClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (item.onOff === 0) {
      message.error('离线设备不支持远程遥控！');
      return;
    }
    const {informationStore, rumorChange} = this.props;
    const params = {
      F_DeviceID: item.subDeviceID,
    };
    informationStore.getRegulatChannel(params).then(data => {
      data && rumorChange();
    });
  }

  componentDidMount() {
    $('.ant-table-expanded-row .ant-table-expanded-row > td:last-child').attr(
      'colspan',
      8,
    );
  }
  onRowDoubleClick(item) {
    const {sunDetailChange} = this.props;
    sunDetailChange(item);
  }
  getAlarmTable(item, e) {
    const {getSunAlarmTable} = this.props;
    getSunAlarmTable(item, e, 'sun');
  }
  render() {
    const {informationStore, sunRowKeyChange} = this.props;
    const g_tableData = toJS(informationStore.g_tableData);
    const tableData = (g_tableData && g_tableData.varList) || [];
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      detailClick: this.detailClick,
      realtimeClick: this.realtimeClick,
      historyClick: this.historyClick,
      getAlarmTable: this.getAlarmTable,
      controlClick: this.controlClick,
      rumorClick: this.rumorClick,
      disableClick: this.disableClick,
      _this: this,
    });
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          batchIds: selectedRowKeys.join(','),
        });
        sunRowKeyChange(selectedRowKeys.join(','));
      },
      onSelect: (record, selected, selectedRows) => {
        if (selected) {
          const batchIds = this.state.batchIds;
          let subDeviceIDs = batchIds.split(',');
          subDeviceIDs.push(record.subDeviceID);
          const filterSuIDs = subDeviceIDs.filter(item => {
            return item !== '';
          });
          this.setState({
            batchIds: filterSuIDs.join(','),
          });
          sunRowKeyChange(filterSuIDs.join(','));
        } else {
          const batchIds = this.state.batchIds;
          let subDeviceIDs = batchIds.split(',');
          const filterSuIDs = subDeviceIDs.filter(item => {
            return (isNaN(item) ? item : parseInt(item)) !== record.subDeviceID;
          });
          this.setState({
            batchIds: filterSuIDs.join(','),
          });
          sunRowKeyChange(filterSuIDs.join(','));
        }
      },
    };
    return (
      <div className={'cl_grandson'}>
        <Table
          pagination={false}
          rowSelection={rowSelection}
          loading={informationStore.g_loading}
          onRowDoubleClick={this.onRowDoubleClick}
          rowClassName={(record, index) => {
            const rowClassName = ['td_padding'];
            record.onOff === 0 && rowClassName.push('cl_off_state');
            return rowClassName.join(' ');
          }}
          columns={columns}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
