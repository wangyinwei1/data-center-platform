import React, {Component} from 'react';
import moment from 'moment';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu, Divider} from 'antd';
import columnData from './childColumns.js';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = ({whichTable}) => {
  let result = [];
  switch (whichTable) {
    case 'history':
      result = [
        {
          title: '设备ID',
          dataIndex: 'imei',
        },
        {
          title: '上报时间',
          dataIndex: 'commandId',
        },
        {
          title: '数据',
          dataIndex: 'commandStatus',
        },
      ];
      break;
    case 'issued':
      result = [
        {
          title: 'IMEI号',
          dataIndex: 'imei',
        },
        {
          title: '指令ID',
          dataIndex: 'commandId',
        },
        {
          title: '指令下发状态',
          dataIndex: 'commandStatus',
        },
        {
          title: '指令下发时间',
          dataIndex: 'createTime',
          render: (text, record, index) => {
            return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
          },
        },
        {
          title: '指令完成时间',
          dataIndex: 'finishTime',
          render: (text, record, index) => {
            return !text ? (
              '-'
            ) : (
              <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
            );
          },
        },
        {
          title: '操作员',
          dataIndex: 'createBy',
        },
      ];
      break;
    case 'reported':
      result = [
        {
          title: 'IMEI',
          dataIndex: 'imei',
        },
        {
          title: '设备ID',
          dataIndex: 'deviceId',
          width: '25%',
          render: (text, record, index) => {
            return <TextOverflow>{text}</TextOverflow>;
          },
        },
        {
          title: '事件类型',
          dataIndex: 'eventType',
          width: '10%',
        },
        {
          title: '事件内容',
          dataIndex: 'eventContent',
        },
        {
          title: '上报时间',
          dataIndex: 'time',
          render: (text, record, index) => {
            return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
          },
        },
      ];
      break;
  }
  return result;
};

export default columns;
