import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import {Button, message} from 'antd';
import columnData from './alarmColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('passagewayStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmList: [],
    };
    this.onSearch = this.onSearch.bind(this);
    this.add = this.add.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }
  handleChange(item, record, e) {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    const newData = _.map(toJS(a_tableData), app => {
      const conType =
        item.F_StoreMode || item.F_StoreMode === 0
          ? {
              conType: item.F_StoreMode,
            }
          : {};
      const msgID =
        item.F_MsgID || item.F_MsgID === 0
          ? {
              msgID: item.F_MsgID,
              alarmMsg: item.F_AlarmMsg,
              msgVisible: !(record.msgVisible ? true : false),
            }
          : {};
      return app.conID === record.conID
        ? {
            ...app,
            ...conType,
            ...msgID,
          }
        : app;
    });
    this.setState({alarmList: []});
    alarmDataChange(newData);
  }
  onSearch(value) {
    const {passagewayStore: {alarmList}} = this.props;
    const filterAlarmList = _.filter(toJS(alarmList), item => {
      return item.F_AlarmMsg.indexOf(value) != -1;
    });

    this.setState({
      alarmList: filterAlarmList,
    });
  }
  visibleChange(item, record, e) {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    const newData = _.map(toJS(a_tableData), app => {
      let obj = {};
      obj[item.name] = !item.visible;
      return app.conID === record.conID
        ? {
            ...app,
            ...obj,
          }
        : app;
    });
    alarmDataChange(newData);
  }
  async inputChange(value, target, record) {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    const newData = _.map(toJS(a_tableData), app => {
      return app.conID === record.conID
        ? {
            ...app,
            condition: value,
          }
        : app;
    });
    await alarmDataChange(newData);
  }
  alarmConfirm(record, e) {
    if (!record.conType || record.conType !== 0) {
      message.error('告警条件类型不能为空！');
      return;
    }
    if (!record.msgID || record.msgID !== 0) {
      message.error('告警信息不能为空！');
      return;
    }
    if (!record.condition || record.condition !== 0) {
      message.error('告警条件不能为空！');
      return;
    }

    const {
      channelID,
      F_DeviceType,
      F_Version,
      passagewayStore: {alarmSave},
    } = this.props;
    const params = {
      F_ChannelID: channelID,
      F_DeviceType,
      F_Version,
      conType: record.conType,
      condition: record.condition,
      msgID: record.msgID,
      conID: record.conID,
    };
    alarmSave(params);
  }
  alarmDelete(record, e) {
    const {passagewayStore: {alarmDelete}} = this.props;
    const params = {
      conID: record.conID,
    };
    alarmDelete(params);
  }
  add() {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    let newData = toJS(a_tableData);
    const params = {
      conType: undefined,
      msgID: undefined,
      condition: '',
      alarmMsg: '',
      newAddRow: true,
    };
    newData.push(params);
    alarmDataChange(newData);
  }
  alarmEdit(record, e) {
    if (!record.condition || record.condition !== 0) {
      message.error('告警条件不能为空！');
      return;
    }
    const {
      channelID,
      F_DeviceType,
      F_Version,
      passagewayStore: {alarmEditSave},
    } = this.props;
    const params = {
      F_ChannelID: channelID,
      F_DeviceType,
      F_Version,
      conType: record.conType,
      condition: record.condition,
      msgID: record.msgID,
      conID: record.conID,
    };
    alarmEditSave(params);
  }
  //table分页
  render() {
    const {passagewayStore, fields} = this.props;
    let tableData = toJS(passagewayStore.a_tableData) || [];
    let data = [];
    if (!tableData[0]) {
      data.push({
        conType: undefined,
        msgID: undefined,
        condition: '',
        num: 1,
        alarmMsg: '',
        newAddRow: true,
      });
    } else {
      data = _.map(tableData, (item, i) => {
        return {
          ...item,
          num: i + 1,
        };
      });
    }

    const columns = columnData({
      handleChange: this.handleChange,
      alarmList: this.state.alarmList[0]
        ? this.state.alarmList
        : passagewayStore.alarmList,
      visibleChange: this.visibleChange,
      inputChange: this.inputChange,
      onSearch: this.onSearch,
      _this: this,
      alarmConfirm: this.alarmConfirm,
      alarmDelete: this.alarmDelete,
      alarmEdit: this.alarmEdit,
    });

    return (
      <div className={styles['alarm_wrap']}>
        <div className={styles['alarm_add_wrap']}>
          <Button onClick={this.add}>新增</Button>
        </div>
        <Table
          loading={passagewayStore.a_loading}
          columns={columns}
          pagination={false}
          useDefaultRowKey={true}
          rowClassName={() => {
            return 'padding0';
          }}
          data={data}
        />
      </div>
    );
  }
}

export default Regional;
