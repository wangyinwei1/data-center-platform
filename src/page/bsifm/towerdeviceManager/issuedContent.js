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
          label={'指令数据'}
          disabled={disabled}
          className={currentClass}
          name={'serverdata'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'时间间隔'}
          disabled={disabled}
          className={currentClass}
          name={'servercommand'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
      </Form>
    );
  }
}

export default Regional;
