import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { toJS } from "mobx"
import Table from "../../../components/Table"
import Cookies from "js-cookie"
import { message, Icon, Modal, Button, Upload } from "antd"
import styles from "./index.less"
import ConfigFileColumnData from "./ConfigFileColumn"
import EditModal from "../../../components/EditModal"
//实例
@inject("fsu_devicemanagementStore")
@observer
class ConfigFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      currentDev: {},
    }
  }
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }
  onChange = (visible, item) => {
    this.setState({ visible, currentDev: item })
    if (visible && item) {
      const { fsu_devicemanagementStore } = this.props
      fsu_devicemanagementStore.getConfigFileList({
        suID: item.suID,
        fsuTypeID: localStorage.getItem("FsuTypeID"),
      })
    }
  }

  onOk = (value) => {
    const { timingChange } = this.props
    timingChange &&
      timingChange(value ? value.format("YYYY-MM-DD HH:mm:ss") : "")
  }
  onCancel = () => {
    this.setState({ visible: false })
  }
  deleteClick = (fileItem) => {
    const { fsu_devicemanagementStore } = this.props
    const item = this.state.currentDev
    Modal.confirm({
      title: "确定要删除该配置文件",
      content: "删除之后无法恢复！",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        return new Promise((resolve, reject) => {
          const params = {
            files: fileItem.ConfigFileName,
            suID: item.suID,
            fsuTypeID: localStorage.getItem("FsuTypeID"),
          }
          fsu_devicemanagementStore.deleteConfigFiles(params).then((result) => {
            if (result) {
              fsu_devicemanagementStore.getConfigFileList({
                suID: item.suID,
                fsuTypeID: localStorage.getItem("FsuTypeID"),
              })
              resolve()
            } else {
              reject()
            }
          })
        }).catch(() => console.log("Oops errors!"))
      },
    })
  }

  render() {
    const { fsu_devicemanagementStore } = this.props
    const item = this.state.currentDev
    const { configFileList = [], getConfigFileList } = fsu_devicemanagementStore
    const configFileParams = {
      name: "file",
      headers: {
        authorization: "authorization-text",
        token: Cookies.get("token"),
      },
      action: "/collect/FSU_device/uploadConfigFile",
      multiple: true,
      data: {
        suID: item.suID,
        fsuTypeID: localStorage.getItem("FsuTypeID"),
      },
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === "done") {
          if (info.file.response && info.file.response.Result === "success") {
            message.success(`${info.file.name} 导入成功！`)
            getConfigFileList({
              suID: item.suID,
              fsuTypeID: localStorage.getItem("FsuTypeID"),
            })
          } else {
            message.error(info.file.response.Msg)
          }
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 导入失败！`)
        }
      },
    }
    const columns = ConfigFileColumnData({
      deleteClick: this.deleteClick,
      _this: this,
    })
    return (
      <EditModal
        isShow={this.state.visible}
        title={"配置文件"}
        width={670}
        onCancel={this.onCancel}
      >
        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "12px" }}>
            <Upload {...configFileParams}>
              <Button style={{ width: "auto" }}>
                <Icon type="upload" /> 上传配置文件
              </Button>
            </Upload>
          </div>
          <div className={styles["table_wrap"]}>
            <Table
              columns={columns}
              loading={fsu_devicemanagementStore.configFileLoading}
              data={configFileList}
              pagination={false}
            />
          </div>
        </div>
      </EditModal>
    )
  }
}
export default ConfigFile
