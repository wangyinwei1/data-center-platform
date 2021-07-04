import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu, Icon} from 'antd';
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
      title: '监控点ID',
      dataIndex: 'spID',
    },
    {
      title: '监控点名称',
      dataIndex: 'spName',
    },
    {
      title: '监控点类型',
      dataIndex: 'signalName',
    },
  ];
};

export default columns;
