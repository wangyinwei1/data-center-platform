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

      $(window).resize(() => {
        const width = $(window).width() - 46 - 24;
        const height = $('#layout_wrap #cl_alarm_item').height();
        const servicesHeight = $(this.servicesWrap).height();
        this.setState({
          width,
          alarmHeigh: height,
          servicesHeight,
        });
      });
    });
  }
  render() {
    return (
      <div className={styles['index_bg']}>
        <div className={styles['alarm_state_wrap']}>
          <div className={styles['state_quantity']}>
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
    );
  }
}

export default Regional;
