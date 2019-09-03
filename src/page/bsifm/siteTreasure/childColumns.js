import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import moment from 'moment';
import {Tooltip, Divider} from 'antd';
import columnData from './childColumns.js';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = () => {
  let arr = [
    {
      title: '标签名称',
      dataIndex: 'chipName',
      className: 'cl_header_padding',
      width: '25%',
    },
    {
      title: '标签ID',
      dataIndex: 'chipId',
      className: 'cl_header_padding',
      width: '25%',
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '25%',
      render: (text, record, index) => {
        return <span>{record.state === 1 ? '采集中...' : '未采集'}</span>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      className: 'cl_header_padding',
      width: '25%',
      render: (text, record, index) => {
        return <span>{moment(text).format('YYYY-MM-DD h:mm:ss')}</span>;
      },
    },
  ];
  arr.push({
    title: '操作',
    width: '10%',
    dataIndex: '',
    className: 'information_th',
    render: (text, record, index) => {
      return (
        <span>
          <span>日志</span>
          <Divider type="vertical" />
          <span>告警</span>
        </span>
      );
    },
  });
  return arr;
};

export default columns;
