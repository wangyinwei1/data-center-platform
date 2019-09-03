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
@inject('sitetreasureStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.onTimeOk = this.onTimeOk.bind(this);
    this.state = {
      timeParams: {},
    };
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {sitetreasureStore} = this.props;

    const params = {
      ...sitetreasureStore.tagParmas,
      page: current,
      number: pageSize,
    };
    sitetreasureStore.getTagList(params);
  }
  onPageChange(pageNumber) {
    const {sitetreasureStore} = this.props;
    const params = {
      ...sitetreasureStore.tagParmas,
      page: pageNumber,
    };
    sitetreasureStore.getTagList(params);
  }
  onSearch(value) {
    const {sitetreasureStore} = this.props;
    const params = {
      ...sitetreasureStore.tagParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    sitetreasureStore.getTagList(params);
  }
  timeChange(dates, dateStrings) {
    const params = {
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    };
    this.tagParams = params;
  }

  onTimeOk() {
    const {sitetreasureStore} = this.props;
    let obj = {
      ...sitetreasureStore.tagParmas,
      page: 1,
      ...this.tagParams,
    };
    sitetreasureStore.getTagList(obj);
  }
  render() {
    const {sitetreasureStore} = this.props;
    const tagData = toJS(sitetreasureStore.tagData) || [];
    console.log(tagData);
    const columns = columnData();
    return (
      <div>
        <Table
          // pageIndex={pagination.page}
          // pageSize={pagination.number}
          // total={pagination.count}
          // onShowSizeChange={this.onShowSizeChange}
          // onChange={this.onPageChange}
          pagination={false}
          rowClassName={(record, index) => {
            return 'cl_row_padding';
          }}
          columns={columns}
          loading={sitetreasureStore.tagLoading}
          useDefaultRowKey={true}
          data={tagData}
        />
      </div>
    );
  }
}

export default Regional;
