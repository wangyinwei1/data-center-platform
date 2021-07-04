import {observable, action, autorun} from 'mobx';
import {login} from '../services/api.js';

class Global {
  @observable serviceip = '';
  @observable collapsed = false;
  @observable isTimeout = false;
  @observable isOvertime = false;
  @action
  async changeIsTimeout(bOk) {
    this.isTimeout = bOk;
  }

  @action
  async saveIp_name({ip}) {
    this.serviceip = ip;
  }
  @action
  async changeCollapsed(onOff) {
    this.collapsed = onOff;
  }
  @action
  async changeOvertime(bOk) {
    this.isOvertime = bOk;
  }
}

export default Global;
