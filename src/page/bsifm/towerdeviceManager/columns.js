import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import moment from 'moment';
import {Tooltip, Dropdown, Menu} from 'antd';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({editClick, deleteClick, record}) => {
  return (
    <Menu className={styles['operation']}>
      <Menu.Item
        key="c_edit"
        onClick={() => {
          editClick(record);
        }}>
        <div className={styles['edit']}>
          <i className={classnames('icon iconfont icon-bianji')} />
          <span>编辑</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="c_delete"
        onClick={() => {
          deleteClick(record);
        }}>
        <div className={styles['delete']}>
          <i className={classnames('icon iconfont icon-shanchu')} />
          <span>删除</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};
const columns = ({
  deleteClick,
  editClick,
  getChildTable,
  historyClick,
  _this,
}) => {
  let arr = [
    {
      title: '设备ID',
      dataIndex: 'meternum',
      width: '8%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '站点名称',
      dataIndex: 'stationName',
    },
    {
      title: '物联卡ICCID',
      dataIndex: 'iccid',
    },
    {
      title: '采集间隔',
      dataIndex: 'interval',
    },
    {
      title: '通信模组',
      dataIndex: 'imei',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record, index) => {
        return <TextOverflow>{text === 1 ? '在线' : '离线'}</TextOverflow>;
      },
    },
    {
      title: '电表类型',
      dataIndex: 'metertype',
      render: (text, record, index) => {
        let type = {
          301: '三相智能电表',
          304: '三相多路智能电表',
          101: '单相单路智能电表',
          104: '单相多路智能电表',
          100: '直流电',
          200: '云拍',
        };

        return <span>{type[text]}</span>;
      },
    },
    {
      title: '通信模块类型',
      dataIndex: 'moduletype',
      render: (text, record, index) => {
        let type = {1: '4G', 2: 'NB', 3: '2G'};

        return <span>{type[text]}</span>;
      },
    },
    {
      title: '电量数据',
      dataIndex: '',
      className: 'information_th',
      width: '8%',
      render: (text, record, index) => {
        return (
          <i
            className={classnames(
              'icon iconfont icon-lishishuju',
              styles['icon_style'],
            )}
            onClick={historyClick.bind(_this, record, 'electricQuantity')}
          />
        );
      },
    },
    {
      title: '电能数据',
      dataIndex: '',
      className: 'information_th',
      width: '8%',
      render: (text, record, index) => {
        return (
          <i
            className={classnames(
              'icon iconfont icon-nenghaoshuju',
              classnames(styles['icon_style'], styles['energy']),
            )}
            onClick={historyClick.bind(_this, record, 'electricEnergy')}
          />
        );
      },
    },
    {
      title: '告警数据',
      dataIndex: '',
      className: 'information_th',
      width: '8%',
      render: (text, record, index) => {
        return (
          <i
            className={classnames(
              'icon iconfont icon-jinggao',
              classnames(styles['icon_style'], styles['alarm']),
            )}
            onClick={historyClick.bind(_this, record, 'alarmInfo')}
          />
        );
      },
    },
  ];
  arr.push({
    title: '操作',
    width: '6%',
    dataIndex: '',
    className: 'information_th',
    render: (text, record, index) => {
      return (
        <Dropdown
          overlay={menu({
            editClick,
            deleteClick,
            record,
          })}
          placement={'bottomCenter'}
          trigger={['click']}>
          <i
            className={classnames('icon iconfont icon-gengduo', styles['more'])}
          />
        </Dropdown>
      );
    },
  });
  return arr;
};

export default columns;
