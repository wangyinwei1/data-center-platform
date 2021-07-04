import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import Remarks from '../../../components/Remarks';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbar';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Panel from '../../../components/Panel';
import ChildTable from './childTable.js';
//实例
@inject('regionalStore', 'historicaldataStore')
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
    const {historicaldataStore} = this.props;
    this.c_onKeyPress(historicaldataStore);
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
    const {historicaldataStore} = this.props;
    historicaldataStore.getTable(params);
  }
  componentDidMount() {
    const {historicaldataStore} = this.props;
    this.initLoading(historicaldataStore);
  }
  //搜索
  onSearch(value) {
    const {historicaldataStore} = this.props;
    const params = {
      ...historicaldataStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    historicaldataStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {historicaldataStore} = this.props;

    const params = {
      ...historicaldataStore.tableParmas,
      page: current,
      number: pageSize,
    };
    historicaldataStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {historicaldataStore} = this.props;
    this.c_onPageChange({pageNumber}, historicaldataStore);
  }
  //获取子集表格
  getChildTable(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {historicaldataStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      F_DeviceID: item.devID,
      number: 10,
    };
    historicaldataStore.getChildTable(params);
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
    const {historicaldataStore, regionalStore} = this.props;
    const tableDada = toJS(historicaldataStore.tableData.varList) || [];
    const pagination = toJS(historicaldataStore.tableData) || {};
    const columns = columnData({
      getChildTable: this.getChildTable,
      _this: this,
    });
    const data = _.map(tableDada, (item, index) => {
      return {...item, num: index + 1};
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
          <Toolbar onSearch={this.onSearch} closeAdd={true} />
          <div className={styles['table_wrap']}>
            <Table
              pageIndex={pagination.page}
              pageSize={pagination.number}
              loading={historicaldataStore.loading}
              total={pagination.count}
              columns={columns}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              data={data}
              key={''}
            />
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
