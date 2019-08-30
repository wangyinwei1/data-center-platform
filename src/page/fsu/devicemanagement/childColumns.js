import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Button, Menu, Icon} from 'antd';
import columnData from './childColumns.js';
import TextOverflow from '../../../components/TextOverflow';
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
  exportClick,
  telemeteryClick,
  _this,
  record,
}) => {
  return (
    <Menu className={styles['operation']}>
      {/* <Menu.Item key="c_add" onClick={addClick.bind(_this, record)}> */}
      {/*   <div className={styles['add_child']}> */}
      {/*     <i className={classnames('icon iconfont icon-xinzeng')} /> */}
      {/*     <span>新增</span> */}
      {/*   </div> */}
      {/* </Menu.Item> */}
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
      {/* <Menu.Item */}
      {/*   key="c_telemetery" */}
      {/*   onClick={telemeteryClick.bind(_this, record)}> */}
      {/*   <div className={styles['edit']}> */}
      {/*     <i className={classnames('icon iconfont icon-bianji')} /> */}
      {/*     <span>遥测</span> */}
      {/*   </div> */}
      {/* </Menu.Item> */}
      {/* <Menu.Item key="c_export" onClick={exportClick.bind(_this, record)}> */}
      {/*   <div className={styles['edit']}> */}
      {/*     <i className={classnames('icon iconfont icon-daoru')} /> */}
      {/*     <span>导入</span> */}
      {/*   </div> */}
      {/* </Menu.Item> */}
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
  exportClick,
  deleteClick,
  addClick,
  detailClick,
  monitorClick,
  telemeteryClick,

  _this,
}) => {
  let options = [
    {
      title: '操作',
      width: '25%',
      dataIndex: '',
      render: (text, record, index) => {
        return (
          <div>
            <Button
              className={styles['btn']}
              onClick={monitorClick.bind(_this, record)}>
              <span>获取监控点</span>
            </Button>
            <Button
              className={styles['btn']}
              onClick={editClick.bind(_this, record)}>
              <span>编辑</span>
            </Button>
            <Button
              className={styles['btn']}
              onClick={detailClick.bind(_this, record)}>
              <span>详情</span>
            </Button>
            <Button
              className={styles['btn']}
              onClick={deleteClick.bind(_this, record)}>
              <span>删除</span>
            </Button>
          </div>
        );
      },
    },
  ];
  JSON.parse(localStorage.getItem('FsuTypeID')) === 3
    ? options.unshift(
        {
          title: '子设备ID',
          width: '15%',
          dataIndex: 'deviceID',
        },
        {
          title: '子设备名称',
          dataIndex: 'deviceName',
          width: '15%',
          render: (text, record, index) => {
            return <TextOverflow>{text}</TextOverflow>;
          },
        },
        {
          title: '机房名称',
          width: '15%',
          dataIndex: 'roomName',
        },
        {
          title: '模型',
          width: '15%',
          dataIndex: 'model',
        },
        {
          title: '品牌',
          width: '15%',
          dataIndex: 'brand',
        },
        {
          title: '额定功率',
          width: '15%',
          dataIndex: 'ratedCapacity',
        },
        {
          title: '描述',
          width: '15%',
          dataIndex: 'devDescribe',
        },
      )
    : options.unshift(
        {
          title: '子设备ID',
          dataIndex: 'deviceID',
          width: '30%',
        },
        {
          title: '子设备名称',
          dataIndex: 'deviceName',
          width: '30%',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: '30%',
        },
      );
  return options;
};

export default columns;
