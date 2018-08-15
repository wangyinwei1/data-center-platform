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
@inject('alarminformationStore')
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
    this.handleFormChange = this.handleFormChange.bind(this);
    this.state = {
      singleLineData: {},
      deleteShow: false,
      editShow: false,
      editParams: {},
      areaName: '',
      type: 'new',
      ...formParams,
    };
  }
  //以下级联方法
  componentDidMount() {
    const {alarminformationStore: {getTable}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      showCount: 10,
    };
    getTable(params);
  }
  //添加功能
  add() {
    const {alarminformationStore} = this.props;
    alarminformationStore.getGoAdd();
    this.setState({
      editShow: true,
    });
  }
  initFromValue(data, mode, item) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.alarmMsg.value = data.pd.alarmMsg || '';
      formValue.alarmType.value = data.pd.alarmType || 0;
      formValue.gradeID.value = data.pd.gradeID || undefined;
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
  //点击编辑
  editClick(item) {
    const {alarminformationStore} = this.props;
    alarminformationStore.getEidtData({msgID: item.msgID}).then(data => {
      this.initFromValue(data, 'modify', item);
    });
  }
  //删除回调
  onDeleteOk() {
    const {alarminformationStore} = this.props;
    const item = this.state.singleLineData;
    const params = {
      msgID: item.msgID,
    };
    this.c_onDeleteOk(alarminformationStore, params);
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
      const {alarminformationStore: {save, editSave}} = this.props;
      const params = {};
      this.state.type === 'modify' &&
        (params.msgID = this.state.singleLineData.msgID);
      _.forIn(fields, (value, key) => {
        if (key === 'DevTypes') {
          params[key] = value.value.join(',');
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
      ...formParams,
      editShow: false,
    });
  }
  //搜索
  onSearch(value) {
    const {alarminformationStore} = this.props;
    const params = {
      ...alarminformationStore.tableParmas,
      keywords: encodeURIComponent(value),
    };
    alarminformationStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {alarminformationStore} = this.props;
    this.c_onShowSizeChange({current, pageSize}, alarminformationStore);
  }
  onPageChange(pageNumber) {
    const {alarminformationStore} = this.props;
    this.c_onPageChange({pageNumber}, alarminformationStore);
  }
  handleFormChange(changedFields) {
    const key = _.keys(changedFields);
    //showError让自己校验字段
    const obj = {};
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({fields}) => {
      return {
        fields: {...fields, ...obj},
      };
    });
  }

  render() {
    const {alarminformationStore} = this.props;
    const tableData = toJS(alarminformationStore.tableData.varList) || [];
    const pagination = toJS(alarminformationStore.tableData.pd) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      _this: this,
    });
    return (
      <div className={styles['applicationuser_wrap']}>
        <div className={styles['applicationuser_ct']}>
          <div className={styles['min_width']}>
            <Toolbar onClick={this.add} onSearch={this.onSearch} />
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.showCount}
                total={pagination.allCount}
                columns={columns}
                loading={alarminformationStore.loading}
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
          width={816}
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
