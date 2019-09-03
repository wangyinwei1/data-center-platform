import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import styles from './index.less';
import _ from 'lodash';
import {Row, Col, Spin, Menu, Button, message} from 'antd';
import {toJS} from 'mobx';
import classnames from 'classnames';
//实例
@inject('tagsStore')
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
      tagsStore: {getTagList, tagParmas, changeSelectedValue},
    } = this.props;
    console.log(value.key);
    getTagList({
      gdbId: value.key,
      page: 1,
      keywords: '',
      number: 10,
    });

    //改变Key值
    changeSelectedValue(value.key);
  }
  //渲染
  render() {
    const {
      tagsStore: {siteTreasureList, loading, selectedValue},
    } = this.props;

    const menu = _.map(toJS(siteTreasureList), item => {
      return (
        <Menu.Item key={item.gdbId}>
          <a>{item.name}</a>
        </Menu.Item>
      );
    });
    const selectedKeys = selectedValue
      ? selectedValue
      : (toJS(siteTreasureList)[0] && toJS(siteTreasureList)[0].gdbId) || '';

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
