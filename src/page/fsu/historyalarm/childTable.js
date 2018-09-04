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
@inject('fsu_historyalarmStore')
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
    const {fsu_historyalarmStore} = this.props;

    const params = {
      ...fsu_historyalarmStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_historyalarmStore.getChildTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_historyalarmStore} = this.props;
    const params = {
      ...fsu_historyalarmStore.c_tableParmas,
      page: pageNumber,
    };
    fsu_historyalarmStore.getChildTable(params);
  }
  onSearch(value) {
    const {fsu_historyalarmStore} = this.props;
    const params = {
      ...fsu_historyalarmStore.c_tableParmas,
      keywords: encodeURIComponent(value),
    };
    fsu_historyalarmStore.getChildTable(params);
  }
  timeChange(dates, dateStrings) {
    const {fsu_historyalarmStore} = this.props;
    const params = {
      ...fsu_historyalarmStore.c_tableParmas,
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    fsu_historyalarmStore.childSearch(params);
  }
  render() {
    const {fsu_historyalarmStore} = this.props;
    const c_tableData = toJS(fsu_historyalarmStore.c_tableData);
    const tableData = (c_tableData && c_tableData.varList) || [];
    const pagination = c_tableData || {};
    const columns = columnData();
    const data = _.map(tableData, (item, index) => {
      return {...item, num: index + 1};
    });
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
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          useDefaultRowKey={true}
          loading={fsu_historyalarmStore.c_loading}
          onChange={this.onPageChange}
          data={data}
        />
      </div>
    );
  }
}

export default Regional;
