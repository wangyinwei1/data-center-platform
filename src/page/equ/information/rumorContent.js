import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, Button, Input, Select, Row, Col} from 'antd';
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
  handleChange(e) {
    this.setState({
      controlValue: e.target.value,
    });
  }
  channelChange(value) {
    this.setState({
      F_ChannelID: value,
      controlValue: '',
    });
  }
  handleClick() {
    const {
      informationStore: {currentDevice, postDeviceControl, regulatChannel},
    } = this.props;
    const params = {
      F_ChannelID: this.state.F_ChannelID || toJS(regulatChannel)[0].channelId,
      controlValue: this.state.controlValue,
      F_DeviceID: currentDevice,
    };
    postDeviceControl(params);
  }
  render() {
    const {informationStore: {regulatChannel}} = this.props;
    return (
      <Form className={styles['control_ct']}>
        <Row>
          <Col span={1} className={styles['passageway']}>
            <FormItem label="通道名称">
              <Select
                value={
                  this.state.F_ChannelID || toJS(regulatChannel)[0].channelId
                }
                placeholder="请选择通道!"
                onChange={this.channelChange}>
                {_.map(toJS(regulatChannel), item => {
                  return (
                    <Option key={item.channelId} value={item.channelId}>
                      {item.channelName}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
          </Col>
          <Col span={1} className={styles['operation_text']}>
            <FormItem label="操作">
              <Input
                placeholder={'请输入操作内容'}
                value={this.state.controlValue}
                onChange={this.handleChange}
              />
            </FormItem>
          </Col>
          <Col span={1} className={styles['search']}>
            <Button onClick={this.handleClick}>确定</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ControlContent;
