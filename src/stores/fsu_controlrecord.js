import {observable, action} from 'mobx';
import {getFsu_controlrecordTable, getFSUType} from '../services/api.js';
import {message} from 'antd';
class fsuControlrecord {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable c_tableData = {};
  @observable c_tableParmas = {};
  @observable loading = false;
  @observable c_loading = false;

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getFsu_controlrecordTable(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getFSUType(params) {
    const data = await getFSUType(params);
    if (data.result == 'success') {
      this.fsuAddTypes = data.data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async search(params) {
    this.loading = true;
    const data = await getFsu_controlrecordTable(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
}

export default fsuControlrecord;
