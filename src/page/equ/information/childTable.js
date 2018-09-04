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
@inject('informationStore')
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
      informationStore,
      realtimeChange,
      historyChange,
      controlChange,
      rumorChange,
      sunEditChange,
      sunDeleteChange,
      sunDetailChange,
      sunDisableChange,
      sunRowKeyChange,
      getSunAlarmTable,
    } = this.props;

    return (
      <GrandsonTable
        historyChange={historyChange}
        controlChange={controlChange}
        realtimeChange={realtimeChange}
        rumorChange={rumorChange}
        sunEditChange={sunEditChange}
        sunRowKeyChange={sunRowKeyChange}
        sunDeleteChange={sunDeleteChange}
        sunDetailChange={sunDetailChange}
        expandedRows={this.state.expandedRows}
        sunDisableChange={sunDisableChange}
        getSunAlarmTable={getSunAlarmTable}
      />
    );
  }
  onExpand(expanded, record) {
    const {
      informationStore: {expandedRowsChange, getGrandsonTable, s_tableParmas},
      currentPortChange,
    } = this.props;
    currentPortChange(record);
    getGrandsonTable({...s_tableParmas, portID: record.portID});
    if (expanded) {
      expandedRowsChange([record.portID]);
    } else {
      expandedRowsChange([]);
    }
  }
  editClick(item) {
    const {childEditClick} = this.props;
    childEditClick(item);
  }
  deleteClick(item) {
    const {
      informationStore: {delectConsport, currentDevice, getSportTable},
    } = this.props;
    delectConsport({F_PortID: item.portID, F_DeviceID: currentDevice}).then(
      () => {
        const F_DeviceID = {F_DeviceID: currentDevice};
        getSportTable(F_DeviceID);
      },
    );
  }
  detailClick(item) {
    const {childDetailClick} = this.props;
    childDetailClick(item);
  }
  addClick(item) {
    const {
      informationStore: {getGoAdd, ztreeChild, expandedRows},
      addChildShow,
    } = this.props;
    getGoAdd({Area_ID: ztreeChild}).then(() => {
      addChildShow(item, expandedRows);
    });
  }
  onRowDoubleClick(item) {
    const {childDetailClick} = this.props;
    childDetailClick(item);
  }
  render() {
    const {informationStore} = this.props;
    const s_tableData = toJS(informationStore.s_tableData);
    const tableData = (s_tableData && s_tableData.varList) || [];
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
      expandedRowKeys: toJS(informationStore.expandedRows),
    };
    return (
      <div>
        <Table
          pagination={false}
          loading={informationStore.s_loading}
          nesting={nesting}
          columns={columns}
          onRowDoubleClick={this.onRowDoubleClick}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
