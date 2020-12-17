import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import styles from "./index.less"
import _ from "lodash"
import { Input, Row, Col, Upload, Button, message } from "antd"
import { toJS } from "mobx"
import classnames from "classnames"
import Cookies from "js-cookie"
import Cascader from "../../../components/Cascader"
import Table from "../../../components/Table"
import columnData from "./columns.js"
import DeleteModal from "./delete.js"
import Panel from "../../../components/Panel"
import EditModal from "./edit.js"
import Search from "../../../components/Search"
import { decorate as mixin } from "react-mixin"
import { cascader } from "../../bsifm/common"
import Toolbar from "../../../components/Toolbar"
import EditContent from "./editContent.js"
import { formParams } from "./tplJson.js"
import ChildTable from "./childTable.js"
import Inspection from "./inspection.js"

//实例
@inject("regionalStore", "inspectionStore")
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props)
    this.loadData = this.loadData.bind(this)
    this.deleteClick = this.deleteClick.bind(this)
    this.childAdd = this.childAdd.bind(this)
    this.editClick = this.editClick.bind(this)
    this.onDeleteOk = this.onDeleteOk.bind(this)
    this.onDeleteCancel = this.onDeleteCancel.bind(this)
    this.onEditCancel = this.onEditCancel.bind(this)
    this.onEditOk = this.onEditOk.bind(this)
    this.add = this.add.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.onCascaderChange = this.onCascaderChange.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.getChildTable = this.getChildTable.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.getChecked = this.getChecked.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)

    this.state = {
      cascaderLoading: false,
      singleLineData: {},
      modalTitle: "",
      childTableVisible: false,
      deleteShow: false,
      checkedShow: false,
      editShow: false,
      isModify: false,
      cascaderText: "",
      cascaderValue: [],
      areaName: "",
      type: "new",
      ...formParams,
      inspectionData: [],
    }
  }

  getChecked(item) {
    this.setState({
      checkedShow: true,
      inspectionData: item,
    })
  }
  onCancel() {
    this.setState({
      childTableVisible: false,
    })
  }
  getChildTable(item, e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    const { inspectionStore } = this.props

    const params = {
      belongId: item.F_AreaID,
    }
    inspectionStore.getChildTable(params)
    this.setState({
      childTableVisible: true,
      childTableTitle: item.F_Name,
    })
  }
  //删除回调
  onDeleteOk() {
    const { inspectionStore } = this.props
    const params = { F_ID: this.state.singleLineData.F_ID }
    this.c_onDeleteOk(inspectionStore, params)
  }
  onDeleteCancel() {
    this.c_onDeleteCancel()
  }
  //编辑确定
  onEditOk() {}
  clearParams(data) {
    data &&
      this.setState({
        ...formParams,
        editShow: false,
      })
  }
  onCheckOk() {}
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
      checkedShow: false,
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
    const { inspectionStore } = this.props
    this.c_onShowSizeChange({ current, pageSize }, inspectionStore)
  }
  onPageChange(pageNumber) {
    const { inspectionStore } = this.props
    this.c_onPageChange({ pageNumber }, inspectionStore)
  }
  //编辑回调
  editClick(item, e) {
    const { inspectionStore } = this.props
    inspectionStore.getEidtData({ F_ID: item.F_ID }).then((data) => {
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
      formValue.F_Name.value = (data.pd && data.pd.F_Name) || ""
      formValue.F_Leader.value = (data.pd && data.pd.F_Leader) || ""
      formValue.F_Tel.value = (data.pd && data.pd.F_Tel) || ""
      formValue.F_Address.value = (data.pd && data.pd.F_Address) || ""
      formValue.F_AreaName.value = (data.pd && data.pd.F_AreaName) || ""
      return {
        fields: {
          ...fields,
          ...formValue,
        },
        singleLineData: item,
        editShow: true,
        type: mode,
      }
    })
  }
  childAdd() {
    this.setState({
      editShow: true,
    })
  }
  add(e) {
    const {
      inspectionStore: { tableParmas, addArea },
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

    if (isSite) {
      callback()
      return
    }
    this.c_loadData(selectedOptions, index, callback)
  }
  onTextChange(value) {
    this.c_onTextChange(value)
  }
  onCascaderChange(value, selectedOptions) {
    const params = this.c_onCascaderChang(value, selectedOptions)
    const { inspectionStore } = this.props
    inspectionStore.getTable(params)
  }
  onKeyPress(e) {
    const { regionalStore } = this.props
    this.c_onKeyPress(regionalStore)
  }
  componentDidMount() {
    const { inspectionStore } = this.props
    this.initLoading(inspectionStore)
  }

  //搜索
  onSearch(value) {
    const { inspectionStore } = this.props
    const params = {
      ...inspectionStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    }
    inspectionStore.search(params)
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
    const { inspectionStore, regionalStore } = this.props
    const tableData = toJS(inspectionStore.tableData.varList) || []
    const pagination = toJS(inspectionStore.tableData.pd) || {}

    // const belongRegion = siteStore.belongRegion;
    // const isCloseAdd =
    //   belongRegion == 'country' || belongRegion == 'province' ? true : false;
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      getChildTable: this.getChildTable,
      _this: this,
    })
    const props = {
      name: "file",
      action: "/collect/inspection/createInspectionInfo",
      headers: {
        authorization: "authorization-text",
        token: Cookies.get("token"),
      },
      data: {
        belongId: "",
      },
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === "done") {
          if (info.file.response && info.file.response.Result === "success") {
            message.success(`${info.file.name} 导入成功！`)
          } else {
            message.error(info.file.response.Msg)
          }
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 导入失败！`)
        }
      },
    }
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
            <Toolbar onSearch={this.onSearch} closeAdd={true} />
            <div className={styles["table_wrap"]}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                total={pagination.allCount}
                loading={inspectionStore.loading}
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
          />
        </EditModal>
        <EditModal
          isShow={this.state.checkedShow}
          onOk={this.onCheckO}
          width={816}
          outTitle={this.state.inspectionData.stationName}
          onCancel={this.onEditCancel}
        >
          <Inspection inspectionData={this.state.inspectionData} />
        </EditModal>
        <Panel
          onCancel={this.onCancel}
          title={this.state.childTableTitle}
          isShow={this.state.childTableVisible}
        >
          <ChildTable childAdd={this.childAdd} getChecked={this.getChecked} />
        </Panel>
      </div>
    )
  }
}

export default Regional
