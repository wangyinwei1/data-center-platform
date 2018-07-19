import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import _ from 'lodash';
import {Input, Row, Col, Button, message} from 'antd';
import {toJS} from 'mobx';
import classnames from 'classnames';
import Cascader from '../../../components/Cascader';
import Table from '../../../components/Table';
import columnData from './columns.js';
import DeleteModal from './delete.js';
import EditModal from './edit.js';
import Search from '../../../components/Search';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../common';
import Toolbar from '../../../components/Toolbar';
import EditContent from './editContent.js';
import {formParams} from './tplJson.js';

//实例
@inject('regionalStore', 'tableStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.add = this.add.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

    this.state = {
      cascaderLoading: false,
      singleLineData: {},
      modalTitle: '',
      deleteShow: false,
      editShow: false,
      isModify: false,
      cascaderText: '',
      cascaderValue: [],
      areaName: '',
      type: 'new',
      ...formParams,
    };
  }

  //删除回调
  onDeleteOk() {
    const {regionalStore} = this.props;
    const params = {F_AreaID: this.state.singleLineData.code};
    this.c_onDeleteOk(regionalStore, params);
  }
  onDeleteCancel() {
    this.c_onDeleteCancel();
  }
  //编辑确定
  onEditOk() {
    const fields = this.state.fields;
    const showError = this.test(fields);
    const hasError = _.keys(showError);

    if (hasError[0]) {
      this.setState(({childDevicefields}) => {
        return {
          childDevicefields: {
            ...childDevicefields,
            ...showError,
          },
        };
      });
    } else {
      const {regionalStore: {save, currentCode}} = this.props;
      const params = {
        F_AreaName: fields.F_AreaName.value,
        F_ParentAreaID: currentCode,
      };
      save(params).then(data => {
        data &&
          this.setState({
            ...formParams,
            editShow: false,
          });
      });
    }
  }
  //校验循环
  test(fields) {
    let showError = {};
    //循环找到必填字段是否是空并作出警告
    _.forIn(fields, (v, k) => {
      if (!v.value && v.value !== 0 && v.require) {
        showError[k] = {showError: true, ...v};
      }
    });
    return showError;
  }

  //取消
  onEditCancel() {
    this.setState({
      ...formParams,
      editShow: false,
    });
  }

  //删除
  deleteClick(item, e) {
    this.setState({
      deleteShow: true,
      singleLineData: item,
    });
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {regionalStore} = this.props;
    this.c_onShowSizeChange({current, pageSize}, regionalStore);
  }
  onPageChange(pageNumber) {
    const {regionalStore} = this.props;
    this.c_onPageChange({pageNumber}, regionalStore);
  }
  //编辑回调
  editClick(item, e) {
    const {regionalStore} = this.props;
    regionalStore.getEidtData({F_AreaID: item.code}).then(data => {
      this.initFromValue(data.pd, 'modify');
      console.log(data.pd);
    });
  }
  initFromValue(data, mode) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.city.value = data.cityCode;
      formValue.county.value = data.countyCode;
      formValue.province.value = data.provinceCode || data.proCode;
      formValue.F_AreaName.value = data.F_AreaName;
      console.log(typeof data.cityCode);
      return {
        fields: {
          ...fields,
          ...formValue,
        },
        editShow: true,
        type: mode,
      };
    });
  }
  add(e) {
    const {regionalStore: {tableParmas, addArea}} = this.props;
    const params = {
      F_AreaID: tableParmas.ztreeChild,
    };
    addArea(params).then(data => {
      this.initFromValue(data.area, 'new');
    });
  }
  //级联组件方法
  loadData(selectedOptions, index, callback) {
    this.c_loadData(selectedOptions, index, callback);
  }
  onTextChange(value) {
    this.c_onTextChange(value);
  }
  onCascaderChange(value, selectedOptions) {
    const params = this.c_onCascaderChang(value, selectedOptions);
    const {regionalStore} = this.props;

    regionalStore.getTable(params);
  }
  onKeyPress(e) {
    const {regionalStore} = this.props;
    this.c_onKeyPress(regionalStore);
  }
  componentDidMount() {
    const {regionalStore} = this.props;
    this.initLoading(regionalStore);
  }

  //搜索
  onSearch(value) {
    const {regionalStore} = this.props;
    const params = {
      ...regionalStore.tableParmas,
      keywords: value,
    };
    regionalStore.search(params);
  }
  handleFormChange(changedFields) {
    //showError让自己校验字段
    const key = _.keys(changedFields);
    const obj = {};
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({fields}) => {
      return {
        fields: {...fields, ...obj},
      };
    });
  }
  //渲染
  render() {
    const {regionalStore} = this.props;
    const tableDada = toJS(regionalStore.tableData.varList) || [];
    const pagination = toJS(regionalStore.tableData.pd) || {};

    const belongRegion = regionalStore.belongRegion;
    const isCloseAdd =
      belongRegion == 'country' || belongRegion == 'province' ? true : false;
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      _this: this,
      isClose: isCloseAdd,
    });
    return (
      <div className={styles['regional_wrap']}>
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
        <div className={styles['regional_ct']}>
          <div className={styles['min_width']}>
            <Toolbar
              onSearch={this.onSearch}
              onClick={this.add}
              closeAdd={isCloseAdd}
            />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.showCount}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                total={pagination.allCount}
                loading={regionalStore.loading}
                columns={columns}
                data={tableDada}
              />
            </div>
          </div>
        </div>
        <DeleteModal
          isShow={this.state.deleteShow}
          onOk={this.onDeleteOk}
          onCancel={this.onDeleteCancel}
        />
        <EditModal
          isShow={this.state.editShow}
          mode={this.state.type}
          onOk={this.onEditOk}
          width={740}
          onCancel={this.onEditCancel}>
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            mode={this.state.type}
          />
        </EditModal>
      </div>
    );
  }
}

export default Regional;
