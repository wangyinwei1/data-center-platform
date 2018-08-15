import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Row, Col, Layout, Menu} from 'antd';
import {toJS} from 'mobx';
import classnames from 'classnames';
import {Link} from 'react-router';
import Cookies from 'js-cookie';
import styles from './index.less';
import TopNav from './topNav.js';
import LeftNav from './leftNav.js';
import _ from 'lodash';
const {Content} = Layout;

@inject('globalStore', 'layoutStore')
@observer
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.changeCollapsed = this.changeCollapsed.bind(this);
    this.setSelectedKeys = this.setSelectedKeys.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.setOrGetOpenKeys = this.setOrGetOpenKeys.bind(this);
    this.state = {
      openKeys: [],
    };
  }
  monitorWindowWidth(globalStore, collapsed) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if ($(window).width() < 1280) {
        this.setOrGetOpenKeys();
        globalStore.changeCollapsed(true);
      } else {
        this.setOrGetOpenKeys();
        globalStore.changeCollapsed(collapsed);
      }
    }, 100);
  }
  componentWillUnmount() {
    $(window).off('resize.panel');
  }
  componentDidMount() {
    const {globalStore, layoutStore, location} = this.props;
    const path = location.pathname.replace('/', '');
    let collapsed = false;
    if (path === 'shouye') {
      collapsed = true;
    }
    //获取菜单接口
    layoutStore.getMenu().then(() => {
      this.setOrGetOpenKeys();
      //监听窗口变化影响导航是否收缩
      this.monitorWindowWidth(globalStore, collapsed);
      $(window).on('resize.leftnav', () => {
        this.monitorWindowWidth(globalStore, collapsed);
      });
    });
    // if ('WebSocket' in window) {
    //   var ws = new WebSocket(
    //     'ws://' + globalStore.serviceip + ':11111/collect/websocket',
    //   );
    //   ws.onopen = function() {
    //     console.log('已连接...');
    //     ws.send(username + 'QQ872474447');
    //   };
    //
    //   ws.onmessage = function(evt) {
    //     var msg = evt.data;
    //     console.log(msg);
    //     var result = eval('(' + msg + ')');
    //     console.log(result);
    //     if (result.Result == 'success') {
    //     } else if (result.Result == 'mssg') {
    //       console.log(result.Msg);
    //     }
    //
    //     ws.onbeforeunload = function() {
    //       ws.close();
    //     };
    //   };
    // } else {
    //   console.log('暂不支持WebSocket!');
    // }
  }
  setOrGetOpenKeys(getOpenKeys, newPath) {
    //路由
    const {layoutStore, location} = this.props;
    const menu = toJS(layoutStore.menu);
    let path = newPath || location.pathname.replace('/', '');
    let title = '';
    let openKeys = null;
    //特殊处理
    switch (path) {
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
    }
    _.map(menu, item => {
      if (item.subMenu[0]) {
        const second = item.subMenu;
        _.map(second, sub => {
          if (sub.MENU_ROUTE == path) {
            openKeys = [item.MENU_ID];
            return;
          }
        });
      }
    });

    if (!getOpenKeys) {
      if ($(window).width() < 1280) {
        this.setState({
          storage: openKeys,
          openKeys: [],
        });
      } else {
        this.setState({
          openKeys,
        });
      }
    }
    return openKeys;
  }
  changeCollapsed(onOff) {
    const {globalStore} = this.props;
    globalStore.changeCollapsed(onOff);
    if (globalStore.collapsed) {
      const storage = _.cloneDeep(this.state.openKeys);
      this.setState({
        storage,
        openKeys: [],
      });
    } else {
      const storage = this.state.storage;
      this.setState({
        openKeys: storage,
      });
    }
  }
  setSelectedKeys(value) {
    const {layoutStore} = this.props;
    layoutStore.setSelectedKeys(value);
    //暂存openkeys
    const storage = this.setOrGetOpenKeys(true, value); //只寻找不设值
    const unionStorage = _.union(storage, this.state.storage);
    //只允许打开两个菜单
    const newStorage =
      unionStorage.length > 2
        ? unionStorage.filter((d, i) => {
            return i !== 0;
          })
        : unionStorage;
    this.setState({
      storage: newStorage,
    });
  }
  handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  handleLeave(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  onOpenChange(openKeys) {
    //只允许打开两个菜单
    const newOpenKeys =
      openKeys.length > 2
        ? openKeys.filter((d, i) => {
            return i !== 0;
          })
        : openKeys;
    this.setState({
      openKeys: newOpenKeys,
    });
  }
  render() {
    const {globalStore, router, layoutStore, location} = this.props;
    const menu = toJS(layoutStore.menu);

    const cl_username = Cookies.get('cl_username');
    const username = cl_username && JSON.parse(cl_username).username;

    //路由
    const path = location.pathname.replace('/', '');
    let title = '';
    _.map(menu, item => {
      if (item.MENU_ROUTE == path) {
        title = item.MENU_NAME;
        return;
      } else if (item.subMenu[0]) {
        const second = item.subMenu;
        _.map(second, sub => {
          if (sub.MENU_ROUTE == path) {
            title = sub.MENU_NAME;
            return;
          }
        });
      }
    });
    //特殊路径处理
    path == 'bsifm-devicetype' && (title = '设备类型管理');
    const exclusionPath = [
      ['fsu-devicemanagement', 'equ-information'],
      ['fsu-realtimealarm', 'equ-realtimealarm'],
      ['fsu-historyalarm', 'equ-historyalarm'],
      ['fsu-controlrecord', 'equ-controlrecord'],
    ];

    let currentLink = [];
    _.map(exclusionPath, item => {
      if (item.indexOf(path) != -1) {
        currentLink = item;
      }
    });

    return (
      <div className={styles['layout_wrap']} id={'layout_wrap'}>
        <TopNav title={title} username={username} router={router} />
        <Layout>
          <LeftNav
            menu={menu}
            loading={layoutStore.menuLoading}
            selectedKeys={toJS(layoutStore.selectedKeys) || path}
            collapsed={globalStore.collapsed}
            setSelectedKeys={this.setSelectedKeys}
            changeCollapsed={this.changeCollapsed}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          />
          <Layout className={styles['layout_content']}>
            <Content style={{height: '100%'}}>
              <div
                className={classnames(
                  styles['content'],
                  path === 'shouye' && styles['no_padding'],
                )}>
                {this.props.children}
                {currentLink[0] && (
                  <div className={styles['subNav']}>
                    <Link
                      to={`/${currentLink[1]}`}
                      className={classnames(
                        currentLink[1] === path && styles['active'],
                      )}>
                      基础设备
                    </Link>
                    <Link
                      to={`/${currentLink[0]}`}
                      className={classnames(
                        currentLink[0] === path && styles['active'],
                      )}>
                      FSU设备
                    </Link>
                  </div>
                )}
              </div>
              <div
                id="cl_tree_cascader"
                onClick={this.handleClick}
                onMouseLeave={this.handleLeave}>
                <span className={styles['tree_title']}>
                  可输入关键字选择区域
                </span>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default BasicLayout;
