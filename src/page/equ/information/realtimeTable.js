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
    this.state = {
      isRealtimeCall: false,
    };
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {informationStore} = this.props;

    const params = {
      ...informationStore.r_tableParmas,
      page: current,
      number: pageSize,
    };
    this.state.isRealtimeCall
      ? informationStore.getRealTimeCall(params)
      : informationStore.getRealtimeTable(params);
  }
  onPageChange(pageNumber) {
    const {informationStore} = this.props;
    const params = {
      ...informationStore.r_tableParmas,
      page: pageNumber,
    };

    this.state.isRealtimeCall
      ? informationStore.getRealTimeCall(params)
      : informationStore.getRealtimeTable(params);
  }
  onSearch(value) {
    const {informationStore} = this.props;
    const params = {
      ...informationStore.r_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    this.state.isRealtimeCall
      ? informationStore.getRealTimeCall(params)
      : informationStore.realtimeSearch(params);
  }
  real() {
    const {informationStore} = this.props;
    const params = {
      ...informationStore.r_tableParmas,
      page: 1,
    };
    informationStore.getRealTimeCall(params);
    this.setState({
      isRealtimeCall: true,
    });
  }
  componentWillUnmount() {
    this.setState({
      isRealtimeCall: false,
    });
  }
  render() {
    const {informationStore, needRealtime} = this.props;
    const isRealtimeCall = this.state.isRealtimeCall;
    const r_tableData = toJS(informationStore.r_tableData);
    const tableData = (r_tableData && r_tableData.varList) || [];
    const pagination = r_tableData || {};
    const columns = columnData();

    return (
      <div>
        <Toolbar
          onSearch={this.onSearch}
          onClick={this.real}
          showValue={['real']}
          needRealtime={needRealtime}
          realLoding={informationStore.r_loading}
        />
        <Table
          loading={informationStore.r_loading}
          pageIndex={
            isRealtimeCall
              ? informationStore.r_tableParmas.page
              : pagination.page
          }
          pageSize={
            isRealtimeCall
              ? informationStore.r_tableParmas.number
              : pagination.number
          }
          total={pagination.count}
          columns={columns}
          useDefaultRowKey={true}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
