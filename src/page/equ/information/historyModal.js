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
    this.state = {
      stLoginStart: '',
      lastLoginEnd: '',
      Channels: '',
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
  onSelect(value) {
    this.setState({
      Channels: value.join(','),
    });
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
    informationStore.findDeviceData(params);
  }

  componentDidMount() {}
  render() {
    const {informationStore} = this.props;
    const deviceMenu = toJS(informationStore.deviceMenu);
    const children = _.map(deviceMenu, (item, i) => {
      return <Option key={item.F_ChannelID}>{item.F_ChannelName}</Option>;
    });
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
            placeholder={'请选择设备通道'}
            onChange={this.onSelect}>
            {children}
          </Select>
          <Button onClick={this.handleClick}>搜索</Button>
        </div>
        <div>
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
          ) : (
            <div className={styles['nodata']}>
              <i className={classnames('icon iconfont icon-zanwushuju')} />
              <span>暂无数据</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Regional;
