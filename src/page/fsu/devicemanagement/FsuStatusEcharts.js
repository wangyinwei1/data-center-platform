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
    data[0] = fsuStatus.cpu;
    data[1] = fsuStatus.memu;
    return (
      <div className={styles['wrap']}>
        <ReactEcharts
          style={{
            width: '100%',
          }}
          showLoading={status_loading}
          loadingOption={{
            text: '加载中...',
            color: '#5deda4',
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, 0.6)',
            zlevel: 0,
          }}
          option={options}
        />
      </div>
    );
  }
}

export default Pie;
