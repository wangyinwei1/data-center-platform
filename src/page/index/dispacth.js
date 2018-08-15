import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import {toJS} from 'mobx';
import classnames from 'classnames';
//实例
@inject('home_pageStore')
@observer
class Pie extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {home_pageStore: {getDispatchInfo}} = this.props;
    getDispatchInfo();
  }
  render() {
    const {home_pageStore: {servicesData}, CenterItem, RightItem} = this.props;
    const authentications = toJS(servicesData.authentications) || {};
    const appDispatch = toJS(servicesData.appDispatch) || {};
    const devDispatch = toJS(servicesData.devDispatch) || {};
    const registrys = toJS(servicesData.registrys) || {};
    const apis = toJS(servicesData.apis) || {};
    const fronts = toJS(servicesData.fronts) || {};
    const fsufronts = toJS(servicesData.fsufronts) || {};
    const directfronts = toJS(servicesData.directfronts) || {};
    return (
      <div className={styles['services_ct']}>
        <div className={styles['basic_info']}>
          <div className={styles['cpu_info']}>
            <i
              className={classnames(
                'icon iconfont icon-lvzhou_cpu',
                styles['basic_icon'],
              )}
            />
            <span className={styles['basic_title']}>CPU</span>
            <div className={styles['basic_num']}>
              {servicesData.cpu || servicesData.cpu === 0
                ? servicesData.cpu
                : 0}
            </div>
          </div>
          <div className={styles['memory_info']}>
            <i
              className={classnames(
                'icon iconfont icon-memory',
                styles['basic_icon'],
              )}
            />
            <span className={styles['basic_title']}>内存</span>
            <div className={styles['basic_num']}>
              {servicesData.memory || servicesData.memory === 0
                ? servicesData.memory
                : 0}
            </div>
          </div>
          <div className={styles['time_info']}>
            <i
              className={classnames(
                'icon iconfont icon-shijian',
                styles['basic_icon'],
              )}
            />
            <span className={styles['basic_title']}>上线时间</span>
            <div className={styles['basic_num']}>
              {servicesData.ondate ? servicesData.ondate : '-'}
            </div>
          </div>
        </div>
        <div className={styles['services_sub_ct']}>
          <div className={styles['services_center_wrap']}>
            <CenterItem apis={apis} name={'apis'} />
            <CenterItem fronts={fronts} name={'fronts'} />
            <CenterItem directfronts={directfronts} name={'directfronts'} />
            <CenterItem fsufronts={fsufronts} name={'fsufronts'} />
          </div>

          <div className={styles['services_right_wrap']}>
            <RightItem
              authentications={authentications}
              name={'authentications'}
            />
            <RightItem registrys={registrys} name={'registrys'} />
            <RightItem devDispatch={devDispatch} name={'devDispatch'} />
            <RightItem appDispatch={appDispatch} name={'appDispatch'} />
          </div>
        </div>
      </div>
    );
  }
}

export default Pie;
