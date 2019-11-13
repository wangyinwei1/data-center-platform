import {observable, action, toJS} from 'mobx';
import {
  fsu_realtimealarm_search,
  getFsu_realtimealarmTable,
  getFsu_realtimealarmChildTable,
  fsu_realtimealarmChild_search,
  fsuDealAlarm,
  fsuEndAlarm,
  getZone,
  fsuCancelAlarm,
  getFSUType,
  fsuConfirmAlarm,
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

  @action.bound
  async getZone(params) {
    const data = await getZone(params);
    return data.areaTree || [];
  }
  @action.bound
  async getFSUType(params) {
    const data = await getFSUType(params);
    if (data.Result == 'success') {
      this.fsuAddTypes = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async confirmAlarm(params) {
    const data = await fsuConfirmAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async cancelAlarm(params) {
    const data = await fsuCancelAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async dealAlarm(params) {
    const data = await fsuDealAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getChildTable(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async endAlarm(params) {
    const data = await fsuEndAlarm(params);
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
    const data = await getFsu_realtimealarmTable(params);
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
    const data = await fsu_realtimealarm_search(params);
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
    const data = await getFsu_realtimealarmChildTable(params);
    this.c_loading = false;
    if (data.Result == 'success') {
      this.currentDevice = params.ztreeChild;
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
    const data = await getFsu_realtimealarmChildTable(params);
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
