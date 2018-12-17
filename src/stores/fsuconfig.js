import {observable, action} from 'mobx';
import {
  getConfigFileList,
  deleteConfigFiles,
  sendConfigFileList,
} from '../services/api.js';
import {message} from 'antd';

class Fsuconfig {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable loading = false;
  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getConfigFileList(params);
    this.loading = false;
    if (data.result === 'success') {
      this.tableParmas = params;
      this.tableData = data;
    } else {
      message.error(data.msg);
    }
  }
  @action.bound
  async deleteConfigFiles(params) {
    const data = await deleteConfigFiles(params);
    if (data.result === 'success') {
      message.success(data.msg);
    } else {
      message.error(data.msg);
    }
  }
  @action.bound
  async sendConfigFileList(params) {
    const data = await sendConfigFileList(params);
    if (data.result === 'success') {
      message.success(data.msg);
      return true;
    } else {
      message.error(data.msg);
      return false;
    }
  }
}

export default Fsuconfig;
