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
const columns = ({deleteClick, editClick, getChildTable}) => {
  let arr = [
    {
      title: '设备名称',
      dataIndex: 'chipName',
      className: 'cl_header_padding',
      width: '18%',
    },
    {
      title: '设备ID',
      dataIndex: 'chipId',
      className: 'cl_header_padding',
      width: '18%',
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '18%',
      render: (text, record, index) => {
        return <span>{record.state === 1 ? '正常' : '异常'}</span>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      className: 'cl_header_padding',
      width: '18%',
      render: (text, record, index) => {
        return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
      },
    },
  ];
  arr.push({
    title: '操作',
    width: '28%',
    dataIndex: '',
    className: 'information_th',
    render: (text, record, index) => {
      return (
        <span className={styles['tag-operation']}>
          <span
            onClick={() => {
              getChildTable(record, 'history');
            }}>
            历史数据
          </span>
          <Divider type="vertical" />
          <span
            onClick={() => {
              getChildTable(record, 'logs');
            }}>
            日志
          </span>
          <Divider type="vertical" />
          <span
            onClick={() => {
              getChildTable(record, 'alarm');
            }}>
            告警
          </span>
          <Divider type="vertical" />
          <span
            onClick={() => {
              editClick(record);
            }}>
            编辑
          </span>
          <Divider type="vertical" />
          <span
            onClick={() => {
              deleteClick(record);
            }}>
            删除
          </span>
        </span>
      );
    },
  });
  return arr;
};

export default columns;
