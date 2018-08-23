import {observable, action, autorun} from 'mobx';
import {login} from '../services/api.js';
const isIndex = window.location.href.indexOf('/shouye') != -1;
const isMinWidth = $(window).width() < 1280;

class Global {
  @observable serviceip = '';
  @observable collapsed = isIndex || isMinWidth ? true : false;

  @action
  async saveIp_name({ip}) {
    this.serviceip = ip;
  }
  @action
  async changeCollapsed(onOff) {
    this.collapsed = onOff;
  }
}

export default Global;
