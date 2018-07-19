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
import {formParams, clearCity, clearRegion, clearCounty} from './tplJson.js';

//实例
@inject('regionalStore', 'siteStore')
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
      cityList: [],
      countyList: [],
      regionList: [],
    };
  }

  //删除回调
  onDeleteOk() {
    const {siteStore} = this.props;
    const params = {F_ID: this.state.singleLineData.F_ID};
    this.c_onDeleteOk(siteStore, params);
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
      const {siteStore: {save}} = this.props;
      const params = {
        F_ParentAreaID: fields.county.value,
        F_Name: fields.F_Name.value,
        F_Leader: fields.F_Leader.value,
        F_Tel: fields.F_Tel.value,
        F_Address: fields.F_Address.value,
      };
      fields.region.code
        ? (params.F_AreaID = fields.region.code)
        : (params.F_AreaName = fields.region.value);
      save(params).then(data => {
        data &&
          this.setState({
            ...formParams,
            editShow: false,
            cityList: [],
            countyList: [],
            regionList: [],
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
      cityList: [],
      countyList: [],
      regionList: [],
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
    const {siteStore} = this.props;
    this.c_onShowSizeChange({current, pageSize}, siteStore);
  }
  onPageChange(pageNumber) {
    const {siteStore} = this.props;
    this.c_onPageChange({pageNumber}, siteStore);
  }
  //编辑回调
  editClick(item, e) {
    const {siteStore} = this.props;
    siteStore.getEidtData({F_ID: item.F_ID}).then(data => {
      this.initFromValue(data, 'modify');
    });
  }
  initFromValue(data, mode) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.city.value = data.area.cityCode || undefined;
      formValue.county.value = data.area.countyCode || undefined;
      formValue.province.value = data.area.provinceCode || data.proCode;
      formValue.region.value = data.area.regionCode || undefined;
      formValue.F_Name.value = (data.pd && data.pd.F_Name) || '';
      formValue.F_Leader.value = (data.pd && data.pd.F_Leader) || '';
      formValue.F_Tel.value = (data.pd && data.pd.F_AreaName) || '';
      formValue.F_Address.value = (data.pd && data.pd.F_Address) || '';
      formValue.F_AreaName.value = (data.pd && data.pd.F_AreaName) || '';
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
    const {siteStore: {tableParmas, addArea}} = this.props;
    const params = {
      F_AreaID: tableParmas.ztreeChild,
    };
    addArea(params).then(data => {
      this.initFromValue(data, 'new');
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
    const {siteStore} = this.props;
    siteStore.getTable(params);
  }
  onKeyPress(e) {
    const {regionalStore} = this.props;
    this.c_onKeyPress(regionalStore);
  }
  componentDidMount() {
    const {siteStore} = this.props;
    this.initLoading(siteStore);
  }

  //搜索
  onSearch(value) {
    const {siteStore} = this.props;
    const params = {
      ...siteStore.tableParmas,
      keywords: value,
    };
    siteStore.search(params);
  }
  handleFormChange(changedFields) {
    const {siteStore: {getAreaSonList}} = this.props;
    const key = _.keys(changedFields);
    (key[0] === 'province' || key[0] === 'city' || key[0] === 'county') &&
      getAreaSonList({F_ParentAreaID: changedFields[key[0]].value}).then(
        data => {
          switch (key[0]) {
            case 'province':
              this.setState(({fields}) => {
                return {
                  fields: {
                    ...fields,
                    ...clearCity.fields,
                  },
                  cityList: data,
                  countyList: [],
                  regionList: [],
                };
              });
              break;
            case 'city':
              this.setState(({fields}) => {
                return {
                  fields: {
                    ...fields,
                    ...clearCounty.fields,
                  },
                  countyList: data,
                  regionList: [],
                };
              });
              break;
            case 'county':
              this.setState(({fields}) => {
                return {
                  fields: {
                    ...fields,
                    ...clearRegion.fields,
                  },
                  regionList: data,
                };
              });
              break;
          }
        },
      );
    //showError让自己校验字段
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
    const {siteStore, regionalStore} = this.props;
    const tableData = toJS(siteStore.tableData.varList) || [];
    const pagination = toJS(siteStore.tableData.pd) || {};

    // const belongRegion = siteStore.belongRegion;
    // const isCloseAdd =
    //   belongRegion == 'country' || belongRegion == 'province' ? true : false;
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      _this: this,
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
            <Toolbar onSearch={this.onSearch} onClick={this.add} />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.showCount}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                total={pagination.allCount}
                loading={siteStore.loading}
                columns={columns}
                data={tableData}
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
          width={816}
          onCancel={this.onEditCancel}>
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            mode={this.state.type}
            regionMenu={this.state.regionList}
            cityMenu={this.state.cityList}
            countyMenu={this.state.countyList}
          />
        </EditModal>
      </div>
    );
  }
}

export default Regional;
