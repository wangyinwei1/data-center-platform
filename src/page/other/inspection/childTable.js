import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../../bsifm/common';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
//实例
@inject('inspectionStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.add = this.add.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      timeParams: {},
    };
  }
  getChecked(item) {
    const {getChecked} = this.props;
    getChecked && getChecked(item);
  }
  initFromValue(data, mode, item) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.F_Address.value = (data.pd && data.pd.F_Address) || '';
      formValue.F_AreaName.value = (data.pd && data.pd.F_AreaName) || '';
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
  add(e) {
    const {childAdd} = this.props;
    childAdd && childAdd();
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {inspectionStore} = this.props;

    const params = {
      ...inspectionStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    inspectionStore.getChildTable(params);
  }
  onPageChange(pageNumber) {
    const {inspectionStore} = this.props;
    const params = {
      ...inspectionStore.c_tableParmas,
      page: pageNumber,
    };
    inspectionStore.getChildTable(params);
  }
  onSearch(value) {
    const {inspectionStore} = this.props;
    const params = {
      ...inspectionStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    inspectionStore.getChildTable(params);
  }

  render() {
    const {inspectionStore} = this.props;
    const c_tableData = toJS(inspectionStore.c_tableData);
    const tableData = (c_tableData && c_tableData.Data) || [];
    const pagination = c_tableData || {};
    const columns = columnData({
      getChecked: this.getChecked,
      _this: this,
    });
    return (
      <div>
        {/* <Toolbar onSearch={this.onSearch} onClick={this.add} /> */}
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          rowClassName={(record, index) => {
            return 'cl_row_padding';
          }}
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          loading={inspectionStore.c_loading}
          onChange={this.onPageChange}
          useDefaultRowKey={true}
          data={tableData}
        />
      </div>
    );
  }
}

export default Regional;
