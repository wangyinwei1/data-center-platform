import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu} from 'antd';
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
      {record.F_Status !== '待确认' &&
        record.F_Status !== '已处理' && (
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
      {record.F_Status !== '已处理' &&
        record.F_Status !== '待处理' &&
        record.F_Status !== '已确认' && (
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
      {record.F_Status !== '已处理' && (
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
      title: '等级',
      dataIndex: 'F_LevID',
      width: '5%',
      className: 'information_th',
      render: (text, record, index) => {
        return (
          <i
            className={classnames(
              'icon iconfont icon-huodonggaojing',
              styles['list_icon'],
              styles[`color${text}`],
            )}
          />
        );
      },
    },
    {
      title: '信息',
      width: '10%',
      dataIndex: 'F_AlarmDesc',
      className: 'information_th',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '告警值',
      width: '5%',
      className: 'information_th',
      dataIndex: 'F_TriggerVal',
    },
    {
      title: '时间',
      className: 'information_th',
      dataIndex: 'F_StartTime',
      width: '7%',
      render: (text, record, index) => {
        const value = text.split(' ');
        return (
          <div className={styles['list_time']}>
            <span>{value[0]}</span>
            <span>{value[1]}</span>
          </div>
        );
      },
    },
    {
      title: '告警ID',
      className: 'information_th',
      dataIndex: 'F_SerialNo',
      width: '6%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: 'FSU设备名称',
      dataIndex: 'F_Name',
      className: 'information_th',
      width: '9%',
      render: (text, record, index) => {
        return (
          <TextOverflow inlay={true}>
            <i
              className={classnames(
                'icon iconfont',
                record.connectType == 0
                  ? `icon-beidong ${styles['icon_passive']}`
                  : `icon-zhudong ${styles['icon_active']}`,
                styles['connectType'],
              )}
            />
            {text}
          </TextOverflow>
        );
      },
    },
    {
      title: '子设备名称',
      dataIndex: 'sonDeviceName',
      className: 'information_th',
      width: '9%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '监控点名称',
      dataIndex: 'F_SpName',
      className: 'information_th',
      width: '9%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '区域路径',
      dataIndex: 'areaPath',
      className: 'information_th',
      width: '12%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: 'FSU设备ID',
      width: '8%',
      dataIndex: 'F_SuID',
      className: 'information_th',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '子设备ID',
      width: '6%',
      dataIndex: 'sonDeviceId',
      className: 'information_th',
    },
    {
      title: '监控点ID',
      width: '6%',
      dataIndex: 'F_SpID',
      className: 'information_th',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '状态',
      width: '5%',
      className: 'information_th',
      dataIndex: 'F_Status',
    },
    {
      title: '操作',
      width: '7%',
      className: 'information_th',
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
