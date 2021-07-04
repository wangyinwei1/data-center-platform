import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import styles from './index.less';
import _ from 'lodash';
import Video from './video.js';
import EditModal from '../other/inspection/edit.js';
import {Row, Col, Icon, Menu, Spin, Button, message} from 'antd';
import {toJS} from 'mobx';
import VideoMenu from './menu.js';
import classnames from 'classnames';
//实例
@inject('sitemonitoringStore', 'layoutStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onVideoOk = this.onVideoOk.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {show: false};
  }

  jumpToDev(item) {
    const {router, layoutStore} = this.props;
    const id = item.list[0].id;
    const deviceType = item.list[0].deviceType;
    if (deviceType === 'device') {
      router.push({
        pathname: '/equ-information',
        query: {
          id,
          isFsu: false,
        },
      });
    } else {
      router.push({
        pathname: '/fsu-devicemanagement',
        query: {
          id,
          isFsu: true,
        },
      });
    }
    layoutStore.recordReforePath('sitemonitoring');
    layoutStore.setSelectedKeys('equ-information');
  }
  handleClick() {
    this.setState({
      show: true,
    });
  }
  componentDidMount() {}
  onVideoOk() {}
  onCancel() {
    this.setState({
      show: false,
    });
  }

  //渲染
  render() {
    const {
      sitemonitoringStore: {siteDetail, siteVideo, d_loading},
    } = this.props;

    return (
      <div className={styles['realtime_data_wrap']}>
        <Spin spinning={d_loading}>
          {toJS(siteDetail)[0] || toJS(siteVideo)[0] ? (
            <Row>
              {toJS(siteVideo)[0] && (
                <Row
                  className={classnames(
                    styles['detail_item'],
                    styles['detail_item_video'],
                  )}
                  onClick={this.handleClick}>
                  <Row className={styles['detail_item_header']}>
                    <span className={styles['detail_item_name']}>
                      {'视频监控'}
                    </span>
                  </Row>
                  <Row className={styles['detail_item_body']}>
                    <div className={styles['detail_video']}>
                      <img
                        src={'static/images/9.png'}
                        className={styles['detail_img']}
                      />
                    </div>
                  </Row>
                </Row>
              )}
              {_.map(toJS(siteDetail), (app, i) => {
                let title = '';
                let imgsrc = '';
                switch (app.type) {
                  case 1:
                    title = '开关电源';
                    imgsrc = 'static/images/1.png';
                    break;
                  case 2:
                    title = '配电柜';
                    imgsrc = 'static/images/2.png';
                    break;
                  case 3:
                    title = '空调';
                    imgsrc = 'static/images/3.png';
                    break;
                  case 4:
                    title = 'UPS';
                    imgsrc = 'static/images/UPS.png';
                    break;
                  case 5:
                    title = '门禁';
                    imgsrc = 'static/images/5.png';
                    break;
                  case 6:
                    title = '环境';
                    imgsrc = 'static/images/6.png';
                    break;
                  case 7:
                    title = '蓄电池';
                    imgsrc = 'static/images/7.png';
                    break;
                  case 8:
                    title = '发电机';
                    imgsrc = 'static/images/8.png';
                    break;
                  case 9:
                    title = '视频';
                    imgsrc = 'static/images/9.png';
                    break;
                }
                let list1 = app.list.filter((item, i) => {
                  return i < 3;
                });
                let list2 = app.list.filter((item, i) => {
                  return i < 6 && i >= 3;
                });
                let list3 = app.list.filter((item, i) => {
                  return i < 9 && i >= 6;
                });
                const List = ({item}) => {
                  return (
                    <Row className={styles['detail_value']}>
                      <Col span={12} className={styles['text_overflow']}>
                        <span className={styles['detail_item_name']}>
                          {item.name ? item.name : '-'}
                        </span>
                      </Col>
                      <Col span={6}>
                        <span className={styles['detail_item_value']}>
                          {item.value ? item.value : '-'}
                        </span>
                      </Col>
                      <Col span={6}>
                        <span className={styles['detail_item_unit']}>
                          {item.unit ? item.unit : '-'}
                        </span>
                      </Col>
                    </Row>
                  );
                };

                return (
                  <Row
                    className={styles['detail_item']}
                    onClick={this.jumpToDev.bind(this, app)}
                    key={i.toString(36)}>
                    <Row className={styles['detail_item_header']}>
                      <span className={styles['detail_item_name']}>
                        {title ? title : '-'}
                      </span>
                    </Row>
                    <Row className={styles['detail_item_body']}>
                      <div className={styles['detail_left']}>
                        <img src={imgsrc} className={styles['detail_img']} />
                      </div>
                      {list1[0] && (
                        <div className={styles['detail_right']}>
                          {_.map(list1, (item, index) => {
                            return (
                              <List item={item} key={index.toString(36)} />
                            );
                          })}
                        </div>
                      )}
                      {list2[0] && (
                        <div className={styles['detail_right']}>
                          {_.map(list2, (item, index) => {
                            return (
                              <List item={item} key={index.toString(36)} />
                            );
                          })}
                        </div>
                      )}
                      {list3[0] && (
                        <div className={styles['detail_right']}>
                          {_.map(list3, (item, index) => {
                            return (
                              <List item={item} key={index.toString(36)} />
                            );
                          })}
                        </div>
                      )}
                    </Row>
                  </Row>
                );
              })}
            </Row>
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

        <EditModal
          isShow={this.state.show}
          onOk={this.onVideoOk}
          width={1000}
          isVideo={true}
          wrapClassName="video_wrap"
          outTitle={'视频监控'}
          onCancel={this.onCancel}>
          <Video />
        </EditModal>
      </div>
    );
  }
}

export default Regional;
