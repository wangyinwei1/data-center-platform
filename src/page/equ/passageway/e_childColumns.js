import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu, Icon} from 'antd';
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
      title: '端口号',
      dataIndex: 'port',
      width: '30%',
    },
    {
      title: '端口名称',
      dataIndex: 'portName',
      width: '30%',
    },
    {
      title: '端口备注',
      dataIndex: 'rec',
      width: '30%',
    },
  ];
};

export default columns;
