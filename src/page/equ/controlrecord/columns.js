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
      dataIndex: 'devName',
    },
    {
      title: '通道名称',
      dataIndex: 'channelName',
    },
    {
      title: '控制人',
      dataIndex: 'userName',
    },
    {
      title: '控制值',
      width: '10%',
      dataIndex: 'controlValue',
    },
    {
      title: '控制时间',
      dataIndex: 'controlTime',
    },
    {
      title: '控制结果',
      dataIndex: 'result',
    },
  ];
};

export default columns;
