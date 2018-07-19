import {observable, action, toJS} from 'mobx';
import {
  realtimealarm_search,
  getRealtimealarmTable,
  getRealtimealarmChildTable,
  realtimealarmChild_search,
  confirmAlarm,
  cancelAlarm,
  dealAlarm,
  endAlarm,
} from '../services/api.js';
import {message} from 'antd';
class Realtimealarme {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable c_tableData = {};
  @observable c_tableParmas = {};
  @observable loading = false;
  @observable c_loading = false;
  @action.bound
  async confirmAlarm(params) {
    const data = await confirmAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async cancelAlarm(params) {
    const data = await cancelAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async dealAlarm(params) {
    const data = await dealAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async endAlarm(params) {
    const data = await endAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getRealtimealarmTable(params);
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
  async getChildTable(params, notOnce) {
    this.c_loading = true;
    const data = await getRealtimealarmChildTable(params);
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
    const data = await realtimealarmChild_search(params);
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
  @action
  async search(params) {
    this.loading = true;
    const data = await realtimealarm_search(params);
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

export default Realtimealarme;
