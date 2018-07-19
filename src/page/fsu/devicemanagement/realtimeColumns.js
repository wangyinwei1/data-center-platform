import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip} from 'antd';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = () => {
  return [
    {
      title: '子设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '监控点名称',
      dataIndex: 'spName',
    },
    {
      title: '采集值',
      dataIndex: 'value',
    },
    {
      title: '采集时间',
      dataIndex: 'recordTime',
    },
  ];
};

export default columns;
