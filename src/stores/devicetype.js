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
    params.showCount = data.pd.showCount;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }
  @action
  async search(params) {
    this.loading = true;
    const data = await getDevicetypeTable(params);
    this.loading = false;
    params.showCount = data.pd.showCount;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }

  @action
  async delete(params) {
    const data = await devicetype_delete(params);
    if (data.result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.msg);
    }
    return data;
  }
  @action.bound
  async editSave(params) {
    const data = await editgenera(params);
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
    const data = await savegenera(params);
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
}

export default Site;
