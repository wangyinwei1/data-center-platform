import {observable, action} from 'mobx';
import {
  fsu_alarminformation_delete,
  getFsuAlarminformationTable,
  fsuAlarminformation_search,
  getFsuAlarmInfo,
  fsuAlarminformationSave,
  fsuAlarminformationUpdate,
  alarminformationInitAdd,
} from '../services/api.js';
import {message} from 'antd';
class Site {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable addData = {};
  @observable editData = {};
  @observable loading = false;

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getFsuAlarminformationTable(params);
    this.loading = false;
    params.number = data.number;
    params.page = data.page;
    this.tableParmas = params;
    if (data.Result == 'success') {
      this.tableData = data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getGoAdd(params) {
    const data = await alarminformationInitAdd(params);
    this.addData = data;
    return data;
  }
  @action.bound
  async getEidtData(params) {
    const data = await getFsuAlarmInfo(params);
    this.editData = data;
    return data;
  }
  @action.bound
  async editSave(params) {
    const data = await fsuAlarminformationUpdate(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
    return data;
  }
  @action.bound
  async save(params) {
    const data = await fsuAlarminformationSave(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
    return data;
  }
  @action
  async search(params) {
    this.loading = true;
    const data = await fsuAlarminformation_search(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.pd.number;
      params.page = data.Data.pd.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }

  @action
  async delete(params) {
    const data = await fsu_alarminformation_delete(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
    return data;
  }
}

export default Site;
