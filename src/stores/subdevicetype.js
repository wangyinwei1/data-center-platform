import {observable, action} from 'mobx';
import {
  alarminformation_search,
  findDeviceSubType,
  alarminformation_delete,
  alarminformationEditSave,
  alarminformationSave,
  alarminformationInitEdit,
  alarminformationInitAdd,
  saveDeviceSubType,
  editDeviceSubType,
  deleteDeviceSubType,
  deviceSubTypeInfo,
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
    const data = await findDeviceSubType(params);
    this.loading = false;
    params.number = data.Data.number;
    params.page = data.Data.page;
    this.tableParmas = params;
    if (data.Result == 'success') {
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getEidtData(params) {
    const data = await deviceSubTypeInfo(params);
    this.editData = data;
    return data;
  }
  @action.bound
  async editSave(params) {
    const data = await editDeviceSubType(params);
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
    const data = await saveDeviceSubType(params);
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
  async delete(params) {
    const data = await deleteDeviceSubType(params);
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
