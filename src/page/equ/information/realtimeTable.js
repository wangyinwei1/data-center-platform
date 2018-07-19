import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../../bsifm/common';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './realtimeColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('informationStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.real = this.real.bind(this);
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {informationStore} = this.props;

    const params = {
      ...informationStore.tableParmas,
      page: current,
      number: pageSize,
    };
    informationStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {informationStore} = this.props;
    this.c_onPageChange({pageNumber}, informationStore);
  }
  onSearch(value) {
    const {informationStore} = this.props;
    const params = {
      ...informationStore.r_tableParmas,
      keywords: value,
    };
    informationStore.realtimeSearch(params);
  }
  real() {
    const {informationStore} = this.props;
    const params = {
      ...informationStore.r_tableParmas,
    };
    informationStore.getRealTimeCall(params);
  }
  render() {
    const {informationStore} = this.props;
    const r_tableData = toJS(informationStore.r_tableData);
    const tableData = (r_tableData && r_tableData.varList) || [];
    const pagination = r_tableData || {};
    const columns = columnData();
    const data = _.map(tableData, (item, index) => {
      return {...item, num: index + 1};
    });
    return (
      <div>
        <Toolbar
          onSearch={this.onSearch}
          onClick={this.real}
          showValue={['real']}
        />
        <Table
          loading={informationStore.r_loading}
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={data}
        />
      </div>
    );
  }
}

export default Regional;
