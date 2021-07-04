import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu} from 'antd';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({confirmClick, _this, record}) => {
  return (
    <Menu className={styles['operation']}>
      <Menu.Item key="c_confirm" onClick={confirmClick.bind(_this, record)}>
        <div className={styles['detail']}>
          <i className={classnames('icon iconfont icon-xiangqing')} />
          <span>详情</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};
const columns = ({_this, confirmClick}) => {
  return [
    {
      title: '工单名称',
      dataIndex: 'name',
      width: '12%',
      render: (text, record, dex) => {
        return <TextOverflow>{record.name}</TextOverflow>;
      },
    },
    {
      title: '告警ID',
      dataIndex: 'alarmID',
      width: '12%',
      render: (text, record, dex) => {
        return <TextOverflow>{record.alarmID}</TextOverflow>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      width: '12%',
      render: (text, record, dex) => {
        return <TextOverflow>{record.createUserName}</TextOverflow>;
      },
    },
    {
      title: '执行人',
      dataIndex: 'userName',
      width: '12%',
      render: (text, record, dex) => {
        return <TextOverflow>{record.userName}</TextOverflow>;
      },
    },
    {
      title: '工单状态',
      dataIndex: 'taskState',
    },
    {
      title: '备注',
      width: '12%',
      dataIndex: 'des',
      render: (text, record, dex) => {
        return <TextOverflow>{record.des}</TextOverflow>;
      },
    },
    {
      title: '操作',
      width: '5%',
      dataIndex: '',
      className: 'information_th',
      render: (text, record, index) => {
        return (
          <Dropdown
            overlay={menu({
              _this,
              record,
              confirmClick,
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
