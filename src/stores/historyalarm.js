import {observable, action} from 'mobx';
import {
  historyalarm_search,
  getHistoryalarmTable,
  getHistoryalarmChildTable,
  historyalarmChild_search,
  getSportTable,
  getGrandsonTable,
} from '../services/api.js';
import {message} from 'antd';
class Historyalarm {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable c_tableData = {};
  @observable c_tableParmas = {};
  @observable loading = false;
  @observable c_loading = false;
  @observable g_tableData = {};
  @observable g_tableParmas = {};
  @observable s_tableData = {};
  @observable s_tableParmas = {};
  @observable s_loading = false;
  @observable g_loading = false;
  @observable c_expandedRows = [];
  @action.bound
  async c_expandedRowsChange(value) {
    this.c_expandedRows = value;
  }
  @action.bound
  async getSportTable(params) {
    this.s_loading = true;
    const data = await getSportTable(params);
    this.s_loading = false;
    if (data.Result == 'success') {
      this.s_tableParmas = params;
      this.s_tableData = data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getGrandsonTable(params) {
    this.g_loading = true;
    const data = await getGrandsonTable(params);
    this.g_loading = false;
    if (data.Result == 'success') {
      this.g_tableData = data;
    } else {
      message.error(data.Msg);
    }
  }

  @action
  async getTable(params) {
    this.loading = true;
    const data = await getHistoryalarmTable(params);
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
    const data = await historyalarm_search(params);
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
    const data = await getHistoryalarmChildTable(params);
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
    const data = await historyalarmChild_search(params);
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
