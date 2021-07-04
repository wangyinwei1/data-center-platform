import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {DatePicker} from 'antd';
//实例
@inject('fsu_devicemanagementStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onOk = this.onOk.bind(this);
    this.state = {
      record: {},
    };
  }
  componentDidMount() {}
  onChange(value, dateString) {
    const {timingChange} = this.props;
    timingChange && timingChange(dateString);
  }
  onOk(value) {
    const {timingChange} = this.props;
    timingChange &&
      timingChange(value ? value.format('YYYY-MM-DD HH:mm:ss') : '');
  }

  render() {
    const {fsu_devicemanagementStore, theme} = this.props;
    return (
      <div style={{padding: '20px'}}>
        <DatePicker
          showTime
          placeholder="选择时间"
          style={{width: '280px'}}
          className={'dev_timing'}
          onChange={this.onChange}
          format="YYYY-MM-DD HH:mm:ss"
          onOk={this.onOk}
        />
      </div>
    );
  }
}
export default Regional;
