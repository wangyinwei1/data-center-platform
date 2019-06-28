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
@inject('fsu_alarminformationStore')
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
      fsu_alarminformationStore: {editData, addData},
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
    const gradeList = _.map(toJS(data.gradeList), item => {
      return {
        value: item.F_GradeID,
        name: item.F_GradeName,
      };
    });
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'告警内容'}
          disabled={disabled}
          name={'alarmMsg'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'告警等级'}
          disabled={disabled}
          name={'levID'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[
            {name: 'CRITICAL', value: 1},
            {name: 'MAJOR', value: 2},
            {name: 'MINOR', value: 3},
            {name: 'HINT', value: 4},
          ]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'告警类型'}
          disabled={disabled}
          name={'alarmType'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[{name: '默认', value: 0}]}
        />
      </Form>
    );
  }
}

export default Regional;
