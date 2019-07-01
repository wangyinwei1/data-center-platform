import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import PieEcharts from './pieEcharts.js';
import Alarm from './alarm.js';
import classnames from 'classnames';
import Services from './services.js';
//实例
@inject('globalStore', 'layoutStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmHeight: 0,
      servicesHeight: 0,
      width: 0,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      const height = $('#layout_wrap #cl_alarm_item').height();
      const servicesHeight = $(this.servicesWrap).height();
      const width = $(window).width() - 46 - 24;
      this.setState({
        alarmHeigh: height,
        servicesHeight,
        width,
      });
      let indexWrapHeight = $(this.indexWrap).height() - 44;
      $(window).resize(() => {
        const width = $(window).width() - 46 - 24;
        const height = $('#layout_wrap #cl_alarm_item').height();
        const servicesHeight = $(this.servicesWrap).height();
        const h_width = $(window).width();
        const v_height = $(window).height();
        let maxAlarmHeight = 0;
        let maxServicesHeight = 0;
        if (v_height > h_width) {
          maxAlarmHeight = (v_height - 44 - 24) * 0.27;
          maxServicesHeight = v_height - 44 - 24 - maxAlarmHeight - 12;
        }

        this.setState({
          width,
          alarmHeigh: maxAlarmHeight ? maxAlarmHeight : height,
          servicesHeight: maxServicesHeight
            ? maxServicesHeight
            : servicesHeight,
        });
      });
    });
  }
  render() {
    // let width = window.innerWidth - 46;
    // let height = window.innerHeight - 44;
    // let slope = 846 / 1076;
    // let maxHeight = '';
    // if (height / width < slope) {
    //   maxHeight = 'index_max_height';
    // }

    return (
      <div
        className={styles['index_wrap']}
        ref={c => {
          this.indexWrap = c;
        }}>
        <div
          className={classnames(styles['index_bg'])}
          ref={c => {
            this.container = c;
          }}>
          <div className={styles['alarm_state_wrap']}>
            <div
              className={styles['state_quantity']}
              style={{
                fontSize: this.state.alarmHeigh + 'px',
              }}>
              <PieEcharts height={this.state.alarmHeigh} />
            </div>
            <div
              className={styles['alarm_center']}
              style={{
                fontSize: this.state.alarmHeigh + 'px',
              }}>
              {this.state.alarmHeigh !== 0 && (
                <Alarm height={this.state.alarmHeigh} />
              )}
            </div>
          </div>
          <div
            className={styles['services_wrap']}
            style={{
              fontSize: this.state.servicesHeight + 'px',
            }}
            ref={c => {
              this.servicesWrap = c;
            }}>
            {this.state.servicesHeight !== 0 && (
              <Services
                width={this.state.width}
                height={this.state.servicesHeight}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Regional;
