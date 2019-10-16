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
    const {fields, type, record, commandList} = this.props;

    let data = record;
    let disabled = false;

    let currentClass = 'cl_regional_select_157';

    const command = _.map(toJS(commandList), item => {
      return {
        value: item.serviceFlag,
        name: item.serviceFlag,
      };
    });
    let paramsItem =
      fields['serviceFlag'].value &&
      toJS(commandList).filter(item => {
        return item.serviceFlag === fields['serviceFlag'].value;
      });
    paramsItem &&
      paramsItem[0] &&
      (fields.serviceName.value = paramsItem[0].serviceName);
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormSelect
          fields={fields}
          onChange={this.handleFormChange}
          label={'服务标识'}
          disabled={disabled}
          className={currentClass}
          name={'serviceFlag'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={command}
        />
        <FormInput
          fields={fields}
          onChange={this.handleFormChange}
          label={'服务名称'}
          disabled={true}
          placeholder={'请选择服务名称'}
          className={currentClass}
          name={'serviceName'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        {paramsItem && paramsItem[0] && (
          <Row>
            <Row>参数</Row>
            <FormInput
              fields={fields}
              onChange={this.handleFormChange}
              label={`${paramsItem[0].properties[0].propertyFlag}
                (${paramsItem[0].properties[0].propertyName})`}
              disabled={disabled}
              placeholder={`请输入${paramsItem[0].properties[0].propertyFlag}的值`}
              className={currentClass}
              name={'propertyValue'}
              rules={[
                {required: true, message: '请必须填写!'},
                {
                  min: paramsItem[0].properties[0].min,
                  message: `最小值为${paramsItem[0].properties[0].min}`,
                },
                {
                  max: paramsItem[0].properties[0].max,
                  message: `最大值为${paramsItem[0].properties[0].max}`,
                },
                {
                  len: paramsItem[0].properties[0].len,
                  message: `长度为${paramsItem[0].properties[0].len}`,
                },
              ]}
            />
          </Row>
        )}
      </Form>
    );
  }
}

export default Regional;
