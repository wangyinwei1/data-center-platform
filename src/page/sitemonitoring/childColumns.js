import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu} from 'antd';
import columnData from './childColumns.js';
import TextOverflow from '../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({
  endClick,
  handleClick,
  cancelClick,
  confirmClick,
  _this,
  record,
}) => {
  return (
    <Menu className={styles['operation']}>
      {record.status !== '待确认' &&
        record.status !== '已处理' && (
          <Menu.Item key="handle" onClick={handleClick.bind(_this, record)}>
            <div className={styles['handle']}>
              <i
                className={classnames(
                  'icon iconfont icon-chuli',
                  styles['handle_alarm'],
                )}
              />
              <span>处理告警</span>
            </div>
          </Menu.Item>
        )}
      {record.status !== '已处理' &&
        record.status !== '待处理' &&
        record.status !== '已确认' && (
          <Menu.Item key="confirm" onClick={confirmClick.bind(_this, record)}>
            <div className={styles['confirm']}>
              <i
                className={classnames(
                  'icon iconfont icon-queren',
                  styles['confirm_alarm'],
                )}
              />
              <span>确认告警</span>
            </div>
          </Menu.Item>
        )}
      {record.status !== '已处理' && (
        <Menu.Item key="cancel" onClick={cancelClick.bind(_this, record)}>
          <div className={styles['cancel']}>
            <i
              className={classnames(
                'icon iconfont icon-quxiao',
                styles['cancel_alarm'],
              )}
            />
            <span>取消告警</span>
          </div>
        </Menu.Item>
      )}
      <Menu.Item key="end" onClick={endClick.bind(_this, record)}>
        <div className={styles['end']}>
          <i
            className={classnames(
              'icon iconfont icon-jieshu',
              styles['end_alarm'],
            )}
          />
          <span>结束告警</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};
const columns = ({endClick, handleClick, cancelClick, confirmClick, _this}) => {
  return [
    {
      title: '告警编号',
      dataIndex: 'alarmID',
      width: '15%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '通道名称',
      width: '13%',
      dataIndex: 'channelName',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '告警值',
      dataIndex: 'value',
      width: '8%',
    },
    {
      title: '告警时间',
      dataIndex: 'startTime',
      width: '18%',
    },
    {
      title: '告警信息',
      dataIndex: 'alarmMsg',
      width: '16%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '告警等级',
      dataIndex: 'alarmGrade',
      width: '9%',
    },
    {
      title: '状态',
      width: '8%',
      dataIndex: 'status',
    },
    {
      title: '操作',
      width: '8%',
      dataIndex: '',
      render: (text, record, index) => {
        return (
          <Dropdown
            overlay={menu({
              endClick,
              handleClick,
              cancelClick,
              confirmClick,
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
