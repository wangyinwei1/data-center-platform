import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './historyColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('fsu_devicemanagementStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      ...fsu_devicemanagementStore.h_tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_devicemanagementStore.getFsuHisdataTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      ...fsu_devicemanagementStore.h_tableParmas,
      page: pageNumber,
    };
    fsu_devicemanagementStore.getFsuHisdataTable(params);
  }
  render() {
    const {fsu_devicemanagementStore} = this.props;
    const h_tableData = toJS(fsu_devicemanagementStore.h_tableData);
    const tableData = (h_tableData && h_tableData.varList) || [];
    const pagination = h_tableData || {};
    const columns = columnData();
    return (
      <div>
        <Table
          loading={fsu_devicemanagementStore.h_loading}
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          useDefaultRowKey={true}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
