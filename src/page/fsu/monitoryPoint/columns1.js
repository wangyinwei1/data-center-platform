import React, { Component } from "react"
import styles from "./index.less"
import classnames from "classnames"
import { Tooltip, Dropdown, Menu, Icon } from "antd"
import columnData from "./childColumns.js"
import TextOverflow from "../../../components/TextOverflow"
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({ remoteControlClick, _this, record }) => {
  let remoteName = ""
  switch (record.spType) {
    case 2:
    case 4:
      remoteName = "告警量设置"
      break

    case 6:
      remoteName = "遥调"
      break
  }
  return (
    <Menu className={styles["operation"]}>
      {JSON.parse(localStorage.getItem("FsuTypeID")) === 2 &&
        (record.spType === 6 || record.spType === 2 || record.spType === 4) && (
          <Menu.Item
            key="c_remoteControl"
            onClick={remoteControlClick.bind(_this, record)}
          >
            <div className={styles["edit"]}>
              <i className={classnames("icon iconfont icon-bianji")} />
              <span>{remoteName}</span>
            </div>
          </Menu.Item>
        )}
    </Menu>
  )
}
const columns = ({
  historyClick,
  realtimeClick,
  controlClick,
  remoteControlClick,
  _this,
}) => {
  let options = [
    {
      title: "操作",
      width: "6%",
      dataIndex: "",
      className: "information_th",
      render: (text, record, index) => {
        return (
          <Dropdown
            overlay={menu({
              remoteControlClick,
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
  JSON.parse(localStorage.getItem("FsuTypeID")) === 3
    ? options.unshift(
        {
          title: "监控点ID",
          dataIndex: "spID",
          colSpan: 1,
          width: "15%",
          className: "information_th",
        },
        {
          title: "监控点名称",
          dataIndex: "spName",
          colSpan: 1,
          width: "15%",
          className: "information_th",
          render: (text, record, index) => {
            return <TextOverflow>{text}</TextOverflow>
          },
        },
        {
          title: "告警等级",
          dataIndex: "alarmLevel",
          colSpan: 1,
          width: "10%",
          className: "information_th",
        },
        {
          title: "阈值",
          dataIndex: "threshold",
          colSpan: 1,
          width: "15%",
          className: "information_th",
        },
        {
          title: "绝对值",
          dataIndex: "absoluteVal",
          colSpan: 1,
          className: "information_th",
          width: "15%",
        },
        {
          title: "相对值",
          dataIndex: "relativeVal",
          colSpan: 1,
          width: "15%",
          className: "information_th",
        },
        {
          title: "描述",
          dataIndex: "describe",
          colSpan: 1,
          width: "15%",
          className: "information_th",
          render: (text, record, index) => {
            return <TextOverflow>{text}</TextOverflow>
          },
        }
      )
    : options.unshift(
        {
          title: "监控点ID",
          dataIndex: "spID",
          colSpan: 1,
          width: "15%",
          render: (text, record, index) => {
            return <TextOverflow>{text}</TextOverflow>
          },
          className: "information_th",
        },
        {
          title: "名称",
          dataIndex: "spName",
          colSpan: 1,
          width: "20%",
          className: "information_th",
        },
        {
          title: "单位",
          dataIndex: "spUnit",
          colSpan: 1,
          width: "15%",
          className: "information_th",
        },
        {
          title: "类型",
          dataIndex: "spTypeName",
          className: "information_th",
          colSpan: 1,
          width: "15%",
        },
        {
          title: "归属类型",
          dataIndex: "optionName",
          colSpan: 1,
          width: "15%",
          className: "information_th",
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          colSpan: 1,
          className: "information_th",
          width: "20%",
        }
      )

  return options
}

export default columns