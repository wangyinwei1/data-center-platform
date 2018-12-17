import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu, Icon} from 'antd';
import columnData from './childColumns.js';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({editClick, deleteClick, detailClick, _this, record}) => {
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
  editClick,
  deleteClick,
  historyClick,
  realtimeClick,
  detailClick,
  controlClick,
  rumorClick,
  _this,
}) => {
  let options = [
    {
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
  JSON.parse(localStorage.getItem('FsuTypeID')) === 3
    ? options.unshift(
        {
          title: '监控点ID',
          dataIndex: 'spID',
          colSpan: 1,
          width: '15%',
          className: 'information_th',
        },
        {
          title: '监控点名称',
          dataIndex: 'spName',
          colSpan: 1,
          width: '15%',
          className: 'information_th',
        },
        {
          title: '告警等级',
          dataIndex: 'alarmLevel',
          colSpan: 1,
          width: '10%',
          className: 'information_th',
        },
        {
          title: '阈值',
          dataIndex: 'threshold',
          colSpan: 1,
          width: '15%',
          className: 'information_th',
        },
        {
          title: '绝对值',
          dataIndex: 'absoluteVal',
          colSpan: 1,
          className: 'information_th',
          width: '15%',
        },
        {
          title: '相对值',
          dataIndex: 'relativeVal',
          colSpan: 1,
          width: '15%',
          className: 'information_th',
        },
        {
          title: '描述',
          dataIndex: 'describe',
          colSpan: 1,
          width: '15%',
          className: 'information_th',
        },
      )
    : options.unshift(
        {
          title: '监控点ID',
          dataIndex: 'spID',
          colSpan: 1,
          width: '15%',
          render: (text, record, index) => {
            return <TextOverflow>{text}</TextOverflow>;
          },
          className: 'information_th',
        },
        {
          title: '名称',
          dataIndex: 'spName',
          colSpan: 1,
          width: '20%',
          className: 'information_th',
        },
        {
          title: '单位',
          dataIndex: 'spUnit',
          colSpan: 1,
          width: '15%',
          className: 'information_th',
        },
        {
          title: '类型',
          dataIndex: 'spTypeName',
          className: 'information_th',
          colSpan: 1,
          width: '15%',
        },
        {
          title: '归属类型',
          dataIndex: 'optionName',
          colSpan: 1,
          width: '15%',
          className: 'information_th',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          colSpan: 1,
          className: 'information_th',
          width: '20%',
        },
      );

  return options;
};

export default columns;
