import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import EditModal from '../../../components/EditModal';
import {cascader} from '../../bsifm/common';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './historyColumns.js';
import Toolbar from '../../../components/Toolbar';
import Detail from './detail.js';
import moment from 'moment';
//实例
@inject('towerStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.state = {
      show: false,
      record: {},
      startTime: moment().startOf('day'),
      endTime: moment().endOf('day'),
    };
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {towerStore, currentTyp} = this.props;

    const params = {
      page: 1,
      number: 10,
      ...towerStore.e_tableParmas,
      page: current,
      number: pageSize,
    };
    this.getData(params);
  }
  onPageChange(pageNumber) {
    const {towerStore, currentType} = this.props;
    const params = {
      page: 1,
      number: 10,
      ...towerStore.e_tableParmas,
      page: pageNumber,
    };
    this.getData(params);
  }
  onSearch(value) {
    const {towerStore, currentType} = this.props;
    const params = {
      ...towerStore.e_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    this.getData(params);
  }
  timeChange(dates, dateStrings) {
    const {towerStore, currentType} = this.props;
    const params = {
      ...towerStore.e_tableParmas,
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    };
    this.setState({
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    });
    this.getData(params);
  }
  getData = params => {
    const {towerStore, currentType} = this.props;
    if (currentType === 'electricQuantity') {
      towerStore.getElectricQuantity(params);
    } else if (currentType === 'alarmInfo') {
      towerStore.getAlarmInfo(params);
    } else {
      towerStore.getElectricEnergy(params);
    }
  };
  detailClick = record => {
    this.setState({show: true, record});
  };
  cancle = () => {
    this.setState({show: false});
  };
  onOk = () => {
    this.setState({show: false});
  };
  onExportClick = () => {
    const {currentData} = this.props;
    location.href =
      '/tower/device/electricEnergyToExcel?id=' +
      currentData.id +
      '&startTime=' +
      this.state.startTime +
      '&endTime=' +
      this.state.endTime;
  };
  render() {
    const {towerStore, currentType, currentData} = this.props;
    const e_tableData = toJS(towerStore.e_tableData);
    const tableData = (e_tableData && e_tableData.list) || [];
    const pagination = e_tableData || {};
    const columns = columnData(currentType, this.detailClick, currentData);
    return (
      <div>
        <Toolbar
          showValue={['time', currentType === 'electricEnergy' && 'export']}
          timeChange={this.timeChange}
          onExportClick={this.onExportClick}
          closeAdd={true}
        />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          loading={towerStore.e_loading}
          total={pagination.allCount}
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
        />
        <EditModal
          isShow={this.state.show}
          onOk={this.onOk}
          title={'电能历史详情'}
          width={880}
          buttons={false}
          onCancel={this.cancle}>
          <Detail record={this.state.record} />
        </EditModal>
      </div>
    );
  }
}

export default Regional;
