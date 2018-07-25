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
@inject('applicationuserStore')
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
      applicationuserStore: {editData, addData},
      fields,
      cityMenu,
      countyMenu,
      mode,
    } = this.props;

    let data = {};
    let disabled = false,
      currentClass = 'cl_regional_select_215',
      provinceDisable = false,
      cityDisable = false,
      areaDisable = false,
      zoneDisable = false;
    switch (mode) {
      case 'new':
        data = addData;

        break;
      case 'modify':
      case 'detail':
        data = editData;
        break;
    }

    const cityList = _.map(
      cityMenu[0] ? cityMenu : toJS(data.cityList),
      item => {
        return {
          value: item.F_AreaID,
          name: item.F_AreaName,
        };
      },
    );
    const countyList = _.map(
      countyMenu[0] ? countyMenu : toJS(data.countyList),
      item => {
        return {
          value: item.F_AreaID,
          name: item.F_AreaName,
        };
      },
    );
    const provinceList = _.map(toJS(data.proList), item => {
      return {
        value: item.F_AreaID,
        name: item.F_AreaName,
      };
    });
    const typeList = _.map(toJS(data.typeList), item => {
      return {
        value: item.F_TypeID,
        name: item.F_TypeName,
      };
    });
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <Row>
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'用户名'}
            disabled={disabled}
            name={'USERNAME'}
            rules={[{required: true, message: '请必须填写!'}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'姓名'}
            disabled={disabled}
            name={'NAME'}
            rules={[{required: true, message: '请必须填写!'}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'手机号'}
            disabled={disabled}
            name={'PHONE'}
            rules={[
              {required: true, message: '请必须填写!'},
              {
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                message: '请输入正确的手机号码!',
              },
            ]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'邮箱'}
            disabled={disabled}
            name={'EMAIL'}
            rules={[
              {required: false},
              {
                pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                message: '请输入正确的邮箱!',
              },
            ]}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'状态'}
            disabled={disabled}
            name={'STATUS'}
            rules={[{required: false}]}
            children={[{value: 1, name: '正常'}, {value: 0, name: '冻结'}]}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'用户类型'}
            disabled={disabled}
            name={'userType'}
            rules={[{required: false}]}
            children={[{value: 0, name: 'WEB'}, {value: 1, name: 'App'}]}
          />
          {fields.userType.value === 1 && (
            <FormInput
              {...fields}
              onChange={this.handleFormChange}
              label={'APP用户ID'}
              disabled={disabled}
              className={'cl_select_373'}
              name={'AppID'}
              rules={[{required: false}]}
            />
          )}
        </Row>
        <Row className={styles['sub_title']}>用户权限&nbsp;:</Row>
        <Row>
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'区域ID'}
            disabled={provinceDisable}
            name={'proCode'}
            rules={[{required: true, message: '请必须填写!'}]}
            className={currentClass}
            children={provinceList}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={''}
            disabled={cityList[0] ? false : true}
            name={'cityCode'}
            className={currentClass}
            rules={[{required: false}]}
            children={cityList}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={''}
            disabled={countyList[0] ? false : true}
            name={'countyCode'}
            className={currentClass}
            rules={[{required: false}]}
            children={countyList}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'设备类型'}
            name={'DevTypes'}
            mode="multiple"
            optionFilterProp="children"
            rules={[{required: false}]}
            children={typeList}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'设备'}
            disabled={disabled}
            name={'Devices'}
            rules={[{required: false}]}
          />
        </Row>
      </Form>
    );
  }
}

export default Regional;
