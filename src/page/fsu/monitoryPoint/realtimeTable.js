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

  //控制
  controlClick(item, e) {
    const {
      fsu_monitorypointStore: {postDeviceControl},
    } = this.props;

    const params = {
      F_DeviceID: devID,
      F_Spid: spID,
      F_Suid: currentDevice,
      // surID
      // devicerID
    };
    postDeviceControl(params);
  }

  render() {
    const {fsu_monitorypointStore, needRealtime, spValue} = this.props;
    const r_tableData = toJS(fsu_monitorypointStore.tableData);
    const tableData = (r_tableData && r_tableData.Data) || [];
    let spType = fsu_monitorypointStore.spType;
    let rest = spType.filter(item => {
      return item.value === spValue;
    });

    const pagination = r_tableData || {};

    const columns = columnData({controlClick: this.controlClick, rest});
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
