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
@inject('fsu_realtimedataStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_realtimedataStore} = this.props;

    const params = {
      ...fsu_realtimedataStore.tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_realtimedataStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_realtimedataStore} = this.props;
    this.c_onPageChange({pageNumber}, fsu_realtimedataStore);
  }
  onSearch(value) {
    const {fsu_realtimedataStore} = this.props;
    const params = {
      ...fsu_realtimedataStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    fsu_realtimedataStore.childSearch(params);
  }
  onRefreshClick() {
    const {fsu_realtimedataStore} = this.props;
    const params = {
      ...fsu_realtimedataStore.c_tableParmas,
    };
    fsu_realtimedataStore.getChildTable(params);
  }
  render() {
    const {fsu_realtimedataStore} = this.props;
    const c_tableData = toJS(fsu_realtimedataStore.c_tableData);
    const tableData = (c_tableData && c_tableData.varList) || [];
    const pagination = c_tableData || {};
    const columns = columnData();
    return (
      <div>
        <Toolbar
          onSearch={this.onSearch}
          closeAdd={true}
          showValue={'refresh'}
          onRefreshClick={this.onRefreshClick}
        />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          loading={fsu_realtimedataStore.c_loading}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
