import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu} from 'antd';
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
      <Menu.Item key="c_alarm" onClick={alarmClick.bind(_this, record)}>
        <div className={styles['alarm']}>
          <i className={classnames('icon iconfont icon-xiangqing')} />
          <span>告警</span>
        </div>
      </Menu.Item>
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
      dataIndex: 'F_ChannelID',
    },
    {
      title: '通道名称',
      dataIndex: 'F_ChannelName',
    },
    {
      title: '通道类型',
      dataIndex: 'F_ChannelTypeName',
    },
    {
      title: '值类型',
      dataIndex: 'F_ValueTypeName',
    },
    {
      title: '值倍率',
      dataIndex: 'F_Ratio',
    },
    {
      title: '单位',
      dataIndex: 'F_Unit',
    },
    {
      title: '显示精度',
      dataIndex: 'F_ShowPrecision',
    },
    {
      title: '阀值',
      dataIndex: 'F_Threshold',
    },
    {
      title: '状态',
      dataIndex: '',
      render: (text, record, index) => {
        return record.F_Status == 0 ? '显示' : '不显示';
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
