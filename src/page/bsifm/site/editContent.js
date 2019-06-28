import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomSelect,
} from '../../../components/FormItem';
import {toJS} from 'mobx';
//实例
@inject('siteStore')
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
      siteStore: {editData, addLists, belongRegion},
      regionMenu,
      cityMenu,
      getAreaSonList,
      countyMenu,
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

    let currentClass = 'cl_regional_select_157';

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
    const provinceList = _.map(toJS(data.provinceList), item => {
      return {
        value: item.F_AreaID,
        name: item.F_AreaName,
      };
    });
    let regionList = _.map(
      regionMenu[0] ? regionMenu : toJS(data.regionList),
      item => {
        if (
          mode === 'modify' &&
          parseInt(fields.region.value) === item.F_AreaID
        ) {
          fields.region.value = item.F_AreaName;
          fields.region.code = item.F_AreaID;
        }
        return {
          value: item.F_AreaID,
          name: item.F_AreaName,
        };
      },
    );

    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={'区域ID'}
          disabled={data.area.provinceCode ? true : false}
          getAreaSonList={getAreaSonList}
          name={'province'}
          rules={[{required: true, message: '请必须填写!'}]}
          className={currentClass}
          children={provinceList}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={''}
          disabled={data.area.cityCode ? true : cityList[0] ? false : true}
          getAreaSonList={getAreaSonList}
          name={'city'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={cityList}
        />
        <FormSelect
          {...fields}
          onChange={this.handleFormChange}
          label={''}
          disabled={data.area.countyCode ? true : countyList[0] ? false : true}
          getAreaSonList={getAreaSonList}
          name={'county'}
          className={currentClass}
          rules={[{required: true, message: '请必须填写!'}]}
          children={countyList}
        />
        <CustomSelect
          fields={fields}
          onChange={this.handleFormChange}
          label={''}
          disabled={
            data.area.regionCode ? true : fields['county'].value ? false : true
          }
          className={currentClass}
          name={'region'}
          rules={[{required: true, message: '请必须填写!'}]}
          children={regionList}
        />
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'站点名称'}
          disabled={disabled}
          name={'F_Name'}
          rules={[{required: true, message: '请必须填写!'}]}
        />
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   label={'负责人员'} */}
        {/*   disabled={disabled} */}
        {/*   name={'F_Leader'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        {/* <FormInput */}
        {/*   {...fields} */}
        {/*   onChange={this.handleFormChange} */}
        {/*   label={'联系方式'} */}
        {/*   disabled={disabled} */}
        {/*   name={'F_Tel'} */}
        {/*   rules={[{required: false}]} */}
        {/* /> */}
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={'站点地址'}
          disabled={disabled}
          name={'F_Address'}
          rules={[{required: false}]}
        />
      </Form>
    );
  }
}

export default Regional;
