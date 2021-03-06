import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
import GrandsonTable from './grandsonTable.js';
//实例
@inject('fsu_devicemanagementStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.state = {
      expandedRows: [],
    };
  }

  componentDidMount() {}
  //嵌套表格
  expandedRowRender(record, i) {
    const {
      fsu_devicemanagementStore,
      realtimeChange,
      historyChange,
      controlChange,
      rumorChange,
      sunEditChange,
      sunDeleteChange,
      sunDetailChange,
      sunDisableChange,
    } = this.props;

    return (
      <GrandsonTable
        historyChange={historyChange}
        controlChange={controlChange}
        realtimeChange={realtimeChange}
        rumorChange={rumorChange}
        sunEditChange={sunEditChange}
        sunDeleteChange={sunDeleteChange}
        sunDetailChange={sunDetailChange}
        expandedRows={this.state.expandedRows}
      />
    );
  }
  onExpand(expanded, record) {
    const {
      fsu_devicemanagementStore: {
        expandedRowsChange,
        getGrandsonTable,
        s_tableParmas,
      },
      currentPortChange,
    } = this.props;
    currentPortChange(record);
    getGrandsonTable({...s_tableParmas, F_DeviceID: record.deviceID});
    if (expanded) {
      expandedRowsChange([record.deviceID]);
    } else {
      expandedRowsChange([]);
    }
  }
  editClick(item) {
    const {childEditClick} = this.props;
    childEditClick(item);
  }
  deleteClick(item) {
    const {childDeleteChange} = this.props;
    childDeleteChange(item);
  }
  detailClick(item) {
    const {childDetailClick} = this.props;
    childDetailClick(item);
  }
  onRowDoubleClick(item) {
    const {childDetailClick} = this.props;
    childDetailClick(item);
  }
  addClick(item) {
    const {
      fsu_devicemanagementStore: {getGoAdd, ztreeChild, expandedRows},
      addChildShow,
    } = this.props;
    getGoAdd({Area_ID: ztreeChild}).then(() => {
      addChildShow(item, expandedRows);
    });
  }
  render() {
    const {fsu_devicemanagementStore} = this.props;
    const s_tableData = toJS(fsu_devicemanagementStore.s_tableData);
    const tableData = s_tableData || [];
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      detailClick: this.detailClick,
      addClick: this.addClick,
      _this: this,
    });
    const nesting = {
      expandedRowRender: this.expandedRowRender,
      onExpand: this.onExpand,
      expandedRowKeys: toJS(fsu_devicemanagementStore.expandedRows),
    };
    return (
      <div>
        <Table
          pagination={false}
          loading={fsu_devicemanagementStore.s_loading}
          nesting={nesting}
          onRowDoubleClick={this.onRowDoubleClick}
          columns={columns}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
