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
@Form.create()
@observer
class Edit extends Component {
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
    const {informationStore: {detailData, addData}, fields, mode} = this.props;

    let data = {};
    let disabled = false;
    switch (mode) {
      case 'new':
        data = addData;
        fields.F_NetInTime.value = (data.pd && data.pd.F_NetInTime) || '';

        break;
      case 'modify':
      case 'detail':
        data = detailData;
        mode == 'detail' && (disabled = true);
        break;
    }

    const devBelongunit = _.map(toJS(data.dev_belongunit), item => {
      return {
        value: item.F_ID,
        name: item.F_Name,
      };
    });
    const devType = _.map(toJS(data.dev_type), item => {
      return {
        value: item.Id_Version,
        name: item.F_TypeName,
      };
    });
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备名称'}
          name={'F_DeviceName'}
          disabled={disabled}
          placeholder={'请输入设备名称'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormRadio
          {...fields}
          onChange={this.handleFormChange}
          disabled={mode === 'modify' ? true : disabled}
          label={'选择添加'}
          name={'F_IsConcentrator'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[{value: 1, name: '集中器'}, {value: 0, name: '普通设备'}]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'站点选择'}
          placeholder={'请选择站点'}
          name={'F_BelongUnitID'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={devBelongunit}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'设备类型'}
          disabled={fields.F_IsConcentrator.value === 1 ? true : disabled}
          placeholder={'请选择设备类型'}
          name={'Id_Version'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={devType}
        />
        <FormRadio
          {...fields}
          onChange={this.handleFormChange}
          label={'数据上报'}
          disabled={disabled}
          name={'F_ReportType'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[{value: 0, name: '被动'}, {value: 1, name: '主动'}]}
        />
        <FormRadio
          {...fields}
          onChange={this.handleFormChange}
          label={'链接方式'}
          disabled={fields.F_IsConcentrator.value === 1 ? true : disabled}
          name={'F_ConnectType'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[{value: 0, name: '被动'}, {value: 1, name: '主动'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备IP'}
          disabled={fields.F_ConnectType.value === 1 ? true : disabled}
          name={'F_IP'}
          placeholder={'请输入设备IP'}
          rules={[
            {
              required: true,
              message: '请必须填写!',
            },
            {
              pattern: /^((1\d\d|2[0-4]\d|25[0-5]|\d{1,2})\.){3}(1\d\d|2[0-4]\d|25[0-5]|\d{1,2})$/,
              message: '请填写正确的IP!',
            },
          ]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备端口'}
          disabled={
            fields.F_ConnectType.value === 1 ||
            fields.F_IsConcentrator.value === 1
              ? true
              : disabled
          }
          name={'F_Port'}
          placeholder={'请输入设备端口'}
          rules={[
            {required: true, message: '请必须填写!'},

            {
              pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
              message: '请填写正确的端口!',
            },
          ]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'地址'}
          disabled={
            fields.F_ConnectType.value === 1 ||
            fields.F_IsConcentrator.value === 1
              ? true
              : disabled
          }
          name={'adr'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'外部编号'}
          disabled={disabled}
          name={'F_OutDevID'}
          placeholder={'请输入外部编号'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备别名'}
          disabled={disabled}
          name={'rec'}
          placeholder={'请输入设备别名'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'纬度数值'}
          disabled={disabled}
          name={'F_Latitude'}
          placeholder={'请输入维度数值'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'经度数值'}
          name={'F_Longitude'}
          disabled={disabled}
          placeholder={'请输入经度数值'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'采集间隔'}
          name={'F_CollectSpan'}
          placeholder={'请输入采集间隔'}
          disabled={disabled}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'心跳间隔'}
          name={'F_HeartSpan'}
          disabled={disabled}
          placeholder={'请输入心跳间隔'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'卡片数值'}
          disabled={disabled}
          name={'F_SimCardNO'}
          placeholder={'请输入卡片数值'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'入网时间'}
          name={'F_NetInTime'}
          disabled={true}
          placeholder={'请输入入网时间'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
      </Form>
    );
  }
}

export default Edit;
