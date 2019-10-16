import {observable, action} from 'mobx';
import {
  AEPEdit,
  AEPSave,
  findStationByCode,
  getTagList,
  AEPDelete,
  getGoAdd,
  AEPcommand,
  getAEPDeviceList,
  getCommandList,
  queryEventList,
  queryCommandList,
  getDeviceStatusHis,
  getDeviceInfo,
} from '../services/api.js';
import {message} from 'antd';
class Historyalarm {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable loading = false;
  @observable ztreeChild = 0;
  @observable commandList = {};
  @observable station = [];
  @observable detailParmas = {};
  @observable detailData = [];
  @observable detailLoading = false;
  @observable deviceInfo = {};

  @action.bound
  async findStationByCode(params) {
    const data = await findStationByCode(params);
    this.station = data.Data;
  }
  @action.bound
  async getDeviceInfo(params) {
    const data = await getDeviceInfo(params);
    this.deviceInfo = data.Data;
  }
  @action.bound
  async getCommandList(params) {
    const data = await getCommandList(params);
    if (data.Result == 'success') {
      this.commandList = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getTagDetail(params, which) {
    this.detailData = [];
    this.detailLoading = true;
    let data;
    switch (which) {
      case 'history':
        data = await getDeviceStatusHis(params);
        break;
      case 'issued':
        data = await queryCommandList(params);
        break;
      case 'reported':
        data = await queryEventList(params);
        break;
    }
    this.detailLoading = false;

    // params.number = data.Data.number;
    // params.page = data.Data.page;
    this.detailParmas = params;
    if (data.Result == 'success') {
      this.detailData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getAEPDeviceList(params);
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
  async AEPSave(params) {
    const data = await AEPSave(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async AEPcommand(params) {
    const data = await AEPcommand(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async AEPEdit(params) {
    const data = await AEPEdit(params);
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
    const data = await AEPDelete(params);
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
