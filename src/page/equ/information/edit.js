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
    this.F_ConnectType = null;
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  componentwillunmount() {
    // this.setState({
    //   ...params,
    // });
  }
  handleFormChange(changedFields) {
    const {
      informationStore: {detailData, addData},
      handleFormChange,
      mode,
    } = this.props;
    let F_ConnectType = null;
    if (changedFields.Id_Version) {
      let data;
      switch (mode) {
        case 'new':
          data = addData;

          break;
        case 'modify':
        case 'detail':
          data = detailData;
          break;
      }
      const devType = _.map(toJS(data.dev_type), item => {
        if (item.Id_Version === changedFields.Id_Version.value) {
          F_ConnectType = item.F_ConnectType;
        }
      });
    }
    handleFormChange(changedFields, F_ConnectType);
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
    let F_ConnectType = null;
    let Id_Version = fields.Id_Version.value;
    const devType = _.map(toJS(data.dev_type), item => {
      //设备类型里的被动
      if (Id_Version && item.Id_Version === Id_Version) {
        F_ConnectType = item.F_ConnectType;
      }
      return {
        value: item.Id_Version,
        name: item.F_TypeName,
        F_ConnectType: item.F_ConnectType,
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
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'站点选择'}
          placeholder={'请选择站点'}
          name={'F_StationID'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={devBelongunit}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'设备类型'}
          disabled={disabled}
          placeholder={'请选择设备类型'}
          name={'Id_Version'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={devType}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备IP'}
          disabled={F_ConnectType === 1 ? true : disabled}
          name={'F_IP'}
          placeholder={'请输入设备IP'}
          rules={[
            {
              required: fields.F_IP.require,
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
          disabled={F_ConnectType === 1 ? true : disabled}
          name={'F_Port'}
          placeholder={'请输入设备端口'}
          rules={[
            {required: fields.F_Port.require, message: '请必须填写!'},

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
          disabled={F_ConnectType === 1 ? true : disabled}
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
