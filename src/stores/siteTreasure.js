import {observable, action} from 'mobx';
import {
  getSiteTreasureList,
  siteTreasureEdit,
  siteTreasureSave,
  findStationByCode,
  getTagList,
  deleteSiteTreasure,
  getGoAdd,
} from '../services/api.js';
import {message} from 'antd';
class Historyalarm {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable loading = false;
  @observable ztreeChild = 0;
  @observable station = [];

  @action.bound
  async findStationByCode(params) {
    const data = await findStationByCode(params);
    this.station = data.Data;
  }

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getSiteTreasureList(params);
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
  async siteTreasureSave(params) {
    const data = await siteTreasureSave(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async siteTreasureEdit(params) {
    const data = await siteTreasureEdit(params);
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
    const data = await deleteSiteTreasure(params);
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
