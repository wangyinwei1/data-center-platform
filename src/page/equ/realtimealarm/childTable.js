import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../../bsifm/common';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('realtimealarmStore')
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
    const {realtimealarmStore} = this.props;

    const params = {
      ...realtimealarmStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    realtimealarmStore.getChildTable(params);
  }
  onPageChange(pageNumber) {
    const {realtimealarmStore} = this.props;
    const params = {
      ...realtimealarmStore.c_tableParmas,
      page: pageNumber,
    };
    realtimealarmStore.getChildTable(params);
  }
  onSearch(value) {
    const {realtimealarmStore} = this.props;
    const params = {
      ...realtimealarmStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    realtimealarmStore.childSearch(params);
  }
  endClick(item) {
    const {realtimealarmStore: {endAlarm}} = this.props;
    endAlarm({F_AlarmID: item.alarmID});
  }
  handleClick(item) {
    const {realtimealarmStore: {dealAlarm}} = this.props;
    dealAlarm({F_AlarmID: item.alarmID});
  }
  cancelClick(item) {
    const {realtimealarmStore: {cancelAlarm}} = this.props;
    cancelAlarm({F_AlarmID: item.alarmID});
  }
  confirmClick(item) {
    const {realtimealarmStore: {confirmAlarm}} = this.props;
    confirmAlarm({F_AlarmID: item.alarmID});
  }
  render() {
    const {realtimealarmStore, theme} = this.props;
    const c_tableData = toJS(realtimealarmStore.c_tableData);
    const tableData = (c_tableData && c_tableData.varList) || [];
    const pagination = c_tableData || {};
    const columns = columnData({
      endClick: this.endClick,
      handleClick: this.handleClick,
      cancelClick: this.cancelClick,
      confirmClick: this.confirmClick,
      _this: this,
    });
    console.log(theme);
    return (
      <div>
        <Toolbar onSearch={this.onSearch} theme={theme} closeAdd={true} />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          theme={theme}
          loading={realtimealarmStore.c_loading}
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
