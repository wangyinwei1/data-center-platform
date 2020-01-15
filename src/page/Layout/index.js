import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Row, Col, Layout, Menu, notification, Button} from 'antd';
import {toJS} from 'mobx';
import classnames from 'classnames';
import {Link} from 'react-router';
import Cookies from 'js-cookie';
import styles from './index.less';
import TopNav from './topNav.js';
import LeftNav from './leftNav.js';
import _ from 'lodash';
const {Content} = Layout;

@inject('globalStore', 'layoutStore', 'home_pageStore')
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
      storage: [],
      // scaleX: 1,
      // scaleY: 1,
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
        globalStore.changeCollapsed(false);
      }
    }, 100);
  }
  componentWillUnmount() {
    $(window).off('resize.panel');
    clearTimeout(this.timer);
    this.ws && this.ws.close();
  }
  componentDidUpdate() {
    // location.pathname === '/shouye' && this.adaptive();
    const {globalStore, layoutStore, location} = this.props;
    if (globalStore.isTimeout) {
      const path = location.pathname.replace('/', '');
      let collapsed = false;
      //获取菜单接口
      layoutStore.getMenu().then(() => {
        this.setOrGetOpenKeys();
        //监听窗口变化影响导航是否收缩
        this.monitorWindowWidth(globalStore, collapsed);
        $(window).on('resize.leftnav', () => {
          this.monitorWindowWidth(globalStore, collapsed);
        });
      });
      globalStore.changeIsTimeout(false);
    }
  }
  apiRender() {
    const {
      home_pageStore: {getCountInfo, getFsuAlarmNum, getAlarmNum},
    } = this.props;

    const params = {
      page: 1,
      number: 10,
      keywords: '',
      type: '',
      des: 1,
    };
    getCountInfo();
    getFsuAlarmNum({...params, sort: 'F_AlarmLevel'});
    getAlarmNum({...params, sort: 'F_AlarmGrade'});
  }
  // adaptive() {
  //   const width = 1920;
  //   const height = 1080;
  //   const c_width = document.body.offsetWidth;
  //   const c_height = document.body.offsetHeight;
  //   let update =
  //     this.state.scaleX === c_width / width &&
  //     this.state.scaleY === c_height / height;
  //
  //   !update &&
  //     this.setState({
  //       scaleX: c_width / width,
  //       scaleY: c_height / height,
  //     });
  // }

  componentWillMount() {
    // location.pathname === '/shouye' && this.adaptive();
  }
  componentDidMount() {
    //
    const {globalStore, layoutStore, location} = this.props;
    const path = location.pathname.replace('/', '');
    let collapsed = false;

    const _this = this;
    //获取菜单接口
    layoutStore.getMenu().then(() => {
      this.setOrGetOpenKeys();
      //监听窗口变化影响导航是否收缩
      this.monitorWindowWidth(globalStore, collapsed);
      $(window).on('resize.leftnav', () => {
        this.monitorWindowWidth(globalStore, collapsed);
        // location.pathname === '/shouye' && this.adaptive();
      });
    });

    const serviceip = localStorage.getItem('serviceip');
    const {
      home_pageStore: {getCountInfo, getFsuAlarmNum, getAlarmNum},
      layoutStore: {selectedKeys},
    } = this.props;

    if (serviceip) {
      if ('WebSocket' in window) {
        const ws = new WebSocket('ws://' + serviceip + '/collect/websocket');
        ws.onopen = function() {
          console.log('已连接...');
          ws.send('username' + new Date().getTime() + 'QQ872474447');
        };

        ws.onmessage = function(evt) {
          const msg = evt.data;
          const result = JSON.parse(msg);
          if (result.Type == 'module') {
            notification.open({
              message: '模块上线/下线通知:',
              placement: 'bottomRight',
              description: `平台ID:${result.platId} 节点ID:${result.nodeId} 状态:${result.status}`,
            });
          } else if (result.Type == 'AlarmMsg') {
            notification.open({
              message: '告警通知:',
              placement: 'bottomRight',
              description: (
                <div>
                  <Row>
                    <span>设备ID:</span>
                    <span> {result.deviceID}</span>
                  </Row>
                  <Row>
                    <span>通道ID:</span>
                    <span> {result.channelID}</span>
                  </Row>
                  <Row>
                    <span>告警ID:</span>
                    <span> {result.alarmMsg}</span>
                  </Row>
                  <Row>
                    <span>告警时间:</span>
                    <span> {result.startTime}</span>
                  </Row>
                  <Row>
                    <span>告警值</span>
                    <span> {result.value}</span>
                  </Row>
                </div>
              ),
            });
          } else if (result.Type == 'DeviceStatus') {
            notification.open({
              message: '设备上线/下线通知',
              placement: 'bottomRight',
              description: `设备ID:${result.deviceID} 状态:${result.status}`,
            });
          }
          location.pathname.indexOf('shouye') != -1 && _this.apiRender();

          ws.onbeforeunload = function() {
            ws.close();
          };
        };
        ws.onclose = function() {
          console.log('连接已关闭...');
        };
        this.ws = ws;
      } else {
        console.log('暂不支持WebSocket!');
      }
    }
  }
  setOrGetOpenKeys(getOpenKeys, newPath) {
    //路由
    const {layoutStore, location} = this.props;
    const menu = toJS(layoutStore.menu);
    let path = newPath || location.pathname.replace('/', '');
    let title = '';
    let openKeys = null;
    // //特殊处理
    // switch (path) {
    //   case 'fsu-historyalarm':
    //     path = 'equ-historyalarm';
    //     break;
    //   case 'fsu-devicemanagement':
    //     path = 'equ-information';
    //     break;
    //   case 'fsu-controlrecord':
    //     path = 'equ-controlrecord';
    //     break;
    //   case 'fsu-realtimealarm':
    //     path = 'equ-realtimealarm';
    //     break;
    //   case 'fsu-alarminformation':
    //     path = 'bsifm-alarminformation';
    //     break;
    //   case 'bsifm-devicetype':
    //     path = 'bsifm-deviceversion';
    //     break;
    // }
    _.map(menu, item => {
      if (item.subMenu[0]) {
        const second = item.subMenu;
        _.map(second, sub => {
          if (sub.MENU_ROUTE === path) {
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
    return openKeys || [];
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
    //首页值为null特殊处理
    if (value === 'shouye') {
      this.setState({
        openKeys: [],
      });
    } else {
      this.setState({
        storage: newStorage,
        openKeys: newStorage,
      });
    }
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
      storage: newOpenKeys,
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
      ['fsu-alarminformation', 'bsifm-alarminformation'],
    ];

    let currentLink = [];
    _.map(exclusionPath, item => {
      if (item.indexOf(path) != -1) {
        currentLink = item;
      }
    });
    // let minScale =
    //   this.state.scaleX < this.state.scaleY
    //     ? this.state.scaleX
    //     : this.state.scaleY;
    //           console.log(1920 * this.state.scaleX + 'px',
    //            1080 * this.state.scaleY + 'px')
    // console.log(1920 * this.state.scaleX + 'px'/1080 * this.state.scaleY + 'px')

    return (
      <div
        className={classnames(
          styles['layout_wrap'],
          location.pathname === '/shouye' && styles['index'],
        )}
        id={'layout_wrap'}
        // style={
        //   location.pathname === '/shouye'
        //     ? {
        //         // width: 1920 * this.state.scaleX + 'px',
        //         // height: 1080 * this.state.scaleY + 'px',
        //       }
        //     : {width: '100%', height: '100%'}
        // }
      >
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
                {/* {currentLink[0] && ( */}
                {/*   <div className={styles['subNav']}> */}
                {/*     <Link */}
                {/*       to={`/${currentLink[1]}`} */}
                {/*       className={classnames( */}
                {/*         currentLink[1].indexOf(path) !== -1 && styles['active'], */}
                {/*       )}> */}
                {/*       基础设备 */}
                {/*     </Link> */}
                {/*     <Link */}
                {/*       to={`/${currentLink[0]}`} */}
                {/*       className={classnames( */}
                {/*         currentLink[0].indexOf(path) !== -1 && styles['active'], */}
                {/*       )}> */}
                {/*       FSU设备 */}
                {/*     </Link> */}
                {/*   </div> */}
                {/* )} */}
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
