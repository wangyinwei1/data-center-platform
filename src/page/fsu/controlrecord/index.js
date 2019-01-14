import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('fsu_controlrecordStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.onTimeOk = this.onTimeOk.bind(this);
    this.typesChange = this.typesChange.bind(this);
    this.state = {
      timeParams: {},
    };
  }
  componentDidMount() {
    const {fsu_controlrecordStore: {getTable, getFSUType}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      number: 10,
      lastLoginStart: '',
      lastLoginEnd: '',
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    getFSUType();
    getTable(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_controlrecordStore} = this.props;

    const params = {
      ...fsu_controlrecordStore.tableParmas,
      page: current,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
      number: pageSize,
    };
    fsu_controlrecordStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_controlrecordStore} = this.props;
    const params = {
      ...fsu_controlrecordStore.tableParmas,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
      page: pageNumber,
    };
    fsu_controlrecordStore.getTable(params);
  }
  onSearch(value) {
    const {fsu_controlrecordStore} = this.props;
    const params = {
      ...fsu_controlrecordStore.tableParmas,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
      keywords: encodeURIComponent(value),
      page: 1,
    };
    fsu_controlrecordStore.search(params);
  }
  timeChange(dates, dateStrings) {
    const params = {
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    this.timeParams = params;
  }
  onTimeOk() {
    const {fsu_controlrecordStore} = this.props;
    let obj = {
      ...fsu_controlrecordStore.tableParmas,
      page: 1,
      ...this.timeParams,
    };
    fsu_controlrecordStore.getTable(obj);
  }
  typesChange(value) {
    const {fsu_controlrecordStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      page: 1,
      F_FsuTypeID: value,
    };
    localStorage.setItem('FsuTypeID', value);
    getTable(params);
  }
  render() {
    const {fsu_controlrecordStore} = this.props;
    const tableData =
      (toJS(fsu_controlrecordStore.tableData) &&
        toJS(fsu_controlrecordStore.tableData).varList) ||
      [];
    const pagination = fsu_controlrecordStore.tableData || {};
    const columns = columnData();
    return (
      <div className={styles['controlrecord_wrap']}>
        <Toolbar
          showValue={['time']}
          timeChange={this.timeChange}
          onSearch={this.onSearch}
          fsuAddTypes={fsu_controlrecordStore.fsuAddTypes}
          typesChange={this.typesChange}
          onTimeOk={this.onTimeOk}
          closeAdd={true}
        />
        <div className={styles['controlrecord_ct']}>
          <div className={styles['min_width']}>
            <Table
              pageIndex={pagination.page}
              pageSize={pagination.number}
              total={pagination.count}
              loading={fsu_controlrecordStore.loading}
              columns={columns}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              useDefaultRowKey={true}
              data={tableData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Regional;
