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
@inject('historicaldataStore')
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
    const {historicaldataStore} = this.props;

    const params = {
      ...historicaldataStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    historicaldataStore.getChildTable(params);
  }
  onPageChange(pageNumber) {
    const {historicaldataStore} = this.props;
    const params = {
      ...historicaldataStore.c_tableParmas,
      page: pageNumber,
    };
    historicaldataStore.getChildTable(params);
  }
  onSearch(value) {
    const {historicaldataStore} = this.props;
    const params = {
      ...historicaldataStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    historicaldataStore.childSearch(params);
  }
  timeChange(dates, dateStrings) {
    const {historicaldataStore} = this.props;
    const params = {
      ...historicaldataStore.c_tableParmas,
      stLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    historicaldataStore.getChildTable(params);
  }
  render() {
    const {historicaldataStore} = this.props;
    const c_tableData = toJS(historicaldataStore.c_tableData);
    const tableData = (c_tableData && c_tableData.varList) || [];
    const pagination = c_tableData || {};
    const columns = columnData();
    return (
      <div>
        <Toolbar
          showValue={['time']}
          timeChange={this.timeChange}
          onSearch={this.onSearch}
          closeAdd={true}
        />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          loading={historicaldataStore.c_loading}
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
