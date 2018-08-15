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
@inject('fsu_historicaldataStore')
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
    const {fsu_historicaldataStore} = this.props;

    const params = {
      ...fsu_historicaldataStore.tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_historicaldataStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_historicaldataStore} = this.props;
    this.c_onPageChange({pageNumber}, fsu_historicaldataStore);
  }
  onSearch(value) {
    const {fsu_historicaldataStore} = this.props;
    const params = {
      ...fsu_historicaldataStore.c_tableParmas,
      keywords: encodeURIComponent(value),
    };
    fsu_historicaldataStore.childSearch(params);
  }
  timeChange(dates, dateStrings) {
    const {fsu_historicaldataStore} = this.props;
    const params = {
      ...fsu_historicaldataStore.c_tableParmas,
      stLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    fsu_historicaldataStore.getChildTable(params);
  }
  render() {
    const {fsu_historicaldataStore} = this.props;
    const c_tableData = toJS(fsu_historicaldataStore.c_tableData);
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
          loading={fsu_historicaldataStore.c_loading}
          total={pagination.count}
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
