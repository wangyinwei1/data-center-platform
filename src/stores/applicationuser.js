import {observable, action} from 'mobx';
import {
  applicationuser_search,
  getApplicationuserTable,
  applicationuser_delete,
  applicationuserInitAdd,
  getApplicationuserArea,
  applicationuserSave,
  applicationuserInitEdit,
  applicationuserEditSave,
} from '../services/api.js';
import {message} from 'antd';
class Site {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable addData = {};
  @observable editData = {};
  @observable loading = false;

  @action.bound
  async getGoAdd(params) {
    const data = await applicationuserInitAdd(params);
    this.addData = data;
    return data;
  }
  @action.bound
  async getEidtData(params) {
    const data = await applicationuserInitEdit(params);
    this.editData = data;
    return data;
  }
  @action.bound
  async getAreaSonList(params) {
    const data = await getApplicationuserArea(params);
    return data.varList;
  }
  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getApplicationuserTable(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }
  @action.bound
  async search(params) {
    this.loading = true;
    const data = await applicationuser_search(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }

  @action
  async delete(params) {
    const data = await applicationuser_delete(params);
    if (data.result == 'success') {
      this.getTable(this.tableParmas);
      message.success('删除成功!');
    }
    return data;
  }
  @action.bound
  async editSave(params) {
    const data = await applicationuserEditSave(params);
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
    const data = await applicationuserSave(params);
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
