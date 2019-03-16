import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, message, Input, Button, Select, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

//实例
@inject('home_pageStore')
@Form.create()
@observer
class ControlContent extends Component {
  constructor(props) {
    super(props);
    this.channelChange = this.channelChange.bind(this);
    this.createWorkOrder = this.createWorkOrder.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.state = {
      value: undefined,
      textValue: '',
    };
  }
  inputChange(e) {
    this.setState({
      textValue: e.target.value,
    });
  }
  createWorkOrder() {
    const value = this.state.value;
    const textValue = this.state.textValue;
    if (!value) {
      message.error('请选择巡检人!');
      return;
    }
    const {home_pageStore, singleLineData, closeWorkOrder} = this.props;
    const params = {
      name: singleLineData.F_AlarmDesc + '-工单',
      userID: value,
      suID: singleLineData.F_SuID,
      alarmID: singleLineData.F_SerialNo,
      createUserID: localStorage.getItem('AppID'),
    };
    closeWorkOrder();

    home_pageStore.createWorkOrder(params);
  }
  channelChange(value) {
    this.setState({
      value,
    });
  }
  render() {
    const offices = [
      {
        value: 'QXUSp7CJ0tSO4jdl5f4A',
        label: '安卓巡检',
      },
      {
        value: 'OVnaKK3PDJqIPLPvS5h5',
        label: '安卓测试',
      },
    ];
    const {home_pageStore} = this.props;
    return (
      <Form className={styles['workOrders_wrap']}>
        {/* <FormItem label="工单名称"> */}
        {/*   <Input */}
        {/*     className={styles['workorders_input']} */}
        {/*     placeholder="请输入名称" */}
        {/*     value={this.state.textValue} */}
        {/*     onChange={this.inputChange} */}
        {/*   /> */}
        {/* </FormItem> */}
        <FormItem label="巡检人">
          <Select
            value={this.state.value}
            placeholder="请选择巡检人"
            onChange={this.channelChange}>
            {_.map(offices, item => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <Row style={{textAlign: 'center'}}>
          <Button
            className={styles['workorders_button']}
            onClick={this.createWorkOrder}>
            派发
          </Button>
        </Row>
      </Form>
    );
  }
}

export default ControlContent;
