import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbar';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Panel from '../../../components/Panel';
import ChildTable from './childTable.js';
//实例
@inject('regionalStore', 'fsu_realtimealarmStore')
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
    this.typesChange = this.typesChange.bind(this);
    this.getChildTable = this.getChildTable.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      cascaderText: '',
      cascaderLoading: false,
      cascaderValue: [],
      areaName: '',
    };
  }
  //以下级联方法
  onKeyPress(e) {
    const {fsu_realtimealarmStore} = this.props;
    this.c_onKeyPress(fsu_realtimealarmStore);
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
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    const {fsu_realtimealarmStore} = this.props;
    fsu_realtimealarmStore.getTable(params);
  }
  componentDidMount() {
    const {fsu_realtimealarmStore} = this.props;
    const params = {
      page: 1,
      sing: 'area',
      keywords: '',
      number: 10,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    fsu_realtimealarmStore.getFSUType();
    this.initLoading(fsu_realtimealarmStore, params);
  }
  //搜索
  onSearch(value) {
    const {fsu_realtimealarmStore} = this.props;
    const params = {
      ...fsu_realtimealarmStore.tableParmas,
      keywords: encodeURIComponent(value),
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
      page: 1,
    };
    fsu_realtimealarmStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_realtimealarmStore} = this.props;

    const params = {
      ...fsu_realtimealarmStore.tableParmas,
      page: current,
      number: pageSize,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    fsu_realtimealarmStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_realtimealarmStore} = this.props;
    this.c_onPageChange({pageNumber}, fsu_realtimealarmStore);
  }
  //获取子集表格
  getChildTable(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_realtimealarmStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      ztreeChild: item.suID,
      number: 10,
    };
    fsu_realtimealarmStore.getChildTable(params);
    this.setState({
      childTableVisible: true,
      childTableTitle: item.name,
    });
  }
  onCancel() {
    this.setState({
      childTableVisible: false,
    });
  }

  typesChange(value) {
    const {fsu_realtimealarmStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      page: 1,
      F_FsuTypeID: value,
    };
    localStorage.setItem('FsuTypeID', value);
    getTable(params);
  }
  render() {
    const {fsu_realtimealarmStore, regionalStore} = this.props;
    const tableData = toJS(fsu_realtimealarmStore.tableData.varList) || [];
    const pagination = toJS(fsu_realtimealarmStore.tableData) || {};
    const columns = columnData({
      getChildTable: this.getChildTable,
      _this: this,
    });
    return (
      <div className={styles['information_wrap']}>
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
            <Toolbar
              onSearch={this.onSearch}
              closeAdd={true}
              fsuAddTypes={fsu_realtimealarmStore.fsuAddTypes}
              typesChange={this.typesChange}
            />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.count}
                columns={columns}
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
                loading={fsu_realtimealarmStore.loading}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
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
