import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Inspection from '../inspection/inspection.js';
import moment from 'moment';
import EditModal from '../inspection/edit.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('workordersStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.approvalClick = this.approvalClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.confirmClick = this.confirmClick.bind(this);
    this.state = {
      inspectionData: {},
      show: false,
    };
  }
  approvalClick(data) {
    const {workordersStore} = this.props;
    workordersStore.confimWorkOrder({id: data.id}).then(data => {
      this.setState({
        show: false,
      });
      const params = {
        page: 1,
        keywords: '',
        number: 10,
        userID: localStorage.getItem('AppID'),
      };
      workordersStore.getTable(params);
    });
  }
  componentDidMount() {
    const {workordersStore: {getTable}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      number: 10,
      userID: localStorage.getItem('AppID'),
    };
    getTable(params);
  }
  confirmClick(item) {
    this.setState({
      show: true,
      inspectionData: item,
    });
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {workordersStore} = this.props;

    const params = {
      ...workordersStore.tableParmas,
      page: current,
      number: pageSize,
    };
    workordersStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {workordersStore} = this.props;
    const params = {
      ...workordersStore.tableParmas,
      page: pageNumber,
    };
    workordersStore.getTable(params);
  }
  onSearch(value) {
    const {workordersStore} = this.props;
    const params = {
      ...workordersStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    workordersStore.search(params);
  }
  onEditOk() {}
  onEditCancel() {
    this.setState({
      show: false,
    });
  }
  render() {
    const {workordersStore} = this.props;
    const tableData =
      (toJS(workordersStore.tableData) &&
        toJS(workordersStore.tableData).Data) ||
      [];
    const pagination = workordersStore.tableData || {};
    const columns = columnData({
      _this: this,
      confirmClick: this.confirmClick,
    });
    return (
      <div className={styles['controlrecord_wrap']}>
        <div className={styles['controlrecord_ct']}>
          <div className={styles['min_width']}>
            <Table
              pageIndex={pagination.page}
              pageSize={pagination.number}
              total={pagination.count}
              loading={workordersStore.loading}
              columns={columns}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              data={tableData}
              useDefaultRowKey={true}
            />
          </div>
        </div>
        <EditModal
          isShow={this.state.show}
          onOk={this.onEditOk}
          width={816}
          outTitle={this.state.inspectionData.name}
          onCancel={this.onEditCancel}>
          <Inspection
            inspectionData={this.state.inspectionData}
            approvalClick={this.approvalClick}
          />
        </EditModal>
      </div>
    );
  }
}

export default Regional;
