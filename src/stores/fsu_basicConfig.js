import { observable, action } from "mobx"
import { getSpTypeList, getDeviceTypeList } from "../services/api.js"
import { message } from "antd"
class Site {
  @observable tableData = {}
  @observable tableParmas = {}
  @observable loading = false
  @observable s_tableData = {}
  @observable s_tableParmas = {}
  @observable s_loading = false

  @action.bound
  async getSpTypeList(params) {
    this.s_loading = true
    const data = await getSpTypeList(params)
    this.s_loading = false
    if (data.Result === "success") {
      params.number = data.number
      params.page = data.page
      this.s_tableParmas = params
      this.s_tableData = data
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getDeviceTypeList(params) {
    this.loading = true
    const data = await getDeviceTypeList(params)
    this.loading = false
    if (data.Result === "success") {
      params.number = data.number
      params.page = data.page
      this.tableParmas = params
      this.tableData = data
    } else {
      message.error(data.Msg)
    }
  }
}

export default Site
