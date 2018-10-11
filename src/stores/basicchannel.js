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
  batchBaseAlarmConditionAdd,
  getVirtualChannelList,
  getValuePropertyList,
  batchValueMeanAdd,
  getVchannelAdd,
  queryChannelList,
  vchannelSave,
} from '../services/api.js';
import {message} from 'antd';
class Passageway {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable a_tableParmas = {};
  @observable a_tableData = [];
  @observable v_tableParmas = {};
  @observable v_tableData = [];
  @observable v_loading = false;
  @observable loading = false;
  @observable a_loading = false;
  @observable addData = {};
  @observable virtualData = {};
  @observable detailData = {};
  @observable alarmList = [];
  @observable virtualList = [];
  @observable channelList = [];

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getBasicchannelTable(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }

  @action.bound
  async alarmDataChange(data) {
    this.a_tableData = data;
  }
  @action.bound
  async valueTypeChange(data) {
    this.v_tableData = data;
  }
  @action.bound
  async getGoAdd(params) {
    const data = await getVchannelAdd(params);
    this.queryChannelList({
      F_TypeID: this.tableParmas.F_TypeID,
      F_Version: this.tableParmas.F_Version,
      keywords: '',
    });
    this.virtualData = data;
    return data;
  }
  @action.bound
  async queryChannelList(params) {
    const data = await queryChannelList(params);
    this.channelList = data;
    return data;
  }
  @action.bound
  async getValuePropertyList(params) {
    this.v_loading = true;
    const data = await getValuePropertyList(params);
    this.v_loading = true;
    if (data.Result == 'success') {
      this.v_tableParmas = params;
      this.v_tableData = data.Data[0]
        ? data.Data
        : [
            {
              myFid: new Date().getTime(),
              value: '',
              valueMean: '',
              newAddRow: true,
            },
          ];
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getAlarmTable(params, detail) {
    this.a_loading = true;
    const data = await getBaseAlarmConditions(params);
    if (data.Result == 'success') {
      this.a_loading = false;
      this.getAlarmList();

      this.a_tableParmas = params;
      this.a_tableData = data.Data[0]
        ? data.Data
        : detail
          ? []
          : [
              {
                myConID: new Date().getTime(),
                conType: undefined,
                msgID: undefined,
                condition: '',
                alarmMsg: '',
                newAddRow: true,
                //告警延迟
                alarmDelay: 0,
              },
            ];
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
  async getVirtualList(params) {
    const data = await getVirtualChannelList(params);
    if (data.Result == 'success') {
      this.virtualList = data.Data;
      return data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async valueMeanSave(params) {
    const data = await batchValueMeanAdd(params);
    if (data.Result == 'success') {
      this.getValuePropertyList(this.v_tableParmas);
      message.success(data.Msg);
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
  async virtualSave(params) {
    const data = await vchannelSave(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
    return data;
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
  async alarmBatchSave(params) {
    const data = await batchBaseAlarmConditionAdd(params);
    if (data.Result == 'success') {
      return true;
    } else {
      message.error(data.Msg);
      return false;
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
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }
}

export default Passageway;
