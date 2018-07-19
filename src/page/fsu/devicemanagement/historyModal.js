import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import {DatePicker, Menu, message, Button, Select, Input, Dropdown} from 'antd';
import moment from 'moment';
import classnames from 'classnames';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import styles from './index.less';
import ReactEcharts from 'echarts-for-react';
import options from './baseOptions';
import HistoryTable from './historyTable.js';
import _ from 'lodash';
//实例
@inject('fsu_devicemanagementStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: [],
    };
  }
  onChange(dates, dateStrings) {
    const {fsu_devicemanagementStore} = this.props;
    this.setState({
      value: [dates[0], dates[1]],
    });
    const params = {
      ztreeChild: fsu_devicemanagementStore.h_tableParmas.ztreeChild,
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
      page: 1,
      number: 10,
    };
    fsu_devicemanagementStore.getFsuHisdataTable(params);
  }
  componentDidMount() {
    this.setState({
      value: [moment().subtract(3, 'months'), moment()],
    });
  }
  render() {
    return (
      <div className={styles['history_wrap']}>
        <div className={styles['history_ct']}>
          <RangePicker
            value={this.state.value}
            ranges={{
              最近一周: [moment().subtract(1, 'weeks'), moment()],
              最近一个月: [moment().subtract(1, 'months'), moment()],
              最近三个月: [moment().subtract(3, 'months'), moment()],
            }}
            onChange={this.onChange}
            format={'YYYY-MM-DD'}
          />
        </div>
        <div className={styles['history_wrap']}>
          <HistoryTable />
        </div>
      </div>
    );
  }
}

export default Regional;
