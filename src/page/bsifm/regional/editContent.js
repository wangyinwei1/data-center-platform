import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {FormInput, FormRadio, FormSelect} from '../../../components/FormItem';
import {toJS} from 'mobx';
//实例
@inject('regionalStore')
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
      regionalStore: {editData, addLists, belongRegion},
      fields,
      mode,
    } = this.props;

    let data = {};
    let disabled = false;
    switch (mode) {
      case 'new':
        data = addLists;

        break;
      case 'modify':
      case 'detail':
        data = editData;
        break;
    }

    let showIndex = 2,
      currentClass = '';
    switch (belongRegion) {
      case 'city':
        showIndex = 2;
        currentClass = 'cl_regional_select_293';
        break;
      case 'area':
        showIndex = 3;
        currentClass = 'cl_regional_select_190';
        break;
      case 'zone':
        showIndex = 4;
        currentClass = 'cl_regional_select_138';
        break;
      case 'site':
        showIndex = 5;
        break;
    }
    const cityList = _.map(toJS(data.cityList), item => {
      return {
        value: item.F_AreaID,
        name: item.F_AreaName,
      };
    });
    const countyList = _.map(toJS(data.countyList), item => {
      return {
        value: item.F_AreaID,
        name: item.F_AreaName,
      };
    });
    const provinceList = _.map(toJS(data.provinceList), item => {
      return {
        value: item.F_AreaID,
        name: item.F_AreaName,
      };
    });
    const regionList = _.map(toJS(data.regionList), item => {
      return {
        value: item.F_AreaID,
        name: item.F_AreaName,
      };
    });

    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'区域ID'}
          disabled={true}
          name={'province'}
          rules={[{required: true, message: '请必须填写!'}]}
          className={currentClass}
          children={provinceList}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={''}
          disabled={true}
          name={'city'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={cityList}
        />
        {showIndex >= 3 && (
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={''}
            disabled={true}
            name={'county'}
            className={currentClass}
            rules={[{required: true, message: '请必须填写!'}]}
            children={countyList}
          />
        )}
        {showIndex >= 4 && (
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={''}
            disabled={true}
            name={'region'}
            className={currentClass}
            rules={[{required: true, message: '请必须填写!'}]}
            children={regionList}
          />
        )}
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'区域名称'}
          disabled={disabled}
          className={'cl_regional_input'}
          name={'F_AreaName'}
          rules={[{required: false}]}
        />
      </Form>
    );
  }
}

export default Regional;
