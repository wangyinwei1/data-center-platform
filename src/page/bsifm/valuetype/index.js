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
import EditModal from '../regional/edit.js';
//实例
@inject('regionalStore', 'siteStore', 'applicationuserStore')
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
    this.state = {
      modalTitle: '',
      singleLineData: {},
      deleteShow: false,
      editShow: false,
      editParams: {},
      isModify: false,
      areaName: '',
    };
  }
  //以下级联方法
  componentDidMount() {
    const {applicationuserStore: {getTable}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      number: 10,
    };
    getTable(params);
  }
  //添加功能
  add() {
    this.setState({
      editShow: true,
      areaName: '',
      modalTitle: {
        zh: true ? '新增区域' : '新增片区',
        en: 'New area',
      },
      isModify: false,
    });
  }
  //点击编辑
  editClick(item) {
    // const {regionalStore} = this.props;
    // regionalStore.getEidtData({F_AreaID: item.code});
    this.setState({
      editShow: true,
      modalTitle: {
        zh: '修改名称',
        en: 'Modifyuname',
      },
      areaName: item.areaName,
      isModify: true,
    });
  }
  //删除回调
  onDeleteOk() {
    const {applicationuserStore} = this.props;
    const item = this.state.singleLineData;
    const params = {
      USER_ID: item.F_UserID,
    };
    this.c_onDeleteOk(applicationuserStore, params);
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
  //编辑回调
  onEditOk() {
    const params = this.state.editParams;
    // const {regionalStore: {save}} = this.props;
    // save({
    //   F_AreaName: this.state.areaName,
    //   F_ParentAreaID: this.state.editParams.provinceList,
    //   F_AreaID: '',
    // });
    this.setState({
      editShow: false,
    });
  }
  //取消
  onEditCancel() {
    this.setState({
      editShow: false,
    });
  }
  //搜索
  onSearch(value) {
    const {applicationuserStore} = this.props;
    const params = {
      ...applicationuserStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    applicationuserStore.search(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {applicationuserStore} = this.props;
    this.c_onShowSizeChange({current, pageSize}, applicationuserStore);
  }
  onPageChange(pageNumber) {
    const {applicationuserStore} = this.props;
    this.c_onPageChange({pageNumber}, applicationuserStore);
  }

  render() {
    const {siteStore, zTreeLevel, applicationuserStore} = this.props;
    const tableDada = toJS(applicationuserStore.tableData.userList) || [];
    const pagination = toJS(applicationuserStore.tableData.pd) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      _this: this,
    });
    const data = _.map(tableDada, (item, index) => {
      return {...item, num: index + 1};
    });
    return (
      <div className={styles['applicationuser_wrap']}>
        <div className={styles['applicationuser_ct']}>
          <Toolbar onClick={this.add} onSearch={this.onSearch} />
          <div className={styles['table_wrap']}>
            <Table
              pageIndex={pagination.page}
              pageSize={pagination.number}
              total={pagination.allCount}
              columns={columns}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              data={data}
              key={''}
            />
          </div>
        </div>
        <DeleteModal
          isShow={this.state.deleteShow}
          onOk={this.onDeleteOk}
          onCancel={this.onDeleteCancel}
        />
        <EditModal
          isShow={this.state.editShow}
          title={this.state.modalTitle}
          onOk={this.onEditOk}
          onCancel={this.onEditCancel}
        />
      </div>
    );
  }
}

export default Site;
