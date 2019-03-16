import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Spin, Form, message} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import Remarks from '../../../components/Remarks';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbar';
import Table from '../../../components/Table';
import columnData from './columns.js';
import DeleteModal from '../../bsifm/regional/delete.js';
import EditModal from './edit.js';
import Panel from '../../../components/Panel';
import RealtimeTable from './realtimeTable.js';
import RealtimeAlarmTable from '../realtimealarm/childTable.js';
import HistoryModal from './historyModal.js';
// import ChildTable from './childTable.js';
import ControlModal from './controlModal.js';
import BatchModal from '../../../components/DeleteModal';
import ControlContent from './controlContent.js';
import RumorContent from './rumorContent.js';
import AddLevelOne from './addLevelOne.js';
import AddChildDevice from './addChildDevice.js';
import {formParams, addLevelOne, addChildDevice} from './tplJson.js';
//实例
@inject(
  'regionalStore',
  'informationStore',
  'realtimealarmStore',
  'historymodalStore',
  'layoutStore',
)
@observer
@mixin(cascader)
class Information extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.add = this.add.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onRealtimeOk = this.onRealtimeOk.bind(this);
    this.onRealtimeCancel = this.onRealtimeCancel.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onHistoryCancel = this.onHistoryCancel.bind(this);
    this.onControlCancel = this.onControlCancel.bind(this);
    this.onRumorCancel = this.onRumorCancel.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onAddLevelOneOk = this.onAddLevelOneOk.bind(this);
    this.onDisableOk = this.onDisableOk.bind(this);
    this.onDisableCancel = this.onDisableCancel.bind(this);
    this.onAddLevelOneCancel = this.onAddLevelOneCancel.bind(this);
    this.AddLevelOneChange = this.AddLevelOneChange.bind(this);
    this.addChildDeviceChange = this.addChildDeviceChange.bind(this);
    this.addChildDeviceCancel = this.addChildDeviceCancel.bind(this);
    this.addChildDeviceOk = this.addChildDeviceOk.bind(this);
    this.disableClick = this.disableClick.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.onRealAlarmCancel = this.onRealAlarmCancel.bind(this);
    this.onBatchDeleteClick = this.onBatchDeleteClick.bind(this);
    this.onBatchDisableClick = this.onBatchDisableClick.bind(this);
    this.onBatchEnabledClick = this.onBatchEnabledClick.bind(this);
    this.onBatchOk = this.onBatchOk.bind(this);
    this.onBatchCancel = this.onBatchCancel.bind(this);
    this.getAlarmTable = this.getAlarmTable.bind(this);

    this.state = {
      disabledShow: false,
      devStatus: '',
      controlShow: false,
      historyShow: false,
      realtimeShow: false,
      addLevelOneShow: false,
      childTableTitle: '',
      addChildDeviceShow: false,
      alarmTableVisible: false,
      alarmTableTitle: '',
      rumorShow: false,
      searchValue: '',
      modalTitle: '',
      cascaderText: '',
      cascaderLoading: false,
      singleLineData: {},
      isDisable: false,
      deleteShow: false,
      cascaderValue: [],
      editShow: false,
      editParams: {},
      type: 'new',
      childType: 'new',
      sunType: 'new',
      areaName: '',
      expandedRows: [],
      selectedChildRowKey: [],
      currentPort: '',
      batchIds: '',
      batchShow: false,
      batchField: '',
      hintContent: '',
      sunBatchField: '',
      needRealtime: true,
      ...formParams,
      ...addLevelOne,
      concentratorDev: '',
      ...addChildDevice,
    };
  }
  //以下级联方法
  onKeyPress(e) {
    const {informationStore} = this.props;
    this.c_onKeyPress(informationStore);
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
      status: this.state.devStatus,
    };
    const {informationStore} = this.props;
    informationStore.getTable(params);
    this.clearSelected();
  }
  componentWillUnmount() {
    const {layoutStore} = this.props;
    layoutStore.recordReforePath('');
  }
  componentDidMount() {
    const {informationStore, layoutStore, location} = this.props;
    const fromSitemonitoring = layoutStore.beforePath === 'sitemonitoring';
    let id;
    fromSitemonitoring ? (id = location.query.id) : '';
    //刷新之后设置为空
    const params = {
      page: 1,
      sing: 'area',
      keywords: id ? id : '',
      number: 10,
    };
    id &&
      this.setState({
        searchValue: id,
      });
    this.initLoading(informationStore, params).then(() => {
      const tableData = toJS(informationStore.tableData.varList);
    });
  }
  componentDidUpdate() {
    const {informationStore: {showIconIndex}} = this.props;
    // toJS(showIconIndex)[0] &&
    //   !this.stopOperation &&
    //   $('.ant-table-row-level-0').each(function(index) {
    //     if (showIconIndex.indexOf(index) != -1) {
    //       $(this)
    //         .find('.ant-table-row-expand-icon')
    //         .css({display: 'block'});
    //       $(this)
    //         .find('.ant-table-selection-column > span')
    //         .css({display: 'none'});
    //     } else {
    //       $(this)
    //         .find('.ant-table-row-expand-icon')
    //         .css({display: 'none'});
    //     }
    //   });
  }
  //真实数据弹框
  realtimeClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {informationStore} = this.props;
    const params = {
      keywords: '',
      page: 1,
      number: 10,
      F_DeviceID: item.devID,
    };
    informationStore.getRealtimeTable(params);
    this.setState({
      realtimeShow: true,
      childTableTitle: item.devName,
      needRealtime: item.onOff === 0 ? false : true,
    });
  }
  onRealtimeOk() {}
  onRealtimeCancel() {
    this.setState({
      realtimeShow: false,
    });
    const {informationStore: {getTable, tableParmas}} = this.props;
    getTable({...tableParmas, status: this.state.devStatus});
  }
  //控制
  controlClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (item.onOff === 0) {
      message.error('离线设备不支持远程控制！');
      return;
    }
    const {informationStore} = this.props;
    const params = {
      F_DeviceID: item.devID,
    };
    informationStore.getControlChannel(params).then(data => {
      data &&
        this.setState({
          controlShow: true,
        });
    });
  }
  onControlCancel() {
    this.setState({
      controlShow: false,
    });
  }
  //谣调
  rumorClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (item.onOff === 0) {
      message.error('离线设备不支持远程遥控！');
      return;
    }
    const {informationStore} = this.props;
    const params = {
      F_DeviceID: item.devID,
    };
    informationStore.getRegulatChannel(params).then(data => {
      data &&
        this.setState({
          rumorShow: true,
        });
    });
  }
  onRumorCancel() {
    this.setState({
      rumorShow: false,
    });
  }
  //历史数据弹框
  historyClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {historymodalStore} = this.props;
    const params = {
      F_DeviceID: item.devID,
    };
    historymodalStore.getByDevice(params);
    this.setState({
      historyShow: true,
      childTableTitle: item.devName,
    });
  }
  onHistoryCancel() {
    this.setState({
      historyShow: false,
    });
  }
  //详情
  detailClick(item, e) {
    const {informationStore: {goFind2, ztreeChild}} = this.props;
    goFind2({Area_ID: ztreeChild, F_DeviceID: item.devID}).then(data => {
      this.initFromValue(data, 'detail');
    });
  }
  initFromValue(data, mode) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      if (data.pd.connectType === 1) {
        formValue.F_IP.require = false;
        formValue.F_Port.require = false;
      } else {
        formValue.F_IP.require = true;
        formValue.F_Port.require = true;
      }
      formValue.Id_Version.require = true;
      formValue.F_ConnectType.require = true;
      formValue.F_StationID.value = data.pd.stationID || undefined;
      formValue.F_CollectSpan.value = data.pd.collectSpan;
      formValue.Id_Version.value = data.pd.Id_Version;
      formValue.F_HeartSpan.value = data.pd.heartSpan;
      formValue.F_ConnectType.value = data.pd.connectType;
      formValue.F_DeviceName.value = data.pd.devName;
      formValue.F_IP.value = data.pd.ip;
      formValue.F_Latitude.value = data.pd.latitude;
      formValue.F_Longitude.value = data.pd.longitude;
      formValue.F_NetInTime.value = data.pd.netInTime;
      formValue.F_OutDevID.value = data.pd.outDevID;
      formValue.F_Port.value = data.pd.port;
      formValue.rec.value = data.pd.rec;
      formValue.F_ReportType.value = data.pd.reportType;
      formValue.F_SimCardNO.value = data.pd.simCardNo;
      formValue.adr.value = data.pd.adr || data.pd.adr === 0 ? data.pd.adr : '';
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
  //禁用
  disableClick(item) {
    const isDisable = item.status;
    this.setState({
      disabledShow: true,
      isDisable: isDisable === 1 ? false : true,
      singleLineData: item,
    });
  }
  onDisableOk() {
    const {
      informationStore: {
        onoroff,
        getTable,
        getGrandsonTable,
        currentDevice,
        tableParmas,
      },
    } = this.props;
    const item = this.state.singleLineData;

    onoroff({
      strDevs: item.devID ? item.devID : item.subDeviceID,
      status: item.status === 0 ? 1 : 0,
    }).then(() => {
      const F_DeviceID = {F_DeviceID: currentDevice};
      item.devID
        ? getTable({...tableParmas, status: this.state.devStatus})
        : this.state.selectedChildRowKey[0] === this.state.currentPort &&
          getGrandsonTable({
            ...F_DeviceID,
            portID: this.state.currentPort,
          });
    });
    this.setState({
      disabledShow: false,
    });
  }
  onDisableCancel() {
    this.setState({
      disabledShow: false,
    });
  }
  //添加功能
  add() {
    const {informationStore: {getGoAdd, ztreeChild}} = this.props;
    getGoAdd({Area_ID: ztreeChild}).then(() => {
      this.setState({
        editShow: true,
        type: 'new',
      });
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

  //新增子集第一层
  //添加端口
  onAddLevelOneOk() {
    const fields = this.state.oneFields;
    const showError = this.test(fields);
    const hasError = _.keys(showError);

    if (hasError[0]) {
      this.setState(({oneFields}) => {
        return {
          oneFields: {
            ...oneFields,
            ...showError,
          },
        };
      });
    } else {
      const {
        informationStore: {
          saveConsport,
          editConsport,
          currentDevice,
          getSportTable,
        },
      } = this.props;
      const F_DeviceID = {F_DeviceID: currentDevice};
      const F_PortID = this.state.childType == 'modify' && {
        F_PortID: this.state.currentPort,
      };

      const params = {
        ...F_DeviceID,
        ...F_PortID,
      };
      _.forIn(fields, (value, key) => {
        params[key] = value.value;
      });
      this.state.childType == 'modify'
        ? editConsport(params).then(() => {
            this.state.expandedRows[0] === currentDevice &&
              getSportTable(F_DeviceID);
          })
        : saveConsport(params).then(() => {
            this.state.expandedRows[0] === currentDevice &&
              getSportTable(F_DeviceID);
          });
      this.setState({
        addLevelOneShow: false,
      });
    }
  }
  addLevelOneClick(item) {
    const {informationStore: {currentDeviceChange}} = this.props;
    currentDeviceChange(item.devID);
    this.setState({
      ...addLevelOne,
      addLevelOneShow: true,
      childType: 'new',
    });
  }
  onAddLevelOneCancel() {
    this.setState({
      ...addLevelOne,
      addLevelOneShow: false,
    });
  }
  //添加子设备
  addChildDeviceOk() {
    const fields = this.state.childDevicefields;
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
      const {
        informationStore: {saveSun, currentDevice, editSun, getGrandsonTable},
      } = this.props;
      const F_DeviceID = {F_DeviceID: currentDevice};

      const params = {
        ...F_DeviceID,
        F_Port: this.state.currentPort,
      };
      _.forIn(fields, (value, key) => {
        this.state.sunType == 'new' && key === 'F_SubDeviceID'
          ? ''
          : key !== 'cl_typeName' && (params[key] = value.value);
      });
      this.state.sunType == 'modify'
        ? editSun(params).then(() => {
            this.state.selectedChildRowKey[0] === this.state.currentPort &&
              getGrandsonTable({
                ...F_DeviceID,
                portID: this.state.currentPort,
              });
          })
        : saveSun(params).then(() => {
            this.state.selectedChildRowKey[0] === this.state.currentPort &&
              getGrandsonTable({
                ...F_DeviceID,
                portID: this.state.currentPort,
              });
          });
      this.setState({
        ...addChildDevice,
        addChildDeviceShow: false,
      });
    }
  }
  addChildDeviceCancel() {
    this.setState({
      ...addChildDevice,
      addChildDeviceShow: false,
    });
  }
  //点击编辑
  editClick(item) {
    const {informationStore: {goFind2, ztreeChild}} = this.props;
    goFind2({Area_ID: ztreeChild, F_DeviceID: item.devID}).then(data => {
      this.initFromValue(data, 'modify');
    });
  }
  //删除回调
  onDeleteOk() {
    const {informationStore} = this.props;
    const params = {F_DeviceID: this.state.singleLineData.devID};
    this.c_onDeleteOk(informationStore, params);
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
  //编辑回调
  onEditOk() {
    const fields = this.state.fields;
    let showError = {};

    //循环找到必填字段是否是空并作出警告
    let portReg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
    let ipReg = /^((1\d\d|2[0-4]\d|25[0-5]|\d{1,2})\.){3}(1\d\d|2[0-4]\d|25[0-5]|\d{1,2})$/;
    _.forIn(fields, (v, k) => {
      if (k === 'F_Port' && v.require && !portReg.test(v.value)) {
        showError[k] = {showError: true, ...v};
      } else if (k === 'F_IP' && v.require && !ipReg.test(v.value)) {
        showError[k] = {showError: true, ...v};
      } else {
        if (!v.value && v.value !== 0 && v.require) {
          showError[k] = {showError: true, ...v};
        }
      }
    });
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
      const {informationStore: {save, editSave, currentDevice}} = this.props;
      const F_DeviceID = {F_DeviceID: currentDevice};

      const params = {
        F_IsAllot: 0,
        F_Status: 0,
        F_NetInMode: 0,
      };
      _.forIn(fields, (value, key) => {
        if (key === 'adr') {
          params[key] = parseInt(value.value);
        } else {
          params[key] = value.value;
        }
      });
      this.state.type !== 'new' &&
        (params['F_DeviceID'] = F_DeviceID.F_DeviceID);
      this.state.type == 'new' ? save(params) : editSave(params);

      this.setState({
        ...formParams,
        editShow: false,
      });
    }
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
    const {informationStore} = this.props;

    const params = {
      ...informationStore.tableParmas,
      keywords: encodeURIComponent(value),
      status: this.state.devStatus,
      page: 1,
    };
    informationStore.search(params);
    this.setState({expandedRows: [], searchValue: value});
    this.clearSelected();
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {informationStore} = this.props;

    const params = {
      ...informationStore.tableParmas,
      page: current,
      number: pageSize,
      status: this.state.devStatus,
    };
    informationStore.getTable(params);
    this.clearSelected();
  }
  clearSelected() {
    this.setState({
      batchIds: '',
      sunBatchIds: '',
    });
  }
  onPageChange(pageNumber) {
    const {informationStore} = this.props;
    this.c_onPageChange({pageNumber}, informationStore);
    this.clearSelected();
  }
  //子集点击设值
  getRowData(item, mode) {
    this.setState(({oneFields}) => {
      let formValue = _.cloneDeep([oneFields])[0];
      formValue.F_Port.value = item.port;
      formValue.F_PortName.value = item.portName;
      formValue.F_Rec.value = item.rec;
      return {
        oneFields: {
          ...oneFields,
          ...formValue,
        },
        currentPort: item.portID,
        addLevelOneShow: true,
        childType: mode,
      };
    });
  }
  //子集点击设值
  getSunRowData(item, mode) {
    const {informationStore: {expandedRows}} = this.props;
    this.setState(({childDevicefields}) => {
      let formValue = _.cloneDeep([childDevicefields])[0];
      formValue.Id_Version.value = item.Id_Version;
      formValue.F_IdentyNO.value = item.identyNO;
      formValue.F_Adr.value = item.adr;
      formValue.F_SubDeviceName.value = item.subDeviceName;
      formValue.F_Rec.value = item.rec;
      formValue.F_SubDeviceID.value = item.subDeviceID;
      formValue.cl_typeName.value = item.typeName;
      return {
        childDevicefields: {
          ...childDevicefields,
          ...formValue,
        },
        addChildDeviceShow: true,
        selectedChildRowKey: expandedRows,
        sunType: mode,
      };
    });
  }
  onExpand(expanded, record) {
    const {informationStore} = this.props;
    const expandedRows = this.state.expandedRows;
    //孙设备
    if (expandedRows[0] && expandedRows[0] !== record.devID) {
      informationStore.expandedRowsChange([]);
    }

    this.stopOperation = true;
    if (expanded) {
      this.setState({expandedRows: [record.devID]});
    } else {
      this.setState({expandedRows: []});
    }

    informationStore.getSportTable({F_DeviceID: record.devID});
  }
  //得到编辑所有value
  handleFormChange(changedFields) {
    //showError让自己校验字段
    const key = _.keys(changedFields);
    const fields = this.state.fields;
    const obj = {};
    if (key[0] === 'F_ConnectType') {
      if (changedFields[key].value === 1 && this.state.type === 'new') {
        obj['F_Port'] = {...fields['F_Port'], value: ''};
        obj['F_IP'] = {...fields['F_Port'], value: ''};
      }
      if (changedFields[key].value === 1) {
        obj['F_Port'] = {...fields['F_Port'], require: false};
        obj['F_IP'] = {...fields['F_IP'], require: false};
      } else {
        obj['F_Port'] = {...fields['F_Port'], require: true};
        obj['F_IP'] = {...fields['F_IP'], require: true};
      }
    }
    // if (key[0] === 'F_IsConcentrator') {
    //   if (changedFields[key].value === 1) {
    //     obj['F_ConnectType'] = {
    //       ...fields['F_ConnectType'],
    //       value: undefined,
    //       require: false,
    //     };
    //     obj['F_Port'] = {...fields['F_Port'], value: '', require: false};
    //     obj['F_IP'] = {...fields['F_IP'], require: true};
    //     obj['Id_Version'] = {
    //       ...fields['Id_Version'],
    //       value: undefined,
    //       require: false,
    //     };
    //   } else {
    //     obj['F_ConnectType'] = {...fields['F_ConnectType'], value: 0};
    //   }
    // }
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({fields}) => {
      return {
        fields: {...fields, ...obj},
      };
    });
  }
  AddLevelOneChange(changedFields) {
    this.setState(({oneFields}) => {
      return {
        oneFields: {...oneFields, ...changedFields},
      };
    });
  }

  addChildDeviceChange(changedFields) {
    this.setState(({childDevicefields}) => {
      return {
        childDevicefields: {...childDevicefields, ...changedFields},
      };
    });
  }
  selectChange(value) {
    const status = {status: value};
    const {informationStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      ...status,
      page: 1,
    };
    getTable(params);
    this.setState({
      expandedRows: [],
      devStatus: value,
    });
  }
  onRowDoubleClick(item, index, e) {
    const {informationStore: {goFind2, ztreeChild}} = this.props;
    goFind2({Area_ID: ztreeChild, F_DeviceID: item.devID}).then(data => {
      this.initFromValue(data, 'detail');
    });
  }
  getAlarmTable(item, e, sub) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {realtimealarmStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      F_DeviceID: sub === 'sun' ? item.subDeviceID : item.devID,
      number: 10,
    };
    realtimealarmStore.getChildTable(params);
    this.setState({
      alarmTableVisible: true,
      alarmTableTitle: item.devName,
    });
  }
  onRealAlarmCancel() {
    this.setState({
      alarmTableVisible: false,
    });
    const {informationStore: {getTable, tableParmas}} = this.props;
    getTable({...tableParmas, status: this.state.devStatus});
  }
  //批量操作
  onBatchDeleteClick() {
    const batchIds = this.state.batchIds;
    const sunBatchIds = this.state.sunBatchField;
    if (!batchIds && !sunBatchIds) {
      message.error('请选择设备!');
      return;
    }
    this.setState({
      batchField: 'delete',
      hintContent: '此操作将批量删除所选中数据, 是否继续?',
      batchShow: true,
    });
  }
  onBatchDisableClick() {
    const batchIds = this.state.batchIds;
    const sunBatchIds = this.state.sunBatchField;
    if (!batchIds && !sunBatchIds) {
      message.error('请选择设备!');
      return;
    }
    this.setState({
      batchField: 'disable',
      hintContent: '此操作将批量禁用所选中数据, 是否继续?',
      batchShow: true,
    });
  }
  onBatchEnabledClick() {
    const batchIds = this.state.batchIds;
    const sunBatchIds = this.state.sunBatchField;
    if (!batchIds && !sunBatchIds) {
      message.error('请选择设备!');
      return;
    }
    this.setState({
      batchField: 'enabled',
      hintContent: '此操作将批量启动所选中数据, 是否继续?',
      batchShow: true,
    });
  }
  onBatchOk() {
    const {informationStore: {fsuDevsEnabledOnOff, fsuDelectAll}} = this.props;
    const batchIdsAll = this.state.batchIds;
    const concentratorDev = this.state.concentratorDev;
    const batchIds = batchIdsAll
      .split(',')
      .filter(item => {
        return concentratorDev.indexOf(item) === -1;
      })
      .join(',');

    const sunBatchField = this.state.sunBatchField;
    let result = '';
    result = !batchIds && sunBatchField;
    result = !sunBatchField && batchIds;
    result = !sunBatchField;
    if (!batchIds && sunBatchField) {
      result = sunBatchField;
    } else if (batchIds && !sunBatchField) {
      result = batchIds;
    } else {
      result = batchIds + ',' + sunBatchField;
    }

    switch (this.state.batchField) {
      case 'delete':
        fsuDelectAll({
          deviceID: result,
        });
        break;
      case 'disable':
        fsuDevsEnabledOnOff({
          strDevs: result,

          status: 1,
        });
        break;
      case 'enabled':
        fsuDevsEnabledOnOff({
          strDevs: result,
          status: 0,
        });
        break;
    }
    this.setState({
      batchShow: false,
    });
  }
  onBatchCancel() {
    this.setState({
      batchShow: false,
    });
  }
  render() {
    const {informationStore, zTreeLevel, regionalStore} = this.props;
    const tableData = toJS(informationStore.tableData.varList) || [];
    const pagination = toJS(informationStore.tableData) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      realtimeClick: this.realtimeClick,
      historyClick: this.historyClick,
      controlClick: this.controlClick,
      rumorClick: this.rumorClick,
      addLevelOneClick: this.addLevelOneClick,
      detailClick: this.detailClick,
      disableClick: this.disableClick,
      getAlarmTable: this.getAlarmTable,
      _this: this,
    });
    // const showIconIndex = toJS(informationStore.showIconIndex);
    // const nesting =
    //   showIconIndex[0] || showIconIndex[0] === 0
    //     ? {
    //         expandedRowRender: this.expandedRowRender,
    //         onExpand: this.onExpand,
    //         expandedRowKeys: this.state.expandedRows,
    //       }
    //     : {};
    let modalTitle = '';
    switch (this.state.type) {
      case 'new':
        modalTitle = '设备新增';

        break;
      case 'modify':
        modalTitle = '设备编辑';

        break;
      case 'detail':
        modalTitle = '设备详情';

        break;
    }
    const batchIds = this.state.batchIds;
    const selectedRowKeys = batchIds
      ? batchIds.split(',').map(item => {
          return parseInt(item);
        })
      : [];
    const rowSelection = {
      onSelectAll: (selected, selectedRows, changeRows) => {
        if (selected) {
          const concentratorDev = selectedRows
            .map(item => {
              return item.isConcentrator === 1 && item.devID;
            })
            .filter(item => {
              if (item) return item;
            });

          const devIDs = selectedRows.map(item => {
            return item.devID;
          });
          this.setState({
            batchIds: devIDs.join(','),
            concentratorDev: concentratorDev.join(','),
          });
        } else {
          this.setState({
            batchIds: '',
            concentratorDev: '',
          });
        }
      },
      selectedRowKeys,

      onSelect: (record, selected, selectedRows) => {
        if (selected) {
          const batchIds = this.state.batchIds;
          let devIDs = batchIds.split(',');
          devIDs.push(record.devID);
          const filterDevIDs = devIDs.filter(item => {
            return item !== '';
          });
          this.setState({
            batchIds: filterDevIDs.join(','),
          });
        } else {
          const batchIds = this.state.batchIds;
          let devIDs = batchIds.split(',');
          const filterDevIDs = devIDs.filter(item => {
            return (isNaN(item) ? item : parseInt(item)) !== record.devID;
          });
          this.setState({
            batchIds: filterDevIDs.join(','),
          });
        }
      },
    };
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
          <div className={styles['set_min_width']}>
            <Toolbar
              onClick={this.add}
              deviceStatus={true}
              selectChange={this.selectChange}
              showValue={['batchDelete', 'batchDisable', 'batchEnabled', 'add']}
              onBatchDeleteClick={this.onBatchDeleteClick}
              onBatchDisableClick={this.onBatchDisableClick}
              onBatchEnabledClick={this.onBatchEnabledClick}
              onSearch={this.onSearch}
              searchValue={this.state.searchValue}
            />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.count}
                expandIconAsCell={false}
                rowSelection={rowSelection}
                columns={columns}
                rowClassName={(record, index) => {
                  const rowClassName = ['td_padding'];
                  record.onOff === 0 &&
                    (record.status == 1
                      ? rowClassName.push('cl_disabled_state')
                      : rowClassName.push('cl_offline_state'));
                  record.onOff === 1 && rowClassName.push('cl_online_state');
                  record.onOff === 2 && rowClassName.push('cl_err_state');
                  return rowClassName.join(' ');
                }}
                onRowDoubleClick={this.onRowDoubleClick}
                loading={informationStore.loading}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                data={tableData}
              />
            </div>
          </div>
          <DeleteModal
            isShow={this.state.deleteShow}
            onOk={this.onDeleteOk}
            onCancel={this.onDeleteCancel}
          />
          <DeleteModal
            hintContent={`此操作将${
              this.state.isDisable ? '禁用' : '启用'
            }该设备, 是否继续?`}
            isShow={this.state.disabledShow}
            onOk={this.onDisableOk}
            onCancel={this.onDisableCancel}
          />
          <BatchModal
            isShow={this.state.batchShow}
            onOk={this.onBatchOk}
            hintContent={this.state.hintContent}
            onCancel={this.onBatchCancel}
          />
          <Panel
            onCancel={this.onRealtimeCancel}
            title={`实时数据/${this.state.childTableTitle}`}
            isShow={this.state.realtimeShow}>
            <RealtimeTable needRealtime={this.state.needRealtime} />
          </Panel>
          <Panel
            onCancel={this.onHistoryCancel}
            title={`历史数据/${this.state.childTableTitle}`}
            isShow={this.state.historyShow}>
            <HistoryModal />
          </Panel>
          <ControlModal
            width={697}
            isShow={this.state.controlShow}
            title={'远程控制'}
            onCancel={this.onControlCancel}>
            <ControlContent />
          </ControlModal>
          <ControlModal
            width={834}
            isShow={this.state.rumorShow}
            title={'远程调配'}
            onCancel={this.onRumorCancel}>
            <RumorContent />
          </ControlModal>
          <ControlModal
            width={850}
            buttons={this.state.type == 'detail' ? false : true}
            isShow={this.state.editShow}
            title={modalTitle}
            onOk={this.onEditOk}
            onCancel={this.onEditCancel}>
            <EditModal
              fields={this.state.fields}
              mode={this.state.type}
              handleFormChange={this.handleFormChange}
            />
          </ControlModal>
          <ControlModal
            width={850}
            isShow={this.state.addLevelOneShow}
            title={'端口新增'}
            buttons={this.state.childType == 'detail' ? false : true}
            onOk={this.onAddLevelOneOk}
            onCancel={this.onAddLevelOneCancel}>
            <AddLevelOne
              fields={this.state.oneFields}
              mode={this.state.childType}
              handleFormChange={this.AddLevelOneChange}
            />
          </ControlModal>
          <ControlModal
            width={850}
            isShow={this.state.addChildDeviceShow}
            title={'子设备新增'}
            buttons={this.state.sunType == 'detail' ? false : true}
            onOk={this.addChildDeviceOk}
            onCancel={this.addChildDeviceCancel}>
            <AddChildDevice
              fields={this.state.childDevicefields}
              mode={this.state.sunType}
              handleFormChange={this.addChildDeviceChange}
            />
          </ControlModal>
          <Panel
            onCancel={this.onRealAlarmCancel}
            title={this.state.alarmTableTitle}
            isShow={this.state.alarmTableVisible}>
            <RealtimeAlarmTable />
          </Panel>
        </div>
      </div>
    );
  }
}

export default Information;
