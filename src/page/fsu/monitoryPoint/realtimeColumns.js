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
const columns = ({controlClick, rest}) => {
  let options = [
    {
      title: '子设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '监控点名称',
      dataIndex: 'spName',
    },
    {
      title: '采集值',
      dataIndex: 'value',
    },
    {
      title: '单位',
      dataIndex: 'spUnit',
    },
    {
      title: '采集时间',
      dataIndex: 'recordTime',
    },
  ];
  rest[0] &&
    rest[0].name === '遥测' &&
    options.push({
      title: '控制',
      dataIndex: '',
      width: '8%',
      render: (text, record, index) => {
        // if (record.isConcentrator === 1) return null;
        return (
          <i
            className={classnames(
              'icon iconfont icon-tiaoshi',
              styles['icon_style'],
            )}
            onClick={controlClick.bind(_this, record)}
          />
        );
      },
    });
  return options;
};

export default columns;
