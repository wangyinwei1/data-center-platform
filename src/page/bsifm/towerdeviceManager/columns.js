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
const menu = ({editClick, issuedClick, remoteClick, deleteClick, record}) => {
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
        key="c_issued"
        onClick={() => {
          issuedClick(record);
        }}>
        <div className={styles['delete']}>
          <i className={classnames('icon iconfont icon-daochu2')} />
          <span>下发命令</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="c_remote_restart"
        onClick={() => {
          remoteClick(record, 'rrpc,reboot');
        }}>
        <div className={styles['delete']}>
          <i className={classnames('icon iconfont icon-zhongqi')} />
          <span>远程重启</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="c_remote_update"
        onClick={() => {
          remoteClick(record, 'rrpc,upconfig');
        }}>
        <div className={styles['delete']}>
          <i className={classnames('icon iconfont icon-biaoshilei_xiaoshi')} />
          <span>远程更新</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="c_get_version"
        onClick={() => {
          remoteClick(record, 'rrpc,getver');
        }}>
        <div className={styles['delete']}>
          <i
            className={classnames('icon iconfont icon-cebianlanxunjianjilu')}
          />
          <span>获取固件版本</span>
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
  issuedClick,
  getChildTable,
  historyClick,
  remoteClick,
  _this,
}) => {
  let arr = [
    {
      title: '设备ID',
      dataIndex: 'meternum',
      width: '12%',
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
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '通信模组',
      dataIndex: 'imei',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '6%',
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
      title: '版本号',
      dataIndex: 'version',
      width: '8%',
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      render: (text, record, index) => {
        return (
          <div style={{lineHeight: '24px'}}>
            {isNaN(text) ? '-' : moment(text).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        );
      },
    },
  ];
  arr.push({
    title: '数据查看',
    width: '8%',
    dataIndex: '',
    className: 'information_th',
    render: (text, record, index) => {
      return (
        <span>
          <span>
            <Tooltip placement="top" title={'告警数据'}>
              <i
                className={classnames(
                  'icon iconfont icon-jinggao',
                  classnames(styles['icon_style'], styles['alarm']),
                )}
                onClick={historyClick.bind(_this, record, 'alarmInfo')}
              />
            </Tooltip>

            <Tooltip placement="top" title={'电能数据'}>
              <i
                className={classnames(
                  'icon iconfont icon-nenghaoshuju',
                  classnames(styles['icon_style'], styles['energy']),
                )}
                onClick={historyClick.bind(_this, record, 'electricEnergy')}
              />
            </Tooltip>

            <Tooltip placement="top" title={'电量数据'}>
              <i
                className={classnames(
                  'icon iconfont icon-lishishuju',
                  styles['icon_style'],
                )}
                onClick={historyClick.bind(_this, record, 'electricQuantity')}
              />
            </Tooltip>
          </span>
        </span>
      );
    },
  });
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
            issuedClick,
            remoteClick,
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
