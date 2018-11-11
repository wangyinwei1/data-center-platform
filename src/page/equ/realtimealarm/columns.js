import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Tooltip} from 'antd';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = ({getChildTable, _this}) => {
  return [
    {
      title: '设备名称',
      dataIndex: 'devName',
      width: '22%',
      render: (text, record, dex) => {
        const children = (
          <a
            className={styles['child_link']}
            onClick={
              getChildTable ? getChildTable.bind(_this, record) : () => {}
            }>
            <TextOverflow link={true}>
              <i
                className={classnames(
                  'icon iconfont',
                  record.connectType == 0
                    ? `icon-beidong ${styles['icon_passive']}`
                    : `icon-zhudong ${styles['icon_active']}`,
                  styles['connectType'],
                )}
              />
              {record.devName}
            </TextOverflow>
          </a>
        );
        return <div>{children}</div>;
      },
    },
    {
      title: '设备ID',
      dataIndex: 'devID',
      width: '10%',
    },
    {
      title: '设备类型',
      dataIndex: 'typeName',
      width: '22%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '所属站点',
      dataIndex: 'stationName',
      width: '28%',
      render: (text, record, index) => {
        return <TextOverflow>{text}</TextOverflow>;
      },
    },
    {
      title: '入网时间',
      dataIndex: 'netInTime',
      width: '18%',
    },
  ];
};

export default columns;
