import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../common';
import Toolbar from '../../../components/Toolbar';
import Table from '../../../components/Table';
import columnData from './columns.js';
import DeleteModal from '../regional/delete.js';
import EditContent from './editContent.js';
import EditModal from './edit.js';
import {formParams} from './tplJson.js';
//实例
@inject('vchannelStore')
@observer
@mixin(cascader)
class Site extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.state = {
      modalTitle: '',
      singleLineData: {},
      deleteShow: false,
      editShow: false,
      editParams: {},
      isModify: false,
      areaName: '',
      cascaderText: '',
      cascaderValue: [],
      cascaderLoading: false,
      ...formParams,
      type: 'new',
    };
  }
  //以下级联方法
  componentDidMount() {
    const {vchannelStore: {getTable, getZone, getAsynArea}} = this.props;
    getAsynArea().then(data => {
      const cascaderValue = [data[0].F_TypeName];
      this.setState({
        cascaderText: cascaderValue.join('/'),
        cascaderValue,
      });
      const params = {
        page: 1,
        keywords: '',
        number: 10,
        F_TypeID: data[0].F_TypeID,
        F_Version: '',
      };
      data[0] && getTable(params);
    });
  }
  //添加功能
  add() {
    const {vchannelStore} = this.props;
    vchannelStore.getGoAdd({Area_ID: 0}).then(() => {
      this.setState({
        editShow: true,
        type: 'new',
      });
    });
  }
  //点击编辑
  editClick(item) {
    const {vchannelStore} = this.props;
    vchannelStore.getEidtData({Area_ID: 0}).then(data => {
      this.initFromValue(data, 'modify', item);
    });
  }
  initFromValue(data, mode, item) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.F_ChannelID.value = item.channelID || '';
      formValue.F_CalculateType.value = item.calculateType || undefined;
      formValue.Id_Version.value =
        `${item.deviceType}_${item.version}` || undefined;
      formValue.F_Expression.value = item.expression || '';
      formValue.F_RelateChannelName.value =
        item.relateChannelID.split(',').filter(item => {
          return item !== '';
        }) || [];
      return {
        fields: {
          ...fields,
          ...formValue,
        },
        singleLineData: item,
        editShow: true,
        type: mode,
      };
    });
  }
  //删除回调
  onDeleteOk() {
    const {vchannelStore} = this.props;
    const item = this.state.singleLineData;
    const params = {
      fid: item.fid,
    };
    this.c_onDeleteOk(vchannelStore, params);
  }
  onDeleteCancel() {
    this.c_onDeleteCancel();
  }
  deleteClick(item, e) {
    this.setState({
      deleteShow: true,
      singleLineData: item,
    });
  }
  //点击编辑
  detailClick(item) {
    const {vchannelStore} = this.props;
    vchannelStore.getEidtData({Area_ID: 0}).then(data => {
      this.initFromValue(data, 'detail', item);
    });
  }
  //编辑确定
  onEditOk() {
    const fields = this.state.fields;
    const showError = this.test(fields);
    const hasError = _.keys(showError);

    if (hasError[0]) {
      this.setState(({fields}) => {
        return {
          fields: {
            ...fields,
            ...showError,
          },
        };
      });
    } else {
      const {vchannelStore: {save, editSave, channelList}} = this.props;
      const params = {};
      this.state.type === 'modify' &&
        (params.F_Fid = this.state.singleLineData.fid);
      _.forIn(fields, (value, key) => {
        if (key === 'F_RelateChannelName') {
          params['F_RelateChannelID'] = value.value.join(',');
          const selectChannel = _.filter(channelList.varList, item => {
            return value.value.indexOf(item.F_ChannelID) != -1;
          });
          params[key] = _.map(selectChannel, item => {
            return item.F_ChannelName;
          }).join(',');
        } else {
          params[key] = value.value;
        }
      });
      this.state.type === 'new'
        ? save(params).then(data => {
            this.clearState(data);
          })
        : editSave(params).then(data => {
            this.clearState(data);
          });
    }
  }
  clearState(data) {
    data &&
      this.setState({
        ...formParams,
        editShow: false,
      });
  }

  //校验循环
  test(fields) {
    let showError = {};
    //循环找到必填字段是否是空并作出警告
    _.forIn(fields, (v, k) => {
      if (!v.value && v.value !== 0 && v.require) {
        showError[k] = {showError: true, ...v};
      }
    });
    return showError;
  }
  //取消
  onEditCancel() {
    this.setState({
      editShow: false,
    });
  }
  //搜索
  onSearch(value) {
    const {vchannelStore} = this.props;
    const params = {
      ...vchannelStore.tableParmas,
      keywords: encodeURIComponent(value),
    };
    vchannelStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {vchannelStore} = this.props;
    this.c_onShowSizeChange({current, pageSize}, vchannelStore);
  }
  onPageChange(pageNumber) {
    const {vchannelStore} = this.props;
    this.c_onPageChange({pageNumber}, vchannelStore);
  }
  //以下级联方法
  onKeyPress(e) {
    const {siteStore} = this.props;
    this.c_onKeyPress(siteStore);
  }
  loadData(selectedOptions, index, callback) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const {vchannelStore} = this.props;
    const params = {
      F_TypeID: selectedOptions[0].F_TypeID,
    };
    //调用基站
    targetOption.isParent &&
      vchannelStore.getZone(params, index).then(data => {
        //取消加载状态
        callback();
      });
  }
  onTextChange(value) {
    this.c_onTextChange(value);
  }
  onCascaderChange(value, selectedOptions) {
    this.c_onCascaderChang(value, selectedOptions);

    const params = {
      page: 1,
      F_Version: selectedOptions[0].F_Version,
      keywords: '',
      number: 10,
      F_TypeID: selectedOptions[0].F_TypeID,
    };
    const {vchannelStore} = this.props;
    vchannelStore.getTable(params);
  }
  handleFormChange(changedFields) {
    const obj = {};
    const key = _.keys(changedFields);
    if (key[0] === 'F_RelateChannelName') {
      const expression = {
        value: _.map(changedFields[key].value, (item, i) => {
          return `{${i}}`;
        }).join(','),
        name: 'F_Expression',
      };
      // const {vchannelStore: {channelList}} = this.props;
      // const selectedChannel = _.filter(channelList, item => {
      //   return changedFields[key].value.indexOf(item.F_ChannelID) != -1;
      // });

      obj['F_Expression'] = expression;
    }

    //showError让自己校验字段
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({fields}) => {
      return {
        fields: {...fields, ...obj},
      };
    });
  }

  render() {
    const {zTreeLevel, vchannelStore} = this.props;
    const tableData = toJS(vchannelStore.tableData.varList) || [];
    const pagination = toJS(vchannelStore.tableData.pd) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      detailClick: this.detailClick,
      _this: this,
    });
    return (
      <div className={styles['vchannel_wrap']}>
        <Cascader
          loading={this.state.cascaderLoading}
          options={toJS(vchannelStore.areaTree)}
          onKeyPress={this.onKeyPress}
          loadData={this.loadData}
          onTextChange={this.onTextChange}
          cascaderValue={this.state.cascaderValue}
          cascaderText={this.state.cascaderText}
          onChange={this.onCascaderChange}
        />
        <div className={styles['vchannel_ct']}>
          <div className={styles['min_width']}>
            <Toolbar onClick={this.add} onSearch={this.onSearch} />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.showCount}
                total={pagination.allCount}
                loading={vchannelStore.loading}
                columns={columns}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                data={tableData}
              />
            </div>
          </div>
        </div>
        <DeleteModal
          isShow={this.state.deleteShow}
          onOk={this.onDeleteOk}
          onCancel={this.onDeleteCancel}
        />
        <EditModal
          isShow={this.state.editShow}
          onOk={this.onEditOk}
          width={842}
          onCancel={this.onEditCancel}
          mode={this.state.type}>
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            mode={this.state.type}
          />
        </EditModal>
      </div>
    );
  }
}

export default Site;
