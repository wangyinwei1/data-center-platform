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
const menu = ({editClick, deleteClick, _this, record}) => {
  return (
    <Menu className={styles['operation']}>
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
const columns = ({deleteClick, editClick, _this}) => {
  return [
    {
      title: '告警内容',
      dataIndex: 'alarmMsg',
    },
    {
      title: '告警等级',
      dataIndex: 'levID',
      render: (text, record, index) => {
        let grade = [
          {level: 'CRITICAL', levID: 1},
          {level: 'MAJOR', levID: 2},
          {level: 'MINOR', levID: 3},
          {level: 'HINT', levID: 4},
        ];
        let current = grade.filter(item => {
          return item.levID === text;
        });

        return current[0] ? current[0].level : '-';
      },
    },
    {
      title: '操作',
      dataIndex: '',
      className: 'information_th',
      render: (text, record, index) => {
        return (
          <Dropdown
            overlay={menu({
              editClick,
              deleteClick,
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
