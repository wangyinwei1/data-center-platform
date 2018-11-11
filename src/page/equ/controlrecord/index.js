import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('controlrecordStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.timeChange = this.timeChange.bind(this);
  }
  componentDidMount() {
    const {controlrecordStore: {getTable}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      number: 10,
      lastLoginStart: '',
      lastLoginEnd: '',
    };
    getTable(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {controlrecordStore} = this.props;

    const params = {
      ...controlrecordStore.tableParmas,
      page: current,
      number: pageSize,
    };
    controlrecordStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {controlrecordStore} = this.props;
    const params = {
      ...controlrecordStore.tableParmas,
      page: pageNumber,
    };
    controlrecordStore.getTable(params);
  }
  onSearch(value) {
    const {controlrecordStore} = this.props;
    const params = {
      ...controlrecordStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    controlrecordStore.search(params);
  }
  timeChange(dates, dateStrings) {
    const {controlrecordStore} = this.props;
    const params = {
      ...controlrecordStore.tableParmas,
      page: 1,
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    controlrecordStore.getTable(params);
  }
  render() {
    const {controlrecordStore} = this.props;
    const tableData =
      (toJS(controlrecordStore.tableData) &&
        toJS(controlrecordStore.tableData).varList) ||
      [];
    const pagination = controlrecordStore.tableData || {};
    const columns = columnData();
    return (
      <div className={styles['controlrecord_wrap']}>
        <Toolbar
          showValue={['time']}
          timeChange={this.timeChange}
          onSearch={this.onSearch}
          closeAdd={true}
        />
        <div className={styles['controlrecord_ct']}>
          <div className={styles['min_width']}>
            <Table
              pageIndex={pagination.page}
              pageSize={pagination.number}
              total={pagination.count}
              loading={controlrecordStore.loading}
              columns={columns}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              data={tableData}
              useDefaultRowKey={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Regional;
