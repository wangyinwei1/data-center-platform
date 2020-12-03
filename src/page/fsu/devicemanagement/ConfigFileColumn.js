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
const menu = ({ deleteClick, _this, record }) => {
  return (
    <Menu className={styles["operation"]}>
      <Menu.Item key="c_delete" onClick={deleteClick.bind(_this, record)}>
        <div className={styles["delete"]}>
          <i className={classnames("icon iconfont icon-shanchu")} />
          <span>删除</span>
        </div>
      </Menu.Item>
    </Menu>
  )
}
const columns = ({ deleteClick, _this }) => {
  return [
    {
      title: "文件名",
      width: "20%",
      dataIndex: "ConfigFileName",
    },
    {
      title: "操作",
      dataIndex: "",
      width: "10%",
      className: "information_th",
      render: (text, record, index) => {
        return (
          <Dropdown
            overlay={menu({
              deleteClick,
              _this,
              record,
            })}
            placement={"bottomCenter"}
            trigger={["click"]}
          >
            <i
              className={classnames(
                "icon iconfont icon-gengduo",
                styles["more"]
              )}
            />
          </Dropdown>
        )
      },
    },
  ]
}

export default columns
