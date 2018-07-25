import {observable, action} from 'mobx';
import {login} from '../services/api.js';

class Login {
  @observable theme = 'blue';

  @action
  async userLogin(params) {
    const data = await login(params);
  }
}

export default Login;
