import {observable, action} from 'mobx';
import {
  findStationByCode,
  getGoAdd,
  getTowerList,
  towerSave,
  towerEdit,
  towerEditInfo,
  towerDelete,
  getElectricQuantity,
  getElectricEnergy,
  getAlarmInfo,
} from '../services/api.js';
import {message} from 'antd';
class Historyalarm {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable loading = false;
  @observable ztreeChild = 0;
  @observable station = [];
  @observable e_tableData = {};
  @observable e_tableParmas = {};
  @observable e_loading = false;

  @action.bound
  async findStationByCode(params) {
    const data = await findStationByCode(params);
    this.station = data.Data;
  }
  @action.bound
  async getInfo(params) {
    const data = await towerEditInfo(params);
    return data.Data || {};
  }
  @action.bound
  async getElectricQuantity(params) {
    this.e_loading = true;
    const data = await getElectricQuantity(params);
    this.e_loading = false;

    params.number = data.Data.number;
    params.page = data.Data.page;
    this.e_tableParmas = params;
    if (data.Result == 'success') {
      this.e_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getAlarmInfo(params) {
    this.e_loading = true;
    const data = await getAlarmInfo(params);
    this.e_loading = false;

    params.number = data.Data.number;
    params.page = data.Data.page;
    this.e_tableParmas = params;
    if (data.Result == 'success') {
      this.e_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getElectricEnergy(params) {
    this.e_loading = true;
    const data = await getElectricEnergy(params);
    this.e_loading = false;

    params.number = data.Data.number;
    params.page = data.Data.page;
    this.e_tableParmas = params;
    if (data.Result == 'success') {
      this.e_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getTagList(params) {
    this.tagLoading = true;
    const data = await getTagList(params);
    this.tagLoading = false;
    // params.number = data.Data.number;
    // params.page = data.Data.page;
    // this.tagParmas = params;
    if (data.Result == 'success') {
      this.tagData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getTowerList(params);
    this.loading = false;
    params.number = data.Data.number;
    params.page = data.Data.page;
    this.tableParmas = params;
    this.ztreeChild = params.ztreeChild;
    if (data.Result == 'success') {
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async towerSave(params) {
    const data = await towerSave(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async towerEdit(params) {
    const data = await towerEdit(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
    }
  }
  @action
  async delete(params) {
    const data = await towerDelete(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success('删除成功!');
    } else {
      message.error(data.Msg);
    }
    return data;
  }
}

export default Historyalarm;
