import { observable, toJS, action } from "mobx"
import {
  getConfigFileList,
  deleteConfigFiles,
  sendConfigFileList,
  getFSUType,
  findSignaldic,
} from "../services/api.js"
import { message } from "antd"

class Fsuconfig {
  @observable tableData = []
  @observable tableParmas = {}
  @observable loading = false
  @observable fsuAddTypes = []
  @action.bound
  async getTable(params) {
    this.loading = true

    const data = await findSignaldic({ ...toJS(this.tableParmas), ...params })
    this.loading = false
    this.tableParmas = params
    if (data.Result === "success") {
      this.tableData = { Data: data.varList || [], ...data.pd }
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async deleteConfigFiles(params) {
    const data = await deleteConfigFiles(params)
    if (data.Result === "success") {
      message.success(data.Msg)
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async getFSUType(params) {
    const data = await getFSUType(params)
    if (data.Result == "success") {
      this.fsuAddTypes = data.Data.map((item) => {
        return { name: item.typeName, value: item.typeId }
      })
    } else {
      message.error(data.Msg)
    }
  }
  @action.bound
  async sendConfigFileList(params) {
    const data = await sendConfigFileList(params)
    if (data.Result === "success") {
      message.success(data.Msg)
      return true
    } else {
      message.error(data.Msg)
      return false
    }
  }
}

export default Fsuconfig
