import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './realtimeColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('fsu_devicemanagementStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.real = this.real.bind(this);
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    // const {fsu_devicemanagementStore} = this.props;
    //
    // const params = {
    //   ...fsu_devicemanagementStore.tableParmas,
    //   page: current,
    //   number: pageSize,
    // };
    // fsu_devicemanagementStore.getTable(params);
  }
  onPageChange(pageNumber) {
    // const {fsu_devicemanagementStore} = this.props;
    // this.c_onPageChange({pageNumber},fsu_devicemanagementStore);
  }
  onSearch(value) {
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      ...fsu_devicemanagementStore.r_tableParmas,
      keywords: value,
    };
    fsu_devicemanagementStore.realtimeSearch(params);
  }
  real() {
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      ...fsu_devicemanagementStore.r_tableParmas,
    };
    fsu_devicemanagementStore.getRealTimeCall(params);
  }
  render() {
    const {fsu_devicemanagementStore} = this.props;
    const r_tableData = toJS(fsu_devicemanagementStore.r_tableData);
    const tableData = (r_tableData && r_tableData.Data) || [];
    const pagination = r_tableData || {};
    const columns = columnData();
    return (
      <div>
        <Toolbar
          onSearch={this.onSearch}
          onClick={this.real}
          showValue={['real']}
        />
        <Table
          loading={fsu_devicemanagementStore.r_loading}
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
