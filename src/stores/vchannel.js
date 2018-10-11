import {observable, action, toJS} from 'mobx';
import {
  vchannel_search,
  getVchannelTable,
  vchannel_delete,
  getZone_vchannel,
  getAsynArea_vchannel,
  getVchannelAdd,
  queryChannelList,
  vchannelEditSave,
  vchannelSave,
} from '../services/api.js';
import {message} from 'antd';
class Vchannel {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable topZoneCode = 0;

  @observable zTreeLevel = 1;
  @observable initialArea = '';
  @observable areaTree = [];
  @observable loading = false;
  @observable addData = {};
  @observable editData = {};
  @observable channelList = {};

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getVchannelTable(params);
    this.loading = false;
    params.number = data.Data.number;
    params.page = data.Data.page;
    if (data.Result == 'success') {
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async search(params) {
    this.loading = true;
    const data = await vchannel_search(params);
    this.loading = false;
    params.number = data.Data.number;
    params.page = data.Data.page;
    this.tableParmas = params;
    this.tableData = data.Data;
  }
  @action.bound
  async getAsynArea() {
    const data = await getAsynArea_vchannel();
    const areaTree = (data && data.varList) || [];
    const newData = areaTree.map(item => {
      return {
        ...item,
        value: item.F_TypeName,
      };
    });
    if (newData.length == 1) {
      this.topZoneCode = newData[0].code;
    }
    this.areaTree = [newData];
    return newData;
  }
  @action.bound
  async getZone(params, index) {
    const data = await getZone_vchannel(params);
    if (data instanceof Array) return;
    const newData = data.varList.map(item => {
      return {
        ...item,
        value: item.name,
      };
    });
    const areaTree = toJS(this.areaTree);
    const sliceTree = areaTree.slice(0, index + 1);
    sliceTree[index + 1] = newData;

    this.areaTree = sliceTree;
    return newData;
  }
  @action.bound
  async getGoAdd(params) {
    const data = await getVchannelAdd(params);
    this.queryChannelList({
      F_TypeID: this.tableParmas.F_TypeID,
      F_Version: this.tableParmas.F_Version,
      keywords: '',
    });
    this.addData = data;
    return data;
  }
  @action.bound
  async queryChannelList(params) {
    const data = await queryChannelList(params);
    this.channelList = data;
    return data;
  }
  @action.bound
  async editSave(params) {
    const data = await vchannelEditSave(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
    return data;
  }
  @action.bound
  async save(params) {
    const data = await vchannelSave(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
    return data;
  }
  @action.bound
  async getEidtData(params) {
    const data = await getVchannelAdd(params);
    this.queryChannelList({
      F_TypeID: this.tableParmas.F_TypeID,
      F_Version: this.tableParmas.F_Version,
      keywords: '',
    });
    this.editData = data;
    return data;
  }

  @action
  async delete(params) {
    const data = await vchannel_delete(params);
    if (data.result == 'success' || data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success('删除成功!');
    }
    return data;
  }
}

export default Vchannel;
