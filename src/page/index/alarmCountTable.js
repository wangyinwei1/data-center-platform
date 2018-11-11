import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../components/Table';
import Toolbar from '../../components/Toolbar';
import columnData from './alarmCountColumns.js';
//实例
@inject('home_pageStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {home_pageStore} = this.props;

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
  common(params) {
    const {
      home_pageStore: {onlineDeviceList, alarmDeviceDetailsList},
      type,
    } = this.props;
    type === 'offline' && onlineDeviceList({status: 0, ...params});
    type === 'online' && onlineDeviceList({status: 1, ...params});
    type === 'alarm' && alarmDeviceDetailsList(params);
    type === 'errline' && onlineDeviceList({status: 2, ...params});
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
  render() {
    const {home_pageStore} = this.props;
    const a_tableData = toJS(home_pageStore.a_tableData);
    const tableData = (a_tableData && a_tableData.varList) || [];
    const pagination = a_tableData || {};
    const columns = columnData();
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
      </div>
    );
  }
}

export default Regional;
