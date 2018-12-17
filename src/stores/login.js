import {observable, action} from 'mobx';
import {login, logout} from '../services/api.js';
import {message} from 'antd';

class Login {
  @observable theme = 'blue';
  @observable isLogin = false;

  @action
  async loginOut() {
    const data = await logout();
    if (data.result === 'success') {
      return true;
    } else {
      message.error(data.msg);
      return false;
    }
  }
  @action
  async userLogin(params, router, imgDom) {
    this.isLogin = true;
    const data = await login(params);
    this.isLogin = false;

    if (data.result === 'success') {
      return {
        ip: data.serviceip,
        username: data.username,
        isAdmin: data.admin,
        FsuTypeID: data.FsuTypeID,
        isNotArea: data.Area === '片区' || !data.Area,
      };
    } else {
      message.error(data.msg);
      return false;
    }
  }
}

export default Login;
