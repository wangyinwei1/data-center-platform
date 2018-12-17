import axios from 'axios';
import globalStore from '../stores/global.js';
import {stores} from '../stores/index.js';
import {message, notification} from 'antd';
let once401 = false;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  // notification.error({
  //   message: `请求错误 ${response.status}: ${response.config.url}`,
  //   description: response.statusText,
  // });

  const error = new Error(response.statusText);

  error.response = response;

  throw error;
}
function catchError(error) {
  if (error.code) {
    // !once401 &&
    //   notification.error({
    //     message: error.name,
    //     description: error.message,
    //   });
  }
  if ('stack' in error && 'message' in error) {
    // !once401 &&
    //   notification.error({
    //     description: error.message,
    //   });
    console.log('异常捕获' + error.message);
  }
  return error;
}

const request = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

request.interceptors.response.use(checkStatus, catchError);
request.interceptors.response.use(res => {
  if (res.response && res.response.status == 401) {
    const timeoutUrl = location.hash.replace(/#/, '');

    localStorage.setItem('timeoutUrl', timeoutUrl);
    setTimeout(() => {
      stores.globalStore.changeIsTimeout(true);
      !once401 && message.error('登录超时,请重新登录！');
      res.status === 200 ? (once401 = false) : (once401 = true);
      if (process.env.NODE_ENV == 'production') {
        location.href = location.origin + '/collect/#/login';
      } else {
        location.href = location.origin + '/#/login';
      }
    }, 50);
    return response;
  }
  return res.data;
});

export default request;
