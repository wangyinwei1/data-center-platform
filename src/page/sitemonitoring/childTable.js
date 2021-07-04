import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../bsifm/common';
import Table from '../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../components/Toolbar';
//实例
@inject('sitemonitoringStore', 'realtimealarmStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {sitemonitoringStore} = this.props;

    const params = {
      ...sitemonitoringStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    sitemonitoringStore.getStationAlarm(params);
  }
  onPageChange(pageNumber) {
    const {sitemonitoringStore} = this.props;
    const params = {
      ...sitemonitoringStore.c_tableParmas,
      page: pageNumber,
    };
    sitemonitoringStore.getStationAlarm(params);
  }
  onSearch(value) {
    const {sitemonitoringStore} = this.props;
    const params = {
      ...sitemonitoringStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    sitemonitoringStore.getStationAlarm(params);
  }
  endClick(item) {
    const {sitemonitoringStore: {endAlarm}} = this.props;
    endAlarm({F_AlarmID: item.alarmID});
  }
  handleClick(item) {
    const {sitemonitoringStore: {dealAlarm}} = this.props;
    dealAlarm({F_AlarmID: item.alarmID});
  }
  cancelClick(item) {
    const {sitemonitoringStore: {cancelAlarm}} = this.props;
    cancelAlarm({F_AlarmID: item.alarmID});
  }
  confirmClick(item) {
    const {sitemonitoringStore: {confirmAlarm}} = this.props;
    confirmAlarm({F_AlarmID: item.alarmID});
  }
  render() {
    const {sitemonitoringStore, theme} = this.props;
    const c_tableData = toJS(sitemonitoringStore.c_tableData);
    const tableData = (c_tableData && c_tableData.dataList) || [];
    const pagination = c_tableData || {};
    const columns = columnData({
      endClick: this.endClick,
      handleClick: this.handleClick,
      cancelClick: this.cancelClick,
      confirmClick: this.confirmClick,
      _this: this,
    });
    return (
      <div>
        <Toolbar onSearch={this.onSearch} theme={theme} closeAdd={true} />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          theme={theme}
          loading={sitemonitoringStore.c_loading}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
          useDefaultRowKey={true}
        />
      </div>
    );
  }
}

export default Regional;
