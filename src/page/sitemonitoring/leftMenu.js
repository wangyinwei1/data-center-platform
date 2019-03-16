import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import styles from './index.less';
import _ from 'lodash';
import {Row, Col, Spin, Menu, Button, message} from 'antd';
import {toJS} from 'mobx';
import classnames from 'classnames';
//实例
@inject('sitemonitoringStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {};
  }

  componentDidMount() {}
  handleClick(value) {
    const keyPath = value.keyPath;
    const {
      changeTopNavTitle,
      setSelectedKeys,
      sitemonitoringStore: {
        getDetail,
        getVideoInfo,
        changeActiveKey,
        changeSelectedValue,
      },
    } = this.props;
    getDetail({id: value.key});
    getVideoInfo({id: value.key});
    //改变Key值
    changeSelectedValue(value.key);
    changeActiveKey('1');
  }
  //渲染
  render() {
    const {
      sitemonitoringStore: {siteList, loading, selectedValue},
    } = this.props;

    const menu = _.map(toJS(siteList), item => {
      return (
        <Menu.Item key={item.F_ID}>
          <a>{item.F_Name}</a>
        </Menu.Item>
      );
    });
    const selectedKeys = selectedValue
      ? selectedValue
      : (toJS(siteList)[0] && toJS(siteList)[0].F_ID) || '';

    return (
      <div className={styles['menu_wrap']}>
        <Spin spinning={loading}>
          {menu[0] ? (
            <Menu
              onClick={this.handleClick}
              selectedKeys={[selectedKeys.toString()]}>
              {menu}
            </Menu>
          ) : (
            <div className={styles['empty']}>
              <div className={styles['empty_pos']}>
                <div>
                  <i className={classnames('icon iconfont icon-zanwuxinxi')} />
                </div>
                <div style={{marginTop: '-16px'}}>
                  <span>暂无数据</span>
                </div>
              </div>
            </div>
          )}
        </Spin>
      </div>
    );
  }
}

export default Regional;
