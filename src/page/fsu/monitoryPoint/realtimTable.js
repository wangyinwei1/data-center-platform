import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Select, message} from 'antd';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './realtimeColumns.js';
import Toolbar from '../../../components/Toolbar';
const Option = Select.Option;
//实例
@inject('fsu_monitorypointStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSubDevSelect = this.onSubDevSelect.bind(this);
    this.onMonitorPointSelect = this.onMonitorPointSelect.bind(this);
    this.real = this.real.bind(this);
    this.state = {
      subDeviceValue: '',
      type: 1,
    };
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    let FsuTypeID = JSON.parse(localStorage.getItem('FsuTypeID'));
    const {fsu_monitorypointStore} = this.props;

    const params = {
      ...fsu_monitorypointStore.tableParmas,
      page: current,
      number: pageSize,
    };
    if (FsuTypeID === 2) {
      params['deviceID'] = this.state.subDeviceValue;
      params['type'] = this.state.type;
      params['typeID'] = FsuTypeID;
    }
    fsu_monitorypointStore.getRealtimeTable(params);
  }
  onPageChange(pageNumber) {
    let FsuTypeID = JSON.parse(localStorage.getItem('FsuTypeID'));
    const {fsu_monitorypointStore} = this.props;
    const params = {
      ...fsu_monitorypointStore.tableParmas,
      page: pageNumber,
    };
    if (FsuTypeID === 2) {
      params['deviceID'] = this.state.subDeviceValue;
      params['type'] = this.state.type;
      params['typeID'] = FsuTypeID;
    }
    fsu_monitorypointStore.getRealtimeTable(params);
  }
  onSearch(value) {
    let FsuTypeID = JSON.parse(localStorage.getItem('FsuTypeID'));
    if (FsuTypeID === 2) {
      if (!this.state.subDeviceValue) {
        message.error('请选择子设备!');
        return;
      }
    }
    const {fsu_monitorypointStore, singleLineData} = this.props;
    const params = {
      number: 10,
      ...fsu_monitorypointStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
      F_Suid: singleLineData.suID,
    };

    if (FsuTypeID === 2) {
      params['deviceID'] = this.state.subDeviceValue;
      params['type'] = this.state.type;
      params['typeID'] = FsuTypeID;
    }
    fsu_monitorypointStore.realtimeSearch(params);
  }
  real() {
    let FsuTypeID = JSON.parse(localStorage.getItem('FsuTypeID'));
    if (FsuTypeID === 2) {
      if (!this.state.subDeviceValue) {
        message.error('请选择子设备!');
        return;
      }
    }
    const {fsu_monitorypointStore, singleLineData} = this.props;
    let realtimeSubDevMenu = fsu_monitorypointStore.realtimeSubDevMenu;
    let current = realtimeSubDevMenu.filter(item => {
      return item.deviceID === this.state.subDeviceValue;
    });
    const params = {
      F_Suid: singleLineData.suID,
      ...fsu_monitorypointStore.tableParmas,
    };
    if (FsuTypeID === 2) {
      params['deviceID'] = this.state.subDeviceValue;
      params['type'] = this.state.type;
      params['typeID'] = FsuTypeID;
      params['surID'] = singleLineData.surID;
      params['devicerID'] = current[0] ? current[0].devicerID : '';
    }
    fsu_monitorypointStore.getRealTimeCall(params);
  }
  onSubDevSelect(value) {
    this.setState({
      subDeviceValue: value,
    });
  }
  onMonitorPointSelect(value) {
    this.setState({
      type: value,
    });
  }
  render() {
    const {fsu_monitorypointStore, needRealtime} = this.props;
    const r_tableData = toJS(fsu_monitorypointStore.tableData);
    const tableData = (r_tableData && r_tableData.Data) || [];
    const pagination = r_tableData || {};
    const columns = columnData();
    let FsuTypeID = JSON.parse(localStorage.getItem('FsuTypeID'));
    return (
      <div>
        <Table
          loading={fsu_monitorypointStore.loading}
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          useDefaultRowKey={true}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
