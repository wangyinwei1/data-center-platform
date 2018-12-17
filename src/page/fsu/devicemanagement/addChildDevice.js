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
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {fields, mode, informationStore: {addData}} = this.props;
    let disabled = false;
    mode == 'detail' && (disabled = true);
    const devType =
      mode == 'new'
        ? _.map(toJS(addData.dev_type), item => {
            return {
              value: item.Id_Version,
              name: item.F_TypeName,
            };
          })
        : [];
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'类型'}
          name={'spType'}
          placeholder={'请选择类型'}
          width={385}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[
            {name: '遥测', value: 3},
            {name: '遥信', value: 2},
            {name: '遥控', value: 4},
            {name: '遥调', value: 5},
            {name: '阈值', value: 1},
          ]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'归属类型'}
          disabled={disabled}
          placeholder={'请选择类型'}
          width={385}
          name={'F_OptionID'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[
            {name: '设备', value: 1},
            {name: '系统', value: 2},
            {name: '机房', value: 3},
            {name: '局站及网管', value: 4},
          ]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={mode === 'modify' ? true : disabled}
          label={'监控点ID'}
          name={'F_SpID'}
          width={385}
          placeholder={'请输入地址'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'监控点名称'}
          width={385}
          name={'spName'}
          placeholder={'请输入地址'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        {JSON.parse(localStorage.getItem('FsuTypeID')) !== 3 && (
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            disabled={disabled}
            label={'监控点单位'}
            width={385}
            name={'spUnit'}
            placeholder={'请输入标识'}
            rules={[{required: false}]}
          />
        )}
        {JSON.parse(localStorage.getItem('FsuTypeID')) === 3 && (
          <Row>
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'告警等级'}
              disabled={disabled}
              name={'alarmLevel'}
              width={385}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'阈值'}
              disabled={disabled}
              width={385}
              name={'threshold'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              width={385}
              label={'绝对值'}
              disabled={disabled}
              name={'absoluteVal'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'相对值'}
              width={385}
              disabled={disabled}
              name={'relativeVal'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'设备描述'}
              width={385}
              disabled={disabled}
              name={'describe'}
              rules={[{required: false, message: '请必须填写!'}]}
            />
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              disabled={disabled}
              label={'监控点单位'}
              width={385}
              name={'spUnit'}
              placeholder={'请输入标识'}
              rules={[{required: false}]}
            />
          </Row>
        )}
      </Form>
    );
  }
}

export default AddChild;
