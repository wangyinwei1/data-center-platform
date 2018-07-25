import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import {Button, message} from 'antd';
import columnData from './alarmColumns.js';
import SimulationTable from '../../../components/SimulationTable';
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
  clearError(record) {
    if (
      (!record.conType && record.conType !== 0) ||
      (!record.msgID && record.msgID !== 0) ||
      (!record.condition && record.condition !== 0)
    ) {
      return false;
    } else {
      return true;
    }
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
      let option = {
        ...app,
        ...conType,
        ...msgID,
      };
      const clearError = this.clearError(option);
      clearError && (option['error'] = false);

      return conID ? option : app;
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
  inputChange(value, key, target, record) {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    const newData = _.map(toJS(a_tableData), app => {
      const conID = record.conID
        ? app.conID === record.conID
        : app.myConID === record.myConID;
      let obj = {};
      key === 'delay' ? (obj['delayID'] = value) : (obj['condition'] = value);

      let option = {
        ...app,
        ...obj,
      };
      const clearError = this.clearError(option);
      clearError && (option['error'] = false);
      return conID ? option : app;
    });
    alarmDataChange(newData);
  }
  alarmDelete(record, e) {
    const {passagewayStore: {a_tableData, alarmDataChange}} = this.props;
    let rest = _.filter(toJS(a_tableData), app => {
      return app.conID !== record.conID || app.myConID !== record.myConID;
    });
    const params = {
      myConID: new Date().getTime(),
      conType: undefined,
      msgID: undefined,
      condition: '',
      alarmMsg: '',
      newAddRow: true,
    };
    !rest[0] && rest.push(params);
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
  //table分页
  render() {
    const {passagewayStore, fields, mode} = this.props;
    const tableData = toJS(passagewayStore.a_tableData) || [];
    let data = [];
    data = _.map(tableData, (item, i) => {
      return {
        ...item,
        num: i + 1,
      };
    });
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
      mode: mode,
      alarmAdd: this.alarmAdd,
      alarmConfirm: this.alarmConfirm,
      alarmDelete: this.alarmDelete,
    });

    return (
      <div className={styles['alarm_wrap']}>
        <SimulationTable
          loading={passagewayStore.a_loading}
          data={data}
          disabled={mode === 'detail' ? true : false}
          columns={columns}
        />
      </div>
    );
  }
}

export default Regional;
