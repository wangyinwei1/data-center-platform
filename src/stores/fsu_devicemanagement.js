import {observable, action, toJS} from 'mobx';
import {
  //
  getFsuDevicemanagementTable,
  getFsuSunDevice,
  getFsuSp,
  findStation,
  findFSU2,
  delFSU2,
  fsuDevicemanagementSave,
  fsuAddSunDev,
  editFSU2,
  fsuAddSpID,
  getSuStatus,
  fsuUpdSunDev,
  getFsuSunDeviceTable,
  getFsuSpTable,
  fsuDeviceControl,
  getDeviceTypes,
  fsuDeviceRealTimeCall,
  delFSU_Sun2,
  fsuUpdSpID,
  fsuDelectAll,
  getFSUType,
  fsuDevsEnabledOnOff,
  delFSU_Sp2,
  getFsuRealtimeTable,
  saveFSUAlarmCondition,
  getFsuAlarmConditionList,
  getAlarmInfoList,
  getInitAlarmConditionsAdd,
  getTelemetrySpList,
  getSpRemoteSettingInfo,
  getRemoteSettingSpInfo,
  remoteOperationSp,
  fsuRestart,
  fsuSetTime,
  getFsuPortInfo,
  getSpInfo,
} from '../services/api.js';
import _ from 'lodash';
import {message} from 'antd';
class Devicemanagement {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable r_tableData = {};
  @observable his_grandsonMenu = [];
  @observable r_tableParmas = {};
  @observable h_tableData = {};
  @observable h_tableParmas = {};
  @observable s_tableData = [];
  @observable s_tableParmas = {};
  @observable g_tableData = [];
  @observable a_tableData = {};
  @observable a_loading = false;
  @observable a_tableParmas = {};
  @observable alarmList = [];
  @observable loading = false;
  @observable r_loading = false;
  @observable status_loading = false;
  @observable fsuStatusData = {};
  @observable s_loading = false;
  @observable h_loading = false;
  @observable g_loading = false;
  @observable deviceMenu = [];
  @observable deviceTypes = [];
  @observable deviceData = [];
  @observable currentDevice = '';
  @observable currentDeviceMenu = undefined;
  @observable operateList = [];
  @observable controlChannel = [];
  @observable regulatChannel = [];
  @observable addData = [];
  @observable his_subDevice = [];
  @observable detailData = [];
  @observable ztreeChild = 0;
  @observable expandedRows = [];
  @observable realtimeSubDevMenu = [];
  @observable remoteControlInfo = {};
  @observable realtimeMonitorPointMenu = [];
  @observable fsuPortInfoList = [];
  @observable p_loading = false;
  @observable spInfo = {};

  @action.bound
  async expandedRowsChange(value) {
    this.expandedRows = value;
  }

  @action.bound
  async currentDeviceChange(value) {
    this.currentDevice = value;
  }

  @action.bound
  async save(params) {
    const data = await fsuDevicemanagementSave(params);
    if (data.Result == 'success') {
      this.getTable(toJS(this.tableParmas));
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async remoteOperationSp(params) {
    const data = await remoteOperationSp(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmDataChange(data) {
    this.a_tableData = data;
  }
  @action.bound
  async getAlarmTable(params) {
    this.a_loading = true;
    const data = await getFsuAlarmConditionList(params);
    if (data.Result == 'success') {
      this.a_loading = false;
      this.getAlarmList();
      this.a_tableParmas = params;
      //没有数据默认给一条数据
      this.a_tableData = data.Data[0]
        ? data.Data
        : [
            {
              conType: undefined,
              msgID: undefined,
              condition: '',
              alarmMsg: '',
              newAddRow: true,
              //告警延迟
              alarmDelay: 0,
            },
          ];
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getAlarmList(params) {
    const data = await getAlarmInfoList(params);
    if (data.Result == 'success') {
      this.alarmList = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getFsuPortInfo(params) {
    this.p_loading = true;
    const data = await getFsuPortInfo(params);
    this.p_loading = false;
    if (data.Result == 'success') {
      this.fsuPortInfoList = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getTelemetrySpList(params) {
    const data = await getTelemetrySpList(params);
    if (data.Result == 'success') {
      this.alarmList = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getRemoteSettingSpInfo(params) {
    const data = await getRemoteSettingSpInfo(params);
    if (data.Result == 'success') {
      this.remoteControlInfo = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmBatchSave(params) {
    const data = await saveFSUAlarmCondition(params);
    if (data.Result == 'success') {
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action.bound
  async getFSUType(params) {
    const data = await getFSUType(params);
    if (data.Result == 'success') {
      this.fsuAddTypes = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async editSave(params) {
    const data = await editFSU2(params);
    if (data.Result == 'success') {
      this.getTable(toJS(this.tableParmas));
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async postDeviceControl(params) {
    const data = await fsuDeviceControl(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async fsuDelectAll(params) {
    const data = await fsuDelectAll(params);
    if (data.Result == 'success') {
      this.getTable(toJS(this.tableParmas));
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async clearHisData(params) {
    this.h_tableData = {};
  }

  @action.bound
  async fsuDevsEnabledOnOff(params) {
    const data = await fsuDevsEnabledOnOff(params);
    if (data.Result == 'success') {
      this.getTable(toJS(this.tableParmas));
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async saveConsport(params) {
    const data = await fsuAddSunDev(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async editConsport(params) {
    const data = await fsuUpdSunDev(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async saveSun(params) {
    const data = await fsuAddSpID(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async editSun(params) {
    const data = await fsuUpdSpID(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getGoAdd(params) {
    const data = await findStation(params);
    this.addData = data;
  }
  @action.bound
  async goFind2(params) {
    const data = await findFSU2(params);
    if (data.Result == 'success') {
      this.currentDevice = params.suID;
      this.detailData = data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getOperateList(params) {
    const data = await getFsuSpTable(params);
    if (data.Result == 'success') {
      this.operateList = data.Data;
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action.bound
  async getControlChannel(params) {
    const data = await getFsuSunDeviceTable(params);
    if (data.Result == 'success') {
      this.currentDevice = params.F_Suid;
      this.controlChannel = data.Data;
      const deviceID = data.Data[0].deviceID;
      params.F_DeviceID = deviceID;
      const isShow = await this.getOperateList(params);
      return data.Data[0];
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action.bound
  async getRegulatChannel(params) {
    const data = await getSpRemoteSettingInfo(params);
    if (data.Result == 'success') {
      this.currentDevice = params.F_DeviceID;
      this.regulatChannel = data.Data;
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
  }

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getFsuDevicemanagementTable(params);
    this.loading = false;
    this.ztreeChild = params.ztreeChild;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
      //fsu类型小于1提示没有数据之类的提示（从后端获取）
      const fsuTypeID = localStorage.getItem('FsuTypeID');
      if (fsuTypeID < 1 || !fsuTypeID) {
        message.error(data.Msg);
      }
    } else {
      message.error(data.Msg);
    }
  }
  @action
  async search(params) {
    this.loading = true;
    const data = await getFsuDevicemanagementTable(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getRealtimeTable(params) {
    this.r_loading = true;
    const data = await getFsuRealtimeTable(params);
    this.r_loading = false;
    if (data.Result == 'success') {
      this.r_tableParmas = params;
      this.r_tableData = data.Data;
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action.bound
  async getSportTable(params) {
    this.s_loading = true;
    const data = await getFsuSunDevice(params);
    this.s_loading = false;
    if (data.Result == 'success') {
      this.currentDevice = params.F_Suid;
      this.s_tableParmas = params;
      this.s_tableData = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
      this.s_tableData = [];
    }
  }
  @action.bound
  async getSuStatus(params) {
    this.status_loading = true;
    const data = await getSuStatus(params);

    this.status_loading = false;
    if (data.Result == 'success') {
      this.fsuStatusData = data.Data;
      return data.data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getGrandsonTable(params) {
    this.g_loading = true;
    const data = await getFsuSp(params);
    this.g_loading = false;
    if (data.Result == 'success') {
      this.g_tableData = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
      this.g_tableData = [];
    }
  }
  @action.bound
  async getRealTimeCall(params) {
    this.r_loading = true;
    const data = await fsuDeviceRealTimeCall(params);
    this.r_loading = false;
    if (data.Result == 'success') {
      params.page = data.Data.page;
      this.r_tableParmas = params;
      this.r_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async realtimeSearch(params) {
    this.r_loading = true;
    const data = await getFsuRealtimeTable(params);
    this.r_loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.r_tableParmas = params;
      this.r_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getSubDevice(params) {
    const data = await getFsuSunDevice(params);
    if (data.Result == 'success') {
      this.realtimeSubDevMenu = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getSpInfo(params) {
    const data = await getSpInfo(params);
    if (data.Result == 'success') {
      this.spInfo = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getGrandsonMenu(params) {
    const data = await getFsuSp(params);
    if (data.Result == 'success') {
      this.realtimeMonitorPointMenu = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async getDeviceTypes(params) {
    const data = await getDeviceTypes(params);
    if (data.Result == 'success') {
      this.deviceTypes = data.Data || [];
    } else {
      message.error(data.Msg);
    }

    return data;
  }
  @action
  async delete(params) {
    const data = await delFSU2(params);
    if (data.Result == 'success') {
      this.getTable(toJS(this.tableParmas));
      message.success('删除成功!');
    } else {
      message.error(data.Msg);
    }

    return data;
  }
  @action
  async delectConsport(params) {
    const data = await delFSU_Sun2(params);
    if (data.Result == 'success') {
      message.success('删除成功!');
    } else {
      message.error(data.Msg);
    }
    return data;
  }
  @action
  async delectSun(params) {
    const data = await delFSU_Sp2(params);
    if (data.Result == 'success') {
      message.success('删除成功!');
    } else {
      message.error(data.Msg);
    }
    return data;
  }
  @action
  async fsuRestart(params) {
    const data = await fsuRestart(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
    return data;
  }
  @action
  async fsuSetTime(params) {
    const data = await fsuSetTime(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
    return data;
  }
}

export default Devicemanagement;
