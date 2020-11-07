import React, { Component } from "react"
import styles from "./index.less"
import classnames from "classnames"
import { Tooltip, Dropdown, Menu, Icon } from "antd"
import TextOverflow from "../../../components/TextOverflow"
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({ editClick, deleteClick, _this, record }) => {
  return (
    <Menu className={styles["operation"]}>
      <Menu.Item key="c_edit" onClick={editClick.bind(_this, record)}>
        <div className={styles["edit"]}>
          <i className={classnames("icon iconfont icon-bianji")} />
          <span>编辑</span>
        </div>
      </Menu.Item>
      <Menu.Item key="c_delete" onClick={deleteClick.bind(_this, record)}>
        <div className={styles["delete"]}>
          <i className={classnames("icon iconfont icon-shanchu")} />
          <span>删除</span>
        </div>
      </Menu.Item>
    </Menu>
  )
}
const columns = ({ deleteClick, editClick, isClose, _this }) => {
  const arr = [
    {
      title: "机房名称",
      dataIndex: "F_RoomName",
    },
    {
      title: "站点编号",
      dataIndex: "F_StationID",
    },
    {
      title: "资源编号",
      dataIndex: "F_RNO",
    },
    {
      title: "资源名称",
      dataIndex: "F_RName",
    },
    {
      title: "资源属性",
      dataIndex: "F_Property",
    },
    {
      title: "备注",
      dataIndex: "F_Rec",
    },
  ]
  arr.push({
    title: "操作",
    dataIndex: "",
    className: "information_th",
    render: (text, record, index) => {
      return (
        <Dropdown
          overlay={menu({
            editClick,
            deleteClick,
            _this,
            record,
          })}
          placement={"bottomCenter"}
          trigger={["click"]}
        >
          <i
            className={classnames("icon iconfont icon-gengduo", styles["more"])}
          />
        </Dropdown>
      )
    },
  })
  return arr
}

export default columns
