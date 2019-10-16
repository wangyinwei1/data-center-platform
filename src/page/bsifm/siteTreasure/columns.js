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
const menu = ({editClick, deleteClick, issuedInstructionsClick, record}) => {
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
        key="c_issued_instructions"
        onClick={() => {
          issuedInstructionsClick(record);
        }}>
        <div className={styles['delete']}>
          <i className={classnames('icon iconfont icon-daochu2')} />
          <span>下发指令</span>
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
  issuedInstructionsClick,
  editClick,
  getChildTable,
  getDeviceInfo,
  _this,
}) => {
  let arr = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: '12%',
      render: (text, record, index) => {
        const children = (
          <a
            className={styles['child_link']}
            onClick={
              getDeviceInfo ? getDeviceInfo.bind(_this, record) : () => {}
            }>
            {text}
          </a>
        );
        return <div>{children}</div>;
      },
    },
    {
      title: '设备ID',
      dataIndex: 'deviceId',
      width: '12%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: 'IMEI',
      dataIndex: 'imei',
      width: '10%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: 'IMSI',
      dataIndex: 'imsi',
      width: '10%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '12%',
      render: (text, record, index) => {
        return (
          <div style={{lineHeight: '22px'}}>
            {text === null ? '-' : moment(text).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        );
      },
    },
    {
      title: '最后上线时间',
      dataIndex: 'onlineAt',
      width: '12%',
      render: (text, record, index) => {
        return (
          <div style={{lineHeight: '22px'}}>
            {text === null ? '-' : moment(text).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        );
      },
    },
    {
      title: '最后离线时间',
      dataIndex: 'offlineAt',
      width: '12%',
      render: (text, record, index) => {
        return (
          <div style={{lineHeight: '22px'}}>
            {text === null ? '-' : moment(text).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'netStatus',
      width: '10%',
      render: (text, record, index) => {
        let obj = {
          0: '已注册',
          1: '已激活',
          2: '已注销',
        };
        return <span>{obj[text]}</span>;
      },
    },
  ];
  arr.push({
    title: '操作',
    width: '8%',
    dataIndex: '',
    className: 'information_th',
    render: (text, record, index) => {
      return (
        <Dropdown
          overlay={menu({
            editClick,
            deleteClick,
            issuedInstructionsClick,
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
