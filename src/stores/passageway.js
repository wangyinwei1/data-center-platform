import {observable, action} from 'mobx';
import {
  passageway_search,
  getPassagewayTable,
  getPassagewayChildTable,
  passagewayChild_search,
  initAdd,
  passageway_save,
  passageway_edit,
  passageway_initEdit,
  passageway_delete,
  getInitAlarmConditionsAdd,
  getAlarmTable,
  alarmConditionDel,
  alarmConditionAdd,
  alarmConditionUpd,
} from '../services/api.js';
import {message} from 'antd';
class Passageway {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable a_tableParmas = {};
  @observable c_tableData = {};
  @observable a_tableData = [];
  @observable loading = false;
  @observable c_loading = false;
  @observable a_loading = false;
  @observable c_tableParmas = {};
  @observable addData = {};
  @observable detailData = {};
  @observable alarmList = [];

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getPassagewayTable(params);
    if (data.Result == 'success') {
      this.loading = false;
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async alarmDataChange(data) {
    this.a_tableData = data;
  }
  @action.bound
  async getAlarmTable(params) {
    this.a_loading = true;
    const data = await getAlarmTable(params);
    if (data.Result == 'success') {
      this.a_loading = false;
      this.getAlarmList();
      this.a_tableParmas = params;
      this.a_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getAlarmList(params) {
    const data = await getInitAlarmConditionsAdd(params);
    if (data.Result == 'success') {
      this.alarmList = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmSave(params) {
    const data = await alarmConditionAdd(params);
    if (data.Result == 'success') {
      this.getAlarmTable(this.a_tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmEditSave(params) {
    const data = await alarmConditionUpd(params);
    if (data.Result == 'success') {
      this.getAlarmTable(this.a_tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmDelete(params) {
    const data = await alarmConditionDel(params);
    if (data.Result == 'success') {
      this.getAlarmTable(this.a_tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async save(params) {
    const data = await passageway_save(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  async edit(params) {
    const data = await passageway_edit(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  async delete(params) {
    const data = await passageway_delete(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async initEdit(params) {
    const data = await passageway_initEdit(params);
    if (data.Result == 'success') {
      this.detailData = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async initAdd(params) {
    const data = await initAdd(params);
    this.addData = data;
  }
  @action
  async search(params) {
    this.loading = true;
    const data = await passageway_search(params);
    if (data.Result == 'success') {
      this.loading = false;
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
    const data = await getPassagewayChildTable(params);
    if (data.Result == 'success') {
      this.c_loading = false;
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
    const data = await passagewayChild_search(params);
    if (data.Result == 'success') {
      this.c_loading = false;
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.c_tableParmas = params;
      this.c_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
}

export default Passageway;
