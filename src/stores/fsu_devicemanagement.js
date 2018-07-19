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
  saveFSU_Sun2,
  editFSU2,
  saveFSU_Sp2,
  editFSU_Sun2,
  getFsuSunDeviceTable,
  getFsuSpTable,
  fsuDeviceControl,
  delFSU_Sun2,
  editFSU_Sp2,
  fsuDelectAll,
  fsuDevsEnabledOnOff,
  delFSU_Sp2,
  getFsuRealtimeTable,
  getFsuHisdataTable,
} from '../services/api.js';
import _ from 'lodash';
import {message} from 'antd';
class Devicemanagement {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable r_tableData = {};
  @observable r_tableParmas = {};
  @observable h_tableData = {};
  @observable h_tableParmas = {};
  @observable s_tableData = [];
  @observable s_tableParmas = {};
  @observable g_tableData = [];
  @observable loading = false;
  @observable r_loading = false;
  @observable s_loading = false;
  @observable h_loading = false;
  @observable g_loading = false;
  @observable deviceMenu = [];
  @observable deviceData = [];
  @observable currentDevice = '';
  @observable operateList = [];
  @observable controlChannel = [];
  @observable regulatChannel = [];
  @observable addData = [];
  @observable detailData = [];
  @observable ztreeChild = 0;
  @observable expandedRows = [];
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
  async clearDeviceData(params) {
    this.deviceData = [];
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
    const data = await saveFSU_Sun2(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async editConsport(params) {
    const data = await editFSU_Sun2(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async saveSun(params) {
    const data = await saveFSU_Sp2(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async editSun(params) {
    const data = await editFSU_Sp2(params);
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
      this.detailData = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getOperateList(params) {
    const data = await getFsuSpTable(params);
    if (data.Result == 'success') {
      console.log(data);
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
      return isShow;
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action.bound
  async getRegulatChannel(params) {
    const data = await getRegulatChannel(params);
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
    if (data.Result == 'success') {
      this.ztreeChild = params.ztreeChild;
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
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
    console.log(111);

    this.r_loading = true;
    const data = await getFsuRealtimeTable(params);
    this.r_loading = false;
    if (data.Result == 'success') {
      console.log(data);
      this.r_tableParmas = params;
      this.r_tableData = data.Data;
    } else {
      message.error(data.Msg);
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
    } else {
      message.error(data.Msg);
    }
  }
  // @action.bound
  // async getByDevice(params) {
  //   const data = await getByDevice(params);
  //   this.curunentDevice = params.F_DeviceID;
  //   this.deviceMenu = data.varList;
  // }
  @action.bound
  async getFsuHisdataTable(params) {
    this.h_loading = true;
    const data = await getFsuHisdataTable(params);
    if (data.Result == 'success') {
      this.h_loading = false;
      this.curunentDevice = params.F_DeviceID;
      this.h_tableParmas = params;
      this.h_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async findDeviceData(params) {
    const data = await findDeviceData(params);
    this.deviceData = data.varList;
  }
  @action.bound
  async getGrandsonTable(params) {
    this.g_loading = true;
    const data = await getFsuSp(params);
    this.g_loading = false;
    if (data.Result == 'success') {
      this.g_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getRealTimeCall(params) {
    this.r_loading = true;
    const data = await getFsuRealtimeTable(params);
    this.r_loading = false;
    if (data.Result == 'success') {
      params.page = data.Data.page;
      this.r_tableParmas = params;
      this.r_tableData = data.Data;
      console.log(data.Data);
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
    const data = await delFSUSun2(params);
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
}

export default Devicemanagement;
