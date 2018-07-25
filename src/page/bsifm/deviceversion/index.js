import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../common';
import Toolbar from '../../../components/Toolbar';
import Table from '../../../components/Table';
import columnData from './columns.js';
import DeleteModal from '../regional/delete.js';
import Agreement from '../agreement';
import Basicchannel from '../basicchannel';
import EditContent from './editContent.js';
import EditModal from './edit.js';
import {formParams} from './tplJson.js';
import Panel from '../../../components/Panel';
//实例
@inject('deviceversionStore', 'basicchannelStore', 'agreementStore')
@observer
@mixin(cascader)
class Site extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onAgreementCancel = this.onAgreementCancel.bind(this);
    this.onBasicCancel = this.onBasicCancel.bind(this);
    this.addBigClassesChange = this.addBigClassesChange.bind(this);
    this.state = {
      deviceNameTitle: '',
      singleLineData: {},
      deleteShow: false,
      editShow: false,
      editParams: {},
      areaName: '',
      agreementTableVisible: false,
      basicTableVisible: false,
      type: 'new',
      ...formParams,
    };
  }
  //以下级联方法
  componentDidMount() {
    const {deviceversionStore: {getTable}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      showCount: 10,
    };
    getTable(params);
  }
  //添加功能
  add() {
    const {deviceversionStore} = this.props;
    deviceversionStore.getGoAdd();
    this.setState({
      editShow: true,
    });
  }
  initFromValue(data, mode, item) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.F_TypeID.value = data.pd.F_TypeID || undefined;
      formValue.F_Name.value = data.pd.F_ProID || undefined;
      formValue.F_Name.F_Name = data.pd.F_Name || '';
      formValue.F_TypeName.value = data.pd.F_TypeName || '';
      formValue.F_SoftVersion.value = data.pd.F_SoftVersion || '';
      formValue.F_HardVersion.value = data.pd.F_HardVersion || '';
      formValue.F_Name.F_Protocol = _.filter(data.protocolList, item => {
        return item.F_ProID === data.pd.F_ProID;
      })[0].F_Protocol;
      return {
        fields: {
          ...fields,
          ...formValue,
        },
        singleLineData: item,
        editShow: true,
        type: mode,
      };
    });
  }
  //点击编辑
  editClick(item) {
    const {deviceversionStore} = this.props;
    deviceversionStore
      .getEidtData({F_TypeID: item.F_TypeID, F_Version: item.F_Version})
      .then(data => {
        this.initFromValue(data, 'modify', item);
      });
  }
  //删除回调
  onDeleteOk() {
    const {deviceversionStore} = this.props;
    const item = this.state.singleLineData;
    const params = {F_TypeID: item.F_TypeID, F_Version: item.F_Version};

    this.c_onDeleteOk(deviceversionStore, params);
  }
  onDeleteCancel() {
    this.c_onDeleteCancel();
  }
  deleteClick(item, e) {
    this.setState({
      deleteShow: true,
      singleLineData: item,
    });
  }
  //编辑确定
  onEditOk() {
    const fields = this.state.fields;
    const showError = this.test(fields);
    const hasError = _.keys(showError);

    if (hasError[0]) {
      this.setState(({fields}) => {
        return {
          fields: {
            ...fields,
            ...showError,
          },
        };
      });
    } else {
      const {deviceversionStore: {save, editSave}} = this.props;
      const params = {
        F_Protocol: fields.F_Name.F_Protocol,
      };
      this.state.type === 'modify' &&
        (params.F_Version = this.state.singleLineData.F_Version);
      _.forIn(fields, (value, key) => {
        if (key === 'F_Name') {
          params[key] = value.F_Name;
        } else {
          params[key] = value.value;
        }
      });
      this.state.type === 'new'
        ? save(params).then(data => {
            this.clearState(data);
          })
        : editSave(params).then(data => {
            this.clearState(data);
          });
    }
  }
  clearState(data) {
    data &&
      this.setState({
        ...formParams,
        editShow: false,
      });
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
  //搜索
  onSearch(value) {
    const {deviceversionStore} = this.props;
    const params = {
      ...deviceversionStore.tableParmas,
      keywords: value,
    };
    deviceversionStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {deviceversionStore} = this.props;
    this.c_onShowSizeChange({current, pageSize}, deviceversionStore);
  }
  onPageChange(pageNumber) {
    const {deviceversionStore} = this.props;
    this.c_onPageChange({pageNumber}, deviceversionStore);
  }
  handleFormChange(changedFields) {
    const key = _.keys(changedFields);
    //showError让自己校验字段
    const obj = {};
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({fields}) => {
      return {
        fields: {...fields, ...obj},
      };
    });
  }
  addBigClassesChange(params) {
    const {deviceversionStore: {savegenera}} = this.props;
    savegenera(params);
  }
  getAgreementTable(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {agreementStore: {getTable}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      showCount: 10,
    };
    getTable(params);

    this.setState({
      agreementTableVisible: true,
    });
  }
  getBasicTable(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {basicchannelStore: {getTable}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      number: 10,
      F_TypeID: item.F_TypeID,
      F_Version: item.F_Version,
      F_ChannelType: '',
    };
    getTable(params);

    this.setState({
      basicTableVisible: true,
      deviceNameTitle: item.F_TypeName,
    });
  }
  onAgreementCancel() {
    this.setState({
      agreementTableVisible: false,
    });
  }
  onBasicCancel() {
    this.setState({
      basicTableVisible: false,
    });
  }

  render() {
    const {deviceversionStore} = this.props;
    const tableData = toJS(deviceversionStore.tableData.varList) || [];
    const pagination = toJS(deviceversionStore.tableData.pd) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      getAgreementTable: this.getAgreementTable,
      getBasicTable: this.getBasicTable,
      _this: this,
    });
    return (
      <div className={styles['deviceversion_wrap']}>
        <div className={styles['deviceversion_ct']}>
          <div className={styles['min_width']}>
            <Toolbar onClick={this.add} onSearch={this.onSearch} />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.showCount}
                total={pagination.allCount}
                columns={columns}
                loading={deviceversionStore.loading}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
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
          onOk={this.onEditOk}
          width={816}
          onCancel={this.onEditCancel}
          mode={this.state.type}>
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            mode={this.state.type}
            addBigClassesChange={this.addBigClassesChange}
          />
        </EditModal>
        <Panel
          onCancel={this.onAgreementCancel}
          title={'设备协议管理'}
          isShow={this.state.agreementTableVisible}>
          <Agreement />
        </Panel>
        <Panel
          onCancel={this.onBasicCancel}
          title={`基础通道管理 / ${this.state.deviceNameTitle}`}
          isShow={this.state.basicTableVisible}>
          <Basicchannel />
        </Panel>
      </div>
    );
  }
}

export default Site;
