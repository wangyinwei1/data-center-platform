import {observable, action} from 'mobx';
import {
  devicetype_search,
  getDevicetypeTable,
  devicetype_delete,
  savegenera,
  editgenera,
} from '../services/api.js';
import {message} from 'antd';
class Site {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable loading = false;

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getDevicetypeTable(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }
  @action
  async search(params) {
    this.loading = true;
    const data = await getDevicetypeTable(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }

  @action
  async delete(params) {
    const data = await devicetype_delete(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
    return data;
  }
  @action.bound
  async editSave(params) {
    const data = await editgenera(params);
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
    const data = await savegenera(params);
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
}

export default Site;
