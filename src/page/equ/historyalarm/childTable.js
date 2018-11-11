import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../../bsifm/common';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('historyalarmStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.timeChange = this.timeChange.bind(this);
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {historyalarmStore} = this.props;

    const params = {
      ...historyalarmStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    historyalarmStore.getChildTable(params);
  }
  onPageChange(pageNumber) {
    const {historyalarmStore} = this.props;
    const params = {
      ...historyalarmStore.c_tableParmas,
      page: pageNumber,
    };
    historyalarmStore.getChildTable(params);
  }
  onSearch(value) {
    const {historyalarmStore} = this.props;
    const params = {
      ...historyalarmStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    historyalarmStore.childSearch(params);
  }
  timeChange(dates, dateStrings) {
    const {historyalarmStore} = this.props;
    const params = {
      ...historyalarmStore.c_tableParmas,
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    historyalarmStore.childSearch(params);
  }
  render() {
    const {historyalarmStore} = this.props;
    const c_tableData = toJS(historyalarmStore.c_tableData);
    const tableData = (c_tableData && c_tableData.varList) || [];
    const pagination = c_tableData || {};
    const columns = columnData();
    return (
      <div>
        <Toolbar
          onSearch={this.onSearch}
          closeAdd={true}
          showValue={['time']}
          timeChange={this.timeChange}
        />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          rowClassName={(record, index) => {
            return 'cl_row_padding';
          }}
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          loading={historyalarmStore.c_loading}
          onChange={this.onPageChange}
          useDefaultRowKey={true}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
