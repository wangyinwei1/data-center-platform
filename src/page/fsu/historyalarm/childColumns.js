import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip} from 'antd';
import columnData from './childColumns.js';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = () => {
  return [
    {
      title: 'FSU编号',
      dataIndex: 'suID',
      with: '8%',
      render: (text, record, index) => {
        return <TextOverflow>{record.suID}</TextOverflow>;
      },
    },
    {
      title: '子设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '监控点名称',
      dataIndex: 'spName',
    },
    {
      title: '告警值',
      dataIndex: 'triggerVal',
    },
    {
      title: '告警等级',
      dataIndex: 'alarmLevel',
    },
    {
      title: '告警信息',
      dataIndex: 'alarmDesc',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
    },
    {
      title: '确认时间',
      dataIndex: 'confirmTime',
    },
    {
      title: '处理时间',
      dataIndex: 'dealTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
    {
      title: '告警历时',
      dataIndex: 'timeLong',
    },
  ];
};

export default columns;
