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
  }
  componentDidMount() {
    const {fsu_controlrecordStore: {getTable}} = this.props;
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
    const {fsu_controlrecordStore} = this.props;

    const params = {
      ...fsu_controlrecordStore.tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_controlrecordStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_controlrecordStore} = this.props;
    const params = {
      ...fsu_controlrecordStore.tableParmas,
      page: pageNumber,
    };
    fsu_controlrecordStore.getTable(params);
  }
  onSearch(value) {
    const {fsu_controlrecordStore} = this.props;
    const params = {
      ...fsu_controlrecordStore.tableParmas,
      keywords: encodeURIComponent(value),
    };
    fsu_controlrecordStore.search(params);
  }
  timeChange(dates, dateStrings) {
    const {fsu_controlrecordStore} = this.props;
    const params = {
      ...fsu_controlrecordStore.tableParmas,
      page: 1,
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    fsu_controlrecordStore.getTable(params);
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
