import {observable, action} from 'mobx';
import {
  passivedevicechangerecord_search,
  getPassivedevicechangerecordTable,
} from '../services/api.js';
import {message} from 'antd';
class Passivedevicechangerecord {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable c_tableData = {};
  @observable c_tableParmas = {};
  @observable loading = false;
  @observable c_loading = false;

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getPassivedevicechangerecordTable(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }
  @action.bound
  async search(params) {
    this.loading = true;
    const data = await passivedevicechangerecord_search(params);
    this.loading = false;
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
    // if (data.Result == 'success') {
    //   params.number = data.Data.number;
    //   params.page = data.Data.page;
    //   this.tableParmas = params;
    //   this.tableData = data.Data;
    // } else {
    //   message.error(data.Msg);
    // }
  }
}

export default Passivedevicechangerecord;
