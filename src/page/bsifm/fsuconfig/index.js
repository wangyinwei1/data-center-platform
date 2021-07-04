import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { Upload, message } from "antd"
import styles from "./index.less"
import Cookies from "js-cookie"
import { toJS } from "mobx"
import Toolbar from "../../../components/Toolbar"
import Table from "../../../components/Table"
import columnData from "./columns.js"

import DeleteModal from "../regional/delete.js"
//实例
@inject("fsuconfigStore")
@observer
class Site extends Component {
  constructor(props) {
    super(props)
    this.onImportClick = this.onImportClick.bind(this)
    this.deleteClick = this.deleteClick.bind(this)
    this.onDeleteCancel = this.onDeleteCancel.bind(this)
    this.onDeleteOk = this.onDeleteOk.bind(this)
    this.state = {
      deleteShow: false,
      singleLineData: {},
    }
  }
  //以下级联方法
  componentDidMount() {
    const {
      fsuconfigStore: { getTable },
    } = this.props
    getTable()
  }
  deleteClick(item) {
    this.setState({
      deleteShow: true,
      singleLineData: item,
    })
  }
  onImportClick() {
    $(this.upload).click()
  }
  onDeleteOk() {
    const { fsuconfigStore } = this.props

    const params = {
      files: this.state.singleLineData.ConfigFileName,
    }
    fsuconfigStore.deleteConfigFiles(params).then(() => {
      fsuconfigStore.getTable()
    })
    this.setState({
      deleteShow: false,
    })
  }
  onDeleteCancel() {
    this.setState({
      deleteShow: false,
    })
  }

  render() {
    const { fsuconfigStore } = this.props
    const tableData = toJS(fsuconfigStore.tableData) || []
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      _this: this,
    })

    const props = {
      name: "file",
      action: "/collect//FSU_device/uploadConfigFile",
      headers: {
        authorization: "authorization-text",
        token: Cookies.get("token"),
      },
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === "done") {
          if (info.file.response && info.file.response.Result === "success") {
            message.success(`${info.file.name} 导入成功！`)
            fsuconfigStore.getTable()
          } else {
            message.error(info.file.response.Msg)
          }
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 导入失败！`)
        }
      },
    }
    return (
      <div className={styles["applicationuser_wrap"]}>
        <div className={styles["applicationuser_ct"]}>
          <div className={styles["min_width"]}>
            <Toolbar
              closeAdd={true}
              showValue={"upload"}
              onImportClick={this.onImportClick}
            />
            <div className={styles["table_wrap"]}>
              <Table
                columns={columns}
                loading={fsuconfigStore.loading}
                data={tableData}
                pagination={false}
              />
            </div>
          </div>
        </div>
        <DeleteModal
          isShow={this.state.deleteShow}
          hintContent={"确定要删除该FSU配置文件吗?"}
          onOk={this.onDeleteOk}
          onCancel={this.onDeleteCancel}
        />
        <Upload {...props}>
          <span
            style={{ display: "none" }}
            ref={(c) => {
              this.upload = c
            }}
          />
        </Upload>
      </div>
    )
  }
}

export default Site
