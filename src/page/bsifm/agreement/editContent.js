import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {FormInput, FormTextArea} from '../../../components/FormItem';
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
      mode,
    } = this.props;

    let disabled = false;
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'协议名称'}
          disabled={disabled}
          name={'F_Name'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <Row>
          <FormTextArea
            {...fields}
            onChange={this.handleFormChange}
            label={'协议内容'}
            disabled={disabled}
            name={'F_Name'}
            type={'textarea'}
            name={'F_Protocol'}
            className={'cl_select_678'}
            rules={[{required: true, message: '请必须填写!'}]}
          />
        </Row>
      </Form>
    );
  }
}

export default Regional;
