import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../common';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import moment from 'moment';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('sitetreasureStore')
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
    const {sitetreasureStore, whichTable} = this.props;

    const params = {
      ...sitetreasureStore.detailParmas,
      page: current,
      number: pageSize,
    };
    sitetreasureStore.getTagDetail(params, whichTable);
  }
  onPageChange(pageNumber) {
    const {sitetreasureStore, whichTable} = this.props;
    const params = {
      ...sitetreasureStore.detailParmas,
      page: pageNumber,
    };
    sitetreasureStore.getTagDetail(params, whichTable);
  }
  onSearch(value) {
    const {sitetreasureStore, whichTable} = this.props;
    const params = {
      ...sitetreasureStore.detailParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    sitetreasureStore.getTagDetail(params, whichTable);
  }
  onTimeOk = () => {
    const {sitetreasureStore, whichTable} = this.props;
    let params = {
      ...sitetreasureStore.detailParmas,
      page: 1,
      ...this.timeParams,
    };
    sitetreasureStore.getTagDetail(params, whichTable);
  };
  timeChange = (dates, dateStrings) => {
    const {whichTable} = this.props;
    const params = {
      begin_timestamp: +moment(dateStrings[0]),
      end_timestamp: +moment(dateStrings[1]),
    };
    this.timeParams = params;
  };
  render() {
    const {sitetreasureStore, theme, whichTable} = this.props;
    const c_tableData = toJS(sitetreasureStore.detailData);
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
          total={pagination.allCount}
          columns={columns}
          theme={theme}
          loading={sitetreasureStore.detailLoading}
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
