import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import {toJS} from 'mobx';
import {Spin} from 'antd';
import classnames from 'classnames';
const FtontServices = props => {
  const data = props.data;
  const title = props.title;

  return (
    <div className={styles['services_right_item']}>
      <div className={styles['services_right_title']}>
        <span className={styles['services_right_text']}>{title}</span>
      </div>
      <div className={styles['fronts_body']}>
        {_.map(data[0] && data[0].fronts, (item, i) => {
          return <RightItem key={i.toString(36) + i} data={item} />;
        })}
        {data[0] &&
          !data[0].fronts[0] && (
            <div className={styles['nodata']}>暂无数据</div>
          )}
      </div>
    </div>
  );
};
const RightItem = props => {
  const data = props.data;
  const arr = [
    {
      label: '地址',
      info: data.host ? data.host + ':' + data.port : '-',
    },
    {
      label: '设备量/承受量',
      info: data.runStatus || data.runStatus === 0 ? data.runStatus : '-',
    },
    {
      label: '内存',
      info: data.memory || data.memory === 0 ? data.memory : '-',
    },
    {
      label: 'CPU',
      info: data.cpu || data.cpu === 0 ? data.cpu : '-',
    },
    {
      label: '上线时间',
      info: data.ondate ? data.ondate : '-',
    },
  ];

  return (
    <div
      className={classnames(
        styles['services_right_item_ct'],
        styles['separation_line'],
      )}>
      <div className={styles['front_left']}>
        <span className={styles['front_left_title']}>服务器节点:</span>
        <span>{data.nodeid}</span>
      </div>
      <div className={styles['front_right']}>
        {_.map(arr, (item, i) => {
          return (
            <div className={styles['form_item']} key={i.toString(36) + i}>
              <span className={styles['label']} style={{width: '40%'}}>
                {item.label}
              </span>
              <span className={styles['wrapper']} style={{width: '60%'}}>
                {item.info}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const CenterItem = props => {
  const data = props.data;
  const name = props.name;
  return (
    <div className={styles['services_center_item']}>
      <div className={styles['services_center_title']}>
        <span className={styles['services_center_text']}>{name}</span>
      </div>
      <div className={styles['services_center_item_ct']}>
        {_.map(data, (item, i) => {
          return (
            <div className={styles['form_item']} key={i.toString(36) + i}>
              <span className={styles['label']}>{item.typeName}</span>
              <span className={styles['wrapper']}>{item.count}</span>
            </div>
          );
        })}
        {!data[0] && <div className={styles['nodata']}>暂无数据</div>}
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
    const {home_pageStore: {getFrontInfo}} = this.props;
    getFrontInfo();
  }
  render() {
    const {home_pageStore: {frontsData, s_loading}, height} = this.props;
    const fronts = toJS(frontsData);
    const common = _.filter(fronts, item => {
      return item.frontType === 0;
    });
    const directData = _.filter(fronts, item => {
      return item.frontType === 2;
    });
    const fsuData = _.filter(fronts, item => {
      return item.frontType === 4;
    });

    return (
      <div className={classnames(styles['services_ct'], styles['front_wrap'])}>
        <Spin spinning={s_loading}>
          <div className={styles['front_pos']}>
            <div className={styles['front_max_height_left']}>
              <FtontServices data={common || []} title={'普通前置机'} />
              <div className={styles['dev_detail']}>
                <div className={styles['dev_detail_bg']} />
                <div className={styles['front_margin10']} />
                <div className={styles['dev_num_wrap']}>
                  <span className={styles['dev_title']}>
                    <span>上线设备数量</span>
                  </span>
                  <span className={styles['dev_num']}>
                    <span>{common.onLineCount ? common.onLineCount : 0}</span>
                  </span>
                </div>
                <div className={styles['front_margin10']} />
                <div className={styles['dev_num_wrap']}>
                  <span className={styles['dev_title']}>
                    <span>异常设备数量</span>
                  </span>
                  <span className={styles['dev_num']}>
                    <span>{common.exeCount ? common.exeCount : 0}</span>
                  </span>
                </div>
                <div className={styles['front_margin10']} />
                <CenterItem
                  name={'设备详情'}
                  data={(common[0] && common[0].devTypeList) || []}
                />
              </div>
            </div>
            <div className={styles['front_max_height_center']}>
              <FtontServices data={directData} title={'直连前置机'} />
            </div>
            <div className={styles['front_max_height_right']}>
              <FtontServices data={fsuData} title={'FSU前置机'} />
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Pie;
