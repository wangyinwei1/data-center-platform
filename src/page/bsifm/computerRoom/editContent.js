import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { Button, Form, Row } from "antd"
import classnames from "classnames"
import styles from "./index.less"
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomSelect,
} from "../../../components/FormItem"
import { toJS } from "mobx"
//实例
@inject("computerroomStore")
@observer
class Regional extends Component {
  constructor(props) {
    super(props)
    this.handleFormChange = this.handleFormChange.bind(this)
  }
  handleFormChange(changedFields) {
    const { handleFormChange } = this.props
    handleFormChange(changedFields)
  }
  render() {
    const {
      computerroomStore: { editData, addLists, belongRegion },
      regionMenu,
      cityMenu,
      getAreaSonList,
      siteMenu,
      countyMenu,
      fields,
      mode,
    } = this.props

    let data = {}
    let disabled = false
    switch (mode) {
      case "new":
        data = addLists

        break
      case "modify":
      case "detail":
        data = editData
        break
    }
    console.log(data)

    let currentClass = "cl_regional_select_157"

    const cityList = _.map(
      cityMenu[0] ? cityMenu : toJS(data.cityList),
      (item) => {
        return {
          value: item.F_AreaID,
          name: item.F_AreaName,
        }
      }
    )
    const countyList = _.map(
      countyMenu[0] ? countyMenu : toJS(data.countyList),
      (item) => {
        return {
          value: item.F_AreaID,
          name: item.F_AreaName,
        }
      }
    )
    const siteList = _.map(
      siteMenu[0] ? siteMenu : toJS(data.stationList),
      (item) => {
        return {
          value: item.code || item.F_ID || item.F_AreaID,
          name: item.name || item.F_Name || item.F_AreaName,
        }
      }
    )

    const provinceList = _.map(toJS(data.provinceList), (item) => {
      return {
        value: item.F_AreaID,
        name: item.F_AreaName,
      }
    })

    let regionList = _.map(
      regionMenu[0] ? regionMenu : toJS(data.regionList),
      (item) => {
        // if (
        //   mode === "modify" &&
        //   parseInt(fields.region.value) === item.F_AreaID
        // ) {
        //   fields.region.value = item.F_AreaName
        //   fields.region.code = item.F_AreaID
        // }
        return {
          value: item.F_AreaID,
          name: item.F_AreaName,
        }
      }
    )
    console.log(regionList, fields)

    return (
      <Form layout="inline" className={styles["edit_wrap"]}>
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={"区域ID"}
          disabled={data.area.provinceCode ? true : false}
          getAreaSonList={getAreaSonList}
          name={"province"}
          rules={[{ required: true, message: "请必须填写!" }]}
          className={currentClass}
          children={provinceList}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={""}
          disabled={data.area.cityCode ? true : cityList[0] ? false : true}
          getAreaSonList={getAreaSonList}
          name={"city"}
          className={currentClass}
          rules={[{ required: true, message: "请必须填写!" }]}
          children={cityList}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={""}
          disabled={data.area.countyCode ? true : countyList[0] ? false : true}
          getAreaSonList={getAreaSonList}
          name={"county"}
          className={currentClass}
          rules={[{ required: true, message: "请必须填写!" }]}
          children={countyList}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={""}
          disabled={data.area.regionCode ? true : regionList[0] ? false : true}
          getAreaSonList={getAreaSonList}
          name={"region"}
          className={currentClass}
          rules={[{ required: true, message: "请必须填写!" }]}
          children={regionList}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={""}
          disabled={data.area.stationCode ? true : siteList[0] ? false : true}
          name={"site"}
          className={currentClass}
          rules={[{ required: true, message: "请必须填写!" }]}
          children={siteList}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"机房名称"}
          disabled={disabled}
          name={"F_RoomName"}
          rules={[{ required: true, message: "请必须填写!" }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"资源编号"}
          disabled={disabled}
          name={"F_RNO"}
          rules={[{ required: false }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"资源名称"}
          disabled={disabled}
          name={"F_RName"}
          rules={[{ required: false }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"机房属性"}
          disabled={disabled}
          name={"F_Property"}
          rules={[{ required: false }]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={"备注"}
          disabled={disabled}
          name={"F_Rec"}
          rules={[{ required: false }]}
        />
      </Form>
    )
  }
}

export default Regional
