import {observable, action} from 'mobx';
import {
  agreement_search,
  getAgreementTable,
  agreement_delete,
  agreementSave,
  agreementEditSave,
} from '../services/api.js';
import {message} from 'antd';
class Site {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable loading = false;

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await getAgreementTable(params);
    this.loading = false;
    params.number = data.pd.number || 10;
    params.page = data.pd.page || 0;
    this.tableParmas = params;
    this.tableData = data;
  }
  @action.bound
  async search(params) {
    this.loading = true;
    const data = await getAgreementTable(params);
    this.loading = false;
    params.number = data.pd.number;
    params.page = data.pd.page;
    this.tableParmas = params;
    this.tableData = data;
  }
  @action.bound
  async editSave(params) {
    const data = await agreementEditSave(params);
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
    const data = await agreementSave(params);
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

  @action
  async delete(params) {
    const data = await agreement_delete(params);
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
