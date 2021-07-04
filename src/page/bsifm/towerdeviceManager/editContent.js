import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {FormInput, FormSelect} from '../../../components/FormItem';
import {toJS} from 'mobx';
//实例
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {fields, type, record, stationList} = this.props;

    let data = record;
    let disabled = false;

    let currentClass = 'cl_regional_select_157';

    const station = _.map(toJS(stationList), item => {
      return {
        value: item.F_ID,
        name: item.F_Name,
      };
    });
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'设备ID'}
          disabled={type === 'modify' ? true : disabled}
          className={currentClass}
          name={'meternum'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'物联卡ICCID'}
          disabled={disabled}
          className={currentClass}
          name={'iccid'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'采集间隔(ms)'}
          disabled={disabled}
          className={currentClass}
          name={'interval'}
          rules={[{required: true, message: '请必须填写!'}]}
          rules={[
            {required: true, message: '请必须填写!'},
            {
              pattern: /^\d{1,}$/,
              message: '请输入数字类型',
            },
          ]}
        />
        <FormSelect
          fields={fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'站点选择'}
          placeholder={'请选择站点'}
          name={'stationId'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={station}
        />
        <FormSelect
          fields={fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'电表类型'}
          placeholder={'请选择电表类型'}
          name={'metertype'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[
            {value: 301, name: '三相智能电表'},
            {value: 304, name: '三相多路智能电表'},
            {value: 101, name: '单相单路智能电表'},
            {value: 104, name: '单相多路智能电表'},
            {value: 100, name: '直流电'},
            {value: 200, name: '云拍'},
          ]}
        />
        <FormSelect
          fields={fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'通信模块类型'}
          placeholder={'请选择通信模块类型'}
          name={'moduletype'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[
            {value: 1, name: '4G'},
            {value: 2, name: 'NB'},
            {value: 3, name: '2G'},
          ]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'信号级别'}
          disabled={disabled}
          className={currentClass}
          name={'signallevel'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'通信模组IMEI'}
          disabled={disabled}
          className={currentClass}
          name={'imei'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        {/* <FormInput */}
        {/*   fields={fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   label={'经度'} */}
        {/*   disabled={disabled} */}
        {/*   className={currentClass} */}
        {/*   name={'longitude'} */}
        {/*   rules={[{required: false, message: '请必须填写!'}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   fields={fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   label={'纬度'} */}
        {/*   disabled={disabled} */}
        {/*   className={currentClass} */}
        {/*   name={'latitude'} */}
        {/*   rules={[{required: false, message: '请必须填写!'}]} */}
        {/* /> */}
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'机构ID'}
          disabled={disabled}
          className={currentClass}
          name={'orgid'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'回路'}
          disabled={disabled}
          className={currentClass}
          name={'meterchannel'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        {/* <FormInput */}
        {/*   fields={fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   label={'组织树路径'} */}
        {/*   disabled={disabled} */}
        {/*   className={currentClass} */}
        {/*   name={'fullorgid'} */}
        {/*   rules={[{required: false, message: '请必须填写!'}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   fields={fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   label={'站址ID'} */}
        {/*   disabled={disabled} */}
        {/*   className={currentClass} */}
        {/*   name={'siteid'} */}
        {/*   rules={[{required: false, message: '请必须填写!'}]} */}
        {/* /> */}
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'固件版本号'}
          disabled={disabled}
          className={currentClass}
          name={'version'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        {/* <FormInput */}
        {/*   fields={fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   label={'采集间隔(s)'} */}
        {/*   disabled={disabled} */}
        {/*   className={currentClass} */}
        {/*   name={'dataFilterTime'} */}
        {/*   rules={[ */}
        {/*     {required: true, message: '请必须填写!'}, */}
        {/*     { */}
        {/*       pattern: /^30|[3-5][0-9]|60$/, */}
        {/*       message: '请输入>=30且<=60的数字', */}
        {/*     }, */}
        {/*   ]} */}
        {/* /> */}
      </Form>
    );
  }
}

export default Regional;
