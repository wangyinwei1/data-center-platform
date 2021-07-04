import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Toolbar from '../../../components/Toolbar';
import moment from 'moment';
//实例
@inject('passivedevicechangerecordStore')
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
    const {passivedevicechangerecordStore: {getTable}} = this.props;
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
    const {passivedevicechangerecordStore} = this.props;

    const params = {
      ...passivedevicechangerecordStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    passivedevicechangerecordStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {passivedevicechangerecordStore} = this.props;
    const params = {
      ...passivedevicechangerecordStore.tableParmas,
      page: pageNumber,
    };
    passivedevicechangerecordStore.getTable(params);
  }
  onSearch(value) {
    const {passivedevicechangerecordStore} = this.props;
    const params = {
      ...passivedevicechangerecordStore.tableParmas,
      keywords: value,
      page: 1,
    };
    passivedevicechangerecordStore.search(params);
  }
  timeChange(dates, dateStrings) {
    const params = {
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };

    this.timeParams = params || {};
  }
  onTimeOk() {
    const {passivedevicechangerecordStore} = this.props;
    let obj = {
      page: 1,
      ...passivedevicechangerecordStore.tableParmas,
      ...this.timeParams,
    };
    passivedevicechangerecordStore.getTable(obj);
  }
  render() {
    const {passivedevicechangerecordStore} = this.props;
    const tableData =
      (toJS(passivedevicechangerecordStore.tableData) &&
        toJS(passivedevicechangerecordStore.tableData).varList) ||
      [];
    const pagination =
      (passivedevicechangerecordStore.tableData &&
        passivedevicechangerecordStore.tableData.pd) ||
      {};
    const columns = columnData();
    return (
      <div className={styles['controlrecord_wrap']}>
        <Toolbar
          showValue={['time']}
          timeChange={this.timeChange}
          onTimeOk={this.onTimeOk}
          onSearch={this.onSearch}
          closeAdd={true}
        />
        <div className={styles['controlrecord_ct']}>
          <div className={styles['min_width']}>
            <Table
              pageIndex={pagination.page}
              pageSize={pagination.number}
              total={pagination.allCount}
              loading={passivedevicechangerecordStore.loading}
              columns={columns}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              data={tableData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Regional;
