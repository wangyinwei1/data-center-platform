import {observable, action} from 'mobx';
import {
  fsu_historicaldata_search,
  getFsu_historicaldataTable,
  getFsu_historicaldataChildTable,
  fsu_historicaldataChild_search,
  getFSUType,
} from '../services/api.js';
import {message} from 'antd';
class Historyalarm {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable c_tableData = {};
  @observable c_tableParmas = {};
  @observable loading = false;
  @observable c_loading = false;
  @observable currentDevice = '';

  @action
  async getTable(params) {
    this.loading = true;
    const data = await getFsu_historicaldataTable(params);
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
  @action
  async search(params) {
    this.loading = true;
    const data = await fsu_historicaldata_search(params);
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
  async getChildTable(params) {
    this.c_loading = true;
    const data = await getFsu_historicaldataChildTable(params);
    this.c_loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.c_tableParmas = params;
      this.c_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async childSearch(params) {
    this.c_loading = true;
    const data = await fsu_historicaldataChild_search(params);
    this.c_loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.c_tableParmas = params;
      this.c_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
}

export default Historyalarm;
