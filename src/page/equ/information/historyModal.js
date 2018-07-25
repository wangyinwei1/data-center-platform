import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import {
  DatePicker,
  Menu,
  message,
  Button,
  Select,
  Input,
  Dropdown,
  Spin,
} from 'antd';
import moment from 'moment';
import classnames from 'classnames';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import styles from './index.less';
import ReactEcharts from 'echarts-for-react';
import options from './baseOptions';
import _ from 'lodash';
//实例
@inject('informationStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.allSelectClick = this.allSelectClick.bind(this);
    this.state = {
      allSelected: false,
      stLoginStart: '',
      lastLoginEnd: '',
      Channels: '',
      value: [],
      searchContent: false,
    };
  }
  componentWillUnmount() {
    const {informationStore: {clearDeviceData}} = this.props;
    clearDeviceData();
    this.setState({
      stLoginStart: '',
      lastLoginEnd: '',
      Channels: '',
    });
  }
  onChange(dates, dateStrings) {
    this.setState({
      stLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    });
  }
  onSelect(value, option) {
    if (value.indexOf('all') != -1) return;
    if (!value[0]) {
      this.setState({
        Channels: value.join(','),
        value,
        allSelected: false,
      });
    } else {
      this.setState({
        Channels: value.join(','),
        value,
      });
    }
  }
  allSelectClick() {
    const selected = this.state.allSelected;
    if (!selected) {
      const {informationStore} = this.props;
      const deviceMenu = toJS(informationStore.deviceMenu);
      let result = [];
      _.map(deviceMenu, item => {
        result.push(item.F_ChannelID);
      });
      this.setState({
        allSelected: !this.state.allSelected,
        Channels: result.join(','),
        value: result,
      });
    } else {
      this.setState({
        allSelected: !this.state.allSelected,
        Channels: '',
        value: [],
      });
    }
  }
  handleClick() {
    if (!this.state.stLoginStart || !this.state.lastLoginEnd) {
      message.error('请选择时间!');
      return;
    }
    if (!this.state.Channels) {
      message.error('请选择通道!');
      return;
    }

    const {informationStore} = this.props;
    const params = {
      F_DeviceID: informationStore.currentDevice,
      Channels: this.state.Channels,
      stLoginStart: this.state.stLoginStart,
      lastLoginEnd: this.state.lastLoginEnd,
    };
    this.setState({
      searchContent: true,
    });
    informationStore.findDeviceData(params);
  }

  render() {
    const {informationStore} = this.props;
    const deviceMenu = toJS(informationStore.deviceMenu);
    const children = _.map(deviceMenu, (item, i) => {
      return <Option key={item.F_ChannelID}>{item.F_ChannelName}</Option>;
    });
    children.unshift(
      <Option
        onClick={this.allSelectClick}
        className={classnames(this.state.allSelected && styles['all_selected'])}
        key={'all'}>
        全选
      </Option>,
    );
    const deviceData = toJS(informationStore.deviceData);

    return (
      <div className={styles['history_wrap']}>
        <div className={styles['history_ct']}>
          <RangePicker
            ranges={{
              最近一周: [moment().subtract(1, 'weeks'), moment()],
              最近一个月: [moment().subtract(1, 'months'), moment()],
              最近三个月: [moment().subtract(3, 'months'), moment()],
            }}
            onChange={this.onChange}
          />
          <Select
            mode="multiple"
            className={styles['drop_down']}
            allowClear
            optionFilterProp="children"
            placeholder={'请选择设备通道'}
            value={this.state.value}
            onChange={this.onSelect}>
            {children}
          </Select>
          <Button onClick={this.handleClick}>搜索</Button>
        </div>
        <Spin spinning={informationStore.d_loading}>
          <div className={styles['echart_wrap']}>
            {deviceData[0] ? (
              _.map(deviceData, (item, i) => {
                let echartOptions = _.cloneDeep(options())[0];
                echartOptions.title.text = item.F_ChannelName;
                echartOptions.xAxis[0].data = item.F_RecordTime;
                echartOptions.legend.data = ['最大值', '最小值', '平均值'];
                echartOptions.color = ['#7ffbbc', '#a4cbff', '#ffd800'];
                echartOptions.series = [
                  {
                    name: '最大值',
                    type: 'line',
                    areaStyle: {normal: {color: '#a4cbff', opacity: 0.6}},
                    lineStyle: {normal: {opacity: 0}},
                    data: item.maxfs,
                  },
                  {
                    name: '最小值',
                    type: 'line',
                    areaStyle: {normal: {color: '#7ffbbc', opacity: 0.6}},
                    lineStyle: {normal: {opacity: 0}},
                    data: item.minfs,
                  },
                  {
                    name: '平均值',
                    type: 'line',
                    areaStyle: {normal: {color: '#ffd800', opacity: 0.6}},
                    lineStyle: {normal: {opacity: 0}},
                    data: item.averages,
                  },
                ];

                return (
                  <ReactEcharts
                    style={{paddingTop: '20px'}}
                    key={i.toString(36) + i}
                    option={echartOptions}
                  />
                );
              })
            ) : this.state.searchContent && !informationStore.d_loading ? (
              <div className={styles['nodata']}>
                <i className={classnames('icon iconfont icon-zanwushuju')} />
                <span>暂无数据</span>
              </div>
            ) : (
              <div className={styles['please_choose']}>
                <i className={classnames('icon iconfont icon-shouzhi')} />
                <span>请选择时间和设备通道来搜索！</span>
              </div>
            )}
          </div>
        </Spin>
      </div>
    );
  }
}

export default Regional;
