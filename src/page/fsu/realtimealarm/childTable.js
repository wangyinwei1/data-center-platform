import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('fsu_realtimealarmStore')
@observer
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
    const {fsu_realtimealarmStore} = this.props;

    const params = {
      ...fsu_realtimealarmStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_realtimealarmStore.getChildTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_realtimealarmStore} = this.props;
    const params = {
      ...fsu_realtimealarmStore.c_tableParmas,
      page: pageNumber,
    };
    fsu_realtimealarmStore.getChildTable(params);
  }
  onSearch(value) {
    const {fsu_realtimealarmStore} = this.props;
    const params = {
      ...fsu_realtimealarmStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    fsu_realtimealarmStore.childSearch(params);
  }
  endClick(item) {
    const {
      fsu_realtimealarmStore: {endAlarm, currentDevice, getChildTable},
    } = this.props;
    endAlarm({F_Suid: currentDevice, F_SerialNo: item.serialNo});
  }
  handleClick(item) {
    const {fsu_realtimealarmStore: {dealAlarm, currentDevice}} = this.props;
    dealAlarm({F_Suid: currentDevice, F_SerialNo: item.serialNo});
  }
  cancelClick(item) {
    const {fsu_realtimealarmStore: {cancelAlarm, currentDevice}} = this.props;
    cancelAlarm({F_Suid: currentDevice, F_SerialNo: item.serialNo});
  }
  confirmClick(item) {
    const {fsu_realtimealarmStore: {confirmAlarm, currentDevice}} = this.props;
    confirmAlarm({F_Suid: currentDevice, F_SerialNo: item.serialNo});
  }
  render() {
    const {fsu_realtimealarmStore, theme} = this.props;
    const c_tableData = toJS(fsu_realtimealarmStore.c_tableData);
    const tableData = (c_tableData && c_tableData.varList) || [];
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
          loading={fsu_realtimealarmStore.c_loading}
          onShowSizeChange={this.onShowSizeChange}
          rowClassName={(record, index) => {
            return 'td_padding';
          }}
          onChange={this.onPageChange}
          data={tableData}
          useDefaultRowKey={true}
        />
      </div>
    );
  }
}

export default Regional;
