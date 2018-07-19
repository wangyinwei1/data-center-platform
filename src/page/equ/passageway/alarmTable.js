import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import {Button, message} from 'antd';
import columnData from './alarmColumns.js';
import SimulationTable from './simulationTable.js';
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
    this.inputChange = this.inputChange.bind(this);
  }
  handleChange(item, record, e) {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    const newData = _.map(toJS(a_tableData), app => {
      const conID = record.conID
        ? app.conID === record.conID
        : app.myConID === record.myConID;
      let conType, msgID;
      if (conID) {
        conType =
          item.F_StoreMode || item.F_StoreMode === 0
            ? {
                conType: item.F_StoreMode,
              }
            : {};
        msgID =
          item.F_MsgID || item.F_MsgID === 0
            ? {
                msgID: item.F_MsgID,
                alarmMsg: item.F_AlarmMsg,
                msgVisible: !(record.msgVisible ? true : false),
              }
            : {};
      }
      return conID
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
      const conID = record.conID
        ? app.conID === record.conID
        : app.myConID === record.myConID;
      if (conID) {
        obj[item.name] = !item.visible;
      }
      return conID
        ? {
            ...app,
            ...obj,
          }
        : app;
    });
    alarmDataChange(newData);
  }
  inputChange(value, target, record) {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    const newData = _.map(toJS(a_tableData), app => {
      const conID = record.conID
        ? app.conID === record.conID
        : app.myConID === record.myConID;
      return conID
        ? {
            ...app,
            condition: value,
          }
        : app;
    });
    alarmDataChange(newData);
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
    console.log(record);
    if (!record.condition || record.condition !== 0) {
      message.error('告警条件不能为空！');
      return;
    }

    const {channelID, deviceID, passagewayStore: {alarmSave}} = this.props;
    const params = {
      channelID: channelID,
      deviceID: deviceID,
      conType: record.conType,
      condition: record.condition,
      msgID: record.msgID,
      conID: record.conID,
    };
    alarmSave(params);
  }
  alarmDelete(record, e) {
    // const {passagewayStore: {alarmDelete}} = this.props;
    // const params = {
    //   F_ConID: record.conID,
    // };
    // alarmDelete(params);
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    const rest = _.filter(toJS(a_tableData), app => {
      return app.conID !== record.conID || app.myConID !== record.myConID;
    });
    console.log(rest);
    alarmDataChange(rest);
  }
  alarmAdd() {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    let newData = toJS(a_tableData);
    const params = {
      myConID: new Date().getTime(),
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
    const {passagewayStore: {alarmEditSave}, channelID, deviceID} = this.props;
    const params = {
      channelID: channelID,
      deviceID: deviceID,
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
    const tableData = toJS(passagewayStore.a_tableData) || [];
    let data = [];
    if (!tableData[0]) {
      data.push({
        myConID: new Date().getTime(),
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
        : toJS(passagewayStore.alarmList),
      visibleChange: this.visibleChange,
      inputChange: this.inputChange,
      onSearch: this.onSearch,
      _this: this,
      data: data,
      alarmAdd: this.alarmAdd,
      alarmConfirm: this.alarmConfirm,
      alarmDelete: this.alarmDelete,
      alarmEdit: this.alarmEdit,
    });

    return (
      <div className={styles['alarm_wrap']}>
        {/* <div className={styles['alarm_add_wrap']}> */}
        {/*   <Button onClick={this.add}>新增</Button> */}
        {/* </div> */}
        <SimulationTable
          loading={passagewayStore.a_loading}
          data={data}
          columns={columns}
        />
      </div>
    );
  }
}

export default Regional;
