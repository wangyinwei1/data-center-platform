import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import Panel from '../../components/Panel';
import pieOption from './pieOption';
import ReactEcharts from 'echarts-for-react';
import ChildTable from './alarmCountTable.js';
import {toJS} from 'mobx';
//实例
@inject('home_pageStore')
@observer
class Pie extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onlineClick = this.onlineClick.bind(this);
    this.state = {
      show: false,
      type: '',
    };
  }
  componentDidMount() {
    const {home_pageStore: {getCountInfo}} = this.props;
    getCountInfo();
  }
  onCancel() {
    this.setState({
      show: false,
    });
  }
  onlineClick(type) {
    const {
      home_pageStore: {
        alarmDeviceDetailsList,
        offlineDeviceList,
        onlineDeviceList,
      },
    } = this.props;
    this.setState({
      show: true,
      type,
    });
    const params = {
      page: 1,
      number: 10,
      keywords: '',
    };
    type === 'offline' && offlineDeviceList(params);
    type === 'online' && onlineDeviceList(params);
    type === 'alarm' && alarmDeviceDetailsList(params);
  }
  render() {
    const {home_pageStore: {allCount}, height} = this.props;
    const count = toJS(allCount) || {};
    let title = '';
    switch (this.state.type) {
      case 'alarm':
        title = '告警设备';
        break;
      case 'online':
        title = '在线设备';
        break;
      case 'offline':
        title = '离线设备';
        break;
    }

    const options = pieOption(count, height);
    return (
      <div className={styles['isonline_wrap']}>
        <div className={styles['alarm_num_show']}>
          <div
            className={styles['online_num']}
            onClick={this.onlineClick.bind(this, 'online')}>
            <i />
            <span>{`在线数量 :  ${count.OnCount ? count.OnCount : 0}`} </span>
          </div>
          <div
            className={styles['alarm_num']}
            onClick={this.onlineClick.bind(this, 'alarm')}>
            <i />
            <span>
              {`告警数量 :  ${count.alarmCount ? count.alarmCount : 0}`}
            </span>
          </div>
          <div
            className={styles['off_num']}
            onClick={this.onlineClick.bind(this, 'offline')}>
            <i />
            <span>{`离线数量 :  ${count.OffCount ? count.OffCount : 0}`} </span>
          </div>
        </div>

        <ReactEcharts
          style={{
            width: '100%',
            height: '80%',
            top: '50%',
            position: 'absolute',
            left: 0,
            transform: 'translateY(-50%)',
          }}
          option={options}
        />
        <Panel
          onCancel={this.onCancel}
          title={title}
          theme={'darker'}
          isShow={this.state.show}>
          <ChildTable type={this.state.type} />
        </Panel>
      </div>
    );
  }
}

export default Pie;
