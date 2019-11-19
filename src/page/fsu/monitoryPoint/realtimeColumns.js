import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip} from 'antd';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = ({_this, controlClick, remoteControlClick, rest}) => {
  let options = [
    {
      title: '监控点名称',
      dataIndex: 'spName',
      render: (text, record, index) => {
        return !text ? '-' : text;
      },
    },
    {
      title: '采集值',
      dataIndex: 'value',
      render: (text, record, index) => {
        return !text ? '-' : text;
      },
    },
    {
      title: '单位',
      dataIndex: 'spUnit',
      render: (text, record, index) => {
        return !text ? '-' : text;
      },
    },
    {
      title: '采集时间',
      dataIndex: 'recordTime',
      render: (text, record, index) => {
        return !text ? '-' : text;
      },
    },
  ];
  options.push({
    title: '操作',
    dataIndex: '',
    width: '12%',
    render: (text, record, index) => {
      let name = record.spTypeName;
      let currentText = '';
      let handleClick = null;
      let notAllowed = false;
      switch (name) {
        case '遥调':
        case '遥测告警':
        case '遥信告警':
          currentText = '遥调';
          if (JSON.parse(localStorage.getItem('FsuTypeID')) !== 2) {
            notAllowed = true;
          } else {
            handleClick = remoteControlClick;
          }
          break;
        case '遥控':
          currentText = name;
          handleClick = controlClick;
          break;

        default:
          currentText = '-';
          break;
      }
      return (
        <span
          className={classnames(
            styles['icon_style'],
            notAllowed && styles['not-allowed'],
          )}
          onClick={handleClick ? handleClick.bind(_this, record) : null}>
          <i
            className={classnames(
              'icon iconfont icon-tiaoshi',
              styles['pd-right'],
              currentText === '-' && styles['dis-none'],
            )}
          />
          <span>{currentText}</span>
        </span>
      );
    },
  });
  return options;
};

export default columns;
