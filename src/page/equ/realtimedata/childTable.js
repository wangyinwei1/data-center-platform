import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('regionalStore', 'realtimedataStore')
@observer
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
    const {realtimedataStore} = this.props;

    const params = {
      ...realtimedataStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    realtimedataStore.getChildTable(params);
  }
  onPageChange(pageNumber) {
    const {realtimedataStore} = this.props;
    const params = {
      ...realtimedataStore.c_tableParmas,
      page: pageNumber,
    };
    realtimedataStore.getChildTable(params);
  }
  onSearch(value) {
    const {realtimedataStore} = this.props;
    const params = {
      ...realtimedataStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    realtimedataStore.childSearch(params);
  }
  onRefreshClick() {
    const {realtimedataStore} = this.props;
    const params = {
      ...realtimedataStore.c_tableParmas,
    };
    realtimedataStore.childSearch(params);
  }
  render() {
    const {realtimedataStore} = this.props;
    const c_tableData = toJS(realtimedataStore.c_tableData);
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
          loading={realtimedataStore.c_loading}
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
