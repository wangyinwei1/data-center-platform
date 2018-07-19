import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import Cascader from '../../../components/Cascader';
import styles from './index.less';
import Cookies from 'js-cookie';
import Table from '../../../components/Table';
import columnData from './columns.js';
import {decorate as mixin} from 'react-mixin';
import Toolbar from '../../../components/Toolbar';
import {cascader} from '../common';
import EditModal from '../../../components/EditModal';
import EditContent from './editContent.js';
import AlarmContent from './alarmTable.js';
import {formParams} from './tplJson.js';
//实例
@inject('basicchannelStore', 'regionalStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.add = this.add.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.onImportClick = this.onImportClick.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.channelTypeChange = this.channelTypeChange.bind(this);
    this.loadData = this.loadData.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.onAlarmCancel = this.onAlarmCancel.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onExportTplClick = this.onExportTplClick.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.state = {
      cascaderLoading: false,
      cascaderText: '',
      cascaderValue: [],
      editShow: false,
      type: 'new',
      alarmShow: false,
      ...formParams,
      singleLineData: {},
      currentChannelID: '',
      F_DeviceType: '',
      F_Version: '',
    };
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
    const {basicchannelStore} = this.props;
    basicchannelStore.getTable(params);
  }
  onKeyPress(e) {
    const {regionalStore} = this.props;
    this.c_onKeyPress(regionalStore);
  }
  componentDidMount() {
    // const {basicchannelStore} = this.props;
    // this.initLoading(basicchannelStore);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {basicchannelStore} = this.props;

    const params = {
      ...basicchannelStore.tableParmas,
      page: current,
      number: pageSize,
    };
    basicchannelStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {basicchannelStore} = this.props;
    const params = {
      ...basicchannelStore.tableParmas,
      page: pageNumber,
    };
    basicchannelStore.getTable(params);
  }
  onSearch(value) {
    const {basicchannelStore} = this.props;
    const params = {
      ...basicchannelStore.tableParmas,
      keywords: value,
    };
    basicchannelStore.search(params);
  }
  add() {
    const {basicchannelStore: {initAdd}} = this.props;
    initAdd().then(() => {
      this.setState({
        editShow: true,
        type: 'new',
      });
    });
  }
  initFromValue(data, mode, item) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.F_ChannelID.value = data.pd.F_ChannelID || '';
      formValue.F_ChannelName.value = data.pd.F_ChannelName || '';
      formValue.F_ValueType.value = data.pd.F_ValueType;
      formValue.F_ChannelType.value = data.pd.F_ChannelType;
      formValue.F_Ratio.value = data.pd.F_Ratio;
      formValue.F_StorePeriod.value = data.pd.F_StorePeriod;
      formValue.F_StoreMode.value = data.pd.F_StoreMode;
      formValue.F_DeviceType.value = data.pd.F_DeviceType;
      formValue.F_Threshold.value = data.pd.F_Threshold;
      formValue.F_ShowPrecision.value = data.pd.F_ShowPrecision;
      formValue.F_Unit.value = data.pd.F_Unit || '';
      formValue.F_AlarmVoiceDelay.value = data.pd.F_AlarmVoiceDelay;
      formValue.F_ShowOrder.value = data.pd.F_ShowOrder;
      formValue.F_Status.value = data.pd.F_Status;
      formValue.F_ValueDescription.value = data.pd.F_ValueDescription || '';
      formValue.F_AnalyOrder.value = data.pd.F_AnalyOrder || '';
      formValue.F_RelateChannelNO.value = data.pd.F_RelateChannelNO || '';
      formValue.F_DisplayFormat.value = data.pd.F_DisplayFormat || '';
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
  editClick(item) {
    const {basicchannelStore: {initEdit}} = this.props;
    const params = {
      F_ID: item.F_ID,
    };
    initEdit(params).then(data => {
      data && this.initFromValue(data, 'modify', item);
    });
  }
  //告警设置
  onAlarmCancel() {
    this.setState({
      alarmShow: false,
    });
  }
  onEditCancel() {
    this.setState({
      ...formParams,
      editShow: false,
    });
  }
  detailClick(item) {
    const {basicchannelStore: {initEdit}} = this.props;
    const params = {
      F_ID: item.F_ID,
    };
    initEdit(params).then(data => {
      data && this.initFromValue(data, 'detail', item);
    });
  }
  deleteClick(item) {
    const {basicchannelStore} = this.props;
    const params = {
      F_ID: item.F_ID,
    };

    basicchannelStore.delete(params);
  }
  alarmClick(item) {
    const {basicchannelStore: {getAlarmTable}} = this.props;
    const params = {
      F_DeviceType: item.F_DeviceType,
      F_Version: item.F_Version,
      F_ChannelID: item.F_ChannelID,
    };
    getAlarmTable(params).then(() => {
      this.setState({
        alarmShow: true,
        currentChannelID: item.F_ChannelID,
        F_DeviceType: item.F_DeviceType,
        F_Version: item.F_Version,
      });
    });
  }
  channelTypeChange(value) {
    const {basicchannelStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      F_ChannelType: value,
    };
    getTable(params);
  }

  onExportClick() {
    const {basicchannelStore: {tableParmas}} = this.props;
    location.href =
      'collect/device_basechannel/toExcel.do?F_DeviceType=' +
      tableParmas.F_TypeID +
      '&F_Version=' +
      tableParmas.F_Version;
  }
  onImportClick() {}
  onExportTplClick() {
    location.href = '/collect/device_basechannel/downExcel.do';
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
      const {
        basicchannelStore: {save, edit, getTable, tableParmas},
      } = this.props;
      const F_ID =
        this.state.type === 'modify'
          ? {F_ID: this.state.singleLineData.F_ID}
          : {};

      const params = {
        ...F_ID,
      };
      _.forIn(fields, (value, key) => {
        key == 'F_ChannelName'
          ? (params[key] = encodeURIComponent(value.value))
          : (params[key] = value.value);
      });
      this.state.type == 'modify'
        ? edit(params).then(() => {
            getChildTable(c_tableParmas);
          })
        : save(params).then(() => {
            getChildTable(c_tableParmas);
          });
      this.setState({
        ...formParams,
        editShow: false,
      });
    }
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
  onRowDoubleClick(item, e) {
    const {basicchannelStore: {initEdit}} = this.props;
    const params = {
      F_ID: item.F_ID,
    };
    initEdit(params).then(data => {
      data && this.initFromValue(data, 'detail', item);
    });
  }
  render() {
    const {basicchannelStore, regionalStore} = this.props;
    const tableData = toJS(basicchannelStore.tableData);
    const data = (tableData && tableData.varList) || [];
    const pagination = tableData.pd || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      detailClick: this.detailClick,
      editClick: this.editClick,
      alarmClick: this.alarmClick,
      _this: this,
    });
    let title = '';
    switch (this.state.type) {
      case 'new':
        title = '通道新增';
        break;
      case 'detail':
        title = '通道详情';
        break;
      case 'modify':
        title = '通道修改';
        break;
    }
    return (
      <div className={styles['information_wrap']}>
        {/* <Cascader */}
        {/*   loading={this.state.cascaderLoading} */}
        {/*   options={toJS(regionalStore.areaTree)} */}
        {/*   onKeyPress={this.onKeyPress} */}
        {/*   loadData={this.loadData} */}
        {/*   onTextChange={this.onTextChange} */}
        {/*   cascaderValue={this.state.cascaderValue} */}
        {/*   cascaderText={this.state.cascaderText} */}
        {/*   onChange={this.onCascaderChange} */}
        {/* /> */}
        <div className={styles['information_ct']}>
          <div className={styles['min_width']}>
            <Toolbar
              onSearch={this.onSearch}
              channelTypeChange={this.channelTypeChange}
              channelType={true}
              showValue={['export', 'add', 'import', 'exportTpl']}
              onImportClick={this.onImportClick}
              onExportTplClick={this.onExportTplClick}
              onExportClick={this.onExportClick}
              onClick={this.add}
            />
            <Table
              pageIndex={pagination.page}
              pageSize={pagination.showCount}
              loading={basicchannelStore.loading}
              onRowDoubleClick={this.onRowDoubleClick}
              total={pagination.allCount}
              columns={columns}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              data={data}
              useDefaultRowKey={true}
            />
          </div>
        </div>
        <EditModal
          isShow={this.state.alarmShow}
          onOk={this.onAlarmOk}
          buttons={false}
          width={900}
          title={'告警条件'}
          onCancel={this.onAlarmCancel}>
          <AlarmContent
            F_DeviceType={this.state.F_DeviceType}
            F_Version={this.state.F_Version}
            channelID={this.state.currentChannelID}
          />
        </EditModal>
        <EditModal
          width={850}
          buttons={this.state.type == 'detail' ? false : true}
          isShow={this.state.editShow}
          title={title}
          onOk={this.onEditOk}
          onCancel={this.onEditCancel}>
          <EditContent
            fields={this.state.fields}
            mode={this.state.type}
            handleFormChange={this.handleFormChange}
          />
        </EditModal>
      </div>
    );
  }
}

export default Regional;
