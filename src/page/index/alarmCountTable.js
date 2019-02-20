import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../components/Table';
import EditModal from '../../components/EditModal';
import FsuRealtimeAlarmTable from '../fsu/realtimealarm/childTable.js';
import RealtimeAlarmTable from '../equ/realtimealarm/childTable.js';
import Toolbar from '../../components/Toolbar';
import columnData from './alarmCountColumns.js';
//实例
@inject('home_pageStore', 'fsu_realtimealarmStore', 'realtimealarmStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.state = {
      alarmShow: false,
      isFsu: false,
      currentDev: '',
    };
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {home_pageStore} = this.props;
    console.log(11111111);

    const params = {
      ...home_pageStore.a_tableParmas,
      page: current,
      number: pageSize,
    };
    this.common(params);
  }
  onPageChange(pageNumber) {
    const {home_pageStore} = this.props;
    const params = {
      ...home_pageStore.a_tableParmas,
      page: pageNumber,
    };
    this.common(params);
  }
  onEditCancel() {
    this.setState({
      alarmShow: false,
    });
    const {home_pageStore} = this.props;
    const params = {
      ...home_pageStore.a_tableParmas,
    };
    this.common(params);
  }
  common(params) {
    const {
      home_pageStore: {onlineDeviceList, alarmDeviceDetailsList},
      type,
    } = this.props;
    type === 'offline' && onlineDeviceList({status: 0, ...params});
    type === 'online' && onlineDeviceList({status: 1, ...params});
    type === 'alarm' && alarmDeviceDetailsList(params);
    type === 'errline' && onlineDeviceList({status: 2, ...params});
    type === 'disable' && onlineDeviceList({status: 4, ...params});
  }

  onSearch(value) {
    const {home_pageStore} = this.props;
    const params = {
      ...home_pageStore.a_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    this.common(params);
  }
  getAlarmTable(item, e, sub) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_realtimealarmStore, realtimealarmStore} = this.props;
    const isFsu = item.type === 'FSU' ? true : false;
    const params = {
      keywords: '',
      page: 1,
      number: 10,
    };
    isFsu
      ? (params.ztreeChild = item.F_DeviceID)
      : (params.F_DeviceID = item.F_DeviceID);
    isFsu
      ? fsu_realtimealarmStore.getChildTable(params)
      : realtimealarmStore.getChildTable(params);

    this.setState({
      alarmShow: true,
      currentDev: item.F_DeviceID,
      isFsu,
    });
  }
  render() {
    const {home_pageStore} = this.props;
    const a_tableData = toJS(home_pageStore.a_tableData);
    const tableData = (a_tableData && a_tableData.varList) || [];
    const pagination = a_tableData || {};
    const columns = columnData({
      getAlarmTable: this.getAlarmTable,
      _this: this,
    });
    return (
      <div className={styles['alarm_table_wrap']}>
        <Toolbar onSearch={this.onSearch} theme={'darker'} closeAdd={true} />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          theme={'darker'}
          loading={home_pageStore.a_loading}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
        />
        <EditModal
          width={'80%'}
          isShow={this.state.alarmShow}
          title={this.state.isFsu ? 'FSU告警' : '基础告警'}
          onOk={this.onEditOk}
          theme={'darker'}
          wrapClassName={'index_alarm_num'}
          onCancel={this.onEditCancel}>
          <div className={styles['alarm_left_wrap']}>
            {this.state.isFsu ? (
              <FsuRealtimeAlarmTable theme={'darker'} />
            ) : (
              <RealtimeAlarmTable theme={'darker'} />
            )}
          </div>
        </EditModal>
      </div>
    );
  }
}

export default Regional;
