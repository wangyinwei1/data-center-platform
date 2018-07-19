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
const columns = ({deleteClick, editClick, _this}) => {
  return [
    {
      title: '序号',
      dataIndex: 'num',
    },
    {
      title: '设备大类',
      dataIndex: 'F_CategoryName',
    },
    {
      title: '操作',
      width: 100,
      dataIndex: '',
      render: (text, record, index) => {
        return (
          <div className={styles['operation']}>
            <div className={styles['edit']}>
              <Tooltip title="编辑">
                <i
                  className={classnames('icon iconfont icon-bianji')}
                  onClick={editClick.bind(_this, record)}
                />
              </Tooltip>
            </div>
            <div className={styles['delete']}>
              <Tooltip title="删除">
                <i
                  className={classnames('icon iconfont icon-shanchu')}
                  onClick={deleteClick.bind(_this, record)}
                />
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];
};

export default columns;
