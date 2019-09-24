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
const columns = ({deleteClick, editClick, getChildTable, _this}) => {
  let arr = [
    {
      title: '网关ID',
      dataIndex: 'gdbId',
      width: '18%',
    },
    {
      title: '网关名称',
      dataIndex: 'name',
      width: '18%',
    },
    {
      title: '站点名称',
      dataIndex: 'stationName',
      width: '18%',
    },
    {
      title: '采集间隔',
      dataIndex: 'dataFilterTime',
      width: '18%',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '18%',
      render: (text, record, index) => {
        return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
      },
    },
  ];
  arr.push({
    title: '操作',
    width: '10%',
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
