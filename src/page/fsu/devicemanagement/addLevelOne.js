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
@observer
class AddChild extends Component {
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
      fields,
      mode,
      fsu_devicemanagementStore: { deviceTypes, deviceSysTypes },
    } = this.props
    let disabled = false
    mode == "detail" && (disabled = true)
    const fsuDeviceSysTypes = _.map(toJS(deviceSysTypes), (item) => {
      return {
        name: item.typeName,
        value: item.deviceType,
      }
    })

    const fsuDeviceTypes = _.map(toJS(deviceTypes), (item) => {
      return {
        name: item.typeName,
        value: item.deviceType,
      }
    })
    const fsuTypeId = JSON.parse(localStorage.getItem("FsuTypeID"))
    return (
      <Form layout="inline" className={styles["edit_wrap"]}>
        <div>
          <FormRadio
            {...fields}
            onChange={this.handleFormChange}
            onValuesChange={(value) => {
              if (value.hasOwnProperty("dsType")) {
                const {
                  fsu_devicemanagementStore: { getDeviceTypes },
                } = this.props
                const fsuTypeId = JSON.parse(localStorage.getItem("FsuTypeID"))
                getDeviceTypes({
                  fsuTypeId,
                  dsType: value["dsType"],
                })
              }
            }}
            label={"新增类型"}
            disabled={disabled}
            name={"dsType"}
            rules={[{ required: true, message: "请必须填写!" }]}
            children={[
              { value: 1, name: "子设备" },
              { value: 2, name: "系统" },
            ]}
          />
        </div>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"设备名称"}
          disabled={disabled}
          name={"deviceName"}
          rules={[{ required: true, message: "请必须填写!" }]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          visiable={fsuTypeId !== 3}
          label={"设备类型"}
          disabled={mode === "modify" ? true : disabled}
          placeholder={"请选择设备类型"}
          name={"deviceSubType"}
          rules={[{ required: true, message: "请必须填写!" }]}
          children={fsuDeviceTypes}
        />
        {JSON.parse(localStorage.getItem("FsuTypeID")) === 3 && (
          <Row className={styles["type3_wrap"]}>
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              label={"设备类型"}
              visiable={fields.dsType.value === 0}
              disabled={disabled}
              placeholder={"请选择设备类型"}
              name={"deviceSubType"}
              rules={[{ required: true, message: "请必须填写!" }]}
              children={fsuDeviceTypes}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"机房名称"}
              disabled={disabled}
              name={"roomName"}
              rules={[{ required: false, message: "请必须填写!" }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"模型"}
              disabled={disabled}
              name={"model"}
              rules={[{ required: false, message: "请必须填写!" }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"品牌"}
              disabled={disabled}
              name={"brand"}
              rules={[{ required: false, message: "请必须填写!" }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"额定功率"}
              disabled={disabled}
              name={"ratedCapacity"}
              rules={[{ required: false, message: "请必须填写!" }]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={"设备描述"}
              disabled={disabled}
              name={"devDescribe"}
              rules={[{ required: false, message: "请必须填写!" }]}
            />
          </Row>
        )}
      </Form>
    )
  }
}

export default AddChild
