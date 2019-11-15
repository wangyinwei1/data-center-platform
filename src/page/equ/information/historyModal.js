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
      tableLoading: false,
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
    const {deviceData, loading, data, isFsu, echartOptions} = this.props;
    const columns = columnData();
    return (
      <div
        ref={c => (this.echartsWrap = c)}
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
            <span>
              {isFsu ? `${data.deviceName}/${data.spName}` : data.F_ChannelName}
            </span>
            <span style={{fontSize: '14px', fontWeight: 'normal'}}>
              {isFsu
                ? data.spUnit
                  ? '(' + '单位/' + data.spUnit + ')'
                  : ''
                : data.unit
                ? '(' + '单位/' + data.unit + ')'
                : ''}
            </span>
          </div>
        )}
        {this.state.showEcharts ? (
          <i
            className={classnames(
              'icon iconfont icon-biaoge',
              styles['switch_type'],
            )}
            onClick={this.switch}>
            <span>切换列表</span>
          </i>
        ) : (
          <i
            className={classnames(
              'icon iconfont icon-tubiao',
              styles['switch_type'],
              styles['switch_list'],
            )}
            onClick={this.switch}>
            <span>切换图表</span>
          </i>
        )}
        {!this.state.showEcharts && (
          <i
            className={classnames(
              'icon iconfont icon-daochu',
              styles['switch_type'],
              styles['export_his_table'],
            )}
            onClick={this.export}>
            <span>导出表格</span>
          </i>
        )}
        {this.state.showEcharts ? (
          <ReactEcharts option={echartOptions} style={{height: '319px'}} />
        ) : (
          <div className={styles['history_list_wrap']}>
            {!data.tableList ? (
              <div className={styles['too_much_data']} onClick={this.export}>
                <i
                  className={classnames(
                    'icon iconfont icon-xiazai',
                    styles['table_download'],
                  )}
                />
                <span className={styles['table_detail']}>
                  数据量太多，请点击下载文件查看,谢谢！
                </span>
              </div>
            ) : (
              <Table
                loading={false}
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
            )}
          </div>
        )}
      </div>
    );
  }
}

//实例
@inject('historymodalStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.allSelectClick = this.allSelectClick.bind(this);
    this.exportChange = this.exportChange.bind(this);
    this.onSubDevChange = this.onSubDevChange.bind(this);
    this.export = this.export.bind(this);
    this.state = {
      allSelected: false,
      lastLoginStart: '',
      lastLoginEnd: '',
      Channels: '',
      value: [],
      subDeviceValue: undefined,
      searchContent: false,
    };
  }
  componentWillUnmount() {
    const {
      historymodalStore: {clearDeviceData},
    } = this.props;
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
  onSubDevChange(value, option) {
    const {
      historymodalStore: {his_subDevice, getGrandsonMenu},
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
      value: [],
      allSelected: false,
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
      const {historymodalStore} = this.props;
      const deviceMenu = toJS(historymodalStore.deviceMenu);
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
      if (
        value.indexOf(item.F_ChannelID) === -1 ||
        value.indexOf(item.spID) === -1
      ) {
        isAll = false;
      }
    });
    return isAll;
  }
  allSelectClick() {
    const selected = this.state.allSelected;
    if (!selected) {
      const {historymodalStore, isFsu} = this.props;
      const deviceMenu = isFsu
        ? toJS(historymodalStore.his_grandsonMenu)
        : toJS(historymodalStore.deviceMenu);
      let result = [];
      _.map(deviceMenu, item => {
        !isFsu ? result.push(item.F_ChannelID) : result.push(item.spID);
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
    const {historymodalStore, isFsu} = this.props;
    if (!isFsu && !this.state.Channels) {
      message.error('请选择通道!');
      return;
    }

    const needParams = isFsu
      ? {
          suID: historymodalStore.currentDevice,
          deviceIDs: this.state.subDeviceValue || '',
          spIDs: this.state.value.join(','),
        }
      : {
          F_DeviceID: historymodalStore.currentDevice,
          Channels: this.state.Channels,
        };

    const params = {
      ...needParams,
      lastLoginStart: this.state.lastLoginStart,
      lastLoginEnd: this.state.lastLoginEnd,
    };
    this.setState({
      searchContent: true,
    });
    isFsu
      ? historymodalStore.getFsuHisdataTable(params)
      : historymodalStore.findDeviceData(params);
  }
  export(item) {
    const {
      historymodalStore: {currentDevice},
      isFsu,
    } = this.props;
    if (!isFsu) {
      location.href =
        '/collect/device_hisdata/toExcel.do?F_DeviceID=' +
        currentDevice +
        '&Channels=' +
        item.channelID +
        '&lastLoginStart=' +
        this.state.lastLoginStart +
        '&lastLoginEnd=' +
        this.state.lastLoginEnd;
    } else {
      location.href =
        '/collect/FSU_hisdata/toExcel?suID=' +
        currentDevice +
        '&deviceIDs=' +
        item.deviceID +
        '&spIDs=' +
        item.spID +
        '&lastLoginStart=' +
        this.state.lastLoginStart +
        '&lastLoginEnd=' +
        this.state.lastLoginEnd;
    }
  }
  exportChange(item) {
    this.export(item);
  }

  render() {
    const {historymodalStore, isFsu} = this.props;
    const deviceMenu = toJS(historymodalStore.deviceMenu);
    const his_grandsonMenu = toJS(historymodalStore.his_grandsonMenu);
    let sunDev = [];
    const his_subDevice = toJS(historymodalStore.his_subDevice);
    if (isFsu) {
      sunDev = _.map(his_subDevice, (item, i) => {
        return <Option key={item.deviceID}>{item.deviceName}</Option>;
      });
    }
    const children = _.map(isFsu ? his_grandsonMenu : deviceMenu, (item, i) => {
      return (
        <Option key={isFsu ? item['spID'] : item['F_ChannelID']}>
          {isFsu ? item['spName'] : item['F_ChannelName']}
        </Option>
      );
    });
    children &&
      children.unshift(
        <Option
          className={classnames(
            this.state.allSelected && styles['all_selected'],
          )}
          key={'all'}>
          全选
        </Option>,
      );
    const deviceData = toJS(historymodalStore.deviceData);
    const echartArr = _.map(deviceData, (item, i) => {
      let echartOptions = _.cloneDeep(options())[0];

      echartOptions.title.text = isFsu
        ? `${item.deviceName}/${item.spName}`
        : item.channelName;
      echartOptions.xAxis[0].data = item.recordTime;
      isFsu
        ? item.spUnit && (echartOptions.yAxis[0].name = '单位/' + item.spUnit)
        : item.Unit && (echartOptions.yAxis[0].name = '单位/' + item.unit);
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
          loading={historymodalStore.d_loading}
          deviceData={deviceData}
          echartOptions={echartOptions}
          key={i.toString(36) + i}
          exportChange={this.exportChange}
          isFsu={isFsu}
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
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            onChange={this.onChange}
          />
          {/* {isFsu && ( */}
          {/*   <Select */}
          {/*     className={styles['sub_dev_wrap']} */}
          {/*     allowClear */}
          {/*     optionFilterProp="children" */}
          {/*     placeholder={'请选择子设备'} */}
          {/*     value={this.state.subDeviceValue} */}
          {/*     onChange={this.onSubDevChange}> */}
          {/*     {sunDev} */}
          {/*   </Select> */}
          {/* )} */}
          <Select
            mode="multiple"
            className={styles['drop_down']}
            allowClear
            // disabled={
            //   isFsu ? (this.state.subDeviceValue ? false : true) : false
            // }
            optionFilterProp="children"
            placeholder={isFsu ? '请选择监控点' : '请选择设备通道'}
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
        <Spin spinning={historymodalStore.d_loading}>
          <div className={styles['echart_wrap']}>
            {deviceData[0] ? (
              echartArr
            ) : this.state.searchContent && !historymodalStore.d_loading ? (
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
