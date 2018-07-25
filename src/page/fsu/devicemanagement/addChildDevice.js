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
          name={'F_Type'}
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
          name={'F_SpName'}
          placeholder={'请输入地址'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'监控点单位'}
          width={385}
          name={'F_SpUnit'}
          placeholder={'请输入标识'}
          rules={[{required: false}]}
        />
      </Form>
    );
  }
}

export default AddChild;
