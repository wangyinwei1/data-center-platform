import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomizedForm,
} from '../../../components/FormItem';
import {Form, Button, Input, Row, Col} from 'antd';
const FormItem = Form.Item;

//实例
@inject('informationStore')
@observer
class AddChild extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  componentwillunmount() {
    // this.setState({
    //   ...params,
    // });
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {fields, mode} = this.props;
    let disabled = false;
    mode == 'detail' && (disabled = true);

    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备ID'}
          name={'F_DeviceID'}
          disabled={true}
          placeholder={'请输入端口号'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备名称'}
          disabled={disabled}
          name={'F_DeviceName'}
          placeholder={'请输入端口名称'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
      </Form>
    );
  }
}

export default AddChild;
