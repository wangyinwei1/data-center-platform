import {observable, action} from 'mobx';
import {getMenu} from '../services/api.js';

class Layout {
  @observable menu = [];
  @observable menuLoading = false;
  @observable selectedKeys = '';
  //记录跳转之前的路径
  @observable beforePath = '';

  @action
  async getMenu() {
    //请求加载开始
    this.menuLoading = true;
    const menu = await getMenu();
    //请求加载结束
    this.menuLoading = false;
    this.menu = menu;
  }
  @action
  async setSelectedKeys(value) {
    this.selectedKeys = value;
  }
  @action
  async recordReforePath(value) {
    this.beforePath = value;
  }
}

export default Layout;
