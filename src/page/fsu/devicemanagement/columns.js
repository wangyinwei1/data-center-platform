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
  _this,
  record,
  disableClick,
  addLevelOneClick,
}) => {
  return (
    <Menu className={styles['operation']}>
      <Menu.Item key="c_add" onClick={addLevelOneClick.bind(_this, record)}>
        <div className={styles['add_child']}>
          <i className={classnames('icon iconfont icon-xinzeng')} />
          <span>新增</span>
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
  disableClick,
  editClick,
  rumorClick,
  addLevelOneClick,
  detailClick,
  getAlarmTable,
  _this,
}) => {
  return [
    {
      title: 'FSU编号',
      dataIndex: 'suID',
      width: '15%',
      className: 'information_th',
      render: (text, record, index) => {
        return <TextOverflow inlay={true}>{text}</TextOverflow>;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: '12%',
      className: 'information_th',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: 'IP',
      dataIndex: 'suIP',
      className: 'information_th',
      width: '11%',
    },
    {
      title: '端口',
      dataIndex: 'suPort',
      className: 'information_th',
      width: '6%',
    },
    {
      title: '所属区域',
      dataIndex: 'stationName',
      className: 'information_th',
      width: '25%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '告警',
      width: '5%',
      className: 'information_th',
      dataIndex: 'alerm_count',
      render: (text, record, index) => {
        return (
          <a
            className={styles['child_link']}
            onClick={
              record.isConcentrator !== 1 &&
              (getAlarmTable ? getAlarmTable.bind(_this, record) : () => {})
            }>
            {record.isConcentrator === 1 ? null : text}
          </a>
        );
      },
    },
    {
      title: '实时',
      dataIndex: '',
      className: 'information_th',
      width: '5%',
      render: (text, record, index) => {
        if (record.isConcentrator === 1) return null;
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
        if (record.isConcentrator === 1) return null;
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
      title: '控制',
      dataIndex: '',
      className: 'information_th',
      width: '5%',
      render: (text, record, index) => {
        if (record.isConcentrator === 1) return null;
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
