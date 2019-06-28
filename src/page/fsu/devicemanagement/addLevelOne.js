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
@inject('fsu_devicemanagementStore')
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
    const {fields, mode, fsu_devicemanagementStore: {deviceTypes}} = this.props;
    let disabled = false;
    mode == 'detail' && (disabled = true);

    const fsuDeviceTypes = _.map(toJS(deviceTypes), item => {
      return {
        name: item.typeName,
        value: item.deviceType,
      };
    });
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
        {JSON.parse(localStorage.getItem('FsuTypeID')) !== 3 && (
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'设备类型'}
            disabled={disabled}
            placeholder={'请选择设备类型'}
            name={'deviceSubType'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={fsuDeviceTypes}
          />
        )}
        {JSON.parse(localStorage.getItem('FsuTypeID')) === 3 && (
          <Row className={styles['type3_wrap']}>
            <FormSelect
              {...fields}
              onChange={this.handleFormChange}
              label={'设备类型'}
              disabled={disabled}
              placeholder={'请选择设备类型'}
              name={'deviceSubType'}
              rules={[{required: true, message: '请必须填写!'}]}
              children={fsuDeviceTypes}
            />
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
