import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Cookies from 'js-cookie';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('passagewayStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.add = this.add.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.channelTypeChange = this.channelTypeChange.bind(this);
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {passagewayStore} = this.props;

    const params = {
      ...passagewayStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    passagewayStore.getChildTable(params);
  }
  onPageChange(pageNumber) {
    const {passagewayStore} = this.props;
    const params = {
      ...passagewayStore.c_tableParmas,
      page: pageNumber,
    };
    passagewayStore.getChildTable(params);
  }
  onSearch(value) {
    const {passagewayStore} = this.props;
    const params = {
      ...passagewayStore.c_tableParmas,
      keywords: value,
    };
    passagewayStore.childSearch(params);
  }
  add() {
    const {addClick} = this.props;
    addClick();
  }
  detailClick(item) {
    const {detailClick} = this.props;
    detailClick(item);
  }
  deleteClick(item) {
    const {deleteClick} = this.props;
    deleteClick(item);
  }
  editClick(item) {
    const {editClick} = this.props;
    editClick(item);
  }
  channelTypeChange(value) {
    const {channelTypeChange} = this.props;
    channelTypeChange(value);
  }

  onExportClick() {
    const {onExportClick} = this.props;
    onExportClick();
  }
  onRowDoubleClick(item) {
    const {detailClick} = this.props;
    detailClick(item);
  }
  render() {
    const {passagewayStore} = this.props;
    const c_tableData = toJS(passagewayStore.c_tableData);
    const tableData = (c_tableData && c_tableData.varList) || [];
    const pagination = c_tableData || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      detailClick: this.detailClick,
      editClick: this.editClick,
      _this: this,
    });
    const data = _.map(tableData, (item, index) => {
      return {...item, num: index + 1};
    });
    return (
      <div>
        <Toolbar
          onSearch={this.onSearch}
          channelTypeChange={this.channelTypeChange}
          channelType={true}
          showValue={['export', 'add']}
          onExportClick={this.onExportClick}
          onClick={this.add}
        />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          loading={passagewayStore.c_loading}
          total={pagination.count}
          columns={columns}
          onRowDoubleClick={this.onRowDoubleClick}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={data}
          useDefaultRowKey={true}
        />
      </div>
    );
  }
}

export default Regional;
