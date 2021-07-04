import React, {Component} from 'react';
import styles from './index.less';
import moment from 'moment';
import classnames from 'classnames';
import {Tooltip} from 'antd';
import columnData from './childColumns.js';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = (type, detailClick, currentData) => {
  if (type === 'electricQuantity') {
    return [
      {
        title: '电量',
        dataIndex: 'kwh',
      },
      {
        title: '信号等级',
        dataIndex: 'signallevel',
      },
      {
        title: '回路一',
        dataIndex: 'loop1kwh',
      },
      {
        title: '回路二',
        dataIndex: 'loop2kwh',
      },
      {
        title: '回路三',
        dataIndex: 'loop3kwh',
      },
      {
        title: '回路四',
        dataIndex: 'loop4kwh',
      },
      {
        title: '回路五',
        dataIndex: 'loop5kwh',
      },
      {
        title: '回路六',
        dataIndex: 'loop6kwh',
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        width: '18%',
        render: (text, record, index) => {
          return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
        },
      },
    ];
  } else if (type === 'alarmInfo') {
    return [
      {
        title: '设备编号',
        dataIndex: 'meternum',
      },
      {
        title: '告警类型',
        dataIndex: 'warntype',
        render: (text, record) => {
          let obj = {
            0: '过流',
            1: '开井盖',
            2: '电能表清零',
            3: '掉电',
            4: '失压',
            5: '失流',
            6: '电压逆相序',
            7: '电压不平衡',
            8: '校时',
            9: '欠压',
            10: '过压',
            11: '全失压',
            12: '断相',
            13: '设备脱落',
          };
          return <span>{obj[text] ? obj[text] : '-'}</span>;
        },
      },
      {
        title: '回路',
        dataIndex: 'loop',
      },
      {
        title: '时长',
        dataIndex: 'keeptime',
      },
      {
        title: '次数',
        dataIndex: 'times',
      },
      {
        title: '某相',
        dataIndex: 'phasetype',
      },
      {
        title: '上一次发生时间',
        dataIndex: 'lastoccurtime',
        render: (text, record, index) => {
          return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
        },
      },
      {
        title: '上一次结束时间',
        dataIndex: 'laststoptime',
        render: (text, record, index) => {
          return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
        },
      },
    ];
  } else {
    return [
      {
        title: '电压',
        dataIndex: 'loop1vol',
        render: (text, record) => {
          if (currentData.metertype !== 101 && currentData.metertype !== 301) {
            return <span>{'-'}</span>;
          }
          if (text === undefined) {
            return null;
          }
          let arr = text.split('$');
          let s = ['A相:', 'B相:', 'C相:'];
          let str = '';
          arr.forEach((item, index) => {
            str += s[index] + arr[index];
            if (index !== arr.length - 1) {
              str += ',';
            }
          });
          return <span>{str}</span>;
        },
      },
      {
        title: '电流',
        dataIndex: 'cur',
        render: (text, record) => {
          if (text === undefined) {
            return null;
          }
          let arr = text.split('$');
          let s = ['A相:', 'B相:', 'C相:'];
          let str = '';
          arr.forEach((item, index) => {
            str += s[index] + arr[index];
            if (index !== arr.length - 1) {
              str += ',';
            }
          });
          return <span>{str}</span>;
        },
      },
      {
        title: '瞬时有功功率',
        dataIndex: 'insp',
        render: (text, record) => {
          if (text === undefined) {
            return null;
          }
          let arr = text.split('$');
          let s = ['A相:', 'B相:', 'C相:'];
          let str = '';
          arr.forEach((item, index) => {
            str += s[index] + arr[index];
            if (index !== arr.length - 1) {
              str += ',';
            }
          });
          return <span>{str}</span>;
        },
      },
      /*{
        title: '瞬时无功功率',
        dataIndex: 'insq',
        render: (text, record) => {
          if (text === undefined) {
            return null;
          }
          let arr = text.split('$');
          let s = ['A相:', 'B相:', 'C相:'];
          let str = '';
          arr.forEach((item, index) => {
            str += s[index] + arr[index];
            if (index !== arr.length - 1) {
              str += ',';
            }
          });
          return <span>{str}</span>;
        },
      },*/
      {
        title: '创建时间',
        dataIndex: 'time',
        width: '13%',
        render: (text, record, index) => {
          return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
        },
      },
      {
        title: '操作',
        width: '6%',
        dataIndex: '',
        render: (text, record, index) => {
          return (
            <span className={styles.detail} onClick={() => detailClick(record)}>
              详情
            </span>
          );
        },
      },
    ];
  }
};

export default columns;
