import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import option from './fsuSatusOptoons.js';
import ReactEcharts from 'echarts-for-react';
import {toJS} from 'mobx';
//实例
@inject('fsu_devicemanagementStore')
@observer
class Pie extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    const {
      fsu_devicemanagementStore: {fsuStatusData, status_loading},
    } = this.props;
    const fsuStatus = toJS(fsuStatusData);

    const options = option();
    let data = options.series[0].data;
    return (
      <div className={styles['status_wrap']}>
        <div className={styles['item']}>
          <span className={styles['status_title']}>CPU使用率:</span>
          <span className={styles['status_value']}>
            {fsuStatus.cpu ? fsuStatus.cpu + '%' : '0%'}
          </span>
        </div>
        <div className={styles['item']}>
          <span className={styles['status_title']}>内存使用率:</span>
          <span className={styles['status_value']}>
            {fsuStatus.memu ? fsuStatus.memu + '%' : '0%'}
          </span>
        </div>
      </div>
    );
  }
}

export default Pie;
