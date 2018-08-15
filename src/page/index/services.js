import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import DispatchCenter from './dispacth.js';
import Datacenter from './dataCenter.js';
import Api from './api.js';
import {toJS} from 'mobx';
import _ from 'lodash';
import classnames from 'classnames';
import {
  FrontEndMachine,
  ApiService,
  Dispatch,
  Authentication,
  DataCenter,
  Number,
  SchedulingService,
  Address,
  AddressService,
  Font,
  Cpu,
  Timer,
} from './svg.js';

const centerItem = props => {
  let data = null;
  let name = '';
  switch (props.name) {
    case 'apis':
      data = props.apis;
      name = 'API服务';
      break;
    case 'fronts':
      data = props.fronts;
      name = '普通前置机';
      break;
    case 'fsufronts':
      data = props.fsufronts;
      name = '直连前置机';
      break;
    case 'directfronts':
      data = props.directfronts;
      name = 'FSU前置机';
      break;
  }
  return (
    <div className={styles['services_center_item']}>
      <div className={styles['services_center_title']}>
        <span className={styles['services_center_text']}>{name}</span>
      </div>
      <div className={styles['services_center_item_ct']}>
        {_.map(data, (item, i) => {
          return (
            <div className={styles['form_item']} key={i.toString(36) + i}>
              <span className={styles['label']}>{item.nodeid}</span>
              <span className={styles['wrapper']}>{item.host + item.port}</span>
            </div>
          );
        })}
        {!data[0] && <div className={styles['nodata']}>暂无数据</div>}
      </div>
    </div>
  );
};
const rightItem = props => {
  const au = props.authentications;
  let data = null;
  let name = '';
  switch (props.name) {
    case 'authentications':
      data = props.authentications;
      name = '认证中心';
      break;
    case 'appDispatch':
      data = props.appDispatch;
      name = '应用调度';
      break;
    case 'devDispatch':
      data = props.devDispatch;
      name = '设备调度';
      break;
    case 'registrys':
      data = props.registrys;
      name = 'FSU注册机';
      break;
  }
  const arr = [
    {
      label: '地址',
      info: data.host ? data.host + ':' + data.port : '-',
    },
    {
      label: '上线时间',
      info: data.ondate ? data.ondate : '-',
    },
    {
      label: '内存',
      info: data.memory || data.memory === 0 ? data.memory : '-',
    },
    {
      label: 'CPU',
      info: data.cpu || data.cpu === 0 ? data.cpu : '-',
    },
  ];

  return (
    <div className={styles['services_right_item']}>
      <div className={styles['services_right_title']}>
        <span className={styles['services_right_text']}>{name}</span>
      </div>
      <div className={styles['services_right_item_ct']}>
        {_.map(arr, (item, i) => {
          return (
            <div className={styles['form_item']} key={i.toString(36) + i}>
              <span className={styles['label']}>{item.label}</span>
              <span className={styles['wrapper']}>{item.info}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
//实例
@inject('home_pageStore')
@observer
class Pie extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      activeIndex: 1,
    };
  }
  componentDidMount() {}
  handleClick(code) {
    this.setState({
      activeIndex: code,
    });
  }
  render() {
    const {height, home_pageStore: {servicesData}} = this.props;
    let title = {en: '', zh: ''};
    switch (this.state.activeIndex) {
      case 1:
        title.zh = '调度中心';
        title.en = 'DISPATCH CENTER';
        break;
      case 2:
        title.zh = 'API服务';
        title.en = 'API SERVICES';
        break;
      case 3:
        title.zh = '前置机';
        title.en = 'FRONT-END MACHINE';
        break;
      case 4:
        title.zh = '数据中心';
        title.en = 'DATA CENTER';
        break;
      case 5:
        title.zh = '调度服务';
        title.en = 'SCHEDULING SERVICE';
        break;
      case 6:
        title.zh = '认证中心';
        title.en = 'AUTHENTICATION CENTER';
        break;
    }
    const width = this.props.width;
    const service_ct_width = width - width * 0.08 * 2;
    const marginRight =
      (width - height * 6 * 0.106 - width * 0.08 * 2) / 5 || 0;
    const servicesInfoWidth =
      service_ct_width - height * 0.3 - service_ct_width * 0.06;
    // let serviceContentProps = {
    //   className: styles['services_info_icon'],
    //   width: height * 24 / 525,
    //   height: height * 24 / 525,
    // };
    // let serviceContent = [
    //   {
    //     name: '应用数量',
    //     iconDom: <Number {...serviceContentProps} />,
    //   },
    //   {
    //     name: '服务器地址',
    //     iconDom: <AddressService {...serviceContentProps} />,
    //   },
    //   {
    //     name: '连接前置机',
    //     iconDom: <Font {...serviceContentProps} />,
    //   },
    //   {
    //     name: '地址',
    //     iconDom: <Address {...serviceContentProps} />,
    //   },
    //   {
    //     name: '上线时间',
    //     iconDom: <Timer {...serviceContentProps} />,
    //   },
    // ];
    return (
      <div
        className={styles['services_inner_wrap']}
        ref={c => {
          this.root = c;
        }}>
        <defs>
          <filter id="f1" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="40" dy="100" />
            <feGaussianBlur
              result="blurOut"
              in="offOut"
              in="matrixOut"
              stdDeviation="100"
            />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <div className={styles['service_title']}>
          <span className={styles['service_zh']}>{title.zh}</span>
          <span className={styles['service_en']}>{title.en}</span>
        </div>
        <div className={styles['services_body']}>
          {this.state.activeIndex === 1 && (
            <DispatchCenter CenterItem={centerItem} RightItem={rightItem} />
          )}
          {this.state.activeIndex === 2 && <Api />}
          {this.state.activeIndex === 4 && <Datacenter />}
          <div className={styles['services_nav']}>
            <Dispatch
              width={height * 0.106}
              height={height * 0.106}
              style={{marginRight: marginRight + 'px'}}
              className={classnames(
                styles['services_icon'],
                this.state.activeIndex === 1 && styles['active'],
              )}
              onClick={this.handleClick}
            />
            <ApiService
              width={height * 0.106}
              height={height * 0.106}
              style={{marginRight: marginRight + 'px'}}
              className={classnames(
                styles['services_icon'],
                this.state.activeIndex === 2 && styles['active'],
              )}
              onClick={this.handleClick}
            />
            <FrontEndMachine
              width={height * 0.106}
              height={height * 0.106}
              style={{marginRight: marginRight + 'px'}}
              className={classnames(
                styles['services_icon'],
                this.state.activeIndex === 3 && styles['active'],
              )}
              onClick={this.handleClick}
            />
            <DataCenter
              width={height * 0.106}
              height={height * 0.106}
              className={classnames(
                styles['services_icon'],
                this.state.activeIndex === 4 && styles['active'],
              )}
              onClick={this.handleClick}
            />
            {/* <SchedulingService */}
            {/*   width={height * 0.106} */}
            {/*   height={height * 0.106} */}
            {/*   style={{marginRight: marginRight + 'px'}} */}
            {/*   className={classnames( */}
            {/*     styles['services_icon'], */}
            {/*     this.state.activeIndex === 5 && styles['active'], */}
            {/*   )} */}
            {/*   onClick={this.handleClick} */}
            {/* /> */}
            {/* <Authentication */}
            {/*   width={height * 0.106} */}
            {/*   height={height * 0.106} */}
            {/*   className={classnames( */}
            {/*     styles['services_icon'], */}
            {/*     this.state.activeIndex === 6 && styles['active'], */}
            {/*   )} */}
            {/*   onClick={this.handleClick} */}
            {/* /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Pie;
