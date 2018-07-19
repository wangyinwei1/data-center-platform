import {observable, action} from 'mobx';
import {controlrecord_search, getControlrecordTable} from '../services/api.js';
import {message} from 'antd';
class Controlrecord {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable c_tableData = {};
  @observable c_tableParmas = {};
  @observable loading = false;
  @observable c_loading = false;

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getControlrecordTable(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async search(params) {
    this.loading = true;
    const data = await controlrecord_search(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
}

export default Controlrecord;
