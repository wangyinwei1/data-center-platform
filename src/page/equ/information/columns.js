import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu, Icon} from 'antd';
import TextOverflow from '../../../components/TextOverflow';
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
  disableClick,
  _this,
  record,
  addLevelOneClick,
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
      <Menu.Item key="c_disable" onClick={disableClick.bind(_this, record)}>
        <div className={styles['disable']}>
          <i className={classnames('icon iconfont icon-jinyong')} />
          <span>{record.status === 1 ? '启用' : '禁用'}</span>
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
const columns = ({
  deleteClick,
  realtimeClick,
  historyClick,
  controlClick,
  editClick,
  rumorClick,
  disableClick,
  addLevelOneClick,
  getAlarmTable,
  detailClick,
  _this,
}) => {
  return [
    {
      title: '设备名称',
      dataIndex: 'devName',
      width: '20%',
      className: 'information_th',
      render: (text, record, index) => {
        return (
          <div>
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
          </div>
        );
      },
    },
    {
      title: '设备别名',
      dataIndex: 'rec',
      width: '12%',
      className: 'information_th',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '设备类型',
      dataIndex: 'typeName',
      className: 'information_th',
      width: '16%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '所属站点',
      dataIndex: 'stationName',
      className: 'information_th',
      width: '20%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '实时',
      dataIndex: '',
      className: 'information_th',
      width: '5%',
      render: (text, record, index) => {
        return (
          <i
            className={classnames(
              'icon iconfont icon-shishishuju',
              styles['icon_style'],
            )}
            onClick={realtimeClick.bind(_this, record)}
          />
        );
      },
    },
    {
      title: '历史',
      dataIndex: '',
      className: 'information_th',
      width: '5%',
      render: (text, record, index) => {
        return (
          <i
            className={classnames(
              'icon iconfont icon-lishishuju',
              styles['icon_style'],
            )}
            onClick={historyClick.bind(_this, record)}
          />
        );
      },
    },
    {
      title: '告警',
      width: '5%',
      className: 'information_th',
      dataIndex: 'alerm_count',
      render: (text, record, dex) => {
        return (
          <a
            className={styles['child_link']}
            onClick={
              getAlarmTable ? getAlarmTable.bind(_this, record) : () => {}
            }>
            {text}
          </a>
        );
      },
    },
    {
      title: '控制',
      dataIndex: '',
      className: 'information_th',
      width: '5%',
      render: (text, record, index) => {
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
    },
    {
      title: '遥调',
      dataIndex: '',
      width: '5%',
      className: 'information_th',
      render: (text, record, index) => {
        return (
          <i
            className={classnames(
              'icon iconfont icon-yaotiao',
              styles['icon_style'],
            )}
            onClick={rumorClick.bind(_this, record)}
          />
        );
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
              editClick,
              deleteClick,
              detailClick,
              addLevelOneClick,
              disableClick,
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
