import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import styles from "./index.less"
import _ from "lodash"
import { Input, Row, Col, Button, message } from "antd"
import { toJS } from "mobx"
import classnames from "classnames"
import Cascader from "../../../components/Cascader"
import Table from "../../../components/Table"
import columnData from "./columns.js"
import DeleteModal from "./delete.js"
import EditModal from "./edit.js"
import Search from "../../../components/Search"
import { decorate as mixin } from "react-mixin"
import { cascader } from "../common"
import Toolbar from "../../../components/Toolbar"
import EditContent from "./editContent.js"
import {
  formParams,
  clearCity,
  clearRegion,
  clearSite,
  clearCounty,
} from "./tplJson.js"

//实例
@inject("regionalStore", "computerroomStore")
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props)
    this.loadData = this.loadData.bind(this)
    this.deleteClick = this.deleteClick.bind(this)
    this.editClick = this.editClick.bind(this)
    this.onDeleteOk = this.onDeleteOk.bind(this)
    this.onDeleteCancel = this.onDeleteCancel.bind(this)
    this.onEditCancel = this.onEditCancel.bind(this)
    this.onEditOk = this.onEditOk.bind(this)
    this.add = this.add.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.onCascaderChange = this.onCascaderChange.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.getAreaSonList = this.getAreaSonList.bind(this)

    this.state = {
      cascaderLoading: false,
      singleLineData: {},
      modalTitle: "",
      deleteShow: false,
      editShow: false,
      isModify: false,
      cascaderText: "",
      cascaderValue: [],
      areaName: "",
      type: "new",
      ...formParams,
      cityList: [],
      countyList: [],
      regionList: [],
      siteList: [],
    }
  }

  //删除回调
  onDeleteOk() {
    const { computerroomStore } = this.props
    const params = { F_ID: this.state.singleLineData.F_ID }
    this.c_onDeleteOk(computerroomStore, params)
  }
  onDeleteCancel() {
    this.c_onDeleteCancel()
  }
  //编辑确定
  onEditOk() {
    const fields = this.state.fields
    const showError = this.test(fields)
    const hasError = _.keys(showError)

    if (hasError[0]) {
      this.setState(({ fields }) => {
        return {
          fields: {
            ...fields,
            ...showError,
          },
        }
      })
    } else {
      const {
        computerroomStore: { save, edit },
      } = this.props
      const params = {
        F_StationID: fields.site.value,
        F_RoomName: fields.F_RoomName.value,
        F_RNO: fields.F_RNO.value,
        F_RName: fields.F_RName.value,
        F_Property: fields.F_Property.value,
        F_Rec: fields.F_Rec.value,
      }
      // fields.region.code
      //   ? (params.F_AreaID = fields.region.code)
      //   : (params.F_AreaName = fields.region.value)
      this.state.type === "modify" &&
        (params["F_ID"] = this.state.singleLineData.F_ID)
      this.state.type === "new"
        ? save(params).then((data) => {
            this.clearParams(data)
          })
        : edit(params).then((data) => {
            this.clearParams(data)
          })
    }
  }
  clearParams(data) {
    data &&
      this.setState({
        ...formParams,
        editShow: false,
        cityList: [],
        countyList: [],
        regionList: [],
      })
  }
  //校验循环
  test(fields) {
    let showError = {}
    //循环找到必填字段是否是空并作出警告
    _.forIn(fields, (v, k) => {
      if (!v.value && v.value !== 0 && v.require) {
        showError[k] = { showError: true, ...v }
      }
    })
    return showError
  }

  //取消
  onEditCancel() {
    this.setState({
      ...formParams,
      editShow: false,
      cityList: [],
      countyList: [],
      regionList: [],
    })
  }

  //删除
  deleteClick(item, e) {
    this.setState({
      deleteShow: true,
      singleLineData: item,
    })
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const { computerroomStore } = this.props
    this.c_onShowSizeChange({ current, pageSize }, computerroomStore)
  }
  onPageChange(pageNumber) {
    const { computerroomStore } = this.props
    this.c_onPageChange({ pageNumber }, computerroomStore)
  }
  //编辑回调
  editClick(item, e) {
    const { computerroomStore } = this.props
    computerroomStore.getEidtData({ F_ID: item.F_ID }).then((data) => {
      this.initFromValue(data, "modify", item)
    })
  }
  initFromValue(data, mode, item) {
    this.setState(({ fields }) => {
      let formValue = _.cloneDeep([fields])[0]
      formValue.city.value =
        (data.area.cityCode && parseInt(data.area.cityCode)) || undefined
      formValue.county.value =
        (data.area.countyCode && parseInt(data.area.countyCode)) || undefined
      formValue.province.value =
        (data.area.provinceCode && parseInt(data.area.provinceCode)) ||
        undefined
      formValue.region.value =
        (data.area.regionCode && parseInt(data.area.regionCode)) || undefined
      formValue.site.value =
        (data.area &&
          data.area.stationCode &&
          parseInt(data.area.stationCode)) ||
        undefined

      formValue.F_RoomName.value = (data.pd && data.pd.F_RoomName) || ""
      formValue.F_RName.value = (data.pd && data.pd.F_RName) || ""
      formValue.F_RNO.value = (data.pd && data.pd.F_RNO) || ""
      formValue.F_Property.value = (data.pd && data.pd.F_Property) || ""
      formValue.F_Rec.value = (data.pd && data.pd.F_Rec) || ""
      return {
        fields: {
          ...formValue,
        },
        singleLineData: item,
        editShow: true,
        type: mode,
      }
    })
  }
  add(e) {
    const {
      computerroomStore: { tableParmas, addArea },
    } = this.props
    const params = {
      F_AreaID: tableParmas.ztreeChild,
    }
    addArea(params).then((data) => {
      this.initFromValue(data, "new")
    })
  }
  //级联组件方法
  loadData(selectedOptions, index, callback) {
    const text = selectedOptions[0].code
    var area = /^\d{8}\b/ //区下的编码匹配
    const isSite = area.test(text)

    // if (isSite) {
    //   callback()
    //   return
    // }
    this.c_loadData(selectedOptions, index, callback)
  }
  onTextChange(value) {
    this.c_onTextChange(value)
  }
  onCascaderChange(value, selectedOptions) {
    const params = this.c_onCascaderChang(value, selectedOptions)
    const { computerroomStore } = this.props
    computerroomStore.getTable(params)
  }
  onKeyPress(e) {
    const { regionalStore } = this.props
    this.c_onKeyPress(regionalStore)
  }
  componentDidMount() {
    const { computerroomStore } = this.props
    this.initLoading(computerroomStore)
  }

  //搜索
  onSearch(value) {
    const { computerroomStore } = this.props
    const params = {
      ...computerroomStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    }
    computerroomStore.search(params)
  }
  getAreaSonList(changedFields) {
    const {
      computerroomStore: { getAreaSonList },
    } = this.props
    const key = _.keys(changedFields)
    getAreaSonList({ F_ParentAreaID: changedFields[key[0]] }).then((data) => {
      switch (key[0]) {
        case "province":
          this.setState(({ fields }) => {
            return {
              fields: {
                ...fields,
                ...clearCity.fields,
              },
              cityList: data,
              countyList: [],
              regionList: [],
              siteList: [],
            }
          })
          break
        case "city":
          this.setState(({ fields }) => {
            return {
              fields: {
                ...fields,
                ...clearCounty.fields,
              },
              countyList: data,
              regionList: [],
              siteList: [],
            }
          })
          break
        case "county":
          this.setState(({ fields }) => {
            return {
              fields: {
                ...fields,
                ...clearRegion.fields,
              },
              regionList: data,
              siteList: [],
            }
          })
          break
        case "region":
          this.setState(({ fields }) => {
            return {
              fields: {
                ...fields,
                ...clearSite.fields,
              },
              siteList: data,
            }
          })
          break
      }
    })
  }
  handleFormChange(changedFields) {
    const key = _.keys(changedFields)
    //showError让自己校验字段
    const obj = {}
    obj[key] = { showError: false, ...changedFields[key] }
    this.setState(({ fields }) => {
      return {
        fields: { ...fields, ...obj },
      }
    })
  }
  //渲染
  render() {
    const { computerroomStore, regionalStore } = this.props
    const tableData = toJS(computerroomStore.tableData.varList) || []
    const pagination = toJS(computerroomStore.tableData.pd) || {}

    // const belongRegion = computerroomStore.belongRegion;
    // const isCloseAdd =
    //   belongRegion == 'country' || belongRegion == 'province' ? true : false;
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      _this: this,
    })
    return (
      <div className={styles["regional_wrap"]}>
        <Cascader
          loading={this.state.cascaderLoading}
          options={toJS(regionalStore.areaTree)}
          onKeyPress={this.onKeyPress}
          loadData={this.loadData}
          onTextChange={this.onTextChange}
          cascaderValue={this.state.cascaderValue}
          cascaderText={this.state.cascaderText}
          onChange={this.onCascaderChange}
        />
        <div className={styles["regional_ct"]}>
          <div className={styles["min_width"]}>
            <Toolbar onSearch={this.onSearch} onClick={this.add} />
            <div className={styles["table_wrap"]}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                total={pagination.allCount}
                loading={computerroomStore.loading}
                columns={columns}
                data={tableData}
              />
            </div>
          </div>
        </div>
        <DeleteModal
          isShow={this.state.deleteShow}
          onOk={this.onDeleteOk}
          onCancel={this.onDeleteCancel}
        />
        <EditModal
          isShow={this.state.editShow}
          mode={this.state.type}
          onOk={this.onEditOk}
          width={816}
          onCancel={this.onEditCancel}
        >
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            mode={this.state.type}
            regionMenu={this.state.regionList}
            cityMenu={this.state.cityList}
            countyMenu={this.state.countyList}
            siteMenu={this.state.siteList}
            getAreaSonList={this.getAreaSonList}
          />
        </EditModal>
      </div>
    )
  }
}

export default Regional
