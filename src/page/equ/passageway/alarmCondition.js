import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, Button, message, Select, Row, Col} from 'antd';
import classnames from 'classnames';
import {FormSelect} from '../../../components/FormItem';
const FormItem = Form.Item;
const Option = Select.Option;

//实例
@inject('passagewayStore')
@Form.create()
@observer
class AlarmCondition extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.channelChange = this.channelChange.bind(this);
    this.state = {
      F_ChannelID: '',
      controlValue: '',
      value: [],
      Channels: '',
      allSelected: false,
      selectedChannelId: '',
      selectedDevId: undefined,
    };
  }
  async handleFormChange(value) {
    await this.setState({
      selectedDevId: value,
    });
    const {passagewayStore: {findDeviceChannel}} = this.props;
    const params = {
      deviceId: this.state.selectedDevId,
    };

    await findDeviceChannel(params);
  }
  channelChange(value) {
    this.setState({
      selectedChannelId: value,
    });
  }
  handleClick() {
    const {
      passagewayStore: {copyAlarmCondition, a_tableData},
      currentDevice,
      isChannel,
    } = this.props;
    if (isChannel && !this.state.selectedDevId) {
      message.error('设备不能为空!');
      return;
    }
    if (!this.state.Channels) {
      isChannel
        ? message.error('通道不能为空!')
        : message.error('设备不能为空!');
      return;
    }
    if (!isChannel && !this.state.selectedChannelId) {
      message.error('通道不能为空!');
      return;
    }
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
    const params = isChannel
      ? {
          deviceId: this.state.selectedDevId,
          channelIDs: this.state.Channels,
          alarmConditions,
        }
      : {
          deviceIDs: this.state.Channels,
          channelID: this.state.selectedChannelId,
          alarmConditions,
        };
    copyAlarmCondition(params, isChannel).then(data => {
      if (data) {
        const {closeAlarmCondition} = this.props;
        closeAlarmCondition();
      }
    });
  }
  isAllSelected(value, devChannel) {
    let isAll = true;
    _.map(devChannel, item => {
      if (
        value.indexOf(item.devID) === -1 ||
        value.indexOf(item.channelID) === -1
      )
        isAll = false;
    });
    return isAll;
  }
  allSelectClick() {
    const selected = this.state.allSelected;
    if (!selected) {
      const {passagewayStore, item, isChannel} = this.props;
      const devChannel = toJS(passagewayStore.devChannel);
      const allCongenerDevList = toJS(passagewayStore.allCongenerDevList);
      let result = [];
      _.map(isChannel ? devChannel : allCongenerDevList, item => {
        result.push(isChannel ? item.channelID : JSON.stringify(item.devID));
      });
      this.setState({
        allSelected: !this.state.allSelected,
        Channels: result.join(','),
        value: result,
      });
      !isChannel &&
        passagewayStore.getBasicchannelTable({
          page: 1,
          keywords: '',
          number: 0,
          F_TypeID: item.typeID,
          F_Version: item.version,
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
      const {passagewayStore, isChannel, item} = this.props;
      const devChannel = toJS(passagewayStore.devChannel);
      const allCongenerDevList = toJS(passagewayStore.allCongenerDevList);
      let isAll = null;
      if (isChannel) {
        isAll =
          value.length === devChannel.length &&
          this.isAllSelected(value, devChannel);
      } else {
        isAll =
          value.length === allCongenerDevList.length &&
          this.isAllSelected(value, allCongenerDevList);
      }

      this.setState({
        Channels: value.join(','),
        allSelected: isAll,
        value,
      });
      !isChannel &&
        passagewayStore.getBasicchannelTable({
          page: 1,
          keywords: '',
          number: 0,
          F_TypeID: item.typeID,
          F_Version: item.version,
        });
    }
  }
  render() {
    const {
      passagewayStore: {
        devChannel,
        typeChannelList,
        allDeciceList,
        allCongenerDevList,
      },
      isChannel,
    } = this.props;
    const children = _.map(
      isChannel ? devChannel : allCongenerDevList,
      (item, i) => {
        return (
          <Option key={isChannel ? item.channelID : JSON.stringify(item.devID)}>
            {isChannel ? item.channelName : item.devName}
          </Option>
        );
      },
    );
    children.unshift(
      <Option
        className={classnames(this.state.allSelected && styles['all_selected'])}
        key={'all'}>
        全选
      </Option>,
    );
    const deviceList = _.map(toJS(allDeciceList), item => {
      return <Option key={item.devID}>{item.devName}</Option>;
    });
    const channelList = _.map(toJS(typeChannelList), item => {
      return <Option key={item.F_ChannelID}>{item.F_ChannelName}</Option>;
    });

    const fields = this.state.fields;
    const disabled = false;
    return (
      <Form className={styles['control_ct']}>
        <Row>
          <Col span={1} className={styles['channel_id']}>
            {!isChannel && (
              <Row>
                <FormItem label="设备名称" className={styles['copy_float']}>
                  <Select
                    mode="multiple"
                    className={styles['drop_down']}
                    allowClear
                    disabled={
                      isChannel
                        ? this.state.selectedDevId ? false : true
                        : false
                    }
                    optionFilterProp="children"
                    placeholder={isChannel ? '请选择设备通道' : '请选择设备'}
                    value={this.state.value[0] ? this.state.value : undefined}
                    onChange={this.onSelect}>
                    {children}
                  </Select>
                </FormItem>
                <FormItem
                  label="通道名称"
                  className={classnames(
                    styles['copy_float'],
                    styles['copy_dev_wrap'],
                    styles['padding'],
                  )}>
                  <Select
                    onChange={this.channelChange}
                    disabled={disabled}
                    placeholder={'请选择通道'}
                    className={styles['copy_dev']}>
                    {channelList}
                  </Select>
                </FormItem>
              </Row>
            )}
            {isChannel && (
              <Row>
                <FormItem
                  label="设备名称"
                  className={classnames(
                    styles['copy_float'],
                    styles['copy_dev_wrap'],
                  )}>
                  <Select
                    onChange={this.handleFormChange}
                    disabled={disabled}
                    placeholder={'请选择设备'}
                    name={'deviceId'}
                    className={styles['copy_dev']}>
                    {deviceList}
                  </Select>
                </FormItem>
                <FormItem label="通道名称" className={styles['copy_float']}>
                  <Select
                    mode="multiple"
                    className={styles['drop_down']}
                    allowClear
                    disabled={this.state.selectedDevId ? false : true}
                    optionFilterProp="children"
                    placeholder={'请选择设备通道'}
                    value={this.state.value}
                    onChange={this.onSelect}>
                    {children}
                  </Select>
                </FormItem>
              </Row>
            )}
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
