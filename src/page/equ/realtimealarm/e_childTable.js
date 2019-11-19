import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import columnData from './e_childColumns.js';
import GrandsonTable from './grandsonTable.js';
//实例
@inject('realtimealarmStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  componentDidMount() {}
  //嵌套表格
  expandedRowRender(record, i) {
    const {getChildTable} = this.props;

    return <GrandsonTable getChildTable={getChildTable} />;
  }
  onExpand(expanded, record) {
    const {
      realtimealarmStore: {
        c_expandedRowsChange,
        getGrandsonTable,
        s_tableParmas,
      },
    } = this.props;
    if (expanded) {
      c_expandedRowsChange([record.portID]);
      getGrandsonTable({
        ...s_tableParmas,
        portID: record.portID,
      });
    } else {
      c_expandedRowsChange([]);
    }
  }
  render() {
    const {realtimealarmStore} = this.props;
    const s_tableData = toJS(realtimealarmStore.s_tableData);
    const tableData = (s_tableData && s_tableData.varList) || [];
    const columns = columnData();
    const nesting = {
      expandedRowRender: this.expandedRowRender,
      onExpand: this.onExpand,
      expandedRowKeys: toJS(realtimealarmStore.c_expandedRows),
    };
    return (
      <div>
        <Table
          pagination={false}
          loading={realtimealarmStore.s_loading}
          nesting={nesting}
          columns={columns}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
