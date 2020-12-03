import React, { Component } from "react"
import styles from "./index.less"
import classnames from "classnames"
import { Tooltip, Dropdown, Menu } from "antd"
import columnData from "./childColumns.js"
import TextOverflow from "../../../components/TextOverflow"
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({
  endClick,
  handleClick,
  cancelClick,
  confirmClick,
  _this,
  record,
}) => {
  return (
    <Menu className={styles["operation"]}>
      {record.status !== "待确认" && record.status !== "已处理" && (
        <Menu.Item key="handle" onClick={handleClick.bind(_this, record)}>
          <div className={styles["handle"]}>
            <i
              className={classnames(
                "icon iconfont icon-chuli",
                styles["handle_alarm"]
              )}
            />
            <span>处理告警</span>
          </div>
        </Menu.Item>
      )}
      {record.status !== "已处理" &&
        record.status !== "待处理" &&
        record.status !== "已确认" && (
          <Menu.Item key="confirm" onClick={confirmClick.bind(_this, record)}>
            <div className={styles["confirm"]}>
              <i
                className={classnames(
                  "icon iconfont icon-queren",
                  styles["confirm_alarm"]
                )}
              />
              <span>确认告警</span>
            </div>
          </Menu.Item>
        )}
      {record.status !== "已处理" && (
        <Menu.Item key="cancel" onClick={cancelClick.bind(_this, record)}>
          <div className={styles["cancel"]}>
            <i
              className={classnames(
                "icon iconfont icon-quxiao",
                styles["cancel_alarm"]
              )}
            />
            <span>取消告警</span>
          </div>
        </Menu.Item>
      )}
      <Menu.Item key="end" onClick={endClick.bind(_this, record)}>
        <div className={styles["end"]}>
          <i
            className={classnames(
              "icon iconfont icon-jieshu",
              styles["end_alarm"]
            )}
          />
          <span>结束告警</span>
        </div>
      </Menu.Item>
    </Menu>
  )
}
const columns = ({
  endClick,
  handleClick,
  cancelClick,
  confirmClick,
  _this,
}) => {
  return [
    {
      title: "流水号",
      dataIndex: "serialNo",
      className: "information_th",
    },
    {
      title: "告警信息",
      className: "information_th",
      dataIndex: "alarmDesc",
      width: "12%",
      render: (text, record, index) => {
        return <TextOverflow>{text ? text : "-"}</TextOverflow>
      },
    },
    {
      title: "局站名称",
      dataIndex: "stationName",
      with: "10%",
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>
      },
    },
    {
      title: "FSU名称",
      dataIndex: "suName",
      width: "10%",
      className: "information_th",
      render: (text, record, index) => {
        return (
          <div>
            <TextOverflow>{text ? text : "-"}</TextOverflow>
          </div>
        )
      },
    },
    {
      title: "告警等级",
      dataIndex: "alarmLevel",
      width: "8%",
      className: "information_th",
      render: (text, record, index) => {
        return <span>{text ? text : "-"}</span>
      },
    },
    {
      title: "状态",
      className: "information_th",
      dataIndex: "status",
      width: "6%",
      render: (text, record, index) => {
        return <span>{text ? text : "-"}</span>
      },
    },
    // {
    //   title: "子设备名称",
    //   dataIndex: "deviceName",
    //   className: "information_th",
    //   width: "15%",
    //   render: (text, record, index) => {
    //     return (
    //       <div>
    //         <TextOverflow>{text ? text : "-"}</TextOverflow>
    //       </div>
    //     )
    //   },
    // },
    {
      title: "监控点名称",
      dataIndex: "spName",
      width: "10%",
      className: "information_th",
      render: (text, record, index) => {
        return (
          <div>
            <TextOverflow>{text ? text : "-"}</TextOverflow>
          </div>
        )
      },
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      className: "information_th",
      width: "10%",
      render: (text, record, index) => {
        const arr = text.split(" ")
        return (
          <div>
            <span style={{ lineHeight: "17px", display: "block" }}>
              {arr[0]}
            </span>
            <span style={{ lineHeight: "17px", display: "block" }}>
              {arr[1]}
            </span>
          </div>
        )
      },
    },
    {
      title: "采集时间",
      dataIndex: "recordTime",
      width: "8%",
      render: (text, record, index) => {
        return (
          <span style={{ lineHeight: "20px", display: "block" }}>{text}</span>
        )
      },
    },
    {
      title: "操作",
      className: "information_th",
      width: "5%",
      dataIndex: "",
      render: (text, record, index) => {
        return (
          <Dropdown
            overlay={menu({
              endClick,
              handleClick,
              cancelClick,
              confirmClick,
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
