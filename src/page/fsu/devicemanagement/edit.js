import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { toJS } from "mobx"
import styles from "./index.less"
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomizedForm,
} from "../../../components/FormItem"
import { Form, Button, Input, Row, Col } from "antd"
const FormItem = Form.Item

//实例
@inject("fsu_devicemanagementStore")
@Form.create()
@observer
class Edit extends Component {
  constructor(props) {
    super(props)
    this.handleFormChange = this.handleFormChange.bind(this)
  }
  componentwillunmount() {
    // this.setState({
    //   ...params,
    // });
  }
  handleFormChange(changedFields) {
    const { handleFormChange } = this.props
    handleFormChange(changedFields)
  }
  render() {
    const {
      fsu_devicemanagementStore: { roomList, fsuAddTypes, detailData },
      fields,
      mode,
    } = this.props

    let data = {}
    let disabled = false
    switch (mode) {
      case "new":
        data = roomList.Data || []

        break
      case "modify":
      case "detail":
        data = detailData.dev_belongunit || []
        mode == "detail" && (disabled = true)
        break
    }
    const devBelongunit = _.map(toJS(data || []), (item) => {
      return {
        value: item.F_RoomNO,
        name: item.F_RoomName,
      }
    })
    const fusTypeArray = _.map(toJS(fsuAddTypes), (item) => {
      return {
        value: item.typeId,
        name: item.typeName,
      }
    })
    return (
      <Form layout="inline" className={styles["edit_wrap"]}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"设备名称"}
          name={"F_Name"}
          disabled={disabled}
          rules={[{ required: true, message: "请必须填写!" }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={mode === "modify" ? true : disabled}
          label={"设备ID"}
          name={"F_SuID"}
          rules={[{ required: true, message: "请必须填写!" }]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={"设备类型"}
          disabled={
            !JSON.parse(localStorage.getItem("isAdmin")) ? true : disabled
          }
          placeholder={"请选择类型"}
          name={"F_TypeID"}
          rules={[{ required: true, message: "请必须填写!" }]}
          children={fusTypeArray}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={"设备IP"}
          name={"F_SuIP"}
          rules={[
            { required: true, message: "请必须填写!" },
            {
              pattern: /^((1\d\d|2[0-4]\d|25[0-5]|\d{1,2})\.){3}(1\d\d|2[0-4]\d|25[0-5]|\d{1,2})$/,
              message: "请填写正确的IP!",
            },
          ]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"端口"}
          disabled={disabled}
          name={"F_SuPort"}
          rules={[
            { required: true, message: "请必须填写!" },
            {
              pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
              message: "请填写正确的端口!",
            },
          ]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"用户名"}
          disabled={disabled}
          name={"F_UserName"}
          rules={[{ required: true, message: "请必须填写!" }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"密码"}
          disabled={disabled}
          name={"F_Pwd"}
          rules={[{ required: true, message: "请必须填写!" }]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={"所属机房"}
          name={"roomNO"}
          rules={[{ required: true, message: "请必须填写!" }]}
          children={devBelongunit}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"厂家信息"}
          disabled={disabled}
          name={"F_SuVendor"}
          rules={[{ required: false }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"硬件版本"}
          disabled={disabled}
          name={"F_SuHardVer"}
          rules={[{ required: false }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"软件版本"}
          disabled={disabled}
          name={"F_SuSoftVer"}
          rules={[{ required: false }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"型号"}
          disabled={disabled}
          name={"F_SuModel"}
          rules={[{ required: false }]}
        />
      </Form>
    )
  }
}

export default Edit
