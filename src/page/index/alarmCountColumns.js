import React, {Component} from 'react';
import styles from './index.less';
import {Tooltip, Dropdown, Menu} from 'antd';
import TextOverflow from '../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = ({getAlarmTable, _this}) => {
  return [
    {
      title: '设备名称',
      width: '25%',

      dataIndex: 'F_DeviceName',
    },
    {
      title: '设备ID',
      width: '15%',
      dataIndex: 'F_DeviceID',
    },
    {
      title: '告警数',
      dataIndex: 'alarmCount',
      width: '25%',
      render: (text, record, dex) => {
        return (
          <a
            className={styles['child_link']}
            onClick={
              getAlarmTable ? getAlarmTable.bind(_this, record) : () => {}
            }>
            {text}
          </a>
        );
      },
    },
    {
      title: '所属区域',
      dataIndex: 'areaPath',
      width: '35%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
  ];
};

export default columns;
