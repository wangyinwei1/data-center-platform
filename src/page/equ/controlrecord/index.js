import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import columnData from './columns.js';
import moment from 'moment';
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
    this.onTimeOk = this.onTimeOk.bind(this);
    this.state = {
      timeParams: {},
    };
  }
  componentDidMount() {
    const {controlrecordStore: {getTable}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      number: 10,
      lastLoginStart: moment()
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      lastLoginEnd: moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
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
    const params = {
      page: 1,
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    this.timeParams = params;
  }
  onTimeOk() {
    const {controlrecordStore} = this.props;
    let obj = {
      ...controlrecordStore.tableParmas,
      ...this.timeParams,
    };
    controlrecordStore.getTable(obj);
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
          onTimeOk={this.onTimeOk}
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
