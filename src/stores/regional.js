import {observable, action, toJS} from 'mobx';
import {
  getAsynArea,
  regional_delete,
  getTable,
  searchArea,
  getEidtData,
  getZone,
  save,
  addArea,
} from '../services/api.js';
import _ from 'lodash';
import {message} from 'antd';

class Regional {
  @observable areaTree = [];

  @observable tableData = {};
  @observable tableParmas = {};
  @observable topZoneCode = 0;
  @observable addLists = {};
  @observable editData = {};
  @observable belongRegion = '';

  @observable zTreeLevel = 1;
  @observable initialArea = '';
  @observable currentCode = 0;
  @observable loading = false;
  @action
  async getAsynArea() {
    const data = await getAsynArea();
    const areaTree = (data && data.areaTree) || [];
    const newData = areaTree.map(item => {
      return {
        ...item,
        value: item.name,
      };
    });
    if (newData.length == 1) {
      this.topZoneCode = newData[0].code;
    }

    this.areaTree = [newData];
    return newData;
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
  async delete(params) {
    const data = await regional_delete(params);
    if (data.result == 'success') {
      this.getTable(this.tableParmas);
      message.success('删除成功!');
    }
    return data;
  }

  @action
  async getEidtData(params) {
    const data = await getEidtData(params);
    this.editData = data;
    return data;
  }

  @action.bound
  async searchArea(params) {
    const data = await searchArea(params);
    if (data.Result == 'success') {
      this.areaTree = data.allArr;
    } else {
      message.error(data.Msg);
    }
    return data;
  }

  @action
  async getTable(params) {
    this.loading = true;
    const data = await getTable(params);
    this.loading = false;
    this.tableParmas = params;
    this.tableData = data;
    this.currentCode = params.ztreeChild;
    this.matchArea(params.ztreeChild).then(data => {
      this.belongRegion = data;
    });
  }
  @action.bound
  async save(params) {
    const data = await save(params);

    if (data.result == 'success') {
      this.getTable(this.tableParmas);
      message.success('保存成功!');
      return true;
    } else {
      message.error(data.msg);
      return false;
    }
  }
  @action.bound
  async addArea(params) {
    const data = await addArea(params);
    this.addLists = data;
    return data;
  }

  @action
  async getZone(params, index) {
    const data = await getZone(params);
    if (data instanceof Array) return;
    const newData = data.areaTree.map(item => {
      return {
        ...item,
        value: item.name,
      };
    });
    const areaTree = toJS(this.areaTree);
    const sliceTree = areaTree.slice(0, index + 1);
    sliceTree[index + 1] = newData;

    this.areaTree = sliceTree;
  }
}

export default Regional;
