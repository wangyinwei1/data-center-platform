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
const columns = ({deleteClick, editClick, getChildTable, isClose, _this}) => {
  const arr = [
    {
      title: '站点名称',
      dataIndex: 'F_Name',
      render: (text, record, dex) => {
        const children = (
          <a
            className={styles['child_link']}
            onClick={
              getChildTable ? getChildTable.bind(_this, record) : () => {}
            }>
            <TextOverflow link={true}>{record.F_Name}</TextOverflow>
          </a>
        );
        return <div>{children}</div>;
      },
    },
    {
      title: '所属区域',
      dataIndex: 'F_AreaName',
    },
    {
      title: '负责人',
      dataIndex: 'F_Leader',
    },
    {
      title: '联系方式',
      dataIndex: 'F_Tel',
    },
    {
      title: '站点地址',
      dataIndex: 'F_Address',
    },
  ];
  // arr.push({
  //   title: '操作',
  //   dataIndex: '',
  //   className: 'information_th',
  //   render: (text, record, index) => {
  //     return (
  //       <Dropdown
  //         overlay={menu({
  //           editClick,
  //           deleteClick,
  //           _this,
  //           record,
  //         })}
  //         placement={'bottomCenter'}
  //         trigger={['click']}>
  //         <i
  //           className={classnames('icon iconfont icon-gengduo', styles['more'])}
  //         />
  //       </Dropdown>
  //     );
  //   },
  // });
  return arr;
};

export default columns;
