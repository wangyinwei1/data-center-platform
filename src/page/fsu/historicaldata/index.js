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
@inject('regionalStore', 'fsu_historicaldataStore')
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
    const {fsu_historicaldataStore} = this.props;
    this.c_onKeyPress(fsu_historicaldataStore);
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
      keywords: '',
      number: 10,
      ztreeChild: selectedOptions[0].code,
    };
    const {fsu_historicaldataStore} = this.props;
    fsu_historicaldataStore.getTable(params);
  }
  componentDidMount() {
    const {fsu_historicaldataStore} = this.props;
    this.initLoading(fsu_historicaldataStore);
  }
  //搜索
  onSearch(value) {
    const {fsu_historicaldataStore} = this.props;
    const params = {
      ...fsu_historicaldataStore.tableParmas,
      keywords: encodeURIComponent(value),
    };
    fsu_historicaldataStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_historicaldataStore} = this.props;

    const params = {
      ...fsu_historicaldataStore.tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_historicaldataStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_historicaldataStore} = this.props;
    this.c_onPageChange({pageNumber}, fsu_historicaldataStore);
  }
  //获取子集表格
  getChildTable(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_historicaldataStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      ztreeChild: item.suID,
      number: 10,
    };
    fsu_historicaldataStore.getChildTable(params);
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
    const {fsu_historicaldataStore, regionalStore} = this.props;
    const tableDada = toJS(fsu_historicaldataStore.tableData.varList) || [];
    const pagination = toJS(fsu_historicaldataStore.tableData) || {};
    const columns = columnData({
      getChildTable: this.getChildTable,
      _this: this,
    });
    const data = _.map(tableDada, (item, index) => {
      return {...item, num: index + 1};
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
            <Toolbar onSearch={this.onSearch} />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.count}
                columns={columns}
                onShowSizeChange={this.onShowSizeChange}
                loading={fsu_historicaldataStore.loading}
                onChange={this.onPageChange}
                data={data}
                key={''}
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
