import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {
  Button,
  Select,
  DatePicker,
  Dropdown,
  Upload,
  Icon,
  Menu,
  message,
} from 'antd';
import moment from 'moment';
import styles from './index.less';
import Search from '../Search';
import Remarks from '../Remarks';
import classnames from 'classnames';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
//实例
@inject('globalStore', 'layoutStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.export = this.export.bind(this);
    this.real = this.real.bind(this);
    this.refresh = this.refresh.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.channelTypeChange = this.channelTypeChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.batchDisable = this.batchDisable.bind(this);
    this.batchDelete = this.batchDelete.bind(this);
    this.batchEnabled = this.batchEnabled.bind(this);
    this.import = this.import.bind(this);
    this.downDev = this.downDev.bind(this);
    this.exportTpl = this.exportTpl.bind(this);
    this.batchClick = this.batchClick.bind(this);
    this.typesChange = this.typesChange.bind(this);
    this.onTimeOk = this.onTimeOk.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.realtimeMonitorPointChange = this.realtimeMonitorPointChange.bind(
      this,
    );
    this.realtimeSubDevChange = this.realtimeSubDevChange.bind(this);
    this.state = {
      subDevValue: undefined,
      monitorPointValue: undefined,
    };
  }
  componentDidMount() {}
  add() {
    const {onClick} = this.props;
    onClick && onClick();
  }
  onOpenChange(status) {
    const {onTimeOk} = this.props;
    !this.isClose && !status && onTimeOk && onTimeOk();
    this.isClose = false;
  }
  onTimeOk() {
    const {onTimeOk} = this.props;
    onTimeOk && onTimeOk();
    this.isClose = true;
  }
  downDev() {
    const {downDevChange} = this.props;
    downDevChange && downDevChange();
  }
  real() {
    const {onClick} = this.props;
    onClick && onClick();
  }
  refresh() {
    const {onRefreshClick} = this.props;
    onRefreshClick && onRefreshClick();
  }
  export() {
    const {onExportClick} = this.props;
    onExportClick && onExportClick();
  }
  import() {
    const {onImportClick} = this.props;
    onImportClick && onImportClick();
  }
  exportTpl() {
    const {onExportTplClick} = this.props;
    onExportTplClick && onExportTplClick();
  }
  batchEnabled() {
    const {onBatchEnabledClick} = this.props;
    onBatchEnabledClick && onBatchEnabledClick();
  }
  batchDisable() {
    const {onBatchDisableClick} = this.props;
    onBatchDisableClick && onBatchDisableClick();
  }
  reportedChange = () => {
    const {reportedChange} = this.props;
    reportedChange && reportedChange();
  };
  historyChange = () => {
    const {historyChange} = this.props;
    historyChange && historyChange();
  };
  issuedChange = () => {
    console.log(this.props);
    const {issuedChange} = this.props;
    issuedChange && issuedChange();
  };

  batchDelete() {
    const {onBatchDeleteClick} = this.props;
    onBatchDeleteClick && onBatchDeleteClick();
  }
  selectChange(value) {
    const {selectChange} = this.props;
    selectChange && selectChange(value);
  }
  typesChange(value) {
    const {typesChange} = this.props;

    typesChange && typesChange(value);
  }
  channelTypeChange(value) {
    const {channelTypeChange} = this.props;
    channelTypeChange && channelTypeChange(value);
  }
  onTimeChange(dates, dateStrings) {
    const {timeChange} = this.props;
    timeChange && timeChange(dates, dateStrings);
  }
  realtimeSubDevChange(value) {
    this.setState({subDevValue: value});
    const {realtimeSubDevChange} = this.props;
    realtimeSubDevChange && realtimeSubDevChange(value);
  }
  realtimeMonitorPointChange(value) {
    this.setState({monitorPointValue: value});
    const {realtimeMonitorPointChange} = this.props;
    realtimeMonitorPointChange && realtimeMonitorPointChange(value);
  }
  batchClick(item) {
    const value = item.key;
    switch (value) {
      case '1':
        this.batchDelete();
        break;
      case '2':
        this.batchEnabled();
        break;
      case '3':
        this.batchDisable();
        break;
    }
  }
  render() {
    const {
      onSearch,
      onClick,
      showValue,
      deviceStatus,
      needRealtime,
      fsuAddTypes,
      realLoding,
      closeAdd,
      searchValue,
      theme,
      realtimeSubDev,
      realtimeMonitorPointMenu,
      channelType,
    } = this.props;
    const hasSearchValue = _.has(this.props, 'searchValue');

    const channelTypeData = [
      {F_ID: '', F_TypeName: '全部'},
      {F_ID: 1, F_TypeName: '遥测'},
      {F_ID: 2, F_TypeName: '遥信'},
      {F_ID: 3, F_TypeName: '遥调'},
      {F_ID: 4, F_TypeName: '遥控'},
      {F_ID: 5, F_TypeName: '虚拟通道'},
    ];
    const batchMenu = (
      <Menu onClick={this.batchClick}>
        <Menu.Item key="1">批量删除</Menu.Item>
        <Menu.Item key="2">批量启用</Menu.Item>
        <Menu.Item key="3">批量禁用</Menu.Item>
      </Menu>
    );

    return (
      <div className={styles['action_bar']}>
        {showValue &&
          showValue.indexOf('realtimeSubDev') != -1 &&
          (realtimeSubDev && (
            <div className={styles['subdev']}>
              <Select
                value={this.state.subDevValue}
                placeholder={'请选择子设备'}
                onChange={this.realtimeSubDevChange}>
                {_.map(realtimeSubDev || [], (item, i) => {
                  return (
                    <Option key={i.toString(36) + i} value={item.deviceID}>
                      {item.deviceName}
                    </Option>
                  );
                })}
              </Select>
            </div>
          ))}
        {showValue &&
          showValue.indexOf('realtimeMonitorPoint') != -1 &&
          (realtimeSubDev && (
            <div className={styles['subdev']}>
              <Select
                defaultValue={1}
                placeholder={'请选择监控点'}
                onChange={this.realtimeMonitorPointChange}>
                {_.map(
                  [
                    {F_ID: 1, F_TypeName: '遥测'},
                    {F_ID: 3, F_TypeName: '遥信'},
                  ],
                  (item, i) => {
                    return (
                      <Option key={i.toString(36) + i} value={item.F_ID}>
                        {item.F_TypeName}
                      </Option>
                    );
                  },
                )}
              </Select>
            </div>
          ))}
        {showValue && showValue.indexOf('time') != -1 && (
          <div className={styles['device_time']}>
            <RangePicker
              ranges={{
                当天: [moment().startOf('day'), moment().endOf('day')],
                最近一周: [moment().subtract(1, 'weeks'), moment()],
                最近一个月: [moment().subtract(1, 'months'), moment()],
                最近三个月: [moment().subtract(3, 'months'), moment()],
              }}
              defaultValue={[moment().startOf('day'), moment().endOf('day')]}
              className={'cl_time'}
              onChange={this.onTimeChange}
              onOk={this.onTimeOk}
              onOpenChange={this.onOpenChange}
              showTime
              format={'YYYY-MM-DD HH:mm:ss'}
            />
          </div>
        )}
        {onSearch && (
          <Search
            onSearch={onSearch}
            value={searchValue}
            hasSearchValue={hasSearchValue}
            theme={theme}
          />
        )}
        {deviceStatus && (
          <div
            className={classnames(
              styles['device_status'],
              fsuAddTypes && styles['device_types'],
            )}>
            <span>设备状态:</span>
            <Select defaultValue="" onChange={this.selectChange}>
              <Option value="">全部</Option>
              <Option value="0">离线</Option>
              <Option value="1">在线</Option>
              <Option value="2">异常</Option>
            </Select>
          </div>
        )}
        {JSON.parse(localStorage.getItem('isAdmin')) && fsuAddTypes && (
          <div
            className={classnames(
              styles['device_status'],
              styles['device_types'],
            )}>
            <span>设备类型:</span>
            <Select
              defaultValue={JSON.parse(localStorage.getItem('FsuTypeID'))}
              onChange={this.typesChange}>
              {_.map(fsuAddTypes, (item, i) => {
                return (
                  <Option key={i.toString(36) + i} value={item.typeId}>
                    {item.typeName}
                  </Option>
                );
              })}
            </Select>
          </div>
        )}

        {channelType && (
          <div className={styles['device_status']}>
            <span>通道类型:</span>
            <Select defaultValue="" onChange={this.channelTypeChange}>
              {_.map(channelTypeData, (item, i) => {
                return (
                  <Option key={i.toString(36) + i} value={item.F_ID}>
                    {item.F_TypeName}
                  </Option>
                );
              })}
            </Select>
          </div>
        )}
        {/* <Remarks /> */}
        <div className={styles['btn_wrap']}>
          {showValue && showValue.indexOf('upload') != -1 && (
            <Button className={styles['add_btn']} onClick={this.import}>
              <i
                className={classnames('icon iconfont icon-xinzeng')}
                style={{paddingRight: '4px'}}
              />
              <span>上传</span>
            </Button>
          )}
          {(!showValue || !showValue[0]) && !closeAdd && (
            <Button className={styles['add_btn']} onClick={this.add}>
              <i
                className={classnames('icon iconfont icon-xinzeng')}
                style={{paddingRight: '4px'}}
              />
              <span>新增</span>
            </Button>
          )}
          {showValue && showValue.indexOf('real') != -1 && (
            <Button
              className={styles['real_btn']}
              disabled={!needRealtime}
              loading={realLoding}
              onClick={this.real}>
              实时召测
            </Button>
          )}
          {showValue && showValue.indexOf('exportMonitorTpl') != -1 && (
            <Button
              className={styles['exportTpl_btn']}
              onClick={this.exportTpl}>
              <i
                className={classnames(
                  'icon iconfont icon-xiazai',
                  styles['common_icon'],
                )}
              />
              <span>监控点模板</span>
            </Button>
          )}
          {showValue && showValue.indexOf('batchOption') != -1 && (
            <Dropdown overlay={batchMenu} overlayClassName={'batch_cl_option'}>
              <Button
                className={classnames(
                  styles['batch_btn'],
                  styles['batch_option'],
                )}
                style={{width: '102px'}}>
                批量操作
                <Icon type="down" />
              </Button>
            </Dropdown>
          )}
          {showValue && showValue.indexOf('batchDelete') != -1 && (
            <Button className={styles['batch_btn']} onClick={this.batchDelete}>
              批量删除
            </Button>
          )}
          {showValue && showValue.indexOf('batchEnabled') != -1 && (
            <Button className={styles['batch_btn']} onClick={this.batchEnabled}>
              批量启用
            </Button>
          )}
          {showValue && showValue.indexOf('eventsReported') != -1 && (
            <Button
              className={styles['batch_btn']}
              onClick={this.reportedChange}>
              事件上报
            </Button>
          )}
          {showValue && showValue.indexOf('history') != -1 && (
            <Button
              className={styles['batch_btn']}
              onClick={this.historyChange}>
              数据查看
            </Button>
          )}
          {showValue && showValue.indexOf('issued') != -1 && (
            <Button className={styles['batch_btn']} onClick={this.issuedChange}>
              指令下发日志
            </Button>
          )}
          {showValue && showValue.indexOf('batchDisable') != -1 && (
            <Button className={styles['batch_btn']} onClick={this.batchDisable}>
              批量禁用
            </Button>
          )}
          {showValue && showValue.indexOf('refresh') != -1 && (
            <Button className={styles['refresh_btn']} onClick={this.refresh}>
              <i
                className={classnames('icon iconfont icon-sousuo')}
                style={{paddingRight: '4px'}}
              />
              <span>实时刷新</span>
            </Button>
          )}
          {showValue && showValue.indexOf('exportTpl') != -1 && (
            <Button
              className={styles['exportTpl_btn']}
              onClick={this.exportTpl}>
              <i
                className={classnames(
                  'icon iconfont icon-xiazai',
                  styles['common_icon'],
                )}
              />
              <span>下载模板</span>
            </Button>
          )}
          {showValue && showValue.indexOf('import') != -1 && (
            <Button className={styles['import_btn']} onClick={this.import}>
              <i
                className={classnames(
                  'icon iconfont icon-daoru',
                  styles['common_icon'],
                )}
              />
              <span>导入</span>
            </Button>
          )}
          {showValue && showValue.indexOf('export') != -1 && (
            <Button className={styles['export_btn']} onClick={this.export}>
              <i
                className={classnames(
                  'icon iconfont icon-daochu',
                  styles['common_icon'],
                )}
              />
              <span>导出</span>
            </Button>
          )}
          {showValue && showValue.indexOf('downDev') != -1 && (
            <Button className={styles['add_btn']} onClick={this.downDev}>
              <i
                className={classnames('icon iconfont icon-xinzeng')}
                style={{paddingRight: '4px'}}
              />
              <span>下发配置</span>
            </Button>
          )}
          {showValue && showValue.indexOf('add') != -1 && (
            <Button className={styles['add_btn']} onClick={this.add}>
              <i
                className={classnames('icon iconfont icon-xinzeng')}
                style={{paddingRight: '4px'}}
              />
              <span>新增</span>
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Regional;
