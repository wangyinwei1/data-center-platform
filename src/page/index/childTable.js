import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../bsifm/common';
import Table from '../../components/Table';
import Remarks from '../../components/Remarks';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import fsuColumnData from './childFsuColumns.js';
import Toolbar from '../../components/Toolbar';
//实例
@inject('home_pageStore')
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
    const {home_pageStore, isFsu} = this.props;

    const params = {
      ...home_pageStore.tableParmas,
      page: current,
      number: pageSize,
    };
    isFsu
      ? home_pageStore.getFsuTable(params)
      : home_pageStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {home_pageStore, isFsu} = this.props;
    const params = {
      ...home_pageStore.tableParmas,
      page: pageNumber,
    };
    isFsu
      ? home_pageStore.getFsuTable(params)
      : home_pageStore.getTable(params);
  }
  onSearch(value) {
    const {home_pageStore, isFsu} = this.props;
    const params = {
      ...home_pageStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    isFsu ? home_pageStore.fsuSearch(params) : home_pageStore.search(params);
  }
  operation(type, item) {
    const {
      home_pageStore: {executeOperation, fsuExecuteOperatio},
      isFsu,
    } = this.props;
    isFsu
      ? fsuExecuteOperatio({
          F_SerialNo: item.F_SerialNo,
          F_SuID: item.F_SuID,
          operationType: type,
        })
      : executeOperation({
          F_AlarmID: item.F_AlarmID,
          operationType: type,
        });
  }
  endClick(item) {
    this.operation('close', item);
  }
  handleClick(item) {
    this.operation('pending', item);
  }
  cancelClick(item) {
    this.operation('wrong', item);
  }
  confirmClick(item) {
    this.operation('affirm', item);
  }
  render() {
    const {home_pageStore, isFsu} = this.props;
    const c_tableData = toJS(home_pageStore.tableData);
    const tableData = (c_tableData && c_tableData.alarmList) || [];
    const pagination = c_tableData.pd || {};
    const columns = isFsu
      ? fsuColumnData({
          endClick: this.endClick,
          handleClick: this.handleClick,
          cancelClick: this.cancelClick,
          confirmClick: this.confirmClick,
          _this: this,
        })
      : columnData({
          endClick: this.endClick,
          handleClick: this.handleClick,
          cancelClick: this.cancelClick,
          confirmClick: this.confirmClick,
          _this: this,
        });
    return (
      <div className={styles['alarm_table_wrap']}>
        <Remarks theme={'darker'} />
        <Toolbar onSearch={this.onSearch} theme={'darker'} closeAdd={true} />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.allCount}
          columns={columns}
          theme={'darker'}
          rowClassName={(record, index) => {
            const rowClassName = ['td_padding'];
            record.onOff === 0 && rowClassName.push('cl_online_state');
            return rowClassName.join(' ');
          }}
          loading={home_pageStore.loading}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
