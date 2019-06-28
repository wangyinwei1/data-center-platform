import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip, Dropdown, Menu} from 'antd';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = () => {
  return [
    {
      title: '端口编号',
      dataIndex: 'portNo',
      width: '10%',
      className: 'information_th',
      render: (text, record, index) => {
        return (
          <div>
            <TextOverflow>{text}</TextOverflow>
          </div>
        );
      },
    },
    {
      title: '端口名',
      dataIndex: 'portName',
      className: 'information_th',
    },
    {
      title: '端口类型',
      dataIndex: 'portType',
      className: 'information_th',
    },
    {
      title: '端口参数',
      dataIndex: 'settings',
      className: 'information_th',
    },
  ];
};

export default columns;
