import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbar';
import Remarks from '../../../components/Remarks';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Panel from '../../../components/Panel';
import ChildTable from './childTable.js';
import moment from 'moment';
import E_ChildTable from './e_childTable.js';
//实例
@inject('regionalStore', 'historyalarmStore')
@observer
@mixin(cascader)
class Passageway extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.getChildTable = this.getChildTable.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      cascaderText: '',
      cascaderLoading: false,
      cascaderValue: [],
      areaName: '',
      expandedRows: [],
    };
  }
  //以下级联方法
  onKeyPress(e) {
    const {historyalarmStore} = this.props;
    this.c_onKeyPress(historyalarmStore);
  }
  loadData(selectedOptions, index, callback) {
    this.c_loadData(selectedOptions, index, callback);
  }
  onTextChange(value) {
    this.c_onTextChange(value);
  }
  onCascaderChange(value, selectedOptions) {
    this.c_onCascaderChang(value, selectedOptions);
    const params = {
      page: 1,
      sing: selectedOptions[0].sing,
      keywords: '',
      number: 10,
      ztreeChild: selectedOptions[0].code,
    };
    const {historyalarmStore} = this.props;
    historyalarmStore.getTable(params);
  }
  componentDidMount() {
    const {historyalarmStore} = this.props;
    this.initLoading(historyalarmStore);
  }
  //搜索
  onSearch(value) {
    const {historyalarmStore} = this.props;
    const params = {
      ...historyalarmStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    historyalarmStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {historyalarmStore} = this.props;

    const params = {
      ...historyalarmStore.tableParmas,
      page: current,
      number: pageSize,
    };
    historyalarmStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {historyalarmStore} = this.props;
    this.c_onPageChange({pageNumber}, historyalarmStore);
  }
  //获取子集表格
  getChildTable(item, e, sub) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {historyalarmStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      F_DeviceID: sub === 'sub' ? item.subDeviceID : item.devID,
      number: 10,
      lastLoginStart: moment()
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      lastLoginEnd: moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
    };
    historyalarmStore.getChildTable(params);
    this.setState({
      childTableVisible: true,
      childTableTitle: item.devName || item.subDeviceName,
    });
  }
  onCancel() {
    this.setState({
      childTableVisible: false,
    });
  }

  render() {
    const {historyalarmStore, regionalStore} = this.props;
    const tableData = toJS(historyalarmStore.tableData.varList) || [];
    const pagination = toJS(historyalarmStore.tableData) || {};
    const columns = columnData({
      getChildTable: this.getChildTable,
      _this: this,
    });
    return (
      <div className={styles['information_wrap']}>
        <Remarks />
        <Cascader
          loading={this.state.cascaderLoading}
          options={toJS(regionalStore.areaTree)}
          onKeyPress={this.onKeyPress}
          loadData={this.loadData}
          onTextChange={this.onTextChange}
          cascaderValue={this.state.cascaderValue}
          cascaderText={this.state.cascaderText}
          onChange={this.onCascaderChange}
        />
        <div className={styles['information_ct']}>
          <div className={styles['min_width']}>
            <Toolbar onSearch={this.onSearch} closeAdd={true} />
            <div className={styles['table_wrap']}>
              <Table
                rowClassName={(record, index) => {
                  const rowClassName = [];
                  record.onOff === 0 &&
                    (record.status == 1
                      ? rowClassName.push('cl_disabled_state')
                      : rowClassName.push('cl_offline_state'));
                  record.onOff === 1 && rowClassName.push('cl_online_state');
                  record.onOff === 2 && rowClassName.push('cl_err_state');
                  return rowClassName.join(' ');
                }}
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.count}
                columns={columns}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                loading={historyalarmStore.loading}
                data={tableData}
              />
            </div>
          </div>
        </div>
        <Panel
          onCancel={this.onCancel}
          title={this.state.childTableTitle}
          isShow={this.state.childTableVisible}>
          <ChildTable />
        </Panel>
      </div>
    );
  }
}

export default Passageway;
