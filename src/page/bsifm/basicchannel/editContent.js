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
@inject('basicchannelStore')
@observer
class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {basicchannelStore: {addData, detailData}, fields, mode} = this.props;

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

    const channeltypeList = _.map(toJS(data.channeltypeList), item => {
      return {
        value: item.F_ID,
        name: item.F_TypeName,
      };
    });
    const typeList = _.map(toJS(data.typeList), item => {
      return {
        value: `${item.F_TypeID}_${item.F_Version}`,
        name: item.F_TypeName,
      };
    });
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <Row>
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'通道ID'}
            name={'F_ChannelID'}
            disabled={disabled}
            rules={[{required: true, message: '请必须填写!'}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'通道名称'}
            name={'F_ChannelName'}
            disabled={disabled}
            rules={[{required: true, message: '请必须填写!'}]}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            disabled={disabled}
            label={'值类型'}
            name={'F_ValueType'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={[
              {value: 1, name: '整型'},
              {value: 2, name: '浮点'},
              {value: 3, name: '文本'},
              {value: 4, name: '枚举'},
            ]}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            disabled={disabled}
            label={'设备类型'}
            name={'F_DeviceType'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={typeList}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'值倍率'}
            name={'F_Ratio'}
            disabled={disabled}
            rules={[{required: true, message: '请必须填写!'}]}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'通道类型'}
            disabled={disabled}
            name={'F_ChannelType'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={channeltypeList}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'保存周期'}
            name={'F_StorePeriod'}
            disabled={disabled}
            rules={[{required: true, message: '请必须填写!'}]}
          />
        </Row>
        <Row className={styles['sub_title']}>详细信息(选填):</Row>
        <Row>
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'保存模式'}
            name={'F_StoreMode'}
            disabled={disabled}
            rules={[{required: false}]}
            children={[
              {value: 0, name: '无条件保存'},
              {value: 1, name: '变动值'},
              {value: 2, name: '变动率'},
            ]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'阈值'}
            name={'F_Threshold'}
            disabled={disabled}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'显示样式'}
            name={'F_DisplayFormat'}
            disabled={disabled}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'单位'}
            name={'F_Unit'}
            disabled={disabled}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'告警延迟'}
            name={'F_AlarmVoiceDelay'}
            disabled={disabled}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'显示精度'}
            name={'F_ShowPrecision'}
            disabled={disabled}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'显示序号'}
            name={'F_ShowOrder'}
            disabled={disabled}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'关联通道'}
            name={'F_RelateChannelNO'}
            disabled={disabled}
            rules={[{required: false}]}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'通道状态'}
            name={'F_Status'}
            disabled={disabled}
            rules={[{required: false}]}
            children={[{name: '显示', value: 0}, {name: '不显示', value: 1}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'通道描述'}
            name={'F_ValueDescription'}
            disabled={disabled}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'解析序号'}
            name={'F_AnalyOrder'}
            disabled={disabled}
            rules={[{required: false}]}
          />
        </Row>
      </Form>
    );
  }
}

export default Edit;
