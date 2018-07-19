import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Layout, Menu, Breadcrumb, Spin} from 'antd';
import classnames from 'classnames';
import {Link} from 'react-router';
import styles from './index.less';
import _ from 'lodash';
const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;
const menuIcon = {
  '420': 'icon-shouye',
  '390': 'icon-jichuxinxiguanli',
  '419': 'icon-shebeiguanli',
  '412': 'icon-shouye',
};
const exclusionPath = [
  'equ-agreement',
  'equ-realtimedata',
  'equ-historicaldata',
  'bsifm-basicchannel',
];
const secondLevel = function(item) {
  return (
    <SubMenu
      key={item.MENU_ROUTE || item.MENU_ID}
      title={
        <span>
          <i
            className={classnames(
              'icon iconfont',
              menuIcon[item.MENU_ID],
              styles['menu_icon'],
            )}
          />
          <span>{item.MENU_NAME}</span>
        </span>
      }>
      {_.map(item.subMenu, sub => {
        if (exclusionPath.indexOf(sub.MENU_ROUTE) != -1) {
          return null;
        } else {
          return (
            <Menu.Item key={sub.MENU_ROUTE || sub.MENU_ID}>
              <Link to={`/${sub.MENU_ROUTE}`}>{sub.MENU_NAME}</Link>
            </Menu.Item>
          );
        }
      })}
    </SubMenu>
  );
};
const firstLevel = function(item) {
  return (
    <Menu.Item key={item.MENU_ROUTE || item.MENU_ID}>
      <Link to={`/${item.MENU_ROUTE}`}>
        <i
          className={classnames(
            'icon iconfont',
            menuIcon[item.MENU_ID],
            styles['menu_icon'],
          )}
        />
        <span>{item.MENU_NAME}</span>
      </Link>
    </Menu.Item>
  );
};

//实例
@observer
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.onCollapse = this.onCollapse.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  componentDidMount() {}
  onCollapse(onOff) {
    const {changeCollapsed} = this.props;
    changeCollapsed(onOff);
  }
  handleClick(value) {
    const keyPath = value.keyPath;
    const {changeTopNavTitle, setSelectedKeys} = this.props;
    //改变Key值
    setSelectedKeys(value.key);
  }
  onOpenChange(openKeys) {
    const {onOpenChange} = this.props;
    onOpenChange(openKeys);
  }
  render() {
    const {menu, collapsed, loading, selectedKeys, openKeys} = this.props;
    return (
      <Spin
        className={styles['loading']}
        tip={collapsed ? '' : '加载中...'}
        spinning={loading}>
        <Sider
          width={180}
          collapsible
          collapsed={collapsed}
          collapsedWidth={46}
          onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu
            onClick={this.handleClick}
            selectedKeys={[selectedKeys]}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
            mode="inline"
            width={46}>
            {_.map(menu, item => {
              if (item.subMenu[0]) {
                //二级导航
                return secondLevel(item);
                //三级导航
                _.map(item.subMenu, sub => {});
              } else {
                //一级导航
                return firstLevel(item);
              }
            })}
          </Menu>
        </Sider>
      </Spin>
    );
  }
}

export default BasicLayout;
