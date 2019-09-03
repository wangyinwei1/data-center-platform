import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../common';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('tagsStore')
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
    const {tagsStore, whichTable} = this.props;

    const params = {
      ...tagsStore.detailParmas,
      page: current,
      number: pageSize,
    };
    tagsStore.getTagDetail(params, whichTable);
  }
  onPageChange(pageNumber) {
    const {tagsStore, whichTable} = this.props;
    const params = {
      ...tagsStore.c_tableParmas,
      page: pageNumber,
    };
    tagsStore.getTagDetail(params, whichTable);
  }
  onSearch(value) {
    const {tagsStore, whichTable} = this.props;
    const params = {
      ...tagsStore.detailParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    tagsStore.getTagDetail(params, whichTable);
  }
  onTimeOk = () => {
    const {tagsStore, whichTable} = this.props;
    let params = {
      ...tagsStore.detailParmas,
      page: 1,
      ...this.timeParams,
    };
    tagsStore.getTagDetail(params, whichTable);
  };
  timeChange = (dates, dateStrings) => {
    const params = {
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    };
    this.timeParams = params;
  };
  render() {
    const {tagsStore, theme, whichTable} = this.props;
    const c_tableData = toJS(tagsStore.detailData);
    console.log(c_tableData);
    const tableData = (c_tableData && c_tableData.list) || [];
    const pagination = c_tableData || {};
    const columns = columnData({
      whichTable,
    });
    return (
      <div>
        <Toolbar
          onSearch={this.onSearch}
          closeAdd={true}
          showValue={['time']}
          timeChange={this.timeChange}
          onTimeOk={this.onTimeOk}
        />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          columns={columns}
          theme={theme}
          loading={tagsStore.detailLoading}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
          useDefaultRowKey={true}
        />
      </div>
    );
  }
}

export default Regional;
