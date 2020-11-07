import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { Upload, message } from "antd"
import styles from "./index.less"
import { toJS } from "mobx"
import Toolbar from "../../../components/Toolbarnew"
import Table from "../../../components/Table"
import columnData from "./columns.js"
import DeleteModal from "../regional/delete.js"
//实例
@inject("data_dictionaryStore")
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
      fsuTypeId: JSON.parse(localStorage.getItem("FsuTypeID")),
    }
  }
  //以下级联方法
  componentDidMount() {
    const {
      data_dictionaryStore: { getTable, getFSUType },
    } = this.props
    getFSUType()
    getTable({
      number: 10,
      page: 1,
      F_TypeID: this.state.fsuTypeId || undefined,
    })
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
  onExportClick() {
    const fsuTypeId = this.state.fsuTypeId
    fsuTypeId &&
      (location.href = `/collect/fsuSignaldic/toExcel?F_TypeID=${fsuTypeId}`)
  }
  onDeleteOk() {
    const { data_dictionaryStore } = this.props

    const params = {
      files: this.state.singleLineData.ConfigFileName,
    }
    data_dictionaryStore.deleteConfigFiles(params).then(() => {
      data_dictionaryStore.getTable()
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
    const { data_dictionaryStore } = this.props
    const { fsuAddTypes = [], getTable } = data_dictionaryStore
    const tableData = toJS(data_dictionaryStore.tableData) || []
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      _this: this,
    })
    const props = {
      name: "file",
      action: "/collect/fsuSignaldic/uploadSignaldicFile",
      data: { F_TypeID: this.state.fsuTypeId },
      headers: {
        authorization: "authorization-text",
      },
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === "done") {
          if (info.file.response && info.file.response.Result === "success") {
            message.success(`${info.file.name} 导入成功！`)
            data_dictionaryStore.getTable()
          } else {
            message.error(info.file.response.Msg)
          }
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 导入失败！`)
        }
      },
    }
    const ImportButton = () => {
      let toolbar = [
        {
          type: "button",
          pos: "right",
          name: "导入",
          handleClick: () => {
            this.onImportClick()
          },
        },
        {
          type: "button",
          className: styles["export"],
          pos: "right",
          name: "导出",
          handleClick: () => {
            this.onExportClick()
          },
        },
        {
          type: "selectItem",
          pos: "left",
          name: "设备类型",
          children: fsuAddTypes || [],
          width: 200,
          defaultValue: this.state.fsuTypeId,
          labelCol: 9,
          wrapperCol: 15,
          handleChange: (value) => {
            this.setState({ fsuTypeId: value })
            const params = {
              page: 1,
              keywords: "",
              number: 10,
              F_TypeID: value,
            }
            getTable(params)
          },
        },
      ]
      return (
        <Toolbar
          modules={toolbar}
          leftSpan={18}
          className={styles["toolbar-wrap"]}
        />
      )
    }
    return (
      <div className={styles["applicationuser_wrap"]}>
        <div className={styles["applicationuser_ct"]}>
          <div className={styles["min_width"]}>
            <ImportButton />
            <div className={styles["table_wrap"]}>
              <Table
                columns={columns}
                loading={data_dictionaryStore.loading}
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