import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu, Icon} from 'antd';
import columnData from './childColumns.js';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const menu = ({
  editClick,
  addClick,
  deleteClick,
  detailClick,
  _this,
  record,
}) => {
  return (
    <Menu className={styles['operation']}>
      <Menu.Item key="c_add" onClick={addClick.bind(_this, record)}>
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
      <Menu.Item key="c_delete" onClick={deleteClick.bind(_this, record)}>
        <div className={styles['delete']}>
          <i className={classnames('icon iconfont icon-shanchu')} />
          <span>删除</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};
const columns = ({editClick, deleteClick, addClick, detailClick, _this}) => {
  return [
    {
      title: '端口号',
      dataIndex: 'port',
      width: '30%',
    },
    {
      title: '端口名称',
      dataIndex: 'portName',
      width: '30%',
    },
    {
      title: '端口备注',
      dataIndex: 'rec',
      width: '30%',
    },
    {
      title: '操作',
      width: '8%',
      dataIndex: '',
      render: (text, record, index) => {
        return (
          <Dropdown
            overlay={menu({
              editClick,
              deleteClick,
              detailClick,
              addClick,
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
