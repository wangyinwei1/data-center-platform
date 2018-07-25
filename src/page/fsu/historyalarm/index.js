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
@inject('regionalStore', 'fsu_historyalarmStore')
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
    };
  }
  //以下级联方法
  onKeyPress(e) {
    const {fsu_historyalarmStore} = this.props;
    this.c_onKeyPress(fsu_historyalarmStore);
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
    const {fsu_historyalarmStore} = this.props;
    fsu_historyalarmStore.getTable(params);
  }
  componentDidMount() {
    const {fsu_historyalarmStore} = this.props;
    this.initLoading(fsu_historyalarmStore);
  }
  //搜索
  onSearch(value) {
    const {fsu_historyalarmStore} = this.props;
    const params = {
      ...fsu_historyalarmStore.tableParmas,
      keywords: value,
    };
    fsu_historyalarmStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_historyalarmStore} = this.props;

    const params = {
      ...fsu_historyalarmStore.tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_historyalarmStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_historyalarmStore} = this.props;
    this.c_onPageChange({pageNumber}, fsu_historyalarmStore);
  }
  //获取子集表格
  getChildTable(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_historyalarmStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      ztreeChild: item.suID,
      number: 10,
    };
    fsu_historyalarmStore.getChildTable(params);
    this.setState({
      childTableVisible: true,
      childTableTitle: item.devName,
    });
  }
  onCancel() {
    this.setState({
      childTableVisible: false,
    });
  }

  render() {
    const {fsu_historyalarmStore, regionalStore} = this.props;
    const tableDada = toJS(fsu_historyalarmStore.tableData.varList) || [];
    const pagination = toJS(fsu_historyalarmStore.tableData) || {};
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
            <Toolbar onSearch={this.onSearch} closeAdd={true} />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.count}
                columns={columns}
                loading={fsu_historyalarmStore.loading}
                onShowSizeChange={this.onShowSizeChange}
                rowClassName={(record, index) => {
                  const rowClassName = [];
                  record.statustwo == 0 && rowClassName.push('cl_online_state');
                  return rowClassName.join(' ');
                }}
                onChange={this.onPageChange}
                data={tableDada}
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
