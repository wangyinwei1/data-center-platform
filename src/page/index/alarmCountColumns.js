import React, {Component} from 'react';
import styles from './index.less';
import {Tooltip, Dropdown, Menu} from 'antd';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = () => {
  return [
    {
      title: '设备名称',
      dataIndex: 'F_DeviceName',
    },
    {
      title: '设备ID',
      dataIndex: 'F_DeviceID',
    },
    {
      title: '告警数',
      dataIndex: 'alarmCount',
    },
    {
      title: '所属区域',
      dataIndex: 'areaPath',
    },
  ];
};

export default columns;
