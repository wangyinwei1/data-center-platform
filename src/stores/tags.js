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
  getSiteTreasureList,
  getTagList,
  deleteTags,
  tagSave,
  tagEdit,
  getTagHistory,
  getTagAlarm,
  getTagLogs,
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
  @observable c_tableParmas = {};
  @observable tagLoading = false;
  @observable tagData = {};
  @observable tagParmas = {};
  @observable detailLoading = false;
  @observable detailData = {};
  @observable detailParmas = {};

  @observable siteTreasureList = [];

  @action.bound
  async changeSelectedValue(value) {
    this.selectedValue = value;
  }
  @action.bound
  async getList(params) {
    this.loading = true;
    const data = await getSiteTreasureList(params);
    this.loading = false;
    params.number = data.Data.number;
    params.page = data.Data.page;
    if (data.Result === 'success') {
      this.siteTreasureList = data.Data.list;
      const selectedValue = toJS(this.selectedValue);
      if (data.Data.list[0]) {
        const gdbId = selectedValue
          ? selectedValue
          : data.Data.list[0] && data.Data.list[0].gdbId;
        data.Data.list[0] &&
          this.getTagList({
            gdbId: gdbId,
            page: 1,
            keywords: '',
            number: 10,
          });
        this.selectedValue = gdbId;
      } else {
        this.tagData = {
          list: [],
          number: 10,
          page: 1,
        };
      }
    }
  }
  @action.bound
  async getTagDetail(params, which) {
    this.detailLoading = true;
    let data;
    switch (which) {
      case 'logs':
        data = await getTagLogs(params);
        break;
      case 'history':
        data = await getTagHistory(params);
        break;
      case 'alarm':
        data = await getTagAlarm(params);
        break;
    }
    this.detailLoading = false;

    params.number = data.Data.number;
    params.page = data.Data.page;
    this.detailParmas = params;
    if (data.Result == 'success') {
      this.detailData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getTagList(params) {
    this.tagLoading = true;
    const data = await getTagList(params);
    this.tagLoading = false;
    params.number = data.Data.number;
    params.page = data.Data.page;
    this.tagParmas = params;
    if (data.Result == 'success') {
      this.tagData = data.Data;
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
  @action
  async delete(params) {
    const data = await deleteTags(params);
    if (data.Result == 'success') {
      this.getTagList(this.tagParmas);
      message.success('删除成功!');
    } else {
      message.error(data.Msg);
    }
    return data;
  }
  @action.bound
  async tagSave(params) {
    const data = await tagSave(params);
    if (data.Result == 'success') {
      this.getTagList(this.tagParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async tagEdit(params) {
    const data = await tagEdit(params);
    if (data.Result == 'success') {
      this.getTagList(this.tagParmas);
      message.success(data.Msg);
      return true;
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
