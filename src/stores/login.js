import {observable, action} from 'mobx';
import {login} from '../services/api.js';
import {message} from 'antd';

class Login {
  @observable theme = 'blue';

  @action
  async userLogin(params, router, imgDom) {
    const data = await login(params);

    if (data.result === 'success') {
      return {ip: data.serviceip, username: data.username};
    } else {
      message.error(data.msg);
      return false;
    }
  }
}

export default Login;
