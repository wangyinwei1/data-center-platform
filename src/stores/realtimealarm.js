import {observable, action, toJS} from 'mobx';
import {
  realtimealarm_search,
  getRealtimealarmTable,
  getRealtimealarmChildTable,
  realtimealarmChild_search,
  confirmAlarm,
  cancelAlarm,
  getAlarmDeviceList,
  dealAlarm,
  endAlarm,
  getSportTable,
  getGrandsonTable,
} from '../services/api.js';
import {message} from 'antd';
class Realtimealarme {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable c_tableData = {};
  @observable c_tableParmas = {};
  @observable g_tableData = {};
  @observable g_tableParmas = {};
  @observable s_tableData = {};
  @observable s_tableParmas = {};
  @observable loading = false;
  @observable s_loading = false;
  @observable g_loading = false;
  @observable c_loading = false;
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
    const data = await getAlarmDeviceList(params);
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
  @action
  async search(params) {
    this.loading = true;
    const data = await getAlarmDeviceList(params);
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
