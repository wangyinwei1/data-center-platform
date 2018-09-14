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
const menu = ({editClick, deleteClick, detailClick, _this, record}) => {
  return (
    <Menu className={styles['operation']}>
      <Menu.Item key="c_detail" onClick={detailClick.bind(_this, record)}>
        <div className={styles['detail']}>
          <i className={classnames('icon iconfont icon-bianji')} />
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
const columns = ({deleteClick, editClick, detailClick, _this}) => {
  return [
    {
      title: '通道ID',
      width: '20%',
      dataIndex: 'channelID',
    },
    {
      title: '计算模式',
      width: '10%',
      dataIndex: 'calculateType',
      render: (text, record, index) => {
        const type = [
          {name: '多通道拼接', value: 1},
          {name: '多通道匹配', value: 2},
          {name: '多通道计算', value: 3},
          {name: '逻辑运算', value: 4},
          {name: '单通道累计时长', value: 5},
          {name: '单通道累计次数', value: 6},
        ];
        const currentType = type.filter(item => {
          return item.value === text;
        });

        return currentType[0] ? currentType[0].name : '';
      },
    },
    {
      title: '关联通道',
      width: '30%',
      dataIndex: 'relateChannelName',
    },
    {
      title: '表达式',
      width: '30%',
      dataIndex: 'expression',
    },
    {
      title: '操作',
      dataIndex: '',
      width: '10%',
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
};

export default columns;
