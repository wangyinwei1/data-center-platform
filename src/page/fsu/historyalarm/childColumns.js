import React, { Component } from "react"
import styles from "./index.less"
import classnames from "classnames"
import { Tooltip } from "antd"
import columnData from "./childColumns.js"
import TextOverflow from "../../../components/TextOverflow"
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = () => {
  return [
    {
      title: "流水号",
      dataIndex: "serialNo",
      className: "information_th",
    },
    {
      title: "告警信息",
      dataIndex: "alarmDesc",
      with: "10%",
      render: (text, record, index) => {
        return <TextOverflow>{record.alarmDesc}</TextOverflow>
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
      with: "8%",
      render: (text, record, index) => {
        return <TextOverflow>{text ? text : "-"}</TextOverflow>
      },
    },
    {
      title: "告警等级",
      dataIndex: "alarmLevel",
    },
    // {
    //   title: "子设备名称",
    //   dataIndex: "deviceName",
    // },
    {
      title: "监控点名称",
      dataIndex: "spName",
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      width: "8%",
      render: (text, record, index) => {
        return (
          <span style={{ lineHeight: "20px", display: "block" }}>{text}</span>
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
      title: "结束时间",
      dataIndex: "endTime",
      width: "8%",
      render: (text, record, index) => {
        return (
          <span style={{ lineHeight: "20px", display: "block" }}>{text}</span>
        )
      },
    },
    {
      title: "告警历时",
      dataIndex: "timeLong",
      width: "8%",
      render: (text, record, index) => {
        return (
          <span style={{ lineHeight: "20px", display: "block" }}>{text}</span>
        )
      },
    },
  ]
}

export default columns
