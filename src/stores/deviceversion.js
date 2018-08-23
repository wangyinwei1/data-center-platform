import {observable, action} from 'mobx';
import {
  deviceversion_search,
  getDeviceversionTable,
  deviceversion_delete,
  deviceversionInitAdd,
  deviceversionEditSave,
  deviceversionSave,
  deviceversionInitEdit,
  savegenera,
} from '../services/api.js';
import {message} from 'antd';
class Deviceversion {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable addData = {};
  @observable editData = {};
  @observable loading = false;
  @action.bound
  async getGoAdd(params) {
    const data = await deviceversionInitAdd(params);
    this.addData = data;
    return data;
  }
  @action.bound
  async getEidtData(params) {
    const data = await deviceversionInitEdit(params);
    this.editData = data;
    return data;
  }
  @action.bound
  async editSave(params) {
    const data = await deviceversionEditSave(params);
    if (data.result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.msg);
      return true;
    } else {
      message.error(data.msg);
      return false;
    }
    return data;
  }
  @action.bound
  async save(params) {
    const data = await deviceversionSave(params);
    if (data.result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.msg);
      return true;
    } else {
      message.error(data.msg);
      return false;
    }
    return data;
  }

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getDeviceversionTable(params);
    this.loading = false;
    params.showCount = data.pd.showCount;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }
  @action.bound
  async search(params) {
    this.loading = true;
    const data = await getDeviceversionTable(params);
    this.loading = false;
    params.showCount = data.pd.showCount;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }

  @action
  async delete(params) {
    const data = await deviceversion_delete(params);
    if (data.result == 'success') {
      this.getTable(this.tableParmas);
      message.success('删除成功!');
    } else {
      message.error(data.msg);
    }
    return data;
  }
  @action.bound
  async addBigClasses(params) {
    const data = await savegenera(params);
    if (data.result == 'success') {
      this.getGoAdd();
      message.success(data.msg);
      return true;
    } else {
      message.error(data.msg);
      return false;
    }
  }
}

export default Deviceversion;
