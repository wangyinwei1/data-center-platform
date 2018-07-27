import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Spin, Form, message} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbar';
import Table from '../../../components/Table';
import columnData from './columns.js';
import DeleteModal from '../../../components/DeleteModal';
import BatchModal from '../../../components/DeleteModal';
import EditModal from './edit.js';
import moment from 'moment';
import Panel from '../../../components/Panel';
import RealtimeTable from './realtimeTable.js';
import HistoryModal from './historyModal.js';
import ChildTable from './childTable.js';
import ControlModal from './controlModal.js';
import ControlContent from './controlContent.js';
import RumorContent from './rumorContent.js';
import AddLevelOne from './addLevelOne.js';
import AddChildDevice from './addChildDevice.js';
import {formParams, addLevelOne, addChildDevice} from './tplJson.js';
//实例
@inject('regionalStore', 'informationStore', 'fsu_devicemanagementStore')
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
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.realtimeChange = this.realtimeChange.bind(this);
    this.historyChange = this.historyChange.bind(this);
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
    this.onBatchCancel = this.onBatchCancel.bind(this);

    this.state = {
      controlShow: false,
      historyShow: false,
      realtimeShow: false,
      addLevelOneShow: false,
      addChildDeviceShow: false,
      rumorShow: false,
      modalTitle: '',
      cascaderText: '',
      cascaderLoading: false,
      singleLineData: {},
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
      currentDeviceID: '',
      batchIds: '',
      batchShow: false,
      batchField: '',
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
    };
    const {fsu_devicemanagementStore} = this.props;
    fsu_devicemanagementStore.getTable(params);
    this.setState({
      batchIds: '',
    });
  }
  componentDidMount() {
    const {fsu_devicemanagementStore} = this.props;
    this.initLoading(fsu_devicemanagementStore).then(() => {
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
      F_Suid: item.suID,
    };
    fsu_devicemanagementStore.getRealtimeTable(params);
    this.setState({
      realtimeShow: true,
    });
  }
  onRealtimeOk() {}
  onRealtimeCancel() {
    this.setState({
      realtimeShow: false,
    });
  }
  //控制
  controlClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
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
  onRumorCancel() {
    this.setState({
      rumorShow: false,
    });
  }
  //历史数据弹框
  historyClick(item, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_devicemanagementStore} = this.props;
    const params = {
      ztreeChild: item.suID,
      lastLoginStart: moment()
        .subtract(3, 'months')
        .format('YYYY-MM-DD'),
      lastLoginEnd: moment().format('YYYY-MM-DD'),
      page: 1,
      number: 10,
    };
    fsu_devicemanagementStore.getFsuHisdataTable(params);
    this.setState({
      historyShow: true,
    });
  }
  onHistoryCancel() {
    this.setState({
      historyShow: false,
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
      formValue.F_StationID.value = data.pd.stationID;
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
    const {fsu_devicemanagementStore: {getGoAdd, ztreeChild}} = this.props;
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
  addLevelOneClick(item) {
    const {fsu_devicemanagementStore: {currentDeviceChange}} = this.props;
    currentDeviceChange(item.suID);
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
    this.setState({
      ...addChildDevice,
      addChildDeviceShow: false,
    });
  }
  //点击编辑
  editClick(item) {
    const {fsu_devicemanagementStore: {goFind2, ztreeChild}} = this.props;
    goFind2({Area_ID: ztreeChild, suID: item.suID}).then(data => {
      this.initFromValue(data, 'modify');
    });
  }
  //删除回调
  onDeleteOk() {
    const {fsu_devicemanagementStore} = this.props;
    const params = {F_Suid: this.state.singleLineData.suID};
    this.c_onDeleteOk(fsu_devicemanagementStore, params);
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
    console.log(111);

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
      keywords: value,
    };
    fsu_devicemanagementStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_devicemanagementStore} = this.props;

    const params = {
      ...fsu_devicemanagementStore.tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_devicemanagementStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {fsu_devicemanagementStore} = this.props;
    this.c_onPageChange({pageNumber}, fsu_devicemanagementStore);
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
    this.setState({
      addChildDeviceShow: true,
      sunType: 'new',
      currentDeviceID: item.deviceID,
      selectedChildRowKey: selectedChildRowKey,
    });
  }
  //子集点击设值
  getRowData(item, mode) {
    this.setState(({oneFields}) => {
      let formValue = _.cloneDeep([oneFields])[0];
      formValue.F_DeviceID.value = item.deviceID;
      formValue.F_DeviceName.value = item.deviceName;
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
      let formValue = _.cloneDeep([childDevicefields])[0];
      formValue.F_SpUnit.value = item.spUnit;
      formValue.F_Type.value = item.type;
      formValue.F_OptionID.value = item.optionID;
      formValue.F_SpName.value = item.spName;
      formValue.F_SpID.value = item.spID;
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
      F_DeviceID: this.state.currentDeviceID,
      F_Suid: currentDevice,
    }).then(() => {
      const F_DeviceID = {F_DeviceID: currentDevice};
      selectedChildRowKey[0] === this.state.currentDeviceID &&
        getGrandsonTable({
          ...F_DeviceID,
          F_DeviceID: this.state.currentDeviceID,
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
        sunEditChange={this.sunEditChange}
        sunDeleteChange={this.sunDeleteChange}
        sunDetailChange={this.sunDetailChange}
        currentPortChange={this.currentPortChange}
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
  selectChange(value) {
    const status = {status: value};
    const {fsu_devicemanagementStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      ...status,
    };
    getTable(params);
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

  render() {
    const {fsu_devicemanagementStore, zTreeLevel, regionalStore} = this.props;
    const tableData = toJS(fsu_devicemanagementStore.tableData.varList) || [];
    const pagination = toJS(fsu_devicemanagementStore.tableData) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      realtimeClick: this.realtimeClick,
      historyClick: this.historyClick,
      controlClick: this.controlClick,
      rumorClick: this.rumorClick,
      addLevelOneClick: this.addLevelOneClick,
      detailClick: this.detailClick,
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
        modalTitle = '设备新增';

        break;
      case 'modify':
        modalTitle = '设备编辑';

        break;
      case 'detail':
        modalTitle = '设备详情';

        break;
    }
    // rowSelection objects indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          batchIds: selectedRowKeys.join(','),
        });
      },
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
              showValue={['batchDelete', 'batchDisable', 'batchEnabled', 'add']}
              onBatchDeleteClick={this.onBatchDeleteClick}
              onBatchDisableClick={this.onBatchDisableClick}
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
                  record.statustwo == 0 && rowClassName.push('cl_online_state');
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
          />
          <BatchModal
            isShow={this.state.batchShow}
            onOk={this.onBatchOk}
            hintContent={this.state.hintContent}
            onCancel={this.onBatchCancel}
          />
          <Panel
            onCancel={this.onRealtimeCancel}
            title={'实时数据'}
            isShow={this.state.realtimeShow}>
            <RealtimeTable />
          </Panel>
          <Panel
            onCancel={this.onHistoryCancel}
            title={'历史数据'}
            isShow={this.state.historyShow}>
            <HistoryModal />
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
            width={900}
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
        </div>
      </div>
    );
  }
}

export default Information;
