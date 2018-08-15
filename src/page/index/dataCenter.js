import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import {toJS} from 'mobx';
import classnames from 'classnames';
const CenterItem = props => {
  let data = null;
  let name = '';
  switch (props.name) {
    case 'app':
      data = props.app;
      name = '接入应用';
      break;
    case 'fronts':
      data = props.fronts;
      name = '直连前置机';
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
              <span className={styles['label']}>
                {item.nodeid || item.nodeid === 0 ? item.nodeid : item.appID}
              </span>
              <span className={styles['wrapper']}>
                {item.host ? item.host + item.port : item.time}
              </span>
            </div>
          );
        })}
        {!data[0] && <div className={styles['nodata']}>暂无数据</div>}
      </div>
    </div>
  );
};
const Basic = props => {
  const api = props.api;
  const app = api.app;
  const fronts = api.fronts;

  return (
    <div className={classnames(styles['api_wrap'], styles['data_wrap'])}>
      <div
        className={classnames(styles['basic_info'], styles['api_basic_info'])}>
        <div className={styles['float']}>
          <div className={styles['node_id_info']}>
            <i
              className={classnames(
                'icon iconfont icon-bianhao',
                styles['basic_icon'],
              )}
            />
            <span className={styles['basic_title']}>{`节点编号 ${
              api.nodeid || api.nodeid === 0 ? api.cpu : ''
            }`}</span>
          </div>
          <div className={styles['cpu_info']}>
            <i
              className={classnames(
                'icon iconfont icon-lvzhou_cpu',
                styles['basic_icon'],
              )}
            />
            <span className={styles['basic_title']}>CPU</span>
            <div className={styles['basic_num']}>
              {api.cpu || api.cpu === 0 ? api.cpu : 0}
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
              {api.memory || api.memory === 0 ? api.memory : 0}
            </div>
          </div>
        </div>
        <div className={styles['float']}>
          <div className={styles['time_info']}>
            <i
              className={classnames(
                'icon iconfont icon-shijian',
                styles['basic_icon'],
              )}
            />
            <span className={styles['basic_title']}>上线时间</span>
            <div className={styles['basic_num']}>
              {api.ondate ? api.ondate : '-'}
            </div>
          </div>
          <div className={styles['time_info']}>
            <i
              className={classnames(
                'icon iconfont icon-fuwuqidizhi',
                styles['basic_icon'],
              )}
            />
            <span className={styles['basic_title']}>服务地址</span>
            <div className={styles['basic_num']}>
              {api.host ? api.host + ':' + api.port : '-'}
            </div>
          </div>
        </div>
      </div>

      <div className={styles['data_center_wrap']}>
        <div className={styles['dev_num_wrap']}>
          <span className={styles['dev_title']}>
            <span>利用率</span>
          </span>
          <span className={styles['dev_num']}>
            {api.availability ? api.availability : '100%'}
          </span>
        </div>
        <div className={styles['dev_num_wrap']}>
          <span className={styles['dev_title']}>
            <span>空闲连接数</span>
          </span>
          <span className={styles['dev_num']}>
            {api.freeCons ? api.freeCons : 0}
          </span>
        </div>
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
  }
  componentDidMount() {
    const {home_pageStore: {getDataInfo}} = this.props;
    getDataInfo();
  }
  render() {
    const {home_pageStore: {dataCenterData}, height} = this.props;
    const dataCenter = toJS(dataCenterData);

    return (
      <div className={styles['services_ct']}>
        {_.map(dataCenter, (item, i) => {
          console.log(item);
          return <Basic api={item} key={i.toString + i} />;
        })}
      </div>
    );
  }
}

export default Pie;
