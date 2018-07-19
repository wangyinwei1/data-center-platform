import {observable, action, autorun} from 'mobx';
import {getTable} from '../services/api.js';
class Table {
  @observable tableData = {};
  @observable pagination = {};

  @action
  async getTable(params) {
    const data = await getTable(params);
    if (data.varList[0]) {
      this.tableData = data;
    }
  }
}

export default Table;
