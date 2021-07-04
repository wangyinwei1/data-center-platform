import {observable, action, autorun} from 'mobx';
import {
  getByDevice,
  findDeviceDataList,
  findDeviceData,
  getFsuSunDevice,
  getFsuHisdataTable,
  getSubDevice,
  getFsuSp,
} from '../services/api.js';
import {message} from 'antd';

class HistoryModal {
  @observable currentDevice = '';
  @observable deviceMenu = [];
  @observable his_grandsonMenu = [];
  @observable d_loading = false;
  @observable deviceData = [];
  @observable his_subDevice = [];
  @action.bound
  async getByDevice(params) {
    const data = await getByDevice(params);
    this.currentDevice = params.F_DeviceID;
    this.deviceMenu = data.varList;
  }
  @action.bound
  async clearDeviceData(params) {
    this.deviceData = [];
  }
  @action.bound
  async findDeviceData(params) {
    this.d_loading = true;
    const data = await findDeviceData(params);
    this.d_loading = false;
    if (data.Result == 'success') {
      this.deviceData = data.varList;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getGrandsonMenu(params) {
    const data = await getFsuSp(params);
    if (data.Result == 'success') {
      this.his_grandsonMenu = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getSubDevice(params) {
    const data = await getFsuSunDevice(params);
    if (data.Result == 'success') {
      this.his_subDevice = data.Data;
      this.currentDevice = params.F_Suid;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getFsuHisdataTable(params) {
    this.d_loading = true;
    const data = await getFsuHisdataTable(params);
    if (data.Result == 'success') {
      this.d_loading = false;
      this.deviceData = data.varList;
    } else {
      message.error(data.Msg);
    }
  }
}

export default HistoryModal;
