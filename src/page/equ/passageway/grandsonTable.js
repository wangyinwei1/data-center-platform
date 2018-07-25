import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Table from '../../../components/Table';
import columnData from './grandsonColumns.js';
//实例
@inject('passagewayStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $('.ant-table-expanded-row .ant-table-expanded-row > td:last-child').attr(
      'colspan',
      8,
    );
  }
  getChildTable(item, e) {
    const {getChildTable} = this.props;
    getChildTable(item, e, 'sub');
  }
  render() {
    const {passagewayStore, sunRowKeyChange} = this.props;
    const g_tableData = toJS(passagewayStore.g_tableData);
    const tableData = (g_tableData && g_tableData.varList) || [];
    const columns = columnData({
      _this: this,
      getChildTable: this.getChildTable,
    });
    return (
      <div className={'cl_grandson'} style={{width: '100%'}}>
        <Table
          pagination={false}
          loading={passagewayStore.g_loading}
          columns={columns}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
