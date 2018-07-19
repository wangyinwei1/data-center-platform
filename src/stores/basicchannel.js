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
  getBasicchannelTable,
  basechannelEdit,
  basechannelSave,
  basicchannel_initAdd,
  basicchannel_initEdit,
  basechannelDelete,
  getBaseAlarmConditions,
  getInitBasechannelAlarm,
  basechannelAlarmDel,
  basechannelAlarmUpd,
  basechannelAlarmAdd,
  basicchannel_toExcel,
} from '../services/api.js';
import {message} from 'antd';
class Passageway {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable a_tableParmas = {};
  @observable a_tableData = [];
  @observable loading = false;
  @observable a_loading = false;
  @observable addData = {};
  @observable detailData = {};
  @observable alarmList = [];

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getBasicchannelTable(params);
    this.loading = false;
    params.number = data.pd.showCount;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }

  @action.bound
  async alarmDataChange(data) {
    this.a_tableData = data;
  }
  @action.bound
  async getAlarmTable(params) {
    this.a_loading = true;
    const data = await getBaseAlarmConditions(params);
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
    const data = await getInitBasechannelAlarm(params);
    if (data.Result == 'success') {
      this.alarmList = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmSave(params) {
    const data = await basechannelAlarmAdd(params);
    if (data.Result == 'success') {
      this.getAlarmTable(this.a_tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmEditSave(params) {
    const data = await basechannelAlarmUpd(params);
    if (data.Result == 'success') {
      this.getAlarmTable(this.a_tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmDelete(params) {
    const data = await basechannelAlarmDel(params);
    if (data.Result == 'success') {
      this.getAlarmTable(this.a_tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async save(params) {
    const data = await basechannelSave(params);
    if (data.result == 'success') {
      message.success(data.msg);
    } else {
      message.error(data.msg);
    }
  }
  async edit(params) {
    const data = await basechannelEdit(params);
    if (data.result == 'success') {
      message.success(data.msg);
    } else {
      message.error(data.msg);
    }
  }
  async delete(params) {
    const data = await basechannelDelete(params);
    if (data.result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.msg);
    } else {
      message.error(data.msg);
    }
  }
  async toExcel(params) {
    const data = await basicchannel_toExcel(params);
  }
  @action.bound
  async initEdit(params) {
    const data = await basicchannel_initEdit(params);
    if (data.Result == 'success') {
      this.detailData = data;
      return data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async initAdd(params) {
    const data = await basicchannel_initAdd(params);
    this.addData = data;
  }
  @action
  async search(params) {
    this.loading = true;
    const data = await getBasicchannelTable(params);
    this.loading = false;
    params.number = data.pd.showCount;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }
}

export default Passageway;
