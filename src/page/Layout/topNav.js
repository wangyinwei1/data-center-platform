import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Row, Col, Icon} from 'antd';
import classnames from 'classnames';
import Cookies from 'js-cookie';
import styles from './index.less';
//实例
@inject('globalStore', 'loginStore')
class TopNav extends Component {
  constructor(props) {
    super(props);
    this.exitLogin = this.exitLogin.bind(this);
  }
  exitLogin(e) {
    e.nativeEvent.stopImmediatePropagation();
    const {
      loginStore: {loginOut},
    } = this.props;
    loginOut().then(data => {
      if (data) {
        Cookies.remove('cl_username');
        this.props.router.push('/login');
      }
    });
  }
  render() {
    const {title, username} = this.props;
    return (
      <Row className={styles['top_nav_wrap']}>
        <Col span={1} className={styles['logo']}>
          <p>基站资产管理平台</p>
          <span>BASE STATION ASSET MANAGEMENT </span>
        </Col>
        <Col span={1} className={styles['top_nav_title']}>
          {title}
        </Col>
        <Col span={1} className={styles['user_info']}>
          <Row className={styles['user_info_wrap']}>
            <Col>
              <i
                className={classnames(
                  'icon iconfont icon-yonghutouxiang',
                  styles['usericon'],
                )}
              />
              <span className={styles['username']}>{username}</span>
              <Icon type="down" className={styles['down']} />
              <ul className={styles['user_setting']}>
                <li className="clearfix">
                  <div
                    onClick={this.exitLogin}
                    className={classnames('clearfix', styles['form_item'])}>
                    <i
                      className={classnames(
                        'icon iconfont icon-tuichudenglu',
                        styles['exit'],
                      )}
                    />

                    <span> 退出登录</span>
                  </div>
                </li>
              </ul>
            </Col>
            <Col />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default TopNav;
