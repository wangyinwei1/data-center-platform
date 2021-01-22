import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { toJS } from "mobx"
import { Upload, message } from "antd"
import FileSaver from "file-saver"
import AlarmContent from "./alarmTable.js"
import AlarmCondition from "./alarmCondition.js"
import classnames from "classnames"
import Cookies from "js-cookie"
import EditModal from "../../../components/EditModal"
import styles from "./index.less"
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomizedForm,
} from "../../../components/FormItem"
import { Form, Button, Input, Row, Col } from "antd"
import { downExcel } from "@/utils/tool"
const FormItem = Form.Item

//实例
@inject("basicchannelStore")
@observer
class Edit extends Component {
  constructor(props) {
    super(props)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.exportTpl = this.exportTpl.bind(this)
    this.export = this.export.bind(this)
    this.import = this.import.bind(this)
    this.copeToChannel = this.copeToChannel.bind(this)
    this.closeAlarmCondition = this.closeAlarmCondition.bind(this)
    this.state = {
      detailShow: false,
      show: false,
    }
  }
  closeAlarmCondition() {
    this.setState({
      show: false,
    })
  }
  handleFormChange(changedFields) {
    const { handleFormChange } = this.props
    handleFormChange(changedFields)
  }
  exportTpl() {
    downExcel("/device_alarmCondition/downExcel")
  }
  copeToChannel() {
    const { basicchannelStore, currentDevice } = this.props
    const params = {
      version: currentDevice.F_Version,
      deviceType: currentDevice.F_DeviceType,
    }
    basicchannelStore.base_findDeviceChannel(params).then(() => {
      this.setState({
        show: true,
      })
    })
  }
  export() {
    const {
      basicchannelStore: { a_tableData },
    } = this.props
    const record = a_tableData
    if (
      record.length === 1 &&
      !record[0].conType &&
      !record[0].msgID &&
      !record[0].condition &&
      (!record[0].alarmDelay || record[0].alarmDelay === 0)
    ) {
      downExcel("/device_alarmCondition/exportExcel", {
        alarmConditions: encodeURIComponent(JSON.stringify([])),
      })
    } else {
      downExcel("/device_alarmCondition/exportExcel?alarmConditions=", {
        alarmConditions: encodeURIComponent(JSON.stringify(toJS(a_tableData))),
      })
    }
  }
  import() {
    $(this.upload).click()
  }
  render() {
    const {
      basicchannelStore: {
        addData,
        a_tableData,
        alarmDataChange,
        virtualList,
        detailData,
      },
      fields,
      isVchannel,
      valueTypeClick,
      currentDevice,
      addVirtual,
      mode,
    } = this.props

    let data = {}
    let disabled = false
    switch (mode) {
      case "new":
        data = addData
        break
      case "modify":
      case "detail":
        data = detailData
        mode == "detail" && (disabled = true)
        break
    }

    const channeltypeList = _.map(toJS(data.channeltypeList), (item) => {
      return {
        value: item.F_ID,
        name: item.F_TypeName,
      }
    })
    const typeList = _.map(toJS(data.typeList), (item) => {
      return {
        value: `${item.F_TypeID}_${item.F_Version}`,
        name: item.F_TypeName,
      }
    })
    const newVirtualList = _.map(toJS(virtualList), (item) => {
      return {
        value: item.fid,
        name: item.channelID,
      }
    })
    const props = {
      name: "file",
      action: "/collect/device_alarmCondition/importWeb",
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
            // message.success(`${info.file.name} 导入成功！`);
            const importData = info.file.response.Data
            const record = toJS(a_tableData)
            let data = []
            if (
              record.length === 1 &&
              !record[0].conType &&
              !record[0].msgID &&
              !record[0].condition &&
              (!record[0].alarmDelay || record[0].alarmDelay === 0)
            ) {
              data = importData
            } else {
              data = _.unionWith(record, importData, _.isEqual)
            }
            //导入数据合并
            alarmDataChange(data).then(() => {
              message.success("导入成功！")
            })
          } else {
            message.error(info.file.response.Msg)
          }
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 导入失败！`)
        }
      },
    }
    return (
      <Form layout="inline" className={styles["edit_wrap"]}>
        <Row>
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={"通道ID"}
            name={"F_ChannelID"}
            disabled={fields.virtual.value ? true : disabled}
            placeholder={"请输入设备名称"}
            rules={[{ required: true, message: "请必须填写!" }]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={"通道名称"}
            name={"F_ChannelName"}
            disabled={disabled}
            placeholder={"请输入通道名称"}
            rules={[{ required: true, message: "请必须填写!" }]}
          />
          {/* <FormSelect */}
          {/*   {...fields} */}
          {/*   onChange={this.handleFormChange} */}
          {/*   disabled={disabled} */}
          {/*   label={'设备类型'} */}
          {/*   name={'F_DeviceType'} */}
          {/*   rules={[{required: true, message: '请必须填写!'}]} */}
          {/*   children={typeList} */}
          {/* /> */}
          <Row>
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              disabled={disabled}
              label={"值类型"}
              name={"F_ValueType"}
              rules={[{ required: true, message: "请必须填写!" }]}
              children={[
                { value: 1, name: "整型" },
                { value: 2, name: "浮点" },
                { value: 3, name: "文本" },
                { value: 4, name: "枚举" },
              ]}
            />
            <Button
              disabled={
                fields.F_ValueType.value === 4 && mode === "modify"
                  ? false
                  : true
              }
              className={styles["valuetype_btn"]}
              onClick={valueTypeClick}
            >
              值配置
            </Button>
          </Row>
          <Row>
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              label={"通道类型"}
              disabled={isVchannel ? true : disabled}
              placeholder={"请选择设备类型"}
              name={"F_ChannelType"}
              rules={[{ required: true, message: "请必须填写!" }]}
              children={channeltypeList}
            />
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              label={"虚拟属性"}
              disabled={
                !isVchannel &&
                fields.F_ChannelType.value === 5 &&
                mode !== "detail"
                  ? false
                  : true
              }
              name={"virtual"}
              rules={[{ required: false }]}
              children={newVirtualList}
            />
            <Button
              disabled={
                !isVchannel &&
                fields.F_ChannelType.value === 5 &&
                mode !== "detail"
                  ? false
                  : true
              }
              onClick={addVirtual}
              className={styles["add_virtual_btn"]}
            >
              新增虚拟属性
            </Button>
          </Row>
        </Row>
        <Row className={styles["sub_title"]}>
          <i
            className={classnames(
              styles["expand_icon"],
              !this.state.detailShow
                ? styles["row_collapsed"]
                : styles["row_expanded"]
            )}
            onClick={() => {
              this.setState({
                detailShow: !this.state.detailShow,
              })
            }}
          />
          <span>详细信息(选填):</span>
        </Row>
        {this.state.detailShow && (
          <Row>
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              label={"保存模式"}
              name={"F_StoreMode"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
              children={[
                { value: 0, name: "无条件保存" },
                { value: 1, name: "变动值" },
                { value: 2, name: "变动率" },
              ]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"阈值"}
              name={"F_Threshold"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"值倍率"}
              name={"F_Ratio"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"单位"}
              name={"F_Unit"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"显示精度"}
              name={"F_ShowPrecision"}
              disabled={fields["F_ValueType"].value === 2 ? false : true}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"显示序号"}
              name={"F_ShowOrder"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"解析序号"}
              name={"F_AnalyOrder"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"关联通道"}
              name={"F_RelateChannelNO"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              label={"通道状态"}
              name={"F_Status"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
              children={[
                { name: "显示", value: 0 },
                { name: "不显示", value: 1 },
              ]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"通道描述"}
              name={"F_ValueDescription"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"保存周期"}
              name={"F_StorePeriod"}
              disabled={disabled}
              placeholder={"请输入设备名称"}
              rules={[{ required: false }]}
            />
          </Row>
        )}
        <Row className={styles["line"]} />
        {mode !== "new" && (
          <Row className={styles["sub_title"]}>
            <span>告警条件:</span>
            <div className={styles["alarm_operation"]}>
              <Button className={styles["tpl_btn"]} onClick={this.exportTpl}>
                <i
                  className={classnames(
                    "icon iconfont icon-xiazai",
                    styles["common_icon"]
                  )}
                />
                <span>下载模板</span>
              </Button>
              <Button
                className={styles["copy_btn"]}
                onClick={this.copeToChannel}
              >
                <i
                  className={classnames(
                    "icon iconfont icon-fuzhi",
                    styles["common_icon"]
                  )}
                />
                <span>复制到其他通道</span>
              </Button>
              <Button className={styles["import_btn"]} onClick={this.import}>
                <i
                  className={classnames(
                    "icon iconfont icon-daoru",
                    styles["common_icon"]
                  )}
                />
                <span>导入</span>
              </Button>
              <Button className={styles["export_btn"]} onClick={this.export}>
                <i
                  className={classnames(
                    "icon iconfont icon-daochu",
                    styles["common_icon"]
                  )}
                />
                <span>导出</span>
              </Button>
            </div>
          </Row>
        )}
        <Row>{mode !== "new" && <AlarmContent mode={mode} />}</Row>
        <Row>
          <Upload {...props}>
            <span
              style={{ display: "none" }}
              ref={(c) => {
                this.upload = c
              }}
            />
          </Upload>
          <EditModal
            isShow={this.state.show}
            title={"告警复制"}
            width={670}
            onCancel={this.closeAlarmCondition}
          >
            <AlarmCondition
              closeAlarmCondition={this.closeAlarmCondition}
              currentDevice={currentDevice}
            />
          </EditModal>
        </Row>
      </Form>
    )
  }
}

export default Edit
