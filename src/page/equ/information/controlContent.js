import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, Button, Select, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

//实例
@inject('informationStore')
@Form.create()
@observer
class ControlContent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.channelChange = this.channelChange.bind(this);
    this.state = {
      F_ChannelID: '',
      controlValue: '',
    };
  }
  componentDidMount() {}
  handleChange(value) {
    this.setState({
      controlValue: value,
    });
  }
  channelChange(value) {
    const {informationStore: {getOperateList, currentDevice}} = this.props;
    const params = {
      F_DeviceID: currentDevice,
      F_ChannelID: value,
    };
    getOperateList(params);
    this.setState({
      F_ChannelID: value,
      controlValue: '',
    });
  }
  handleClick() {
    const {
      informationStore: {
        currentDevice,
        postDeviceControl,
        operateList,
        controlChannel,
      },
    } = this.props;
    const params = {
      F_ChannelID: this.state.F_ChannelID || toJS(controlChannel)[0].channelID,
      controlValue: this.state.controlValue || toJS(operateList)[0].value,
      F_DeviceID: currentDevice,
    };
    postDeviceControl(params);
  }
  render() {
    const {informationStore: {operateList, controlChannel}} = this.props;
    return (
      <Form className={styles['control_ct']}>
        <Row>
          <Col span={1} className={styles['passageway']}>
            <FormItem label="通道名称">
              <Select
                value={
                  this.state.F_ChannelID || toJS(controlChannel)[0].channelID
                }
                placeholder="请选择通道!"
                onChange={this.channelChange}>
                {_.map(toJS(controlChannel), item => {
                  return (
                    <Option key={item.channelID} value={item.channelID}>
                      {item.channelName}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
          </Col>
          <Col span={1} className={styles['operation']}>
            <FormItem label="操作">
              <Select
                placeholder="无操作"
                value={
                  this.state.controlValue ||
                  (toJS(operateList)[0]
                    ? toJS(operateList)[0].value
                    : '暂无操作')
                }
                disabled={!toJS(operateList)[0] ? true : false}
                onChange={this.handleChange}>
                {_.map(toJS(operateList), item => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.valueMean}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
          </Col>
          <Col span={1} className={styles['search']}>
            <Button onClick={this.handleClick}>操作</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ControlContent;
