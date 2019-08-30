import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Button, Dropdown, Menu, Icon} from 'antd';
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
  exportMonitor,
  portInfoClick,
  exportSub,
  addLevelOneClick,
  fsuStatusClick,
  restartClick,
  fsuSetTimeClick,
  monitorClick,
  subDevClick,
}) => {
  return (
    <Menu className={styles['operation']}>
      {/* <Menu.Item key="c_add" onClick={addLevelOneClick.bind(_this, record)}> */}
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
      <Menu.Item key="c_subdev" onClick={subDevClick.bind(_this, record)}>
        <div className={styles['edit']}>
          <i className={classnames('icon iconfont icon-xiangqing')} />
          <span>获取子设备</span>
        </div>
      </Menu.Item>
      <Menu.Item key="c_monitor" onClick={monitorClick.bind(_this, record)}>
        <div className={styles['edit']}>
          <i className={classnames('icon iconfont icon-xiangqing')} />
          <span>获取监控点</span>
        </div>
      </Menu.Item>
      {/* {JSON.parse(localStorage.getItem('FsuTypeID')) === 2 && ( */}
      {/*   <Menu.Item key="c_restart" onClick={restartClick.bind(_this, record)}> */}
      {/*     <div className={styles['edit']}> */}
      {/*       <i className={classnames('icon iconfont icon-bianji')} /> */}
      {/*       <span>重启</span> */}
      {/*     </div> */}
      {/*   </Menu.Item> */}
      {/* )} */}
      {/* {JSON.parse(localStorage.getItem('FsuTypeID')) === 2 && ( */}
      {/*   <Menu.Item key="c_portInfo" onClick={portInfoClick.bind(_this, record)}> */}
      {/*     <div className={styles['edit']}> */}
      {/*       <i className={classnames('icon iconfont icon-bianji')} /> */}
      {/*       <span>获取端口信息</span> */}
      {/*     </div> */}
      {/*   </Menu.Item> */}
      {/* )} */}
      {/* {JSON.parse(localStorage.getItem('FsuTypeID')) === 2 && ( */}
      {/*   <Menu.Item */}
      {/*     key="c_fsuSetTime" */}
      {/*     onClick={fsuSetTimeClick.bind(_this, record)}> */}
      {/*     <div className={styles['edit']}> */}
      {/*       <i className={classnames('icon iconfont icon-bianji')} /> */}
      {/*       <span>校时</span> */}
      {/*     </div> */}
      {/*   </Menu.Item> */}
      {/* )} */}
      {/* <Menu.Item key="c_disable" onClick={disableClick.bind(_this, record)}> */}
      {/*   <div className={styles['disable']}> */}
      {/*     <i className={classnames('icon iconfont icon-jinyong')} /> */}
      {/*     <span>{record.status === 1 ? '启用' : '禁用'}</span> */}
      {/*   </div> */}
      {/* </Menu.Item> */}
      {/* <Menu.Item key="c_status" onClick={fsuStatusClick.bind(_this, record)}> */}
      {/*   <div className={styles['fsu_status']}> */}
      {/*     <i className={classnames('icon iconfont icon-shebeizhuangtai')} /> */}
      {/*     <span>状态</span> */}
      {/*   </div> */}
      {/* </Menu.Item> */}
      {/* <Menu.Item key="c_exportSub" onClick={exportSub.bind(_this, record)}> */}
      {/*   <div className={styles['export_sub']}> */}
      {/*     <i className={classnames('icon iconfont icon-daochu2')} /> */}
      {/*     <span>导出子设备</span> */}
      {/*   </div> */}
      {/* </Menu.Item> */}
      {/* <Menu.Item */}
      {/*   key="c_exportMonitor" */}
      {/*   onClick={exportMonitor.bind(_this, record)}> */}
      {/*   <div className={styles['export_monitor']}> */}
      {/*     <i className={classnames('icon iconfont icon-daochu2')} /> */}
      {/*     <span>导出监控点</span> */}
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
  deleteClick,
  realtimeClick,
  historyClick,
  controlClick,
  disableClick,
  editClick,
  fsuStatusClick,
  exportMonitor,
  fsuSetTimeClick,
  exportSub,
  portInfoClick,
  restartClick,
  rumorClick,
  addLevelOneClick,
  detailClick,
  getAlarmTable,

  monitorClick,
  subDevClick,
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
      title: '操作',
      width: '30%',
      dataIndex: '',
      className: 'information_th',
      render: (text, record, index) => {
        return (
          <div style={{margin: '0 auto', width: '300px'}}>
            <Button
              className={styles['btn']}
              onClick={portInfoClick.bind(_this, record)}>
              <span>获取端口信息</span>
            </Button>
            <Button
              className={styles['btn']}
              onClick={controlClick.bind(_this, record)}>
              <span>控制</span>
            </Button>
            <Button
              className={styles['btn']}
              onClick={realtimeClick.bind(_this, record)}>
              <span>实时数据</span>
            </Button>
            <Button
              className={styles['btn']}
              onClick={fsuStatusClick.bind(_this, record)}>
              <span>状态</span>
            </Button>
            <Button
              className={styles['btn']}
              onClick={subDevClick.bind(_this, record)}>
              <span>获取子设备</span>
            </Button>
            <Button
              className={styles['btn']}
              onClick={detailClick.bind(_this, record)}>
              <span>详情</span>
            </Button>
          </div>
          // <Dropdown
          //   overlay={menu({
          //     editClick,
          //     deleteClick,
          //     detailClick,
          //     addLevelOneClick,
          //     exportMonitor,
          //     exportSub,
          //     restartClick,
          //     portInfoClick,
          //     fsuStatusClick,
          //     disableClick,
          //     fsuSetTimeClick,
          //     monitorClick,
          //     subDevClick,
          //     _this,
          //     record,
          //   })}
          //   placement={'bottomCenter'}
          //   trigger={['click']}>
          //   <i className={classnames(styles['more'])}>操作</i>
          // </Dropdown>
        );
      },
    },
  ];
};

export default columns;
