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
      dataIndex: 'AlarmID',
      className: 'cl_header_padding',
      width: '11%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '设备编号',
      className: 'cl_header_padding',
      dataIndex: 'DeviceID',
      width: '8%',
    },
    {
      title: '通道编号',
      dataIndex: 'ChannelID',
      className: 'cl_header_padding',
      width: '10%',
    },
    {
      title: '告警值',
      dataIndex: 'Value',
      width: '6%',
      className: 'cl_header_padding',
    },
    {
      title: '告警时间',
      dataIndex: 'StartTime',
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
      dataIndex: 'AlarmMsg',
      className: 'cl_header_padding',
      width: '10%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '告警等级',
      dataIndex: 'AlarmGrade',
      className: 'cl_header_padding',
      width: '7%',
    },
    {
      title: '确认人',
      dataIndex: 'Confirmer',
      width: '8%',
      className: 'cl_header_padding',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '确认时间',
      dataIndex: 'ConfirmTime',
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
      dataIndex: 'Dealer',
      className: 'cl_header_padding',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '处理时间',
      dataIndex: 'DealTime',
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
      dataIndex: 'EndTime',
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
