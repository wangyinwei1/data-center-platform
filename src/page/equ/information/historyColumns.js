import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = () => {
  return [
    {
      title: '时间',
      className: 'history_table_th',
      width: '50%',
      dataIndex: 'recordTime',
    },
    {
      title: '采集值',
      width: '50%',
      className: 'history_table_th',
      dataIndex: 'value',
    },
  ];
};

export default columns;
