import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {FormInput, FormRadio, FormSelect} from '../../../components/FormItem';
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
          label={'设备名称'}
          disabled={disabled}
          className={currentClass}
          name={'deviceName'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'IMEI号'}
          disabled={disabled}
          visiable={type === 'new' ? true : false}
          placeholder={'请根据产品Endpoint格式输入IMEI号'}
          className={currentClass}
          name={'imei'}
          rules={[
            {required: true, message: '请必须填写!'},
            {
              pattern: /^[0-9]{15}$/,
              message: '设备IMEI号必须是 15 位数字!',
            },
          ]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'IMSI号'}
          disabled={disabled}
          placeholder={'请根据产品Endpoint格式输入IMSI号'}
          className={currentClass}
          name={'imsi'}
          rules={[
            {required: false, message: '请必须填写!'},
            {
              pattern: /^[0-9]{0,15}$/,
              message: '总长度不超过15位，使用0~9的数字!',
            },
          ]}
        />
        <FormRadio
          fields={fields}
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'是否开启自动订阅'}
          name={'autoObserver'}
          className={currentClass}
          rules={[{required: false, message: '请必须填写!'}]}
          children={[{name: '是', value: 1}, {name: '否', value: 0}]}
        />
      </Form>
    );
  }
}

export default Regional;
