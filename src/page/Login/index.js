import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import Cookies from 'js-cookie';
import {Button, Input, Form, Row, Col, Checkbox} from 'antd';
import classnames from 'classnames';
import {Link} from 'react-router';
import styles from './index.less';
import _ from 'lodash';
const logo = 'static/images/logo.png';
const FormItem = Form.Item;
//实例
@inject('loginStore', 'globalStore', 'layoutStore')
@Form.create()
@observer
class Loginer extends Component {
  constructor(props) {
    super(props);
    this.changeIdImg = this.changeIdImg.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.state = {
      errorMessage: '',
    };
  }
  setBgImage() {
    this.idImg.style.backgroundImage = `url(/collect/code.do?t=${new Date().getTime()})`;
  }
  componentDidMount() {
    this.setBgImage();
  }
  changeIdImg() {
    this.setBgImage();
  }
  onPressEnter(e) {
    this.userLogin(e);
  }
  userLogin(e) {
    const {loginStore, globalStore, layoutStore, form, router} = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({errorMessage: ''});
        const values = form.getFieldsValue();
        const password = encodeURIComponent(values.password);
        const username = values.username;
        const params = {
          username,
          password,
          code: values.code,
        };
        loginStore.userLogin(params).then(data => {
          if (data) {
            //保存serviceip
            // globalStore.saveIp_name({
            //   ip: data.ip,
            // }),
            localStorage.setItem('serviceip', data.ip);
            localStorage.setItem('isAdmin', data.isAdmin);
            localStorage.setItem('isNotArea', data.isNotArea);
            const timeoutUrl = localStorage.getItem('timeoutUrl');

            //记住密码设置cookies
            values.remember
              ? Cookies.set('remember', {username, password}, {expires: 7})
              : Cookies.remove('remember');
            //保存用户名
            Cookies.set('cl_username', {username: values.username});

            //跳转路由

            if (globalStore.isTimeout) {
              router.goBack();
            } else {
              //setSelectedKeys
              layoutStore.setSelectedKeys('shouye');
              router.push('/shouye');
            }
          } else {
            this.setBgImage();
          }
        });
      } else {
        const keys = _.keys(err);
        const firstKey = keys[0];
        const errorMessage = err[firstKey].errors[0].message;
        this.setState({errorMessage});
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {globalStore, loginStore} = this.props;
    const rememberCookies =
      Cookies.get('remember') && JSON.parse(Cookies.get('remember'));
    return (
      <div className={styles['login_wrap']}>
        <div className={classnames(styles['login_ct'], 'clearfix')}>
          <img src={logo} className={styles['logo']} />
          <div className={styles['logo_title']}>
            <p>物联网数据中心平台</p>
            <span>IOT &nbsp;DATA &nbsp;CENTER &nbsp;PLATFORM</span>
          </div>
          <div className={styles['line']} />
          <div className={styles['login_form']}>
            <Form>
              <FormItem className={styles['form_title']}>登录/Login</FormItem>
              <FormItem className={styles['account']}>
                {getFieldDecorator('username', {
                  initialValue: rememberCookies ? rememberCookies.username : '',
                  rules: [
                    {
                      required: true,
                      message: '账号不能为空！',
                    },
                  ],
                })(
                  <Input placeholder="账号" onPressEnter={this.onPressEnter} />,
                )}
              </FormItem>
              <FormItem className={styles['password']}>
                {getFieldDecorator('password', {
                  initialValue: rememberCookies ? rememberCookies.password : '',
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空！',
                    },
                  ],
                })(
                  <Input
                    type="password"
                    placeholder="密码"
                    onPressEnter={this.onPressEnter}
                  />,
                )}
              </FormItem>
              <FormItem className={styles['id_verification']}>
                <Row>
                  <Col span={8} className={styles['id_code']}>
                    {getFieldDecorator('code', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '验证码不能为空！',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="验证码"
                        onPressEnter={this.onPressEnter}
                        autoComplete={'off'}
                      />,
                    )}
                  </Col>
                  <Col span={8} className={styles['id_img']}>
                    <div
                      className={styles['img']}
                      ref={c => (this.idImg = c)}
                      onClick={this.changeIdImg}
                    />
                  </Col>
                </Row>
              </FormItem>
              <FormItem className={styles['error_message']}>
                {this.state.errorMessage}
              </FormItem>
              <FormItem className={styles['login_button']}>
                <Button
                  onClick={this.userLogin}
                  loading={loginStore.isLogin}
                  ref={c => {
                    this.userLoginBtn = c;
                  }}>
                  登录
                </Button>
              </FormItem>
              <FormItem className={styles['remeber_forgot']}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>
                    <span className={styles['remeber_me']}>记住密码</span>
                  </Checkbox>,
                )}
                <Link to="#" className={styles['forgot']}>
                  忘记密码?
                </Link>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Loginer;
