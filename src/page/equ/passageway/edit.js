import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { toJS } from "mobx"
import Cookies from "js-cookie"
import { Upload, message } from "antd"
import AlarmContent from "./alarmTable.js"
import AlarmCondition from "./alarmCondition.js"
import classnames from "classnames"
import styles from "./index.less"
import EditModal from "../../../components/EditModal"
import { downExcel } from "@/utils/tool"
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomizedForm,
} from "../../../components/FormItem"
import { Form, Button, Input, Row, Col } from "antd"
const FormItem = Form.Item

//实例
@inject("passagewayStore")
@observer
class Edit extends Component {
  constructor(props) {
    super(props)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.closeAlarmCondition = this.closeAlarmCondition.bind(this)
    this.exportTpl = this.exportTpl.bind(this)
    this.export = this.export.bind(this)
    this.import = this.import.bind(this)
    this.copeToChannel = this.copeToChannel.bind(this)
    this.copeToDev = this.copeToDev.bind(this)
    this.onAlarmCancel = this.onAlarmCancel.bind(this)
    this.state = {
      detailShow: false,
      importShow: false,
      show: false,
      isChannel: false,
    }
  }
  handleFormChange(changedFields) {
    const { handleFormChange } = this.props
    handleFormChange(changedFields)
  }
  closeAlarmCondition() {
    this.setState({
      show: false,
    })
  }
  onAlarmCancel() {
    this.setState({
      show: false,
    })
  }
  copeToDev() {
    const { passagewayStore, item, currentDevice } = this.props
    const params = {
      typeID: item.typeID,
      version: item.version,
    }
    passagewayStore.findCongenerDeviceList(params).then((data) => {
      this.setState({
        show: true,
        isChannel: false,
      })
    })
  }
  copeToChannel() {
    const { passagewayStore, currentDevice } = this.props
    const params = {
      deviceId: currentDevice,
    }
    passagewayStore.getAllDecice({}).then((data) => {
      this.setState({
        show: true,
        isChannel: true,
      })
    })
  }
  exportTpl = async () => {
    downExcel("/device_alarmCondition/downExcel")
  }
  export = async () => {
    const {
      passagewayStore: { a_tableData },
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
        alarmConditions: [],
      })
    } else {
      downExcel("/device_alarmCondition/exportExcel", {
        alarmConditions: toJS(a_tableData),
      })
    }
  }
  import() {
    $(this.upload).click()
  }
  render() {
    const {
      passagewayStore: {
        addData,
        a_tableData,
        alarmDataChange,
        detailData,
        virtualList,
      },
      fields,
      editVirtual,
      isVchannel,
      item,
      currentDevice,
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
    const newVirtualList = _.map(toJS(virtualList), (item) => {
      return {
        value: item.fid,
        name: item.channelID,
      }
    })

    const channeltypeList = _.map(toJS(data.channeltypeList), (item) => {
      return {
        value: item.F_ID,
        name: item.F_TypeName,
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
            message.success(info.file.response.Msg)
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
            rules={[
              { required: true, message: "请必须填写!" },
              {
                pattern: /^[^\u3220-\uFA29]+$/,
                message: "通道ID不能为中文!",
              },
            ]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={"通道名称"}
            name={"F_ChannelName"}
            disabled={disabled}
            rules={[{ required: true, message: "请必须填写!" }]}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={"通道类型"}
            disabled={mode === "new" ? false : true}
            name={"F_ChannelType"}
            rules={[{ required: true, message: "请必须填写!" }]}
            children={channeltypeList}
          />
          <Row className={styles["row_float"]}>
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              label={"虚拟属性"}
              disabled={
                fields.F_ChannelType.value === 5 && mode === "new"
                  ? false
                  : true
              }
              className={"cl_virtual_input"}
              name={"virtual"}
              rules={[{ required: false }]}
              children={newVirtualList}
            />
            <Button
              disabled={fields.F_ChannelType.value === 5 ? false : true}
              onClick={editVirtual}
              className={styles["edit_virtual_btn"]}
            >
              修改
            </Button>
          </Row>
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
              disabled={fields["F_StoreMode"].value === 0 ? true : disabled}
              name={"F_Threshold"}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"值倍率"}
              name={"ratio"}
              disabled={disabled}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"单位"}
              name={"F_Unit"}
              disabled={disabled}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"显示精度"}
              name={"F_ShowPrecision"}
              disabled={fields["F_ValueType"].value === 2 ? false : true}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"显示序号"}
              name={"F_ShowOrder"}
              disabled={disabled}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"解析序号"}
              name={"F_AnalyOrder"}
              disabled={disabled}
              rules={[{ required: false }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"关联通道"}
              name={"F_RelateChannelNO"}
              disabled={disabled}
              rules={[{ required: false }]}
            />
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              label={"通道状态"}
              name={"F_Status"}
              disabled={disabled}
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
            {/* <FormInput */}
            {/*   {...fields} */}
            {/*   onChange={this.handleFormChange} */}
            {/*   label={'显示样式'} */}
            {/*   name={'F_DisplayFormat'} */}
            {/*   disabled={disabled} */}
            {/*   placeholder={'请输入设备名称'} */}
            {/*   rules={[{required: false}]} */}
            {/* /> */}
            {/* <FormInput */}
            {/*   {...fields} */}
            {/*   onChange={this.handleFormChange} */}
            {/*   label={'告警延迟'} */}
            {/*   name={'F_AlarmVoiceDelay'} */}
            {/*   disabled={disabled} */}
            {/*   placeholder={'请输入设备名称'} */}
            {/*   rules={[{required: false}]} */}
            {/* /> */}
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
              <Button className={styles["copy_btn"]} onClick={this.copeToDev}>
                <i
                  className={classnames(
                    "icon iconfont icon-fuzhi",
                    styles["common_icon"]
                  )}
                />
                <span>复制到其他设备</span>
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
            width={880}
            onCancel={this.onAlarmCancel}
          >
            <AlarmCondition
              closeAlarmCondition={this.closeAlarmCondition}
              currentDevice={currentDevice}
              isChannel={this.state.isChannel}
              item={item}
            />
          </EditModal>
        </Row>
      </Form>
    )
  }
}

export default Edit
