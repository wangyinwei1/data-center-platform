import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {FormInput} from '../../../components/FormItem';
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
    const {fields, type, record} = this.props;

    let data = record;
    let disabled = false;

    let currentClass = 'cl_regional_select_157';

    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'标签ID'}
          disabled={type === 'modify' ? true : disabled}
          className={currentClass}
          name={'chipId'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'标签名称'}
          disabled={disabled}
          className={currentClass}
          name={'chipName'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
      </Form>
    );
  }
}

export default Regional;
