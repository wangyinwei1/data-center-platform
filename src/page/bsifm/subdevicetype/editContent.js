import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {
  FormInput,
  FormRadio,
  FormSelect,
  FormMultiSelect,
} from '../../../components/FormItem';
import {toJS} from 'mobx';
//实例
@inject('alarminformationStore')
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
      alarminformationStore: {editData, addData},
      fields,
      cityMenu,
      countyMenu,
      mode,
    } = this.props;

    let data = {};
    let disabled = false,
      currentClass = 'cl_regional_select_215';
    switch (mode) {
      case 'new':
        data = addData;

        break;
      case 'modify':
      case 'detail':
        data = editData;
        break;
    }
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'名称'}
          disabled={disabled}
          name={'deviceSubTypeName'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'备注'}
          disabled={disabled}
          name={'rec'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
      </Form>
    );
  }
}

export default Regional;
