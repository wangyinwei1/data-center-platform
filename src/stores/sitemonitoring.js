import {observable, action, toJS} from 'mobx';
import {
  getSiteTable,
  getVideoInfo,
  getStationAlarm,
  stationMonitorById,
  confirmAlarm,
  cancelAlarm,
  dealAlarm,
  endAlarm,
} from '../services/api.js';
import {message} from 'antd';
class SiteMonitoring {
  @observable siteList = [];
  @observable siteDetail = [];
  @observable tableParmas = {};
  @observable belongRegion = '';
  @observable selectedValue = '';
  @observable currentCode = 0;
  @observable loading = false;
  @observable d_loading = false;
  @observable selectedKey = '';
  @observable c_tableData = [];
  @observable siteVideo = [];
  @observable c_loading = false;
  @observable activeKey = '1';
  @observable c_tableParmas = {};

  @action.bound
  async changeActiveKey(value) {
    this.activeKey = value;
  }
  @action.bound
  async changeSelectedValue(value) {
    this.selectedValue = value;
  }
  @action.bound
  async confirmAlarm(params) {
    const data = await confirmAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getStationAlarm(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async cancelAlarm(params) {
    const data = await cancelAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getStationAlarm(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async dealAlarm(params) {
    const data = await dealAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getStationAlarm(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async endAlarm(params) {
    const data = await endAlarm(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getStationAlarm(toJS(this.c_tableParmas));
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getList(params) {
    this.loading = true;
    const data = await getSiteTable(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.siteList = data.varList;
    this.currentCode = params.ztreeChild;
    const selectedValue = toJS(this.selectedValue);
    const id = selectedValue
      ? selectedValue
      : data.varList[0] && data.varList[0].F_ID;
    data.varList[0] &&
      this.getDetail({
        id: id,
      });
    id &&
      this.getVideoInfo({
        id: id,
      });

    return (data.varList && data.varList) || [];
  }
  @action.bound
  async getVideoInfo(params) {
    const data = await getVideoInfo(params);
    if (data.Result === 'success') {
      this.siteVideo = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getStationAlarm(params) {
    this.c_loading = true;
    const data = await getStationAlarm(params);
    this.c_loading = false;
    if (data.Result === 'success') {
      params.page = data.Data.page;
      params.number = data.Data.number;
      this.c_tableParmas = params;
      this.c_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getDetail(params) {
    this.d_loading = true;
    const data = await stationMonitorById(params);
    if (data.Result === 'success') {
      this.d_loading = false;
      this.siteDetail = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action
  async matchArea(text) {
    var city = /^\d{3}[1-9]00\b/; //市下的编码匹配
    var province = /^\d{2}0{4}\b/; //省下的编码匹配
    var area = /^\d{4}((0?[1-9])|([1-9][0-9]))$/; //区下的编码匹配
    var zone = /^\d{8}\b/; //省下的编码匹配
    if (text === 0) {
      return 'country';
    } else if (province.test(text)) {
      return 'province';
    } else if (city.test(text)) {
      return 'city';
    } else if (area.test(text)) {
      return 'area';
    } else if (zone.test(text)) {
      return 'zone';
    } else {
      return 'site';
    }
  }
}

export default SiteMonitoring;
