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
import columnData from './historyColumns.js';
import Table from '../../../components/Table';
import classnames from 'classnames';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import styles from './index.less';
import ReactEcharts from 'echarts-for-react';
import options from './baseOptions';
import _ from 'lodash';
class EchartsOrList extends Component {
  constructor(props) {
    super(props);
    this.switch = this.switch.bind(this);
    this.export = this.export.bind(this);
    this.state = {
      showEcharts: true,
    };
  }
  export() {
    const {exportChange, data} = this.props;
    exportChange(data);
  }

  switch() {
    this.setState(({showEcharts}) => {
      return {
        showEcharts: !showEcharts,
      };
    });
  }
  render() {
    const {deviceData, loading, data, echartOptions} = this.props;
    const columns = columnData();
    console.log(data);
    return (
      <div
        className={styles['echartsOrList_wrap']}
        style={
          deviceData.length <= 1
            ? {width: '100%', paddingTop: '20px'}
            : {
                width: '50%',
                paddingTop: '20px',
                display: 'inline-block',
                verticalAlign: 'top',
              }
        }>
        {!this.state.showEcharts && (
          <div className={styles['history_table_title']}>
            {data.F_ChannelName}
          </div>
        )}
        {this.state.showEcharts ? (
          <i
            className={classnames(
              'icon iconfont icon-biaoge',
              styles['switch_type'],
            )}
            onClick={this.switch}
          />
        ) : (
          <i
            className={classnames(
              'icon iconfont icon-tubiao',
              styles['switch_type'],
              styles['switch_list'],
            )}
            onClick={this.switch}
          />
        )}
        {!this.state.showEcharts && (
          <i
            className={classnames(
              'icon iconfont icon-daochu',
              styles['switch_type'],
              styles['export_his_table'],
            )}
            onClick={this.export}
          />
        )}
        {this.state.showEcharts ? (
          <ReactEcharts option={echartOptions} style={{height: '319px'}} />
        ) : (
          <div className={styles['history_list_wrap']}>
            <Table
              loading={loading}
              columns={columns}
              pagination={false}
              rowClassName={(record, index) => {
                const rowClassName = ['history_table_td'];
                return rowClassName.join(' ');
              }}
              scroll={{x: '100%', y: 234}}
              useDefaultRowKey={true}
              data={data.tableList}
            />
          </div>
        )}
      </div>
    );
  }
}

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
    this.exportChange = this.exportChange.bind(this);
    this.switchClick = this.switchClick.bind(this);
    this.export = this.export.bind(this);
    this.state = {
      allSelected: false,
      lastLoginStart: '',
      lastLoginEnd: '',
      Channels: '',
      value: [],
      searchContent: false,
      isChart: true,
    };
  }
  componentWillUnmount() {
    const {informationStore: {clearDeviceData}} = this.props;
    clearDeviceData();
    this.setState({
      lastLoginStart: '',
      lastLoginEnd: '',
      Channels: '',
    });
  }
  onChange(dates, dateStrings) {
    this.setState({
      lastLoginStart: dateStrings[0],
      lastLoginEnd: dateStrings[1],
    });
  }
  onSelect(value, option) {
    if (value.indexOf('all') != -1) {
      this.allSelectClick();
      return;
    }
    if (!value[0]) {
      this.setState({
        Channels: value.join(','),
        value,
        allSelected: false,
      });
    } else {
      const {informationStore} = this.props;
      const deviceMenu = toJS(informationStore.deviceMenu);
      const isAll =
        value.length === deviceMenu.length &&
        this.isAllSelected(value, deviceMenu);
      this.setState({
        Channels: value.join(','),
        allSelected: isAll,
        value,
      });
    }
  }
  isAllSelected(value, deviceMenu) {
    let isAll = true;
    _.map(deviceMenu, item => {
      if (value.indexOf(item.F_ChannelID) === -1) isAll = false;
    });
    return isAll;
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
      $(`.${styles['drop_down']} .ant-select-selection__clear`).click();
    }
  }
  handleClick() {
    if (!this.state.lastLoginStart || !this.state.lastLoginEnd) {
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
      lastLoginStart: this.state.lastLoginStart,
      lastLoginEnd: this.state.lastLoginEnd,
    };
    this.setState({
      searchContent: true,
    });
    if (this.state.isChart) {
      informationStore.findDeviceData(params);
    } else {
      informationStore.findDeviceDataList(params);
    }
  }
  switchClick() {
    if (!this.state.lastLoginStart || !this.state.lastLoginEnd) {
      message.error('请选择时间!');
      return;
    }
    if (!this.state.Channels) {
      message.error('请选择通道!');
      return;
    }
    this.setState(({isChart}) => {
      return {
        isChart: !isChart,
      };
    });
    const {informationStore} = this.props;
    const params = {
      F_DeviceID: informationStore.currentDevice,
      Channels: this.state.Channels,
      lastLoginStart: this.state.lastLoginStart,
      lastLoginEnd: this.state.lastLoginEnd,
    };
    if (!this.state.isChart) {
      informationStore.findDeviceData(params);
    } else {
      informationStore.findDeviceDataList(params);
    }
  }
  export(item) {
    const {informationStore: {currentDevice}} = this.props;
    location.href =
      '/collect/device_basechannel/toExcel.do?F_DeviceID=' +
      currentDevice +
      '&Channels=' +
      item.F_ChannelID +
      '&lastLoginStart=' +
      this.state.lastLoginStart +
      '&lastLoginEnd=' +
      this.state.lastLoginEnd;
  }
  exportChange(item) {
    this.export(item);
  }

  render() {
    const {informationStore} = this.props;
    const deviceMenu = toJS(informationStore.deviceMenu);
    const children = _.map(deviceMenu, (item, i) => {
      return <Option key={item.F_ChannelID}>{item.F_ChannelName}</Option>;
    });
    children.unshift(
      <Option
        className={classnames(this.state.allSelected && styles['all_selected'])}
        key={'all'}>
        全选
      </Option>,
    );
    const deviceData = toJS(informationStore.deviceData);
    const echartArr =
      this.state.isChart &&
      _.map(deviceData, (item, i) => {
        let echartOptions = _.cloneDeep(options())[0];

        echartOptions.title.text = item.F_ChannelName;
        echartOptions.xAxis[0].data = item.F_RecordTime;
        item.Unit && (echartOptions.yAxis[0].name = '单位/' + item.Unit);
        echartOptions.legend.data = ['最大值', '最小值', '平均值'];
        echartOptions.color = ['#7ffbbc', '#a4cbff', '#ffd800'];
        echartOptions.listData = item.value;
        echartOptions.series = [
          {
            name: '最大值',
            type: 'line',
            areaStyle: {normal: {color: '#7ffbbc', opacity: 0.6}},
            lineStyle: {normal: {opacity: 0}},
            data: item.maxfs,
          },
          {
            name: '最小值',
            type: 'line',
            areaStyle: {normal: {color: '#a4cbff', opacity: 0.6}},
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
          <EchartsOrList
            data={item}
            loading={informationStore.d_loading}
            deviceData={deviceData}
            echartOptions={echartOptions}
            key={i.toString(36) + i}
            exportChange={this.exportChange}
          />
        );
      });

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
          <Button
            onClick={this.handleClick}
            className={styles['his_common_btn']}>
            搜索
          </Button>
        </div>
        <Spin spinning={this.state.isChart && informationStore.d_loading}>
          <div className={styles['echart_wrap']}>
            {deviceData[0] ? (
              this.state.isChart ? (
                echartArr
              ) : (
                <div className={styles['history_table_wrap']}>{listTable}</div>
              )
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
