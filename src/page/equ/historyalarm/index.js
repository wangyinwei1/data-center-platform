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
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.onExpand = this.onExpand.bind(this);
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
      lastLoginStart: '',
      lastLoginEnd: '',
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

  //嵌套表格
  expandedRowRender(record, i) {
    return <E_ChildTable getChildTable={this.getChildTable} />;
  }
  onExpand(expanded, record) {
    const {historyalarmStore} = this.props;
    const expandedRows = this.state.expandedRows;
    //孙设备
    if (expandedRows[0] && expandedRows[0] !== record.devID) {
      historyalarmStore.c_expandedRowsChange([]);
    }

    this.stopOperation = true;
    if (expanded) {
      this.setState({expandedRows: [record.devID]});
    } else {
      this.setState({expandedRows: []});
    }

    historyalarmStore.getSportTable({F_DeviceID: record.devID});
  }
  render() {
    const {historyalarmStore, regionalStore} = this.props;
    const tableData = toJS(historyalarmStore.tableData.varList) || [];
    const pagination = toJS(historyalarmStore.tableData) || {};
    const showIconIndex = _.map(tableData, (item, index) => {
      if (item.isConcentrator == 1) {
        return index;
      } else {
        return false;
      }
    }).filter(item => {
      return item || item === 0;
    });
    const nesting =
      showIconIndex[0] || showIconIndex[0] === 0
        ? {
            expandedRowRender: this.expandedRowRender,
            onExpand: this.onExpand,
            expandedRowKeys: this.state.expandedRows,
          }
        : {};
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
                nesting={nesting}
                rowClassName={(record, index) => {
                  const rowClassName = [];
                  record.statustwo == 0 &&
                    record.isConcentrator === 0 &&
                    rowClassName.push('cl_online_state');
                  record.isConcentrator == 0 &&
                    rowClassName.push('cl_hidden_expand_icon');
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
