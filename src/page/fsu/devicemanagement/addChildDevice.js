import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import AlarmContent from './alarmTable.js';
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomizedForm,
} from '../../../components/FormItem';
import {Form, Button, Input, Row, Col} from 'antd';
const FormItem = Form.Item;

//实例
@inject('informationStore')
@observer
class AddChild extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {fields, mode, informationStore: {addData}} = this.props;
    let disabled = false;
    mode == 'detail' && (disabled = true);
    const devType =
      mode == 'new'
        ? _.map(toJS(addData.dev_type), item => {
            return {
              value: item.Id_Version,
              name: item.F_TypeName,
            };
          })
        : [];
    let F_FsuTypeID = JSON.parse(localStorage.getItem('FsuTypeID'));
    let spType = fields.spType.value;
    let width = 390;
    let spType_5 = F_FsuTypeID === 2 && spType === 6; //遥调条件
    let spType_3_2 = F_FsuTypeID === 2 && (spType === 2 || spType === 4); //遥信遥测条件

    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'类型'}
          name={'spType'}
          placeholder={'请选择类型'}
          width={width}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[
            {name: '阈值', value: 7},
            {name: '遥信', value: 3},
            {name: '遥测', value: 1},
            {name: '遥控', value: 5},
            {name: '遥调', value: 6},
            {name: '遥信告警', value: 2},
            {name: '遥测告警', value: 4},
          ]}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'归属类型'}
          disabled={disabled}
          placeholder={'请选择类型'}
          width={width}
          name={'F_OptionID'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={[
            {name: '设备', value: 1},
            {name: '系统', value: 2},
            {name: '机房', value: 3},
            {name: '局站及网管', value: 4},
          ]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={mode === 'modify' ? true : disabled}
          label={'监控点ID'}
          name={'F_SpID'}
          width={width}
          placeholder={'请输入地址'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'监控点名称'}
          width={width}
          name={'spName'}
          placeholder={'请输入地址'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'阈值'}
          disabled={disabled}
          width={width}
          name={'threshold'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'监控点单位'}
          width={width}
          visiable={F_FsuTypeID !== 3}
          name={'spUnit'}
          placeholder={'请输入标识'}
          rules={[{required: false}]}
        />
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   disabled={disabled} */}
        {/*   label={'设置值'} */}
        {/*   width={width} */}
        {/*   visiable={spType_5} */}
        {/*   name={'sVal'} */}
        {/*   placeholder={'请输入标识'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   disabled={disabled} */}
        {/*   label={'过高值'} */}
        {/*   width={width} */}
        {/*   visiable={spType_5} */}
        {/*   name={'hLimit'} */}
        {/*   placeholder={'请输入标识'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   disabled={disabled} */}
        {/*   label={'超高值'} */}
        {/*   width={width} */}
        {/*   visiable={spType_5} */}
        {/*   name={'sHLimit'} */}
        {/*   placeholder={'请输入标识'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   disabled={disabled} */}
        {/*   label={'过低值'} */}
        {/*   width={width} */}
        {/*   visiable={spType_5} */}
        {/*   name={'lLimit'} */}
        {/*   placeholder={'请输入标识'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   disabled={disabled} */}
        {/*   label={'超低值'} */}
        {/*   width={width} */}
        {/*   visiable={spType_5} */}
        {/*   name={'sLLimit'} */}
        {/*   placeholder={'请输入标识'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   disabled={disabled} */}
        {/*   label={'时间间隔'} */}
        {/*   width={width} */}
        {/*   visiable={spType_5} */}
        {/*   name={'intervalTime'} */}
        {/*   placeholder={'请输入标识'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   disabled={disabled} */}
        {/*   label={'开始延迟时间'} */}
        {/*   width={width} */}
        {/*   visiable={spType_3_2} */}
        {/*   name={'bDelay'} */}
        {/*   placeholder={'请输入标识'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   disabled={disabled} */}
        {/*   label={'结束延迟时间'} */}
        {/*   width={width} */}
        {/*   visiable={spType_3_2} */}
        {/*   name={'eDelay'} */}
        {/*   placeholder={'请输入标识'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'告警等级'}
          visiable={F_FsuTypeID === 3}
          disabled={disabled}
          name={'alarmLevel'}
          width={width}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          width={width}
          visiable={F_FsuTypeID === 3}
          label={'绝对值'}
          disabled={disabled}
          name={'absoluteVal'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'相对值'}
          width={width}
          visiable={F_FsuTypeID === 3}
          disabled={disabled}
          name={'relativeVal'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'设备描述'}
          width={width}
          visiable={F_FsuTypeID === 3}
          disabled={disabled}
          name={'describe'}
          rules={[{required: false, message: '请必须填写!'}]}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          disabled={disabled}
          label={'监控点单位'}
          width={width}
          visiable={F_FsuTypeID === 3}
          name={'spUnit'}
          placeholder={'请输入标识'}
          rules={[{required: false}]}
        />

        {JSON.parse(localStorage.getItem('FsuTypeID')) === 2 && (
          <Row>
            <Row className={styles['line']}>
              {mode !== 'new' && (
                <Row className={styles['sub_title']}>
                  <span>告警条件:</span>
                </Row>
              )}
            </Row>

            <Row>{mode !== 'new' && <AlarmContent mode={mode} />}</Row>
          </Row>
        )}
      </Form>
    );
  }
}

export default AddChild;
