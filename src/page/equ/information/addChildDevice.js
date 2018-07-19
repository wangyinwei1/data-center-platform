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
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'名称'}
          name={'F_SubDeviceName'}
          placeholder={'请输入名称'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'类型'}
          disabled={mode == 'new' ? false : true}
          placeholder={'请选择类型'}
          name={mode == 'new' ? 'Id_Version' : 'cl_typeName'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={devType}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'地址'}
          name={'F_Adr'}
          placeholder={'请输入地址'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'标识'}
          name={'F_IdentyNO'}
          placeholder={'请输入标识'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'描述'}
          name={'F_Rec'}
          placeholder={'请输入描述'}
          rules={[{required: false}]}
        />
      </Form>
    );
  }
}

export default AddChild;
