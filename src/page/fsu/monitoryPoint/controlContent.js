import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, message, Input, Button, Select, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

//实例
@inject('fsu_monitorypointStore')
@Form.create()
@observer
class ControlContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentDidMount() {}
  inputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  handleClick = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          fsu_monitorypointStore: {postDeviceControl},
          item,
          cancle,
        } = this.props;
        const params = {
          F_DeviceID: item.deviceID,
          F_Spid: item.spID,
          F_Suid: item.suID,
          fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
          value: this.state.value,
        };
        postDeviceControl(params).then(data => {
          data && cancle();
        });
      }
    });
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form className={styles['control_ct']}>
        <Row style={{width: '100%'}}>
          <Col className={styles['fsu_operation']}>
            <FormItem label="操控值">
              {getFieldDecorator('password', {
                rules: [
                  {required: true, message: '必须输入0-9值执行遥控'},
                  {
                    pattern: /^[0-9]{1}$/,
                    message: '只能输入0到9的数字!',
                  },
                ],
              })(
                <Input
                  placeholder={'输入0到9的数字'}
                  onChange={this.inputChange}
                />,
              )}
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

export default Form.create({name: 'op'})(ControlContent);
