import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, Button, Select, Row, Col} from 'antd';
import classnames from 'classnames';
const FormItem = Form.Item;
const Option = Select.Option;

//实例
@inject('basicchannelStore')
@Form.create()
@observer
class AlarmCondition extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      F_ChannelID: '',
      controlValue: '',
      value: [],
      Channels: '',
      allSelected: false,
    };
  }
  handleClick() {
    if (!this.state.Channels) {
      message.error('通道不能为空!');
      return;
    }
    const {
      basicchannelStore: {base_copyAlarmCondition, a_tableData},
      currentDevice,
    } = this.props;
    let alarmConditions = [];
    let record = toJS(a_tableData);
    if (
      record.length === 1 &&
      !record[0].conType &&
      !record[0].msgID &&
      !record[0].condition &&
      (!record[0].alarmDelay || record[0].alarmDelay === 0)
    ) {
      alarmConditions = [];
    } else {
      alarmConditions = a_tableData;
    }
    const params = {
      version: currentDevice.F_Version,
      deviceType: currentDevice.F_DeviceType,
      channelIDs: this.state.Channels,
      alarmConditions,
    };
    base_copyAlarmCondition(params).then(data => {
      if (data) {
        const {closeAlarmCondition} = this.props;
        closeAlarmCondition();
      }
    });
  }
  isAllSelected(value, devChannel) {
    let isAll = true;
    _.map(devChannel, item => {
      if (value.indexOf(item.channelID) === -1) isAll = false;
    });
    return isAll;
  }
  allSelectClick() {
    const selected = this.state.allSelected;
    if (!selected) {
      const {basicchannelStore} = this.props;
      const devChannel = toJS(basicchannelStore.devChannel);
      let result = [];
      _.map(devChannel, item => {
        result.push(item.channelID);
      });
      this.setState({
        allSelected: !this.state.allSelected,
        Channels: result.join(','),
        value: result,
      });
    } else {
      $(`.${styles['drop_down']} .ant-select-selection__clear`).click();
    }
  }
  onSelect(value, option) {
    if (value.indexOf('all') != -1) {
      this.allSelectClick();
      return;
    }
    if (!value[0]) {
      this.setState({
        Channels: value.join(','),
        value,
        allSelected: false,
      });
    } else {
      const {basicchannelStore} = this.props;
      const devChannel = toJS(basicchannelStore.devChannel);
      const isAll =
        value.length === devChannel.length &&
        this.isAllSelected(value, devChannel);
      this.setState({
        Channels: value.join(','),
        allSelected: isAll,
        value,
      });
    }
  }
  render() {
    const {basicchannelStore: {devChannel}} = this.props;
    const children = _.map(devChannel, (item, i) => {
      return <Option key={item.channelID}>{item.channelName}</Option>;
    });
    children.unshift(
      <Option
        className={classnames(this.state.allSelected && styles['all_selected'])}
        key={'all'}>
        全选
      </Option>,
    );
    return (
      <Form className={styles['control_ct']}>
        <Row>
          <Col span={1} className={styles['channel_id']}>
            <FormItem label="通道名称">
              <Select
                mode="multiple"
                className={styles['drop_down']}
                allowClear
                optionFilterProp="children"
                placeholder={'请选择设备通道'}
                value={this.state.value}
                onChange={this.onSelect}>
                {children}
              </Select>
            </FormItem>
          </Col>
          <Col span={1} className={styles['search']}>
            <Button onClick={this.handleClick}>复制到其他通道</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default AlarmCondition;
