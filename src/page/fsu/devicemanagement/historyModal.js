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
    this.onSelect = this.onSelect.bind(this);
    this.onMonitorSelect = this.onMonitorSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: [],
      allSelected: false,
      subDeviceValue: undefined,
      monitorValue: [],
      lastLoginStart: '',
      lastLoginEnd: '',
    };
  }
  onChange(dates, dateStrings) {
    this.setState({
      value: [dates[0], dates[1]],
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    });
  }
  componentDidMount() {
    // this.setState({
    //   value: [moment().subtract(3, 'months'), moment()],
    // });
  }
  onSelect(value, option) {
    const {
      fsu_devicemanagementStore: {his_subDevice, getGrandsonMenu},
    } = this.props;
    const subDev = _.filter(his_subDevice, (item, i) => {
      return item.deviceID === value;
    });
    if (value) {
      const params = {
        F_DeviceID: subDev[0].deviceID,
        F_Suid: subDev[0].suID,
      };
      getGrandsonMenu(params);
    }
    this.setState({
      subDeviceValue: value || undefined,
      monitorValue: [],
      allSelected: false,
    });
  }
  allSelectClick() {
    const selected = this.state.allSelected;
    if (!selected) {
      const {fsu_devicemanagementStore} = this.props;
      const monitorMenu = toJS(fsu_devicemanagementStore.his_grandsonMenu);
      let result = [];
      _.map(monitorMenu, item => {
        result.push(item.spID);
      });
      this.setState({
        allSelected: !this.state.allSelected,
        // Channels: result.join(','),
        monitorValue: result,
      });
    } else {
      $(`.${styles['drop_down']} .ant-select-selection__clear`).click();
    }
  }
  onMonitorSelect(value, option) {
    if (value.indexOf('all') != -1) {
      this.allSelectClick();
      return;
    }
    if (!value[0]) {
      this.setState({
        Channels: value.join(','),
        monitorValue: value,
        allSelected: false,
      });
    } else {
      const {fsu_devicemanagementStore} = this.props;
      const monitorMenu = toJS(fsu_devicemanagementStore.his_grandsonMenu);
      const isAll =
        value.length === monitorMenu.length &&
        this.isAllSelected(value, monitorMenu);
      this.setState({
        // Channels: value.join(','),
        allSelected: isAll,
        monitorValue: value,
      });
    }
  }
  isAllSelected(value, monitorMenu) {
    let isAll = true;
    _.map(monitorMenu, item => {
      if (value.indexOf(item.spID) === -1) isAll = false;
    });
    return isAll;
  }
  handleClick() {
    const {fsu_devicemanagementStore, currentSuID} = this.props;
    const params = {
      lastLoginStart: this.state.lastLoginStart,
      lastLoginEnd: this.state.lastLoginEnd,
      page: 1,
      suID: currentSuID,
      deviceIDs: this.state.subDeviceValue || '',
      spIDs: this.state.monitorValue.join(','),
      number: 10,
    };
    fsu_devicemanagementStore.getFsuHisdataTable(params);
  }
  render() {
    const {
      fsu_devicemanagementStore: {his_subDevice, his_grandsonMenu},
    } = this.props;
    const children = _.map(his_subDevice, (item, i) => {
      return <Option key={item.deviceID}>{item.deviceName}</Option>;
    });
    const grandson = _.map(his_grandsonMenu, (item, i) => {
      return <Option key={item.spID}>{item.spName}</Option>;
    });
    grandson.unshift(
      <Option
        className={classnames(this.state.allSelected && styles['all_selected'])}
        key={'all'}>
        全选
      </Option>,
    );
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

          <Select
            className={styles['sub_dev_wrap']}
            allowClear
            optionFilterProp="children"
            placeholder={'请选择子设备'}
            value={this.state.subDeviceValue}
            onChange={this.onSelect}>
            {children}
          </Select>
          <Select
            mode="multiple"
            className={styles['drop_down']}
            allowClear
            disabled={this.state.subDeviceValue ? false : true}
            optionFilterProp="children"
            placeholder={'请选择监控点'}
            value={this.state.monitorValue}
            onChange={this.onMonitorSelect}>
            {grandson}
          </Select>
          <Button
            onClick={this.handleClick}
            className={styles['his_common_btn']}>
            搜索
          </Button>
        </div>
        <div className={styles['history_wrap']}>
          <HistoryTable />
        </div>
      </div>
    );
  }
}

export default Regional;
