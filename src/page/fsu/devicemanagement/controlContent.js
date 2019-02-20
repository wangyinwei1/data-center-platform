import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, message, Input, Button, Select, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

//实例
@inject('fsu_devicemanagementStore')
@Form.create()
@observer
class ControlContent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.channelChange = this.channelChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.state = {
      controlValue: '',
      F_DeviceID: '',
      value: '',
    };
  }
  componentDidMount() {}
  handleChange(value) {
    this.setState({
      controlValue: value,
    });
  }
  inputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  channelChange(value) {
    const {
      fsu_devicemanagementStore: {getOperateList, currentDevice},
    } = this.props;
    const params = {
      F_Suid: currentDevice,
      F_DeviceID: value,
    };
    getOperateList(params);
    this.setState({
      F_DeviceID: value,
      controlValue: '',
    });
  }
  handleClick() {
    const {
      fsu_devicemanagementStore: {
        currentDevice,
        postDeviceControl,
        operateList,
        controlChannel,
      },
    } = this.props;
    const devID =
      this.state.F_DeviceID ||
      (toJS(controlChannel)[0] && toJS(controlChannel)[0].deviceID);
    const spID =
      this.state.controlValue ||
      (toJS(operateList)[0] && toJS(operateList)[0].spID);

    if (!spID) {
      message.error('监控点不能为空!');
      return;
    }
    if (!devID) {
      message.error('子设备不能为空!');
      return;
    }
    const params = {
      F_DeviceID: devID,
      F_Spid: spID,
      F_Suid: currentDevice,
      value: this.state.value || '',
    };
    postDeviceControl(params);
  }
  render() {
    const {
      fsu_devicemanagementStore: {operateList, controlChannel},
    } = this.props;
    return (
      <Form className={styles['control_ct']}>
        <Row style={{width: '100%'}}>
          <Col className={styles['passageway']}>
            <FormItem label="子设备名称">
              <Select
                value={
                  this.state.F_DeviceID || toJS(controlChannel)[0].deviceID
                }
                placeholder="请选择设备!"
                onChange={this.channelChange}>
                {_.map(toJS(controlChannel), item => {
                  return (
                    <Option key={item.deviceID} value={item.deviceID}>
                      {item.deviceName}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
          </Col>
          <Col className={styles['monitor']}>
            <FormItem label="监控点名称">
              <Select
                placeholder="无操作"
                value={
                  this.state.controlValue ||
                  (toJS(operateList)[0]
                    ? toJS(operateList)[0].spID
                    : '暂无操作')
                }
                disabled={!toJS(operateList)[0] ? true : false}
                onChange={this.handleChange}>
                {_.map(toJS(operateList), (item, i) => {
                  return (
                    <Option key={i.toString(36) + i} value={item.spID}>
                      {item.spName}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
          </Col>
          <Col className={styles['fsu_operation']}>
            <FormItem label="操作">
              <Input
                placeholder={'输入0到9的数字'}
                onChange={this.inputChange}
              />
            </FormItem>
          </Col>
          <Col className={styles['search']}>
            <Button onClick={this.handleClick}>操作</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ControlContent;
