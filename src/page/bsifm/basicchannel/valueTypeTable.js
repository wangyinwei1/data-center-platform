import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import {Button, message} from 'antd';
import columnData from './valueTypeColumns.js';
import SimulationTable from '../../../components/SimulationTable';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('basicchannelStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
  }
  clearError(record) {
    if (
      (!record.value && record.value !== 0) ||
      (!record.valueMean && record.valueMean !== 0)
    ) {
      return false;
    } else {
      return true;
    }
  }
  inputChange(value, key, target, record) {
    const {basicchannelStore: {v_tableData, valueTypeChange}} = this.props;
    const newData = _.map(toJS(v_tableData), app => {
      const fid = record.fid
        ? app.fid === record.fid
        : app.myFid === record.myFid;
      let obj = {};
      key === 'valueMean' ? (obj['valueMean'] = value) : (obj['value'] = value);

      let option = {
        ...app,
        ...obj,
      };
      const clearError = this.clearError(option);
      clearError && (option['error'] = false);
      return fid ? option : app;
    });
    valueTypeChange(newData);
  }
  alarmDelete(record, e) {
    const {basicchannelStore: {v_tableData, valueTypeChange}} = this.props;
    let rest = _.filter(toJS(v_tableData), app => {
      return app.fid !== record.fid || app.myFid !== record.myFid;
    });
    const params = {
      myFid: new Date().getTime(),
      value: '',
      valueMean: '',
      newAddRow: true,
    };
    !rest[0] && rest.push(params);
    valueTypeChange(rest);
  }
  alarmAdd() {
    const {basicchannelStore: {v_tableData, valueTypeChange}} = this.props;
    let newData = toJS(v_tableData);
    const params = {
      myFid: new Date().getTime(),
      value: '',
      valueMean: '',
      newAddRow: true,
    };
    newData.push(params);
    valueTypeChange(newData);
  }
  //table分页
  render() {
    const {basicchannelStore, fields} = this.props;
    const tableData = toJS(basicchannelStore.v_tableData) || [];
    let data = [];
    data = _.map(tableData, (item, i) => {
      return {
        ...item,
        num: i + 1,
      };
    });
    const columns = columnData({
      inputChange: this.inputChange,
      _this: this,
      data: data,
      alarmAdd: this.alarmAdd,
      alarmDelete: this.alarmDelete,
    });

    return (
      <div className={styles['valueType_wrap']}>
        <SimulationTable
          loading={basicchannelStore.v_loading}
          data={data}
          columns={columns}
        />
      </div>
    );
  }
}

export default Regional;
