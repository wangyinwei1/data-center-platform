import {observable, action} from 'mobx';
import {
  site_search,
  siteInitEdit,
  siteInitAdd,
  getSiteTable,
  getAreaSonList,
  site_delete,
  findInspectionInfoByBelongId,
  siteSave,
  siteEdit,
} from '../services/api.js';
import {message} from 'antd';
class Site {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable belongRegion = '';
  @observable addLists = {};
  @observable editData = {};
  @observable currentCode = {};
  @observable loading = false;
  @observable c_tableData = [];
  @observable c_tableParmas = {};

  @action
  async getTable(params) {
    this.loading = true;
    const data = await getSiteTable(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
    this.currentCode = params.ztreeChild;
    this.matchArea(params.ztreeChild).then(region => {
      this.belongRegion = region;
    });
  }
  @action
  async getChildTable(params) {
    this.c_loading = true;
    const data = await findInspectionInfoByBelongId(params);
    this.c_loading = false;
    this.c_tableData = data;
    params.number = data.number;
    params.page = data.page;
    this.c_tableParmas = params;
    // this.tableData = data;
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
  @action
  async getEidtData(params) {
    const data = await siteInitEdit(params);
    this.editData = data;
    return data;
  }
  @action.bound
  async getAreaSonList(params) {
    const data = await getAreaSonList(params);
    return data.varList;
  }
  @action.bound
  async save(params) {
    const data = await siteSave(params);

    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action.bound
  async edit(params) {
    const data = await siteEdit(params);

    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action.bound
  async addArea(params) {
    const data = await siteInitAdd(params);
    this.addLists = data;
    return data;
  }
  @action
  async search(params) {
    const data = await site_search(params);
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }

  @action
  async delete(params) {
    const data = await site_delete(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success('删除成功!');
    } else {
      message.error(data.Msg);
    }
    return data;
  }
}

export default Site;
