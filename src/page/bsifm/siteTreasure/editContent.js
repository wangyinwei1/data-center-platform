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
          label={'网关ID'}
          disabled={type === 'modify' ? true : disabled}
          className={currentClass}
          name={'gdbId'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'网关名称'}
          disabled={disabled}
          className={currentClass}
          name={'name'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormSelect
          fields={fields}
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'站点选择'}
          placeholder={'请选择站点'}
          name={'stationId'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={station}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'采集间隔(s)'}
          disabled={disabled}
          className={currentClass}
          name={'dataFilterTime'}
          rules={[
            {required: true, message: '请必须填写!'},
            {
              pattern: /^30|[3-5][0-9]|60$/,
              message: '请输入>=30且<=60的数字',
            },
          ]}
        />
      </Form>
    );
  }
}

export default Regional;
