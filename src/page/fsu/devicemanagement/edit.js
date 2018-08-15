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
    const {
      fsu_devicemanagementStore: {detailData, addData},
      fields,
      mode,
    } = this.props;

    let data = {};
    let disabled = false;
    switch (mode) {
      case 'new':
        data = addData;

        break;
      case 'modify':
      case 'detail':
        data = detailData;
        mode == 'detail' && (disabled = true);
        break;
    }
    console.log(data);

    console.log(toJS(data.dev_belongunit));
    const devBelongunit = _.map(toJS(data.dev_belongunit), item => {
      return {
        value: item.F_ID,
        name: item.F_Name,
      };
    });
    console.log(devBelongunit);
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备名称'}
          name={'F_Name'}
          disabled={disabled}
          placeholder={'请输入设备名称'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'设备ID'}
          name={'F_SuID'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'设备IP'}
          placeholder={'请选择站点'}
          name={'F_SuIP'}
          rules={[
            {required: true, message: '请必须填写!'},
            {
              pattern: /^((1\d\d|2[0-4]\d|25[0-5]|\d{1,2})\.){3}(1\d\d|2[0-4]\d|25[0-5]|\d{1,2})$/,
              message: '请填写正确的IP!',
            },
          ]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'端口'}
          disabled={disabled}
          placeholder={'请选择设备类型'}
          name={'F_SuPort'}
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
          label={'用户名'}
          disabled={disabled}
          name={'F_UserName'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'密码'}
          disabled={disabled}
          name={'F_Pwd'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'所属站点'}
          placeholder={'请选择站点'}
          name={'F_StationID'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={devBelongunit}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'厂家信息'}
          disabled={disabled}
          name={'F_SuVendor'}
          placeholder={'请输入设备端口'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'硬件版本'}
          disabled={disabled}
          name={'F_SuHardVer'}
          placeholder={'请输入设备端口'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'软件版本'}
          disabled={disabled}
          name={'F_SuSoftVer'}
          placeholder={'请输入外部编号'}
          rules={[{required: false}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'型号'}
          disabled={disabled}
          name={'F_SuModel'}
          placeholder={'请输入外部编号'}
          rules={[{required: false}]}
        />
      </Form>
    );
  }
}

export default Edit;
