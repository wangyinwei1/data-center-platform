import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Select, Button, Icon, Input, InputNumber, Dropdown, Menu} from 'antd';
import Search from '../../../components/Search';
const Option = Select.Option;
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const conType = [
  {F_StoreMode: 0, name: '无条件保存'},
  {F_StoreMode: 1, name: '变动值'},
  {F_StoreMode: 2, name: '变动率'},
];
const menu = ({handleChange, _this, record}) => {
  return (
    <Menu className={styles['alarm_operation']}>
      {_.map(conType, (item, i) => {
        return (
          <Menu.Item
            key={i.toString(36) + i}
            onClick={handleChange.bind(_this, item, record)}>
            <div className={styles['alarm_row']}>
              <span>{item.name}</span>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
const msgMenu = ({handleChange, alarmList, onSearch, _this, record}) => {
  return (
    <Menu className={styles['alarm_operation']}>
      <Menu.Item key={'a_search'} className={styles['msg_search']}>
        <div className={styles['alarm_row']}>
          <Search onSearch={onSearch} />
        </div>
      </Menu.Item>
      {!alarmList[0] && (
        <Menu.Item key={'a_nodata'}>
          <div className={styles['alarm_row']}>
            <span>暂无数据</span>
          </div>
        </Menu.Item>
      )}
      {_.map(alarmList, (item, i) => {
        return (
          <Menu.Item
            key={i.toString(36) + i}
            onClick={handleChange.bind(_this, item, record)}>
            <div className={styles['alarm_row']}>
              <span>{item.F_AlarmMsg}</span>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
const columns = ({
  handleChange,
  visibleChange,
  onSearch,
  alarmList,
  inputChange,
  alarmConfirm,
  alarmDelete,
  alarmAdd,
  alarmEdit,
  _this,
  data,
  fields,
  mode,
}) => {
  const options = [
    {
      title: '序号',
      dataIndex: 'num',
      width: '8%',
      render: (text, record, index) => {
        const content =
          (!data[0] || data.length - 1 == index) && mode !== 'detail' ? (
            <div className={styles['alarm_btn_wrap']}>
              <Button
                className={styles['alarm_add']}
                onClick={alarmAdd.bind(_this, record)}>
                +
              </Button>
            </div>
          ) : (
            text
          );
        return content;
      },
    },
    {
      title: '采集值',
      dataIndex: 'value',
      width: '35%',
      render: (text, record, index) => {
        return (
          <InputNumber
            onChange={value => {
              inputChange(value, 'value', '', record);
            }}
            min={0}
            placeholder={'请输入数字'}
            className={styles['value_input']}
            value={record.value}
          />
        );
      },
    },
    {
      title: '值属性',
      dataIndex: 'valueMean',
      width: '35%',
      render: (text, record, index) => {
        return (
          <Input
            onChange={e => {
              const value = e.target.value;
              inputChange(value, 'valueMean', e.target, record);
            }}
            placeholder={'请输入内容'}
            className={styles['con_input']}
            value={record.valueMean}
          />
        );
      },
    },
  ];
  mode !== 'detail' &&
    options.push({
      title: '操作',
      dataIndex: '',
      width: '22%',
      render: (text, record, index) => {
        const newAddRow = record.newAddRow;
        return (
          <div className={styles['alarm_btn_wrap']}>
            {
              // newAddRow ? (
              //   <Button
              //     onClick={alarmConfirm.bind(_this, record)}
              //     className={styles['alarm_confirm']}>
              //     确实
              //   </Button>
              // ) :
              <div>
                <Button
                  onClick={alarmDelete.bind(_this, record)}
                  className={styles['alarm_delete']}>
                  移除
                </Button>
                {/* <Button */}
                {/*   onClick={alarmEdit.bind(_this, record)} */}
                {/*   className={styles['alarm_edit']}> */}
                {/*   修改 */}
                {/* </Button> */}
              </div>
            }
          </div>
        );
      },
    });

  return options;
};

export default columns;
