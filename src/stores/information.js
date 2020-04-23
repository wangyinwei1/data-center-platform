import { observable, action, toJS } from "mobx"
import {
  information_search,
  getInformationTable,
  information_delete,
  getRealtimeTable,
  getRealTimeCall,
  getSportTable,
  getGrandsonTable,
  getOperateList,
  getControlChannel,
  postDeviceControl,
  getDeviceAlterInfo,
  getGoAdd,
  deviceAlter,
  goFind2,
  informationSave,
  informationEditSave,
  saveConsport,
  editConsport,
  saveSun,
  delectConsport,
  delectSun,
  editSun,
  onoroff,
  batchOnoroff,
  batchDelectAll,
} from "../services/api.js"
import _ from "lodash"
import { message } from "antd"
class Information {
  @observable tableData = {}
  @observable tableParmas = {}
  @observable r_tableData = {}
  @observable r_tableParmas = {}
  @observable hl_tableData = {}
  @observable hl_tableParmas = {}
  @observable s_tableData = {}
  @observable s_tableParmas = {}
  @observable g_tableData = {}
  @observable loading = false
  @observable r_loading = false
  @observable d_loading = false
  @observable s_loading = false
  @observable g_loading = false
  @observable hl_loading = false
  @observable showIconIndex = []
  @observable deviceMenu = []
  @observable deviceData = []
  @observable currentDevice = ""
  @observable operateList = []
  @observable controlChannel = []
  @observable regulatChannel = []
  @observable addData = []
  @observable detailData = []
  @observable ztreeChild = 0
  @observable expandedRows = []
  @action.bound
  async expandedRowsChange(value) {
    this.expandedRows = value
  }

  @action.bound
  async currentDeviceChange(value) {
    this.currentDevice = value
  }

  @action.bound
  async save(params) {
    const data = await informationSave(params)
    if (data.Result == "success") {
      this.getTable(toJS(this.tableParmas))
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async onoroff(params) {
    const data = await onoroff(params)
    if (data.Result == "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async editSave(params) {
    const data = await informationEditSave(params)
    if (data.Result == "success") {
      this.getTable(toJS(this.tableParmas))
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async postDeviceControl(params) {
    const data = await postDeviceControl(params)
    if (data.Result == "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async saveConsport(params) {
    const data = await saveConsport(params)
    if (data.Result == "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async editConsport(params) {
    const data = await editConsport(params)
    if (data.Result == "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async saveSun(params) {
    const data = await saveSun(params)
    if (data.Result == "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async editSun(params) {
    const data = await editSun(params)
    if (data.Result == "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getGoAdd(params) {
    const data = await getGoAdd(params)
    this.addData = data
  }
  @action.bound
  async goFind2(params) {
    const data = await goFind2(params)
    if (data.Result == "success") {
      this.currentDevice = params.F_DeviceID
      this.detailData = data.Data
      return data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getOperateList(params) {
    const data = await getOperateList(params)
    if (data.Result == "success") {
      this.operateList = data.Data
      return true
    } else {
      message.error(data.Msg)
      return false
    }
  }
  @action.bound
  async getControlChannel(params) {
    const data = await getControlChannel(params)
    if (data.Result == "success") {
      this.currentDevice = params.F_DeviceID
      this.controlChannel = data.Data
      const channelID = data.Data[0].channelID
      params.F_ChannelID = channelID
      const isShow = await this.getOperateList(params)
      return isShow
    } else {
      message.error(data.Msg)
      return false
    }
  }
  @action.bound
  async deviceAlter(params) {
    const data = await deviceAlter(params)
    if (data.Result == "success") {
      message.success("请求成功！")
      return true
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getDeviceAlterInfo(params) {
    const data = await getDeviceAlterInfo(params)
    if (data.Result == "success") {
      this.currentDevice = params.deviceId
      this.regulatChannel = data.Data || []
      return true
    } else {
      message.error(data.Msg)
      return false
    }
  }

  @action.bound
  async getTable(params) {
    this.loading = true
    const data = await getInformationTable(params)
    this.loading = false
    this.ztreeChild = params.ztreeChild
    if (data.Result == "success") {
      params.number = data.Data.number
      params.page = data.Data.page
      const showIconIndex = _.map(data.Data.varList, (item, index) => {
        if (item.isConcentrator === 1) {
          return index
        } else {
          return false
        }
      }).filter((item) => {
        return item || item === 0
      })

      this.showIconIndex = showIconIndex
      this.tableParmas = params
      this.tableData = data.Data
      this.expandedRows = []
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async fsuDelectAll(params) {
    const data = await batchDelectAll(params)
    if (data.Result == "success") {
      this.getTable(toJS(this.tableParmas))
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async fsuDevsEnabledOnOff(params) {
    const data = await batchOnoroff(params)
    if (data.Result == "success") {
      this.getTable(toJS(this.tableParmas))
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action
  async search(params) {
    this.loading = true
    const data = await information_search(params)
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
  async getRealtimeTable(params) {
    this.r_loading = true
    const data = await getRealtimeTable(params)
    this.r_loading = false
    if (data.Result == "success") {
      params.page = data.Data.page
      params.number = data.Data.number
      this.r_tableParmas = params
      this.r_tableData = data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getSportTable(params) {
    this.s_loading = true
    const data = await getSportTable(params)
    this.s_loading = false
    if (data.Result == "success") {
      this.currentDevice = params.F_DeviceID
      this.s_tableParmas = params
      this.s_tableData = data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getByDevice(params) {
    const data = await getByDevice(params)
    this.currentDevice = params.F_DeviceID
    this.deviceMenu = data.varList
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
  async getRealTimeCall(params) {
    this.r_loading = true
    const data = await getRealTimeCall(params)
    this.r_loading = false
    if (data.Result == "success") {
      params.page = data.Data.page
      this.r_tableParmas = params
      this.r_tableData = data.Data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async realtimeSearch(params) {
    this.r_loading = true
    const data = await getRealtimeTable(params)
    this.r_loading = false
    if (data.Result == "success") {
      params.number = data.Data.number
      params.page = data.Data.page
      this.r_tableParmas = params
      this.r_tableData = data.Data
    } else {
      message.error(data.Msg)
    }
  }

  @action
  async delete(params) {
    const data = await information_delete(params)
    if (data.Result == "success") {
      this.getTable(this.tableParmas)
      message.success("删除成功!")
    } else {
      message.error(data.Msg)
    }
    return data
  }
  @action
  async delectConsport(params) {
    const data = await delectConsport(params)
    if (data.Result == "success") {
      message.success("删除成功!")
    } else {
      message.error(data.Msg)
    }
    return data
  }
  @action
  async delectSun(params) {
    const data = await delectSun(params)
    if (data.Result == "success") {
      message.success("删除成功!")
    }
    return data
  }
}

export default Information
