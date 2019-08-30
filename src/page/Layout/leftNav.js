import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Layout, Menu, Breadcrumb, Spin} from 'antd';
import classnames from 'classnames';
import {Link} from 'react-router';
import styles from './index.less';
import _ from 'lodash';
const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;
const outreach = ['energy-consumption', 'large-screen'];
const menuIcon = {
  '420': 'icon-shouye',
  '390': 'icon-jichuxinxiguanli',
  '419': 'icon-shebeiguanli',
  '412': 'icon-shouye',
  '426': 'icon-nenghao',
  '427': 'icon-cebianlanxunjianjilu',
  '428': 'icon-liebiao',
  '429': 'icon-jizhan',
  '430': 'icon-shishishuju',
};
const exclusionPath = [
  'equ-agreement',
  'equ-realtimedata',
  'equ-historicaldata',
  'bsifm-basicchannel',
  'fsu-realtimedata',
  'fsu-historicaldata',
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
        if (
          sub.MENU_ID == '397' &&
          !JSON.parse(localStorage.getItem('isAdmin'))
        ) {
          return null;
        }
        if (
          sub.MENU_ID == '391' &&
          JSON.parse(localStorage.getItem('isNotArea'))
        ) {
          return null;
        }

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
  if (outreach.indexOf(item.MENU_ROUTE) !== -1) {
    const index = outreach.indexOf(item.MENU_ROUTE);
    let url = 'javascript:void(0);';
    switch (index) {
      case 0:
        url = localStorage.getItem('ECPUrl');
        break;

      case 1:
        url = localStorage.getItem('screenUrl');
        break;
    }

    return (
      <Menu.Item key={item.MENU_ROUTE || item.MENU_ID}>
        <a
          href={
            url

            // 'http://172.17.3.52:8080/ECP/main/index?noLanding=true&user=shiyonghu'
          }
          target={'_blank'}>
          <i
            className={classnames(
              'icon iconfont',
              menuIcon[item.MENU_ID],
              styles['menu_icon'],
            )}
          />
          <span>{item.MENU_NAME}</span>
        </a>
      </Menu.Item>
    );
  } else {
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
  }
};

//实例
@inject('sitemonitoringStore')
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
    if (outreach.indexOf(value.key) !== -1) return;

    const keyPath = value.keyPath;
    if (
      value.key === 'sitemonitoring' &&
      location.pathname.indexOf('sitemonitoring') === -1
    ) {
      const {
        sitemonitoringStore: {getList, changeSelectedKey},
        location,
      } = this.props;
      let params = {
        page: 1,
        sing: 'area',
        keywords: '',
        number: 999,
      };

      // getList(params).then(data => {
      //   data[0] && changeSelectedKey(data[0].F_ID);
      //
      //   // if (data[0]) {
      //   //   router.push(`/sitemonitoring/${data[0].F_ID}`);
      //   // } else {
      //   //   router.push(`/sitemonitoring/null`);
      // });
    }

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

    let path = '';
    //特殊处理
    switch (selectedKeys) {
      case 'fsu-historyalarm':
        path = 'equ-historyalarm';
        break;
      case 'fsu-devicemanagement':
        path = 'equ-information';
        break;
      case 'fsu-controlrecord':
        path = 'equ-controlrecord';
        break;
      case 'fsu-realtimealarm':
        path = 'equ-realtimealarm';
        break;
      case 'fsu-alarminformation':
        path = 'bsifm-alarminformation';
        break;
      case 'bsifm-devicetype':
        path = 'bsifm-deviceversion';
        break;
      default:
        path = selectedKeys;

        break;
    }
    if (selectedKeys.indexOf('fsu-devicemanagement') != -1) {
      path = 'equ-information';
    }
    if (selectedKeys.indexOf('equ-information') != -1) {
      path = 'equ-information';
    }
    let isClose = true;
    if (selectedKeys === 'shouye') {
      isClose = true;
    } else {
      isClose = collapsed;
    }
    return (
      <Spin
        className={styles['loading']}
        tip={collapsed ? '' : '加载中...'}
        spinning={loading}>
        <Sider
          width={180}
          collapsible
          collapsed={isClose}
          collapsedWidth={46}
          onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu
            onClick={this.handleClick}
            selectedKeys={[path]}
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
