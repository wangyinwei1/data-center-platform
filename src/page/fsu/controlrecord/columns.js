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
      title: 'FSU编号',
      dataIndex: 'suID',
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
      title: '控制人',
      dataIndex: 'userName',
    },
    {
      title: '控制值',
      dataIndex: 'controlValue',
    },
    {
      title: '控制时间',
      dataIndex: 'operatTime',
    },
    {
      title: '控制结果',
      dataIndex: 'result',
    },
  ];
};

export default columns;
