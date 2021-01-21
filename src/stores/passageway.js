import { observable, action } from "mobx"
import {
  passageway_search,
  getPassagewayTable,
  findCongenerDeviceList,
  getPassagewayChildTable,
  passagewayChild_search,
  initAdd,
  getDeviceChannelDownExcel,
  getBasicchannelTable,
  passageway_save,
  passageway_edit,
  copyAlarmCondition,
  copyAlarmCondition2,
  passageway_initEdit,
  passageway_delete,
  findDeviceChannel,
  getInitAlarmConditionsAdd,
  getAlarmTable,
  batchDeviceAlarmConditionAdd,
  alarmConditionDel,
  alarmConditionAdd,
  alarmConditionUpd,
  passageway_virtualList,
  passageway_getVirtual,
  getSportTable,
  getGrandsonTable,
  passageway_getDev,
  vchannel_edit,
  allDeciceList,
} from "../services/api.js"
import { message } from "antd"
class Passageway {
  @observable tableData = {}
  @observable tableParmas = {}
  @observable a_tableParmas = {}
  @observable c_tableData = {}
  @observable a_tableData = []
  @observable loading = false
  @observable c_loading = false
  @observable a_loading = false
  @observable c_tableParmas = {}
  @observable addData = {}
  @observable detailData = {}
  @observable alarmList = []
  @observable virtualList = []
  @observable editVirtualData = {}
  @observable virtualDevList = []
  @observable g_tableData = {}
  @observable typeChannelList = []
  @observable g_tableParmas = {}
  @observable s_tableData = {}
  @observable s_tableParmas = {}
  @observable devChannel = []
  @observable s_loading = false
  @observable allDeciceList = []
  @observable allCongenerDevList = []
  @observable g_loading = false
  @observable c_expandedRows = []
  @action.bound
  async c_expandedRowsChange(value) {
    this.c_expandedRows = value
  }
  @action.bound
  async getDeviceChannelDownExcel(params) {
    const data = await getDeviceChannelDownExcel(params)
    return data
    // if (data.Result == 'success') {
    //   this.s_tableParmas = params;
    //   this.s_tableData = data;
    // } else {
    //   message.error(data.Msg);
    // }
  }
  @action.bound
  async getSportTable(params) {
    this.s_loading = true
    const data = await getSportTable(params)
    this.s_loading = false
    if (data.Result == "success") {
      this.s_tableParmas = params
      this.s_tableData = data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getGrandsonTable(params) {
    this.g_loading = true
    const data = await getGrandsonTable(params)
    this.g_loading = false
    if (data.Result == "success") {
      this.g_tableData = data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getTable(params) {
    this.loading = true
    const data = await getPassagewayTable(params)
    this.loading = false
    if (data.Result == "success") {
      params.number = data.Data.number
      params.page = data.Data.page
      this.tableParmas = params
      this.tableData = data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getAllDecice(params) {
    const data = await allDeciceList(params)
    if (data.Result == "success") {
      this.allDeciceList = data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async findCongenerDeviceList(params) {
    const data = await findCongenerDeviceList(params)
    if (data.Result == "success") {
      this.allCongenerDevList = data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getBasicchannelTable(params) {
    const data = await getBasicchannelTable(params)
    this.typeChannelList = data.varList
  }

  @action.bound
  async getEditVirtual(params) {
    const data = await passageway_getVirtual(params)
    // const data = {
    //   Data: {
    //     calculateType: 1,
    //     channelID: 'Vriqi',
    //     deviceType: 2,
    //     expression: '{0}-{1}-{2}',
    //     fid: 93,
    //     relateChannelID: '2000E,2000F,20010',
    //     relateChannelList: [
    //       {
    //         relateChannelID: '2000E',
    //         relateChannelName: '年份',
    //       },
    //       {
    //         relateChannelID: '2000F',
    //         relateChannelName: '月份',
    //       },
    //       {
    //         relateChannelID: '20010',
    //         relateChannelName: '日期',
    //       },
    //     ],
    //     relateChannelName: '年份,月份,日期',
    //     relatedevList: [],
    //     version: 11,
    //   },
    //   Msg: '',
    //   Result: 'success',
    // };
    if (data.Result == "success") {
      await this.getVirtualDevList({
        typeID: params.deviceType,
        version: params.version,
      })
      this.editVirtualData = data.Data
      return data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async findDeviceChannel(params) {
    const data = await findDeviceChannel(params)
    if (data.Result == "success") {
      this.devChannel = data.channels
      return data.channels
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async copyAlarmCondition(params, isChannel) {
    const data = isChannel
      ? await copyAlarmCondition(params)
      : await copyAlarmCondition2(params)
    if (data.Result == "success") {
      message.success(data.Msg)
      return true
    } else {
      message.error(data.Msg)
      return false
    }
  }
  @action.bound
  async getVirtualDevList(params) {
    const data = await passageway_getDev(params)
    if (data.Result == "success") {
      this.virtualDevList = data.Data
      return data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async alarmDataChange(data) {
    this.a_tableData = data
  }
  @action.bound
  async getAlarmTable(params) {
    this.a_loading = true
    const data = await getAlarmTable(params)
    if (data.Result == "success") {
      this.a_loading = false
      this.getAlarmList()
      this.a_tableParmas = params
      //没有数据默认给一条数据
      this.a_tableData = data.Data[0]
        ? data.Data
        : [
            {
              myConID: new Date().getTime(),
              conType: undefined,
              msgID: undefined,
              condition: "",
              alarmMsg: "",
              newAddRow: true,
              //告警延迟
              alarmDelay: 0,
            },
          ]
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getAlarmList(params) {
    const data = await getInitAlarmConditionsAdd(params)
    if (data.Result == "success") {
      this.alarmList = data.Data
      return data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async alarmSave(params) {
    const data = await alarmConditionAdd(params)
    if (data.Result == "success") {
      this.getAlarmTable(this.a_tableParmas)
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getVirtualList(params) {
    const data = await passageway_virtualList(params)
    if (data.Result == "success") {
      this.virtualList = data.Data
      return data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async alarmBatchSave(params) {
    const data = await batchDeviceAlarmConditionAdd(params)
    if (data.Result == "success") {
      return true
    } else {
      message.error(data.Msg)
      return false
    }
  }
  @action.bound
  async alarmEditSave(params) {
    const data = await alarmConditionUpd(params)
    if (data.Result == "success") {
      this.getAlarmTable(this.a_tableParmas)
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async vchannelEdit(params) {
    const data = await vchannel_edit(params)
    if (data.Result == "success") {
      message.success(data.Msg)
      return data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async alarmDelete(params) {
    const data = await alarmConditionDel(params)
    if (data.Result == "success") {
      this.getAlarmTable(this.a_tableParmas)
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async save(params) {
    const data = await passageway_save(params)
    if (data.Result == "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  async edit(params) {
    const data = await passageway_edit(params)
    if (data.Result == "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  async delete(params) {
    const data = await passageway_delete(params)
    if (data.Result == "success") {
      this.getChildTable(this.c_tableParmas)
      message.success("删除成功!")
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async initEdit(params) {
    const data = await passageway_initEdit(params)
    if (data.Result == "success") {
      this.detailData = data.Data
      return data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async initAdd(params) {
    const data = await initAdd(params)
    this.addData = data
  }
  @action
  async search(params) {
    this.loading = true
    const data = await passageway_search(params)
    if (data.Result == "success") {
      this.loading = false
      params.number = data.Data.number
      params.page = data.Data.page
      this.tableParmas = params
      this.tableData = data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getChildTable(params) {
    this.c_loading = true
    const data = await getPassagewayChildTable(params)
    if (data.Result == "success") {
      this.c_loading = false
      params.number = data.Data.number
      params.page = data.Data.page
      this.c_tableParmas = params
      this.c_tableData = data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async childSearch(params) {
    this.c_loading = true
    const data = await passagewayChild_search(params)
    if (data.Result == "success") {
      this.c_loading = false
      params.number = data.Data.number
      params.page = data.Data.page
      this.c_tableParmas = params
      this.c_tableData = data.Data
    } else {
      message.error(data.Msg)
    }
  }
}

export default Passageway
