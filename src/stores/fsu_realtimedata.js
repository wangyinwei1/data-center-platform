import {observable, action} from 'mobx';
import {
  fsu_realtimedata_search,
  getFsu_realtimedataTable,
  getFsu_realtimedataChildTable,
  fsu_realtimedataChild_search,
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
    const data = await getFsu_realtimedataTable(params);
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
  @action
  async search(params) {
    this.loading = true;
    const data = await fsu_realtimedataStore_search(params);
    this.loading = true;
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
    const data = await getFsu_realtimedataChildTable(params);
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
    const data = await getFsu_realtimedataChildTable(params);
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
