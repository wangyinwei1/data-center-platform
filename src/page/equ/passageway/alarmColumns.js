import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {Select, Button, Icon, Input, Dropdown, Menu} from 'antd';
import Search from '../../../components/Search';
const Option = Select.Option;
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const conType = [
  {F_StoreMode: 1, name: '绝对值'},
  {F_StoreMode: 2, name: '变动值'},
  {F_StoreMode: 3, name: '变动率'},
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
      title: '告警信息',
      dataIndex: 'msgID',
      width: mode === 'detail' ? '23%' : '19%',
      render: (text, record, index) => {
        console.log(record);
        return (
          <Dropdown
            visible={record.msgVisible ? true : false}
            onVisibleChange={visibleChange.bind(
              _this,
              {
                name: 'msgVisible',
                visible: record.msgVisible ? true : false,
              },
              record,
            )}
            overlay={msgMenu({
              handleChange,
              _this,
              onSearch,
              record,
              alarmList,
            })}
            placement={'bottomCenter'}
            trigger={['click']}>
            <div style={{position: 'relative'}}>
              <span
                className={classnames(
                  !record.alarmMsg[0] && styles['alarm_placeholder'],
                )}>
                {record.alarmMsg ? record.alarmMsg : '请选择内容'}
              </span>
              <Icon type="down" className={styles['alarm_down']} />
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: '告警条件类型',
      dataIndex: 'conType',
      width: mode === 'detail' ? '23%' : '19%',
      render: (text, record, index) => {
        const currentCon = _.filter(conType, item => {
          return item.F_StoreMode === record.conType;
        });
        const conTypeName = currentCon[0] ? currentCon[0].name : '请选择内容';

        return (
          <Dropdown
            overlay={menu({
              handleChange,
              _this,
              record,
            })}
            placement={'bottomCenter'}
            trigger={['click']}>
            <div style={{position: 'relative'}}>
              <span
                className={classnames(
                  !currentCon[0] && styles['alarm_placeholder'],
                )}>
                {conTypeName}
              </span>
              <Icon type="down" className={styles['alarm_down']} />
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: '告警条件',
      dataIndex: 'condition',
      width: mode === 'detail' ? '23%' : '19%',
      render: (text, record, index) => {
        return (
          <Input
            onChange={e => {
              const value = e.target.value;
              inputChange(value, 'condition', e.target, record);
            }}
            placeholder={'请输入内容'}
            className={styles['con_input']}
            value={record.condition}
          />
        );
      },
    },
    {
      title: '告警延迟',
      dataIndex: 'alarmDelay',
      width: mode === 'detail' ? '23%' : '18%',
      render: (text, record, index) => {
        return (
          <Input
            onChange={e => {
              const value = e.target.value;
              inputChange(value, 'delay', e.target, record);
            }}
            placeholder={'请输入内容'}
            className={styles['con_input']}
            value={record.alarmDelay}
          />
        );
      },
    },
  ];
  mode !== 'detail' &&
    options.push({
      title: '操作',
      dataIndex: '',
      width: '17%',
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
