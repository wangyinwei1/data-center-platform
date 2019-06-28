import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../common';
import Table from '../../../components/Table';
import columnData from './columns.js';
//实例
@inject('fsu_basicconfigStore')
@observer
@mixin(cascader)
class Site extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  //以下级联方法
  componentDidMount() {
    const {fsu_basicconfigStore: {getDeviceTypeList}} = this.props;
    const params = {
      page: 1,
      keywords: '',
      number: 10,
    };
    getDeviceTypeList(params);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {fsu_basicconfigStore} = this.props;
    const params = {
      number: 10,
      keywords: '',
      ...fsu_basicconfigStore.tableParmas,
      page: current,
      number: pageSize,
    };
    fsu_basicconfigStore.getDeviceTypeList(params);
  }
  onPageChange(pageNumber) {
    const {fsu_basicconfigStore} = this.props;
    const params = {
      number: 10,
      page: 1,
      keywords: '',
      ...fsu_basicconfigStore.tableParmas,
      page: pageNumber,
    };
    fsu_basicconfigStore.getDeviceTypeList(params);
  }

  render() {
    const {fsu_basicconfigStore} = this.props;
    const tableData = toJS(fsu_basicconfigStore.tableData.Data) || [];
    const pagination = toJS(fsu_basicconfigStore.tableData) || {};
    const columns = columnData();
    return (
      <div className={styles['applicationuser_wrap']}>
        <div className={styles['applicationuser_ct']}>
          <div className={styles['min_width']}>
            <div className={styles['table_wrap']}>
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.allCount}
                columns={columns}
                loading={fsu_basicconfigStore.loading}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                data={tableData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Site;
