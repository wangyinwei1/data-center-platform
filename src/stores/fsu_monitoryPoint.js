import {observable, action, toJS} from 'mobx';
import {
  fsu_realtimealarm_search,
  getFsuSpType,
  getFsu_realtimealarmTable,
  getFsu_realtimealarmChildTable,
  fsu_realtimealarmChild_search,
  fsuDealAlarm,
  fsuEndAlarm,
  fsuDeviceControl,
  getZone,
  fsuCancelAlarm,
  findSpInfoAndDeviceData,
  getFSUType,
  getFsuSp,
  fsuConfirmAlarm,
  getSubDeviceTree,
  findSpInfoAndRealData,
  getFsuSunDeviceTable,
  getSpInfo,
  remoteOperationSp,
  fsuDeviceRealTimeCall,
} from '../services/api.js';
import {message} from 'antd';
class Historyalarm {
  @observable tableData = [];
  @observable tableParmas = {};
  @observable loading = false;
  @observable c_tableData = {};
  @observable c_tableParmas = {};
  @observable c_loading = false;
  @observable currentDevice = '';
  @observable subDeviceTree = [];
  @observable subDeviceLoading = false;
  @observable spType = [];
  @observable fsuAddTypes = [];
  @observable spInfo = {};

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
  async remoteOperationSp(params) {
    const data = await remoteOperationSp(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getZone(params) {
    const data = await getZone(params);
    return data.areaTree || [];
  }
  @action.bound
  async getSubDeviceTree(params) {
    this.subDeviceLoading = true;
    const data = await getSubDeviceTree(params);
    this.subDeviceLoading = false;
    if (data.Result == 'success') {
      this.subDeviceTree = data.Data.map((item, index) => {
        return {
          ...item,
          deviceID: index.toString(36) + index,
          deviceName: `${item.typeName} (${item.children.length})`,
          isParent: true,
        };
      });
      this.tableData = [];
      return this.subDeviceTree[0] || {};
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async changePaging(params) {
    this.tableParmas = {...toJS(this.tableParmas), ...params};
  }
  @action.bound
  async clear(params) {
    this.tableParmas = {};
    this.tableData = [];
    this.loading = false;
    this.subDeviceTree = [];
    this.subDeviceLoading = false;
    this.spType = [];
    this.fsuAddTypes = [];
  }
  @action.bound
  async getFsuSpType(params) {
    const data = await getFsuSpType(params);
    if (data.Result == 'success') {
      this.spType = data.Data.map(item => {
        return {name: item.spTypaName, value: item.spTypeId};
      });
      return this.spType;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getControlChannel(params) {
    const data = await getFsuSunDeviceTable(params);
    if (data.Result == 'success') {
      console.log(data);
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action.bound
  async getRealTimeCall(params) {
    this.loading = true;
    const data = await findSpInfoAndDeviceData(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async postDeviceControl(params) {
    const data = await fsuDeviceControl(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getFSUType(params) {
    const data = await getFSUType(params);
    if (data.Result == 'success') {
      this.fsuAddTypes = data.Data.map(item => {
        return {name: item.typeName, value: item.typeId};
      });
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async confirmAlarm(params) {
    const data = await fsuConfirmAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async cancelAlarm(params) {
    const data = await fsuCancelAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async dealAlarm(params) {
    const data = await fsuDealAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async endAlarm(params) {
    const data = await fsuEndAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await findSpInfoAndRealData(params);
    this.loading = false;
    if (data.Result == 'success') {
      this.tableParmas = params;
      this.tableData = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action
  async search(params) {
    this.loading = true;
    const data = await fsu_realtimealarm_search(params);
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
  async getChildTable(params) {
    this.c_loading = true;
    const data = await getFsu_realtimealarmChildTable(params);
    this.c_loading = false;
    if (data.Result == 'success') {
      this.currentDevice = params.ztreeChild;
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.c_tableParmas = params;
      this.c_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async childSearch(params) {
    this.c_loading = true;
    const data = await getFsu_realtimealarmChildTable(params);
    this.c_loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.c_tableParmas = params;
      this.c_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
}

export default Historyalarm;
