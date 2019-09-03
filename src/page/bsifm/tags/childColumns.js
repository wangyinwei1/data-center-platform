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
    case 'alarm':
    case 'logs':
      result = [
        {
          title: '工地宝ID',
          dataIndex: 'gdbId',
        },
        {
          title: '标签ID',
          dataIndex: 'chipId',
        },
        {
          title: '信息',
          dataIndex: 'message',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          render: (text, record, index) => {
            return <span>{moment(text).format('YYYY-MM-DD h:mm:ss')}</span>;
          },
        },
      ];
      break;
    case 'history':
      result = [
        {
          title: '工地宝ID',
          dataIndex: 'gdbId',
        },
        {
          title: '信号',
          dataIndex: 'distance',
        },
        {
          title: '电量',
          dataIndex: 'elec',
        },
        {
          title: '采集时间',
          dataIndex: 'time',
          render: (text, record, index) => {
            return <span>{moment(text).format('YYYY-MM-DD h:mm:ss')}</span>;
          },
        },
      ];
      break;
  }
  return result;
};

export default columns;
