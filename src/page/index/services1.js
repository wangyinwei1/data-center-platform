import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
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
  Timer,
} from './svg.js';
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
  componentDidMount() {
    const {home_pageStore: {getDispatchInfo}} = this.props;
    getDispatchInfo();
  }
  handleClick(code) {
    this.setState({
      activeIndex: code,
    });
  }
  render() {
    const {height} = this.props;
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
    let serviceContentProps = {
      className: styles['services_info_icon'],
      width: height * 48 / 525,
      height: height * 48 / 525,
    };
    let serviceContent = [
      {
        name: '应用数量:',
        iconDom: <Number {...serviceContentProps} />,
      },
      {
        name: '服务器地址:',
        iconDom: <AddressService {...serviceContentProps} />,
      },
      {
        name: '连接前置机:',
        iconDom: <Font {...serviceContentProps} />,
      },
      {
        name: '地址:',
        iconDom: <Address {...serviceContentProps} />,
      },
      {
        name: '上线时间:',
        iconDom: <Timer {...serviceContentProps} />,
      },
    ];
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
          <div className={styles['services_ct']}>
            <div
              className={styles['online_num']}
              ref={c => {
                this.onlineNum = c;
              }}
              style={{
                width: height * 0.3 + 'px',
                height: height * 0.3 + 'px',
                lineHeight: height * 0.28 + 'px',
                fontSize: height * 0.123 + 'px',
                borderWidth: height * 0.01 + 'px',
                marginTop: height * 0.11 + 'px',
                marginBottom: height * 0.19 + 'px',
              }}>
              <span className={styles['online_num_title']}>在线服务数量</span>
              <span>89</span>
            </div>
            <div
              className={styles['services_info']}
              style={{
                width: servicesInfoWidth,
              }}>
              <div className={styles['services_name']}>
                <span className={styles['services_name_text']}>服务器一</span>
                <span className={styles['services_name_switch']}>
                  <i className={classnames('icon iconfont icon-qiehuan')} />切换服务器
                </span>
              </div>
              <div className={styles['services_info_ct']}>
                <ul
                  className={styles['services_info_body']}
                  style={
                    serviceContent.length <= 3
                      ? {
                          width: '50%',
                        }
                      : null
                  }>
                  {_.map(serviceContent, (item, i) => {
                    const hideMargin =
                      (serviceContent.length === 3 &&
                        i === serviceContent.length - 1) ||
                      (serviceContent.length > 4 && i >= 4);
                    const itemWidth =
                      serviceContent.length <= 3 ? '100%' : '50%';

                    const styleItem = !hideMargin
                      ? {
                          marginBottom: height * 0.1 + 'px',
                          width: itemWidth,
                        }
                      : {width: itemWidth};
                    return (
                      <li
                        key={i.toString + i}
                        className={styles['services_info_item']}
                        style={styleItem}>
                        {item.iconDom}
                        <span className={styles['services_info_title']}>
                          {item.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
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
              style={{marginRight: marginRight + 'px'}}
              className={classnames(
                styles['services_icon'],
                this.state.activeIndex === 4 && styles['active'],
              )}
              onClick={this.handleClick}
            />
            <SchedulingService
              width={height * 0.106}
              height={height * 0.106}
              style={{marginRight: marginRight + 'px'}}
              className={classnames(
                styles['services_icon'],
                this.state.activeIndex === 5 && styles['active'],
              )}
              onClick={this.handleClick}
            />
            <Authentication
              width={height * 0.106}
              height={height * 0.106}
              className={classnames(
                styles['services_icon'],
                this.state.activeIndex === 6 && styles['active'],
              )}
              onClick={this.handleClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pie;
