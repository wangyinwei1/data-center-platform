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
          disabled={mode === 'modify' ? true : disabled}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备名称'}
          disabled={disabled}
          name={'deviceName'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        {JSON.parse(localStorage.getItem('FsuTypeID')) === 3 && (
          <Row>
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'机房名称'}
              disabled={disabled}
              name={'roomName'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'模型'}
              disabled={disabled}
              name={'model'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'品牌'}
              disabled={disabled}
              name={'brand'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'额定功率'}
              disabled={disabled}
              name={'ratedCapacity'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'版本'}
              disabled={disabled}
              name={'version'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'设备描述'}
              disabled={disabled}
              name={'devDescribe'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
          </Row>
        )}
      </Form>
    );
  }
}

export default AddChild;
