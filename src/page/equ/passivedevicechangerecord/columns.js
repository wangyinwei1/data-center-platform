import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip} from 'antd';
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
      title: '设备名称',
      dataIndex: 'F_DeviceName',
    },
    {
      title: '新端口',
      dataIndex: 'F_NewPort',
    },
    {
      title: '新IP',
      dataIndex: 'F_NewIP',
    },
    {
      title: '旧端口',
      dataIndex: 'F_OldPort',
    },
    {
      title: '旧IP',
      dataIndex: 'F_OldIP',
    },
    {
      title: '状态',
      dataIndex: 'F_Status',
    },
    {
      title: '操作人',
      dataIndex: 'NAME',
    },
    {
      title: '修改时间',
      dataIndex: 'F_UpdateTime',
    },
  ];
};

export default columns;
