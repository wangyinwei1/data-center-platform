import {observable, action} from 'mobx';
import {
  getConfigFileList,
  deleteConfigFiles,
  sendConfigFileList,
} from '../services/api.js';
import {message} from 'antd';

class Fsuconfig {
  @observable tableData = [];
  @observable tableParmas = {};
  @observable loading = false;
  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getConfigFileList(params);
    this.loading = false;
    this.tableParmas = params;
    if (data.Result === 'success') {
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async deleteConfigFiles(params) {
    const data = await deleteConfigFiles(params);
    if (data.Result === 'success') {
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async sendConfigFileList(params) {
    const data = await sendConfigFileList(params);
    if (data.Result === 'success') {
      message.success(data.Msg);
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
  }
}

export default Fsuconfig;
