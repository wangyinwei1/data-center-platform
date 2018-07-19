import {observable, action} from 'mobx';
import {getMenu} from '../services/api.js';

class Layout {
  @observable menu = [];
  @observable menuLoading = false;
  @observable selectedKeys = '';

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
}

export default Layout;
