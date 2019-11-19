import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, Button, Input, Select, Row, Col} from 'antd';
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomizedForm,
} from '../../../components/FormItem';

@observer
class ControlContent extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  componentDidMount() {}
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {fields} = this.props;
    let disabled = false;
    let width = 390;
    let spType = fields.spType.value;
    return (
      <Form layout="inline" className={styles['control_ct']}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'设置值'}
          width={width}
          name={'sVal'}
          visiable={spType === 6}
          placeholder={'请输入内容'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'过高值'}
          width={width}
          visiable={spType === 6}
          name={'hLimit'}
          placeholder={'请输入内容'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'超高值'}
          width={width}
          visiable={spType === 6}
          name={'sHLimit'}
          placeholder={'请输入内容'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'过低值'}
          width={width}
          visiable={spType === 6}
          name={'lLimit'}
          placeholder={'请输入内容'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'超低值'}
          visiable={spType === 6}
          width={width}
          name={'sLLimit'}
          placeholder={'请输入内容'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'相对值'}
          width={width}
          visiable={spType === 6}
          name={'relativeVal'}
          placeholder={'请输入内容'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'阈值'}
          width={width}
          visiable={spType === 6}
          name={'threshold'}
          placeholder={'请输入内容'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'时间间隔'}
          width={width}
          visiable={spType === 6}
          name={'intervalTime'}
          placeholder={'请输入内容'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'开始延迟时间'}
          width={width}
          visiable={spType === 2 || spType === 4}
          name={'bDelay'}
          placeholder={'请输入标识'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'结束延迟时间'}
          visiable={spType === 2 || spType === 4}
          width={width}
          name={'eDelay'}
          placeholder={'请输入标识'}
          rules={[{required: false}]}
        />
      </Form>
    );
  }
}

export default ControlContent;
