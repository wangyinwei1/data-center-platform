import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {message} from 'antd';
import Remarks from '../../../components/Remarks';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbar';
import EditModal from '../../../components/EditModal';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Panel from '../../../components/Panel';
import ChildTable from './childTable.js';
import ClModal from '../information/controlModal.js';
import {formParams, alarmFormParams, virtualParams} from './tplJson.js';
import EditContent from './edit.js';
import VirtualContent from './virtualContent.js';
import E_ChildTable from './e_childTable.js';
//实例
@inject('regionalStore', 'passagewayStore')
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
    this.onEditOk = this.onEditOk.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addClick = this.addClick.bind(this);
    this.childEidtClick = this.childEidtClick.bind(this);
    this.childDetailClick = this.childDetailClick.bind(this);
    this.childDeleteClick = this.childDeleteClick.bind(this);
    this.channelTypeChange = this.channelTypeChange.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.onAlarmCancel = this.onAlarmCancel.bind(this);
    this.onAlarmOk = this.onAlarmOk.bind(this);
    this.editVirtual = this.editVirtual.bind(this);
    this.onVirtualCancel = this.onVirtualCancel.bind(this);
    this.onVirtualOk = this.onVirtualOk.bind(this);
    this.virtualFormChange = this.virtualFormChange.bind(this);
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.onExpand = this.onExpand.bind(this);

    this.state = {
      cascaderText: '',
      cascaderLoading: false,
      cascaderValue: [],
      ...virtualParams,
      currentDevice: '',
      areaName: '',
      editShow: false,
      type: 'new',
      ...alarmFormParams,
      ...formParams,
      alarmShow: false,
      virtualShow: false,
      currentChannelID: '',
      currentVirtual: {},
      expandedRows: [],
    };
  }
  //以下级联方法
  onKeyPress(e) {
    const {passagewayStore} = this.props;
    this.c_onKeyPress(passagewayStore);
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
    const {passagewayStore} = this.props;
    passagewayStore.getTable(params);
  }
  componentDidMount() {
    const {passagewayStore} = this.props;
    this.initLoading(passagewayStore, {
      page: 1,
      sing: 'area',
      keywords: '',
      number: 10,
    });
  }
  //搜索
  onSearch(value) {
    const {passagewayStore} = this.props;
    const params = {
      ...passagewayStore.tableParmas,
      keywords: value,
    };
    passagewayStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {passagewayStore} = this.props;

    const params = {
      ...passagewayStore.tableParmas,
      page: current,
      number: pageSize,
    };
    passagewayStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {passagewayStore} = this.props;
    this.c_onPageChange({pageNumber}, passagewayStore);
  }
  //获取子集表格
  getChildTable(item, e, sub) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {passagewayStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      F_DeviceID: sub === 'sub' ? item.subDeviceID : item.devID,
      number: 10,
    };
    this.setState({
      childTableVisible: true,
      childTableTitle: item.devName,
      currentDevice: item.devID,
      singleLineData: item,
    });
    passagewayStore.getChildTable(params);
  }
  addClick() {
    const {passagewayStore: {initAdd, getVirtualList}} = this.props;
    const item = this.state.singleLineData;
    getVirtualList({
      F_TypeID: item.typeID,
      F_Version: item.version,
    });
    initAdd().then(() => {
      this.setState({
        editShow: true,
        type: 'new',
      });
    });
  }

  onCancel() {
    this.setState({
      childTableVisible: false,
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

  alarmOk() {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    let alarmTable = toJS(a_tableData);
    let hasAlarmError = [];
    const errorTable = _.map(alarmTable, (record, index) => {
      if (
        (!record.conType && record.conType !== 0) ||
        (!record.msgID && record.msgID !== 0) ||
        (!record.condition && record.condition !== 0)
      ) {
        if (alarmTable.length === 1) {
          alarmTable = [];
        } else {
          hasAlarmError.push(index + 1);
        }
        return {
          ...record,
          error: true,
        };
      } else {
        return record;
      }
    });

    if (hasAlarmError[0]) {
      alarmDataChange(errorTable);
      message.error(
        `告警条件里的第${hasAlarmError.join(',')}条告警存在空值,请填写完整!`,
      );
      return false;
    }
    //过滤后端所需要的数据
    const item = this.state.singleLineData;
    const alarmData = _.map(alarmTable, item => {
      return {
        conType: item.conType,
        condition: item.condition,
        msgID: item.msgID,
      };
    });

    const {passagewayStore: {alarmBatchSave}} = this.props;
    const params = {
      F_DeviceID: item.devID,
      F_ChannelID: this.state.currentChannelID,
      alarmConditions: alarmData,
    };
    alarmBatchSave(params);
    return true;
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
      //告警条件确认
      if (!this.alarmOk()) return;
      const {
        passagewayStore: {save, edit, getChildTable, c_tableParmas},
      } = this.props;
      const F_DeviceID = {F_DeviceID: this.state.currentDevice};

      const params = {
        ...F_DeviceID,
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
  onEditCancel() {
    this.setState({
      ...formParams,
      editShow: false,
    });
  }
  handleFormChange(changedFields) {
    //showError让自己校验字段
    const key = _.keys(changedFields);
    const obj = {};
    let currentVirtual = {};
    //值类型影响显示精度
    if (key[0] === 'F_ValueType') {
      if (changedFields[key].value === 2) {
        obj['F_ShowPrecision'] = {value: 2};
      } else {
        obj['F_ShowPrecision'] = {value: 0};
      }
    }
    if (key[0] === 'virtual') {
      const {passagewayStore: {virtualList}} = this.props;
      const selected = _.filter(toJS(virtualList), item => {
        return changedFields[key].value === item.fid;
      });
      currentVirtual['currentVirtual'] = selected[0];
    }

    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({fields}) => {
      return {
        fields: {...fields, ...obj},
        ...currentVirtual,
      };
    });
  }
  initFromValue(data, mode) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.F_ChannelID.value = data.pd.channelID;
      formValue.F_ChannelName.value = data.pd.channelName;
      formValue.F_ValueType.value = data.pd.valueType;
      formValue.F_ChannelType.value = data.pd.channelType;
      formValue.ratio.value = data.pd.ratio;
      formValue.F_StorePeriod.value = data.pd.storePeriod;
      formValue.F_StoreMode.value = data.pd.storeMode;
      formValue.F_Threshold.value = data.pd.threshold;
      formValue.F_ShowPrecision.value = data.pd.showPrecision;
      formValue.F_Unit.value = data.pd.netInTime;
      formValue.F_AlarmVoiceDelay.value = data.pd.alarmVoiceDelay;
      formValue.F_ShowOrder.value = data.pd.showOrder;
      formValue.F_Status.value = data.pd.status;
      formValue.F_ValueDescription.value = data.pd.valueDescription;
      formValue.F_AnalyOrder.value = data.pd.analyOrder;
      formValue.F_RelateChannelNO.value = data.pd.relateChannelNO;
      formValue.F_DisplayFormat.value = data.pd.displayFormat;
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
  //告警设置
  onAlarmCancel() {
    this.setState({
      alarmShow: false,
      ...alarmFormParams,
    });
  }
  onAlarmOk() {}
  childEidtClick(item) {
    const {passagewayStore: {initEdit}} = this.props;
    const params = {
      deviceID: this.state.currentDevice,
      channelID: item.channelID,
      channelType: item.channelType,
    };
    initEdit(params).then(data => {
      data && this.initFromValue(data, 'modify');
    });
    this.childAlarmClick(item);
  }
  childDetailClick(item) {
    const {passagewayStore: {initEdit}} = this.props;
    const params = {
      deviceID: this.state.currentDevice,
      channelID: item.channelID,
      channelType: item.channelType,
    };
    initEdit(params).then(data => {
      data && this.initFromValue(data, 'detail');
    });
    this.childAlarmClick(item);
  }
  childDeleteClick(item) {
    const {passagewayStore} = this.props;
    const params = {
      channelID: item.channelID,
      channelType: item.channelType,
      deviceID: this.state.currentDevice,
    };

    passagewayStore.delete(params);
  }
  childAlarmClick(item) {
    const {passagewayStore: {getAlarmTable}} = this.props;
    const params = {
      F_DeviceID: this.state.currentDevice,
      F_ChannelID: item.channelID,
    };
    getAlarmTable(params).then(() => {
      this.setState({
        currentChannelID: item.channelID,
      });
    });
  }

  channelTypeChange(value) {
    const {passagewayStore: {getChildTable, c_tableParmas}} = this.props;
    const params = {
      ...c_tableParmas,
      F_ChannelType: value,
    };
    getChildTable(params);
  }
  onExportClick() {
    location.href =
      '/collect/device_channel/toExcel.do?deviceID=' + this.state.currentDevice;
  }
  editVirtual() {
    const fields = this.state.fields;
    if (!fields.virtual.value) {
      message.error('请选择虚拟通道属性!');
      return;
    }

    const {passagewayStore: {getEditVirtual}} = this.props;
    const item = this.state.singleLineData;
    const params = {
      deviceType: item.typeID,
      channelID: this.state.currentChannelID,
      version: item.version,
    };
    getEditVirtual(params).then(data => {
      const relateChannelID = data.relateChannelID.split(',');
      _.map(relateChannelID, item => {
        const obj = {};
        obj[item] = {value: undefined};

        this.setState(({virtualFields}) => {
          return {
            virtualFields: {
              ...virtualFields,
              ...obj,
            },
          };
        });
      });
      this.setState({
        virtualShow: true,
      });
    });
  }
  onVirtualOk() {
    const fields = this.state.virtualFields;
    let hasError = true;
    //循环找到必填字段是否是空并作出警告
    _.forIn(fields, (v, k) => {
      if (v.value || v.value === 0) {
        hasError = false;
      }
    });

    if (hasError) {
      message.error('必须填写一个关联！');
    } else {
      const {passagewayStore: {vchannelEdit}} = this.props;
      const item = this.state.currentVirtual;
      const params = {
        Id_Version: `${item.deviceType}_${item.version}`,
        F_ChannelID: item.channelID,
        F_CalculateType: item.calculateType,
        F_Expression: item.expression,
        F_RelateChannelID: item.relateChannelID,
        F_RelateChannelName: item.relateChannelName,
        F_Fid: item.fid,
      };
      vchannelEdit(params).then(data => {
        this.clearState(data);
      });
    }
  }
  clearState(data) {
    data &&
      this.setState({
        ...virtualParams,
        virtualShow: false,
      });
  }
  onVirtualCancel() {
    this.setState({
      ...virtualParams,
      virtualShow: false,
    });
  }
  virtualFormChange(changedFields) {
    const obj = {};
    const key = _.keys(changedFields);

    //showError让自己校验字段
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({virtualFields}) => {
      return {
        virtualFields: {...virtualFields, ...obj},
      };
    });
  }
  //嵌套表格
  expandedRowRender(record, i) {
    return <E_ChildTable getChildTable={this.getChildTable} />;
  }
  onExpand(expanded, record) {
    const {passagewayStore} = this.props;
    const expandedRows = this.state.expandedRows;
    //孙设备
    if (expandedRows[0] && expandedRows[0] !== record.devID) {
      passagewayStore.c_expandedRowsChange([]);
    }

    this.stopOperation = true;
    if (expanded) {
      this.setState({expandedRows: [record.devID]});
    } else {
      this.setState({expandedRows: []});
    }

    passagewayStore.getSportTable({F_DeviceID: record.devID});
  }
  render() {
    const {passagewayStore, regionalStore} = this.props;
    const tableData = toJS(passagewayStore.tableData.varList) || [];
    const pagination = toJS(passagewayStore.tableData) || {};
    const columns = columnData({
      getChildTable: this.getChildTable,
      _this: this,
    });
    let modalTitle = '';
    switch (this.state.type) {
      case 'new':
        modalTitle = '设备通道新增';

        break;
      case 'modify':
        modalTitle = '设备通道编辑';

        break;
      case 'detail':
        modalTitle = '设备通道详情';
        break;
    }
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
                  const rowClassName = ['td_padding'];
                  record.statustwo == 0 && rowClassName.push('cl_online_state');
                  record.isConcentrator == 0 &&
                    rowClassName.push('cl_hidden_expand_icon');
                  return rowClassName.join(' ');
                }}
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.count}
                columns={columns}
                loading={passagewayStore.loading}
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
          <ChildTable
            addClick={this.addClick}
            editClick={this.childEidtClick}
            detailClick={this.childDetailClick}
            deleteClick={this.childDeleteClick}
            channelTypeChange={this.channelTypeChange}
            onExportClick={this.onExportClick}
          />
        </Panel>

        <ClModal
          isShow={this.state.virtualShow}
          onOk={this.onVirtualOk}
          buttons={true}
          title={'虚拟通道关联修改'}
          width={552}
          onCancel={this.onVirtualCancel}>
          <VirtualContent
            handleFormChange={this.virtualFormChange}
            fields={this.state.virtualFields}
          />
        </ClModal>
        <ClModal
          width={850}
          buttons={this.state.type == 'detail' ? false : true}
          isShow={this.state.editShow}
          title={modalTitle}
          onOk={this.onEditOk}
          onCancel={this.onEditCancel}>
          <EditContent
            fields={this.state.fields}
            mode={this.state.type}
            editVirtual={this.editVirtual}
            handleFormChange={this.handleFormChange}
          />
        </ClModal>
      </div>
    );
  }
}

export default Passageway;
