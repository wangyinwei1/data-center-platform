import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu} from 'antd';
import columnData from './childColumns.js';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({
  editClick,
  deleteClick,
  detailClick,
  alarmClick,
  _this,
  record,
}) => {
  return (
    <Menu className={styles['operation']}>
      <Menu.Item key="c_detail" onClick={detailClick.bind(_this, record)}>
        <div className={styles['detail']}>
          <i className={classnames('icon iconfont icon-xiangqing')} />
          <span>详情</span>
        </div>
      </Menu.Item>
      <Menu.Item key="c_edit" onClick={editClick.bind(_this, record)}>
        <div className={styles['edit']}>
          <i className={classnames('icon iconfont icon-bianji')} />
          <span>编辑</span>
        </div>
      </Menu.Item>
      {record.isConcentrator === 0 && (
        <Menu.Item key="c_disable" onClick={disableClick.bind(_this, record)}>
          <div className={styles['disable']}>
            <i className={classnames('icon iconfont icon-jinyong')} />
            <span>{record.status === 1 ? '启用' : '禁用'}</span>
          </div>
        </Menu.Item>
      )}
      <Menu.Item key="c_delete" onClick={deleteClick.bind(_this, record)}>
        <div className={styles['delete']}>
          <i className={classnames('icon iconfont icon-shanchu')} />
          <span>删除</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};
const columns = ({editClick, deleteClick, alarmClick, detailClick, _this}) => {
  return [
    {
      title: '通道ID',
      dataIndex: 'channelID',
    },
    {
      title: '通道名称',
      dataIndex: 'channelName',
    },
    {
      title: '通道类型',
      dataIndex: 'channelTypeName',
    },
    {
      title: '值类型',
      dataIndex: 'valueType',
    },
    {
      title: '值倍率',
      dataIndex: 'ratio',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '显示精度',
      dataIndex: 'showPrecision',
    },
    {
      title: '阀值',
      dataIndex: 'threshold',
    },
    {
      title: '状态',
      dataIndex: '',
      render: (text, record, index) => {
        return record.status == 0 ? '显示' : '不显示';
      },
    },
    {
      title: '操作',
      width: '8%',
      dataIndex: '',
      render: (text, record, index) => {
        return (
          <Dropdown
            overlay={menu({
              editClick,
              alarmClick,
              deleteClick,
              detailClick,
              _this,
              record,
            })}
            placement={'bottomCenter'}
            trigger={['click']}>
            <i
              className={classnames(
                'icon iconfont icon-gengduo',
                styles['more'],
              )}
            />
          </Dropdown>
        );
      },
    },
  ];
};

export default columns;
