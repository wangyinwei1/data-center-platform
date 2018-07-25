import {observable, action, autorun} from 'mobx';
import {login} from '../services/api.js';
class Global {
  @observable serviceip = '';
  @observable collapsed = false;

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
