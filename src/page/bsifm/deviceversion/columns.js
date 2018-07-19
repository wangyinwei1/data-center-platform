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
const columns = ({
  deleteClick,
  getBasicTable,
  getAgreementTable,
  editClick,
  _this,
}) => {
  return [
    {
      title: '父级设备',
      dataIndex: 'F_CategoryName',
    },
    {
      title: '设备类型',
      dataIndex: 'F_TypeName',
    },
    {
      title: '软件版本',
      dataIndex: 'F_SoftVersion',
    },
    {
      title: '硬件版本',
      dataIndex: 'F_HardVersion',
    },
    {
      title: '通道数',
      dataIndex: 'F_Count',
      render: (text, record, dex) => {
        return (
          <a
            className={styles['child_link']}
            onClick={
              getBasicTable ? getBasicTable.bind(_this, record) : () => {}
            }>
            {record.F_Count}
          </a>
        );
      },
    },
    {
      title: '使用协议',
      dataIndex: 'F_Name',
      render: (text, record, dex) => {
        return (
          <a
            className={styles['child_link']}
            onClick={
              getAgreementTable
                ? getAgreementTable.bind(_this, record)
                : () => {}
            }>
            {record.F_Name}
          </a>
        );
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
