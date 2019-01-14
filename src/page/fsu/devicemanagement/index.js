import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Spin, Form, message, Upload} from 'antd';
import styles from './index.less';
import RealtimeAlarmTable from '../realtimealarm/childTable.js';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbar';
import Table from '../../../components/Table';
import columnData from './columns.js';
import DeleteModal from '../../../components/DeleteModal';
import BatchModal from '../../../components/DeleteModal';
import EditModal from '../../../components/EditModal';
import EditContent from './edit.js';
import moment from 'moment';
import Panel from '../../../components/Panel';
import RealtimeTable from './realtimeTable.js';
import HistoryModal from './historyModal.js';
import ChildTable from './childTable.js';
import ControlModal from './controlModal.js';
import ControlContent from './controlContent.js';
import RumorContent from './rumorContent.js';
import AddLevelOne from './addLevelOne.js';
import FsuStatusEcharts from './FsuStatusEcharts.js';
import DownConfig from './downConfig.js';
import AddChildDevice from './addChildDevice.js';
import {
  formParams,
  addLevelOne,
  addFsuLevelOne,
  addChildFsuDevice,
  addChildDevice,
} from './tplJson.js';
//实例
@inject(
  'regionalStore',
  'informationStore',
  'fsu_devicemanagementStore',
  'fsu_realtimealarmStore',
  'fsuconfigStore',
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
    this.downDevChange = this.downDevChange.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.typesChange = this.typesChange.bind(this);
    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDisableOk = this.onDisableOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.fsuStatusClick = this.fsuStatusClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.closeDownShowChange = this.closeDownShowChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.childExportClick = this.childExportClick.bind(this);
    this.onRealtimeOk = this.onRealtimeOk.bind(this);
    this.onDisableCancel = this.onDisableCancel.bind(this);
    this.onRealtimeCancel = this.onRealtimeCancel.bind(this);
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.realtimeChange = this.realtimeChange.bind(this);
    this.exportMonitor = this.exportMonitor.bind(this);
    this.exportSub = this.exportSub.bind(this);
    this.historyChange = this.historyChange.bind(this);
    this.childDeleteChange = this.childDeleteChange.bind(this);
    this.disableClick = this.disableClick.bind(this);
    this.rumorChange = this.rumorChange.bind(this);
    this.controlChange = this.controlChange.bind(this);
    this.onHistoryCancel = this.onHistoryCancel.bind(this);
    this.onControlCancel = this.onControlCancel.bind(this);
    this.onRumorCancel = this.onRumorCancel.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onAddLevelOneOk = this.onAddLevelOneOk.bind(this);
    this.onAddLevelOneCancel = this.onAddLevelOneCancel.bind(this);
    this.AddLevelOneChange = this.AddLevelOneChange.bind(this);
    this.addChildDeviceChange = this.addChildDeviceChange.bind(this);
    this.addChildDeviceCancel = this.addChildDeviceCancel.bind(this);
    this.addChildDeviceOk = this.addChildDeviceOk.bind(this);
    this.addChildShow = this.addChildShow.bind(this);
    this.childDetailClick = this.childDetailClick.bind(this);
    this.onExportTplClick = this.onExportTplClick.bind(this);
    this.childEditClick = this.childEditClick.bind(this);
    this.sunEditChange = this.sunEditChange.bind(this);
    this.sunDeleteChange = this.sunDeleteChange.bind(this);
    this.sunDetailChange = this.sunDetailChange.bind(this);
    this.currentPortChange = this.currentPortChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.onBatchDeleteClick = this.onBatchDeleteClick.bind(this);
    this.onBatchDisableClick = this.onBatchDisableClick.bind(this);
    this.onBatchEnabledClick = this.onBatchEnabledClick.bind(this);
    this.onBatchOk = this.onBatchOk.bind(this);
    this.onRealAlarmCancel = this.onRealAlarmCancel.bind(this);
    this.onBatchCancel = this.onBatchCancel.bind(this);
    this.onFsuStatusCancel = this.onFsuStatusCancel.bind(this);
    this.getAlarmTable = this.getAlarmTable.bind(this);
    this.onDownShowCancel = this.onDownShowCancel.bind(this);

    this.state = {
      controlShow: false,
      historyShow: false,
      realtimeShow: false,
      addLevelOneShow: false,
      addChildDeviceShow: false,
      rumorShow: false,
      modalTitle: '',
      currentSuID: '',
      cascaderText: '',
      cascaderLoading: false,
      devStatus: '',
      singleLineData: {},
      deleteShow: false,
      cascaderValue: [],
      deleteContent: '此操作将禁用该设备, 是否继续?',
      isDisable: false,
      editShow: false,
      childTableTitle: '',
      deleteType: '',
      editParams: {},
      type: 'new',
      disabledShow: false,
      childType: 'new',
      sunType: 'new',
      areaName: '',
      expandedRows: [],
      selectedChildRowKey: [],
      downShow: false,
      alarmTableVisible: false,
      alarmTableTitle: '',
      currentDeviceID: '',
      batchIds: '',
      batchShow: false,
      fsuStatusShow: false,
      batchField: '',
      needRealtime: true,
      hintContent: '',
      ...formParams,
      ...addLevelOne,
      ...addChildDevice,
    };
  }
  //以下级联方法
  onKeyPress(e) {
    const {fsu_devicemanagementStore} = this.props;
    this.c_onKeyPress(fsu_devicemanagementStore);
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
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    const {fsu_devicemanagementStore} = this.props;
    fsu_devicemanagementStore.getTable(params);
    this.clearSelected();
  }
  clearSelected() {
    this.setState({
      batchIds: '',
      sunBatchIds: '',
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
  componentDidMount() {
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      page: 1,
      sing: 'area',
      keywords: '',
      number: 10,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    fsu_devicemanagementStore.getFSUType();
    this.initLoading(fsu_devicemanagementStore, params).then(() => {
      const tableData = toJS(fsu_devicemanagementStore.tableData.varList);
    });
  }
  //真实数据弹框
  realtimeClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      keywords: '',
      page: 1,
      number: 10,
      F_Suid: item.suID,
    };
    fsu_devicemanagementStore.getRealtimeTable(params);
    this.setState({
      realtimeShow: true,
      childTableTitle: item.name,
      needRealtime: item.onOff === 0 ? false : true,
    });
  }
  onRealtimeOk() {}
  onRealtimeCancel() {
    this.setState({
      realtimeShow: false,
    });
    const {fsu_devicemanagementStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      status: this.state.devStatus,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    getTable(params);
  }
  typesChange(value) {
    const status = {status: value};
    const {
      fsu_devicemanagementStore: {getTable, expandedRowsChange, tableParmas},
    } = this.props;
    const params = {
      ...tableParmas,
      page: 1,
      F_FsuTypeID: value,
      status: this.state.devStatus,
    };
    localStorage.setItem('FsuTypeID', value);
    getTable(params).then(() => {
      this.setState({
        expandedRows: [],
      });
      expandedRowsChange([]);
    });
  }
  selectChange(value) {
    const status = {status: value};
    const {fsu_devicemanagementStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      ...status,
      page: 1,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    getTable(params);
    this.setState({
      devStatus: value,
    });
  }
  //控制
  controlClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (item.onOff === 0) {
      message.error('离线设备不支持远程控制！');
      return;
    }
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      F_Suid: item.suID,
    };
    fsu_devicemanagementStore.getControlChannel(params).then(data => {
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
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      F_DeviceID: item.devID,
    };
    fsu_devicemanagementStore.getRegulatChannel(params).then(data => {
      data &&
        this.setState({
          rumorShow: true,
        });
    });
  }
  onExportTplClick() {
    location.href = '/collect/FSU_device/downExcel';
  }
  onRumorCancel() {
    this.setState({
      rumorShow: false,
    });
  }
  onDisableCancel() {
    this.setState({
      disabledShow: false,
    });
  }
  //历史数据弹框
  historyClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_devicemanagementStore} = this.props;
    // const params = {
    //   ztreeChild: item.suID,
    //   lastLoginStart: moment()
    //     .subtract(3, 'months')
    //     .format('YYYY-MM-DD'),
    //   lastLoginEnd: moment().format('YYYY-MM-DD'),
    //   page: 1,
    //   number: 10,
    // };
    // fsu_devicemanagementStore.getFsuHisdataTable(params);
    const params = {
      F_Suid: item.suID,
    };
    fsu_devicemanagementStore.getSubDevice(params);
    this.setState({
      historyShow: true,
      currentSuID: item.suID,
      childTableTitle: item.name,
    });
  }
  onHistoryCancel() {
    this.setState({
      historyShow: false,
    });
    const {fsu_devicemanagementStore} = this.props;
    fsu_devicemanagementStore.clearHisData(); //离开情况列表
  }
  onDisableOk() {
    const {
      fsu_devicemanagementStore: {fsuDevsEnabledOnOff, getTable, tableParmas},
    } = this.props;
    const item = this.state.singleLineData;

    fsuDevsEnabledOnOff({
      strDevs: item.suID,
      status: item.status === 0 ? 1 : 0,
    });
    this.setState({
      disabledShow: false,
    });
  }
  //详情
  detailClick(item, e) {
    const {fsu_devicemanagementStore: {goFind2, ztreeChild}} = this.props;
    goFind2({Area_ID: ztreeChild, suID: item.suID}).then(data => {
      this.initFromValue(data, 'detail');
    });
  }
  onRowDoubleClick(item, index, e) {
    const {fsu_devicemanagementStore: {goFind2, ztreeChild}} = this.props;
    goFind2({Area_ID: ztreeChild, suID: item.suID}).then(data => {
      this.initFromValue(data, 'detail');
    });
  }
  onRealAlarmCancel() {
    this.setState({
      alarmTableVisible: false,
    });
    const {fsu_devicemanagementStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      status: this.state.devStatus,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    getTable(params);
  }
  initFromValue(data, mode) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.F_Name.value = data.pd.name;
      formValue.F_SuID.value = data.pd.suID;
      formValue.F_SuIP.value = data.pd.suIP;
      formValue.F_SuPort.value = data.pd.suPort;
      formValue.F_UserName.value = data.pd.userName;
      formValue.F_Pwd.value = data.pd.passWord;
      formValue.F_SuVendor.value = data.pd.suVendor;
      formValue.F_SuModel.value = data.pd.suModel;
      formValue.F_SuHardVer.value = data.pd.suHardVer;
      formValue.F_SuSoftVer.value = data.pd.suSoftVer;
      formValue.F_StationID.value = data.pd.stationID || undefined;
      formValue.F_TypeID.value = data.pd.typeID || undefined;
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
  //添加功能
  add() {
    const {
      fsu_devicemanagementStore: {getGoAdd, getFSUType, ztreeChild},
    } = this.props;
    getFSUType();
    getGoAdd({Area_ID: ztreeChild}).then(() => {
      this.setState(({fields}) => {
        let formValue = _.cloneDeep([fields])[0];
        formValue.F_TypeID.value = JSON.parse(
          localStorage.getItem('FsuTypeID'),
        );
        return {
          fields: {
            ...fields,
            ...formValue,
          },
          editShow: true,
          type: 'new',
        };
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
        fsu_devicemanagementStore: {
          saveConsport,
          editConsport,
          currentDevice,
          getSportTable,
        },
      } = this.props;
      const F_Suid = {F_Suid: currentDevice};
      const F_DeviceID =
        this.state.childType == 'modify'
          ? {
              F_DeviceID: this.state.currentDeviceID,
            }
          : {};

      const params = {
        ...F_Suid,
        ...F_DeviceID,
      };
      _.forIn(fields, (value, key) => {
        params[key] = value.value;
      });
      this.state.childType == 'modify'
        ? editConsport(params).then(() => {
            this.state.expandedRows[0] === currentDevice &&
              getSportTable(F_Suid);
          })
        : saveConsport(params).then(() => {
            this.state.expandedRows[0] === currentDevice &&
              getSportTable(F_Suid);
          });
      this.setState({
        addLevelOneShow: false,
      });
    }
  }
  async addLevelOneClick(item) {
    const {fsu_devicemanagementStore: {currentDeviceChange}} = this.props;
    currentDeviceChange(item.suID);
    const field =
      JSON.parse(localStorage.getItem('FsuTypeID')) === 3
        ? addFsuLevelOne
        : addLevelOne;
    await this.setState({
      ...field,
      addLevelOneShow: true,
      childType: 'new',
    });
  }
  onAddLevelOneCancel() {
    const field =
      JSON.parse(localStorage.getItem('FsuTypeID')) === 3
        ? addFsuLevelOne
        : addLevelOne;
    this.setState({
      ...field,
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
        fsu_devicemanagementStore: {
          saveSun,
          currentDevice,
          editSun,
          getGrandsonTable,
        },
      } = this.props;
      const F_Suid = {F_Suid: currentDevice};

      const params = {
        ...F_Suid,
        F_DeviceID: this.state.currentDeviceID,
      };
      _.forIn(fields, (value, key) => {
        params[key] = value.value;
      });
      this.state.sunType == 'modify'
        ? editSun(params).then(() => {
            this.state.selectedChildRowKey[0] === this.state.currentDeviceID &&
              getGrandsonTable({
                ...F_Suid,
                F_DeviceID: this.state.currentDeviceID,
              });
          })
        : saveSun(params).then(() => {
            this.state.selectedChildRowKey[0] === this.state.currentDeviceID &&
              getGrandsonTable({
                ...F_Suid,
                F_DeviceID: this.state.currentDeviceID,
              });
          });
      this.setState({
        ...addChildDevice,
        addChildDeviceShow: false,
      });
    }
  }
  addChildDeviceCancel() {
    const field =
      JSON.parse(localStorage.getItem('FsuTypeID')) === 3
        ? addChildFsuDevice
        : addChildDevice;

    this.setState({
      ...field,
      addChildDeviceShow: false,
    });
  }
  //点击编辑
  editClick(item) {
    const {
      fsu_devicemanagementStore: {goFind2, getFSUType, ztreeChild},
    } = this.props;
    getFSUType();
    goFind2({Area_ID: ztreeChild, suID: item.suID}).then(data => {
      this.initFromValue(data, 'modify');
    });
  }
  //删除回调
  onDeleteOk() {
    if (this.state.deleteType === 'subDev') {
      const {fsu_devicemanagementStore} = this.props;
      const params = {F_Suid: this.state.singleLineData.suID};
      this.c_onDeleteOk(fsu_devicemanagementStore, params);
    } else {
      const {
        fsu_devicemanagementStore: {
          delectConsport,
          currentDevice,
          getSportTable,
        },
      } = this.props;
      const item = this.state.singleLineData;
      delectConsport({F_Suid: currentDevice, F_DeviceID: item.deviceID}).then(
        () => {
          const F_Suid = {F_Suid: currentDevice};
          getSportTable(F_Suid);
          this.setState({
            deleteShow: false,
          });
        },
      );
    }
  }
  onDeleteCancel() {
    this.c_onDeleteCancel();
  }
  deleteClick(item, e) {
    const {fsu_devicemanagementStore} = this.props;
    fsu_devicemanagementStore.getSportTable({F_Suid: item.suID}).then(data => {
      if (data && data[0]) {
        this.setState({
          deleteContent: '该设备下拥有子设备,是否继续删除？',
          deleteShow: true,
          deleteType: 'subDev',
          singleLineData: item,
        });
      } else {
        this.setState({
          deleteContent: '此操作将删除该条数据, 是否继续?',
          deleteShow: true,
          deleteType: 'subDev',
          singleLineData: item,
        });
      }
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
      if (k === 'F_SuPort' && !portReg.test(v.value)) {
        showError[k] = {showError: true, ...v};
      } else if (k === 'F_SuIP' && !ipReg.test(v.value)) {
        showError[k] = {showError: true, ...v};
      } else {
        if (!v.value && v.value !== 0 && v.require) {
          showError[k] = {showError: true, ...v};
        }
      }
    });

    // _.forIn(fields, (v, k) => {
    //   if (!v.value && v.value !== 0 && v.require) {
    //     showError[k] = {showError: true, ...v};
    //   }
    // });
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
        fsu_devicemanagementStore: {save, editSave, currentDevice},
      } = this.props;

      const params = {};
      _.forIn(fields, (value, key) => {
        params[key] = value.value;
      });
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
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      ...fsu_devicemanagementStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    fsu_devicemanagementStore.search(params);
    this.clearSelected();
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_devicemanagementStore} = this.props;

    const params = {
      ...fsu_devicemanagementStore.tableParmas,
      page: current,
      number: pageSize,
      status: this.state.devStatus,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    fsu_devicemanagementStore.getTable(params);
    this.clearSelected();
  }
  onPageChange(pageNumber) {
    const {fsu_devicemanagementStore} = this.props;
    this.c_onPageChange({pageNumber}, fsu_devicemanagementStore);
    this.clearSelected();
  }
  //孙集回调
  realtimeChange() {
    this.setState({
      realtimeShow: true,
    });
  }
  historyChange() {
    this.setState({
      historyShow: true,
    });
  }
  controlChange() {
    this.setState({
      controlShow: true,
    });
  }
  rumorChange() {
    this.setState({
      rumorShow: true,
    });
  }
  addChildShow(item, selectedChildRowKey) {
    const field =
      JSON.parse(localStorage.getItem('FsuTypeID')) === 3
        ? addChildFsuDevice
        : addChildDevice;
    this.setState({
      ...field,
      addChildDeviceShow: true,
      sunType: 'new',
      currentDeviceID: item.deviceID,
      selectedChildRowKey: selectedChildRowKey,
    });
  }
  //子集点击设值
  getRowData(item, mode) {
    this.setState(({oneFields}) => {
      let value =
        JSON.parse(localStorage.getItem('FsuTypeID')) === 3
          ? addFsuLevelOne.oneFields
          : addLevelOne.oneFields;
      let formValue = _.cloneDeep([value])[0];
      formValue.F_DeviceID.value = item.deviceID;
      formValue.deviceName.value = item.deviceName;
      if (JSON.parse(localStorage.getItem('FsuTypeID')) === 3) {
        formValue.roomName.value = item.roomName;
        formValue.model.value = item.model;
        formValue.brand.value = item.brand;
        formValue.ratedCapacity.value = item.ratedCapacity;
        formValue.version.value = item.version;
        formValue.deviceType.value = item.deviceType;
        formValue.deviceSubType.value = item.deviceSubType;
        formValue.devDescribe.value = item.devDescribe;
      }
      return {
        oneFields: {
          ...oneFields,
          ...formValue,
        },
        currentDeviceID: item.deviceID,
        addLevelOneShow: true,
        childType: mode,
      };
    });
  }
  childDetailClick(item) {
    this.getRowData(item, 'detail');
  }
  childEditClick(item) {
    this.getRowData(item, 'modify');
  }
  //子集点击设值
  getSunRowData(item, mode) {
    const {fsu_devicemanagementStore: {expandedRows}} = this.props;
    this.setState(({childDevicefields}) => {
      let value =
        JSON.parse(localStorage.getItem('FsuTypeID')) === 3
          ? addChildFsuDevice.childDevicefields
          : addChildDevice.childDevicefields;
      let formValue = _.cloneDeep([value])[0];
      formValue.spUnit.value = item.spUnit;
      formValue.spType.value = item.spType;
      formValue.F_OptionID.value = item.optionID;
      formValue.spName.value = item.spName;
      formValue.F_SpID.value = item.spID;
      if (JSON.parse(localStorage.getItem('FsuTypeID')) === 3) {
        formValue.alarmLevel.value = item.alarmLevel;
        formValue.threshold.value = item.threshold;
        formValue.absoluteVal.value = item.absoluteVal;
        formValue.relativeVal.value = item.relativeVal;
        formValue.describe.value = item.describe;
        formValue.nmAlarmID.value = item.nmAlarmID;
      }
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
  sunEditChange(item) {
    this.getSunRowData(item, 'modify');
  }
  sunDeleteChange(item, selectedChildRowKey) {
    const {
      fsu_devicemanagementStore: {delectSun, currentDevice, getGrandsonTable},
    } = this.props;
    delectSun({
      F_Spid: item.spID,
      F_Suid: item.suID,
      F_DeviceID: this.state.currentDeviceID,
    }).then(() => {
      const F_DeviceID = {F_DeviceID: currentDevice};
      selectedChildRowKey[0] === this.state.currentDeviceID &&
        getGrandsonTable({
          ...F_DeviceID,
          F_DeviceID: this.state.currentDeviceID,
          F_Suid: item.suID,
        });
    });
  }

  sunDetailChange(item) {
    this.getSunRowData(item, 'detail');
  }
  currentPortChange(item) {
    this.setState({
      currentDeviceID: item.deviceID,
    });
  }
  childDeleteChange(item) {
    const {fsu_devicemanagementStore} = this.props;
    fsu_devicemanagementStore
      .getGrandsonTable({
        F_Suid: item.suID,
        F_DeviceID: item.deviceID,
      })
      .then(data => {
        if (data && data[0]) {
          this.setState({
            deleteContent: '该设备下拥有监控点,是否继续删除？',
            deleteShow: true,
            deleteType: 'monitor',
            singleLineData: item,
          });
        } else {
          this.setState({
            deleteContent: '此操作将删除该条数据, 是否继续?',
            deleteShow: true,
            deleteType: 'monitor',
            singleLineData: item,
          });
        }
      });
    // const {
    //   fsu_devicemanagementStore: {delectConsport, currentDevice, getSportTable},
    // } = this.props;
    // delectConsport({F_Suid: currentDevice, F_DeviceID: item.deviceID}).then(
    //   () => {
    //     const F_Suid = {F_Suid: currentDevice};
    //     getSportTable(F_Suid);
    //   },
    // );
  }
  async childExportClick(item) {
    await this.setState({
      singleLineData: item,
    });
    await $(this.upload).click();
  }
  //嵌套表格
  expandedRowRender(record, i) {
    const {fsu_devicemanagementStore} = this.props;

    return (
      <ChildTable
        rumorChange={this.rumorChange}
        historyChange={this.historyChange}
        realtimeChange={this.realtimeChange}
        controlChange={this.controlChange}
        addChildShow={this.addChildShow}
        childDetailClick={this.childDetailClick}
        childEditClick={this.childEditClick}
        childDeleteClick={this.childDeleteClick}
        sunEditChange={this.sunEditChange}
        sunDeleteChange={this.sunDeleteChange}
        childExportClick={this.childExportClick}
        sunDetailChange={this.sunDetailChange}
        currentPortChange={this.currentPortChange}
        childDeleteChange={this.childDeleteChange}
      />
    );
  }
  onExpand(expanded, record) {
    const {fsu_devicemanagementStore} = this.props;
    const expandedRows = this.state.expandedRows;
    if (expandedRows[0] && expandedRows[0] !== record.devID) {
      fsu_devicemanagementStore.expandedRowsChange([]);
    }

    if (expanded) {
      this.setState({expandedRows: [record.suID]});
    } else {
      this.setState({expandedRows: []});
    }

    fsu_devicemanagementStore.getSportTable({F_Suid: record.suID});
  }
  //得到编辑所有value
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
  //批量操作
  onBatchDeleteClick() {
    const batchIds = this.state.batchIds;
    if (!batchIds) {
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
    if (!batchIds) {
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
    if (!batchIds) {
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
    const {
      fsu_devicemanagementStore: {fsuDevsEnabledOnOff, fsuDelectAll},
    } = this.props;
    switch (this.state.batchField) {
      case 'delete':
        fsuDelectAll({suIDs: this.state.batchIds});
        break;
      case 'disable':
        fsuDevsEnabledOnOff({strDevs: this.state.batchIds, status: 1});
        break;
      case 'enabled':
        fsuDevsEnabledOnOff({strDevs: this.state.batchIds, status: 0});
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
  getAlarmTable(item, e, sub) {
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
      alarmTableVisible: true,
      alarmTableTitle: item.name,
    });
  }
  fsuStatusClick(item) {
    if (item.onOff === 0) {
      message.error('该设备为离线设备获取不到FSU运行状态！');
      return;
    }
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      suID: item.suID,
    };
    fsu_devicemanagementStore.getSuStatus(params);
    this.setState({
      fsuStatusShow: true,
    });
  }
  onFsuStatusCancel() {
    this.setState({
      fsuStatusShow: false,
    });
  }

  downDevChange() {
    const {fsuconfigStore: {getTable}} = this.props;
    getTable();
    this.setState({
      downShow: true,
    });
  }
  onDownShowCancel() {
    this.setState({
      downShow: false,
    });
  }
  closeDownShowChange() {
    this.setState({
      downShow: false,
    });
  }
  exportMonitor(item) {
    location.href = '/collect/FSU_device/exportFSUSp?F_Suid=' + item.suID;
  }
  exportSub(item) {
    location.href =
      '/collect/FSU_device/exportFSUSundevice?F_Suid=' + item.suID;
  }
  render() {
    const {fsu_devicemanagementStore, zTreeLevel, regionalStore} = this.props;
    const tableData = toJS(fsu_devicemanagementStore.tableData.varList) || [];
    const pagination = toJS(fsu_devicemanagementStore.tableData) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      exportMonitor: this.exportMonitor,
      exportSub: this.exportSub,
      realtimeClick: this.realtimeClick,
      historyClick: this.historyClick,
      controlClick: this.controlClick,
      disableClick: this.disableClick,
      rumorClick: this.rumorClick,
      fsuStatusClick: this.fsuStatusClick,
      addLevelOneClick: this.addLevelOneClick,
      detailClick: this.detailClick,
      getAlarmTable: this.getAlarmTable,
      _this: this,
    });
    const nesting = {
      expandedRowRender: this.expandedRowRender,
      onExpand: this.onExpand,
      expandedRowKeys: this.state.expandedRows,
    };
    let modalTitle = '';
    switch (this.state.type) {
      case 'new':
        modalTitle = 'FSU设备新增';

        break;
      case 'modify':
        modalTitle = 'FSU设备编辑';

        break;
      case 'detail':
        modalTitle = 'FSU设备详情';

        break;
    }
    let grandsonTitle = '';
    switch (this.state.sunType) {
      case 'new':
        grandsonTitle = '监控点新增';

        break;
      case 'modify':
        grandsonTitle = '监控点编辑';

        break;
      case 'detail':
        grandsonTitle = '监控点详情';

        break;
    }
    let childTitle = '';
    switch (this.state.childType) {
      case 'new':
        childTitle = '子设备新增';

        break;
      case 'modify':
        childTitle = '子设备编辑';

        break;
      case 'detail':
        childTitle = '子设备详情';

        break;
    }
    //自定义值
    const batchIds = this.state.batchIds;
    const selectedRowKeys = batchIds ? batchIds.split(',') : [];
    const rowSelection = {
      onSelectAll: (selected, selectedRows, changeRows) => {
        if (selected) {
          const suIDs = selectedRows.map(item => {
            return item.suID;
          });
          this.setState({
            batchIds: suIDs.join(','),
          });
        } else {
          this.setState({
            batchIds: '',
          });
        }
      },
      selectedRowKeys,
      onSelect: (record, selected, selectedRows) => {
        if (selected) {
          const batchIds = this.state.batchIds;
          let suIDs = batchIds.split(',');
          suIDs.push(record.suID);
          const filterSuIDs = suIDs.filter(item => {
            return item !== '';
          });
          this.setState({
            batchIds: filterSuIDs.join(','),
          });
        } else {
          const batchIds = this.state.batchIds;
          let suIDs = batchIds.split(',');
          const filterSuIDs = suIDs.filter(item => {
            return item !== record.suID;
          });
          this.setState({
            batchIds: filterSuIDs.join(','),
          });
        }
      },
    };

    const item = this.state.singleLineData;
    const props = {
      name: 'file',
      action: '/collect/FSU_device/readExcel',
      headers: {
        authorization: 'authorization-text',
      },
      data: {
        suID: this.state.singleLineData.suID,
        deviceID: this.state.singleLineData.deviceID,
      },
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if (info.file.response && info.file.response.Result === 'success') {
            message.success(`${info.file.name} 导入成功！`);
            const params = {
              F_Suid: item.suID,
              F_DeviceID: item.deviceID,
            };

            fsu_devicemanagementStore.getGrandsonTable(params);
          } else {
            message.error(info.file.response.Msg);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败！`);
        }
      },
    };
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
          <div className={styles['set_min_width']}>
            <Toolbar
              onClick={this.add}
              downDevChange={this.downDevChange}
              showValue={['exportMonitorTpl', 'downDev', 'batchOption', 'add']}
              fsuAddTypes={fsu_devicemanagementStore.fsuAddTypes}
              onBatchDeleteClick={this.onBatchDeleteClick}
              onBatchDisableClick={this.onBatchDisableClick}
              deviceStatus={true}
              onExportTplClick={this.onExportTplClick}
              selectChange={this.selectChange}
              typesChange={this.typesChange}
              onBatchEnabledClick={this.onBatchEnabledClick}
              onSearch={this.onSearch}
            />
            <div className={styles['table_wrap']}>
              <Table
                nesting={nesting}
                onRowDoubleClick={this.onRowDoubleClick}
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.count}
                columns={columns}
                rowClassName={(record, index) => {
                  const rowClassName = ['td_padding'];
                  record.onOff == 0 && rowClassName.push('cl_basic_state');
                  record.onOff == 2 && rowClassName.push('cl_err_state');
                  record.isConcentrator == 0 &&
                    rowClassName.push('cl_hidden_expand_icon');
                  return rowClassName.join(' ');
                }}
                expandIconAsCell={false}
                loading={fsu_devicemanagementStore.loading}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                rowSelection={rowSelection}
                data={tableData}
              />
            </div>
          </div>
          <DeleteModal
            isShow={this.state.deleteShow}
            onOk={this.onDeleteOk}
            onCancel={this.onDeleteCancel}
            hintContent={this.state.deleteContent}
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
            <HistoryModal currentSuID={this.state.currentSuID} />
          </Panel>
          <ControlModal
            width={730}
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
            <EditContent
              fields={this.state.fields}
              mode={this.state.type}
              handleFormChange={this.handleFormChange}
            />
          </ControlModal>
          <EditModal
            isShow={this.state.fsuStatusShow}
            title={'FSU运行状态'}
            width={670}
            onCancel={this.onFsuStatusCancel}>
            <FsuStatusEcharts />
          </EditModal>

          <DeleteModal
            hintContent={`此操作将${
              this.state.isDisable ? '禁用' : '启用'
            }该设备, 是否继续?`}
            isShow={this.state.disabledShow}
            onOk={this.onDisableOk}
            onCancel={this.onDisableCancel}
          />
          <ControlModal
            width={850}
            isShow={this.state.addLevelOneShow}
            title={childTitle}
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
            width={900}
            isShow={this.state.addChildDeviceShow}
            title={grandsonTitle}
            buttons={this.state.sunType == 'detail' ? false : true}
            onOk={this.addChildDeviceOk}
            onCancel={this.addChildDeviceCancel}>
            <AddChildDevice
              fields={this.state.childDevicefields}
              mode={this.state.sunType}
              handleFormChange={this.addChildDeviceChange}
            />
          </ControlModal>
          <EditModal
            isShow={this.state.downShow}
            title={'下发配置文件'}
            width={670}
            onCancel={this.onDownShowCancel}>
            <DownConfig
              selectedDevice={this.state.batchIds}
              closeDownShowChange={this.closeDownShowChange}
            />
          </EditModal>
          <Panel
            onCancel={this.onRealAlarmCancel}
            title={this.state.alarmTableTitle}
            isShow={this.state.alarmTableVisible}>
            <RealtimeAlarmTable />
          </Panel>
          <Upload {...props}>
            <span
              style={{display: 'none'}}
              ref={c => {
                this.upload = c;
              }}
            />
          </Upload>
        </div>
      </div>
    );
  }
}

export default Information;
