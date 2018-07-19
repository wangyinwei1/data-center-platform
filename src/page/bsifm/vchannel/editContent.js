import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {FormInput, FormSelect} from '../../../components/FormItem';
import {toJS} from 'mobx';
//实例
@inject('vchannelStore')
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
    const {
      vchannelStore: {editData, channelList, addData},
      fields,
      mode,
    } = this.props;

    let data = {};
    let disabled = false,
      currentClass = 'cl_select_label_90';
    switch (mode) {
      case 'new':
        data = addData;

        break;
      case 'modify':
        data = editData;

        break;
      case 'detail':
        data = editData;
        disabled = true;
        break;
    }

    const devType = _.map(toJS(data.dev_type), item => {
      return {
        value: item.Id_Version,
        name: item.F_TypeName,
      };
    });
    const channelNameList = _.map(toJS(channelList.varList), item => {
      return {
        value: item.F_ChannelID,
        name: item.F_ChannelName,
      };
    });
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'虚拟通道号'}
          disabled={mode === 'new' ? false : true}
          name={'F_ChannelID'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'计算类型'}
          disabled={disabled}
          className={currentClass}
          name={'F_CalculateType'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[
            {name: '多通道拼接', value: '1'},
            {name: '多通道匹配', value: '2'},
            {name: '多通道计算', value: '3'},
            {name: '逻辑运算', value: '4'},
            {name: '单通道累计时长', value: '5'},
            {name: '单通道累计次数', value: '6'},
          ]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'关联通道号'}
          name={'F_RelateChannelName'}
          disabled={disabled}
          mode="multiple"
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={channelNameList}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'表达式'}
          disabled={disabled}
          className={currentClass}
          name={'F_Expression'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'设备类型'}
          disabled={mode === 'new' ? false : true}
          name={'Id_Version'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={devType}
        />
      </Form>
    );
  }
}

export default Regional;
