import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip} from 'antd';
import columnData from './childColumns.js';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = ({getChecked, _this}) => {
  return [
    {
      title: '巡检时间',
      dataIndex: 'createTime',
    },
    {
      title: '备注',
      dataIndex: 'des',
    },
    {
      title: '巡检查看',
      dataIndex: '',
      render: (text, record, index) => {
        return (
          <div onClick={getChecked ? getChecked.bind(_this, record) : () => {}}>
            <i
              className={classnames(
                'icon iconfont icon-xiangqing',
                styles['checked'],
              )}
            />
          </div>
        );
      },
    },
  ];
};

export default columns;
