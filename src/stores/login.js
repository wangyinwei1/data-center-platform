import {observable, action} from 'mobx';
import {login, logout} from '../services/api.js';
import {message} from 'antd';

class Login {
  @observable theme = 'blue';
  @observable isLogin = false;

  @action
  async loginOut() {
    const data = await logout();
    if (data.Result === 'success') {
      return true;
    } else {
      message.error(data.Msg);
      return false;
    }
  }
  @action
  async userLogin(params, router, imgDom) {
    this.isLogin = true;
    const data = await login(params);
    this.isLogin = false;

    if (data.Result === 'success') {
      return {
        ip: data.serviceip,
        username: data.username,
        isAdmin: data.admin,
        FsuTypeID: data.FsuTypeID,
        AppID: data.AppID,
        ECPUrl: data.ECPUrl,
        screenUrl: data.screenUrl,
        isNotArea: data.Area === '片区' || !data.Area,
      };
    } else {
      message.error(data.Msg);
      return false;
    }
  }
}

export default Login;
