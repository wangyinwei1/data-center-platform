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
      title: '告警编号',
      dataIndex: 'alarmID',
      className: 'cl_header_padding',
      width: '11%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '设备编号',
      className: 'cl_header_padding',
      dataIndex: 'deviceID',
      width: '8%',
    },
    {
      title: '通道编号',
      dataIndex: 'channelID',
      className: 'cl_header_padding',
      width: '10%',
    },
    {
      title: '告警值',
      dataIndex: 'value',
      width: '6%',
      className: 'cl_header_padding',
    },
    {
      title: '告警时间',
      dataIndex: 'startTime',
      width: '8%',
      className: 'cl_header_padding',
      render: (text, record, index) => {
        return (
          <span style={{lineHeight: '20px', display: 'block'}}>{text}</span>
        );
      },
    },
    {
      title: '告警信息',
      dataIndex: 'alarmMsg',
      className: 'cl_header_padding',
      width: '10%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '告警等级',
      dataIndex: 'alarmGrade',
      className: 'cl_header_padding',
      width: '7%',
    },
    {
      title: '确认人',
      dataIndex: 'confirmer',
      width: '8%',
      className: 'cl_header_padding',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '确认时间',
      dataIndex: 'confirmTime',
      width: '8%',
      className: 'cl_header_padding',
      render: (text, record, index) => {
        return (
          <span style={{lineHeight: '20px', display: 'block'}}>{text}</span>
        );
      },
    },
    {
      title: '处理人',
      width: '8%',
      dataIndex: 'dealer',
      className: 'cl_header_padding',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '处理时间',
      dataIndex: 'dealTime',
      width: '8%',
      className: 'cl_header_padding',
      render: (text, record, index) => {
        return (
          <span style={{lineHeight: '20px', display: 'block'}}>{text}</span>
        );
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: '8%',
      className: 'cl_header_padding',
      render: (text, record, index) => {
        return (
          <span style={{lineHeight: '20px', display: 'block'}}>{text}</span>
        );
      },
    },
  ];
};

export default columns;
