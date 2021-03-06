import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip} from 'antd';
import columnData from './childColumns.js';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = () => {
  return [
    {
      title: '通道编号',
      dataIndex: 'channelId',
    },
    {
      title: '通道名称',
      dataIndex: 'channelName',
    },
    {
      title: '采集值',
      dataIndex: 'value',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '采集时间',
      dataIndex: 'RecordTime',
    },
  ];
};

export default columns;
