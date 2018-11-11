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
const columns = ({getChildTable, _this}) => {
  return [
    {
      title: 'FSU编号',
      dataIndex: 'suID',
      width: '20%',
      render: (text, record, index) => {
        return (
          <a
            className={styles['child_link']}
            onClick={
              getChildTable ? getChildTable.bind(_this, record) : () => {}
            }>
            <TextOverflow link={true}>{record.suID}</TextOverflow>
          </a>
        );
      },
    },
    {
      title: 'FSU名称',
      dataIndex: 'name',
      width: '20%',
      render: (text, record, index) => {
        return (
          <div>
            <TextOverflow>{text}</TextOverflow>
          </div>
        );
      },
    },
    {
      title: 'IP',
      dataIndex: 'suIP',
      widht: '12%',
    },
    {
      title: '端口',
      dataIndex: 'suPort',
      widht: '5%',
    },
    {
      title: '告警',
      dataIndex: 'alerm_count',
      widht: '5%',
    },
    {
      title: '所属区域',
      dataIndex: 'stationName',
      width: '30%',
      render: (text, record, index) => {
        return (
          <div>
            <TextOverflow>{text}</TextOverflow>
          </div>
        );
      },
    },
  ];
};

export default columns;
