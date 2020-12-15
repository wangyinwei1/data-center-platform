import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { Form } from "antd"
import styles from "./index.less"
import Cascader from "../../../components/Cascader"
import { toJS } from "mobx"
import { decorate as mixin } from "react-mixin"
import { cascader } from "../common"
import Toolbar from "../../../components/Toolbar"
import Table from "../../../components/Table"
import columnData from "./columns.js"
import DeleteModal from "../regional/delete.js"
import EditContent from "./editContent.js"
import EditModal from "./edit.js"
import { formParams, clearCity, clearCounty } from "./tplJson.js"
import PublicModal from "@/components/PublicModal"
import ChangePasswordForm from "./changePasswordForm"

//实例
@inject("regionalStore", "siteStore", "applicationuserStore")
@observer
@mixin(cascader)
class Site extends Component {
  constructor(props) {
    super(props)
    this.state = {
      singleLineData: {},
      deleteShow: false,
      editShow: false,
      editParams: {},
      areaName: "",
      type: "new",
      ...formParams,
      cityList: [],
      districtList: [],
      countyList: [],
    }
  }
  //以下级联方法
  componentDidMount() {
    const {
      applicationuserStore: { getTable },
    } = this.props
    const params = {
      page: 1,
      keywords: "",
      number: 10,
    }
    getTable(params)
  }
  //添加功能
  add = () => {
    const { applicationuserStore } = this.props
    applicationuserStore.getFSUType()
    applicationuserStore.getGoAdd()
    this.setState({
      type: "new",
    })
    this.editModal.changeVisible(true)
  }
  initFromValue = (data, mode, item) => {
    this.setState(({ fields }) => {
      let formValue = _.cloneDeep([fields])[0]
      formValue.EMAIL.value = data.pd.F_EMAIL || ""
      formValue.NAME.value = data.pd.F_NAME || ""
      formValue.PHONE.value = data.pd.F_PHONE || ""
      formValue.STATUS.value =
        parseInt(data.pd.F_Status) === 0
          ? 0
          : parseInt(data.pd.F_Status) || undefined
      formValue.USERNAME.value = data.pd.F_UserName || ""
      // formValue.userType.value =
      //   parseInt(data.pd.userType) === 0
      //     ? 0
      //     : parseInt(data.pd.userType) || undefined;
      formValue.proCode.value = parseInt(data.pd.property.proCode) || ""
      formValue.F_FsuTypeID.value = parseInt(data.pd.FsuTypeID) || undefined
      formValue.countyCode.value = parseInt(data.pd.property.countyCode) || ""
      formValue.cityCode.value = parseInt(data.pd.property.cityCode) || ""
      formValue.districtCode.value =
        parseInt(data.pd.property.districtCode) || undefined
      formValue.DevTypes.value =
        (data.pd.property.F_DevTypes &&
          data.pd.property.F_DevTypes.split(",").map((item) => {
            return parseInt(item)
          })) ||
        []
      return {
        fields: {
          ...fields,
          ...formValue,
        },
        singleLineData: item,
        type: mode,
      }
    })
    this.editModal.changeVisible(true)
  }
  //点击编辑
  editClick = (item) => {
    const { applicationuserStore } = this.props
    applicationuserStore.getFSUType()
    applicationuserStore
      .getEidtData({ USER_ID: item.F_UserID })
      .then((data) => {
        this.initFromValue(data, "modify", item)
      })
  }
  //删除回调
  onDeleteOk = () => {
    const { applicationuserStore } = this.props
    const item = this.state.singleLineData
    const params = {
      USER_ID: item.F_UserID,
    }
    this.c_onDeleteOk(applicationuserStore, params)
  }
  onDeleteCancel = () => {
    this.c_onDeleteCancel()
  }
  deleteClick = (item, e) => {
    this.setState({
      deleteShow: true,
      singleLineData: item,
    })
  }
  //编辑确定
  onEditOk = () => {
    const fields = this.state.fields
    const showError = this.test(fields)
    const hasError = _.keys(showError)
    return new Promise((resolve, reject) => {
      if (hasError[0]) {
        this.setState(({ fields }) => {
          return {
            fields: {
              ...fields,
              ...showError,
            },
          }
        })
        reject()
      } else {
        const {
          applicationuserStore: { save, editSave },
        } = this.props
        const params = {}
        this.state.type === "modify" &&
          (params.USER_ID = this.state.singleLineData.F_UserID)
        _.forIn(fields, (value, key) => {
          if (key === "DevTypes") {
            params[key] = value.value.join(",")
          } else if (key === "F_FsuTypeID") {
            params[key] = value.value ? value.value : 0
          } else {
            params[key] = value.value
          }
        })
        this.state.type === "new"
          ? save(params).then((data) => {
              this.clearState(data, resolve)
            })
          : editSave(params).then((data) => {
              this.clearState(data, resolve)
            })
      }
    })
  }
  clearState = (data, resolve) => {
    if (data) {
      this.setState({
        ...formParams,
        cityList: [],
        countyList: [],
        districtList: [],
      })
      resolve()
    } else {
      reject()
    }
  }

  //校验循环
  test = (fields) => {
    let showError = {}
    let emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    //循环找到必填字段是否是空并作出警告
    _.forIn(fields, (v, k) => {
      if (k === "EMAIL" && v.value && !emailReg.test(v.value)) {
        showError[k] = { showError: true, ...v }
      } else if (k === "PHONE" && !phoneReg.test(v.value)) {
        showError[k] = { showError: true, ...v }
      } else {
        if (!v.value && v.value !== 0 && v.require) {
          showError[k] = { showError: true, ...v }
        }
      }
    })
    return showError
  }

  //取消
  onEditCancel = () => {
    this.setState({
      ...formParams,
      cityList: [],
      districtList: [],
      countyList: [],
    })
  }
  //搜索
  onSearch = (value) => {
    const { applicationuserStore } = this.props
    const params = {
      ...applicationuserStore.tableParmas,
      keywords: encodeURIComponent(value),
    }
    applicationuserStore.search(params)
  }
  //table分页
  onShowSizeChange = (current, pageSize) => {
    const { applicationuserStore } = this.props
    this.c_onShowSizeChange({ current, pageSize }, applicationuserStore)
  }
  onPageChange = (pageNumber) => {
    const { applicationuserStore } = this.props
    this.c_onPageChange({ pageNumber }, applicationuserStore)
  }
  getAreaSonList = (changedFields) => {
    const {
      applicationuserStore: { getAreaSonList },
    } = this.props
    const key = _.keys(changedFields)
    getAreaSonList({ F_ParentAreaID: changedFields[key[0]] }).then((data) => {
      switch (key[0]) {
        case "proCode":
          this.setState(({ fields }) => {
            return {
              fields: {
                ...fields,
                ...clearCity.fields,
              },
              cityList: data,
              countyList: [],
              districtList: [],
            }
          })
          break
        case "cityCode":
          this.setState(({ fields }) => {
            return {
              fields: {
                ...fields,
                ...clearCounty.fields,
              },
              countyList: data,
              districtList: [],
            }
          })
          break
        case "countyCode":
          this.setState(({ fields }) => {
            return {
              districtList: data,
            }
          })
          break
      }
    })
  }
  handleFormChange = (changedFields) => {
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
  publicModalObject = null
  editModal = null
  changePasswordForm = null

  changePasswordClick = (item) => {
    this.publicModalObject.changeVisible(true)
    this.setState({
      singleLineData: item,
    })
  }
  changePasswordOk = () => {
    return new Promise((resolve, reject) => {
      const { applicationuserStore } = this.props

      const form = this.changePasswordForm.form
      const fields = form.getFieldsValue()
      const params = {
        password: fields.password,
        F_UserID: this.state.singleLineData.F_UserID,
      }
      applicationuserStore.updatePassword(params).then((data) => {
        data ? resolve() : reject()
      })
    })
  }

  render() {
    const { siteStore, zTreeLevel, applicationuserStore } = this.props
    const tableData = toJS(applicationuserStore.tableData.userList) || []
    const pagination = toJS(applicationuserStore.tableData.pd) || {}
    const columns = columnData({
      changePasswordClick: this.changePasswordClick,
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      _this: this,
    })
    return (
      <div className={styles["applicationuser_wrap"]}>
        <div className={styles["applicationuser_ct"]}>
          <div className={styles["min_width"]}>
            <Toolbar onClick={this.add} onSearch={this.onSearch} />
            <div className={styles["table_wrap"]}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.allCount}
                columns={columns}
                loading={applicationuserStore.loading}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
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
        <PublicModal
          modalRef={(ref) => {
            this.editModal = ref
          }}
          onOk={this.onEditOk}
          onCancel={this.onEditCancel}
          width={880}
          title={this.state.type === "new" ? "用户新增" : "用户修改"}
        >
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            mode={this.state.type}
            getAreaSonList={this.getAreaSonList}
            cityMenu={this.state.cityList}
            countyMenu={this.state.countyList}
            districtMenu={this.state.districtList}
          />
        </PublicModal>
        <PublicModal
          title={"更改密码"}
          modalRef={(ref) => {
            this.publicModalObject = ref
          }}
          onOk={this.changePasswordOk}
        >
          <ChangePasswordForm
            formRef={(_this) => {
              this.changePasswordForm = _this
            }}
          />
        </PublicModal>
      </div>
    )
  }
}

export default Site
