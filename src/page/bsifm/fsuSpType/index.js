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
    const {
      fsu_basicconfigStore: {getSpTypeList},
    } = this.props;
    const params = {
      page: 1,
      keywords: '',
      number: 10,
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
    };
    getSpTypeList(params);
  }
  onShowSizeChange(current, pageSize) {
    const {fsu_basicconfigStore} = this.props;
    const params = {
      page: 1,
      number: 10,
      keywords: '',
      ...fsu_basicconfigStore.tableParmas,
      number: pageSize,
      page: current,
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
    };
    fsu_basicconfigStore.getSpTypeList(params);
  }
  onPageChange(pageNumber) {
    const {fsu_basicconfigStore} = this.props;
    const params = {
      number: 10,
      page: 1,
      keywords: '',
      ...fsu_basicconfigStore.tableParmas,
      page: pageNumber,
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
    };
    fsu_basicconfigStore.getSpTypeList(params);
  }

  render() {
    const {fsu_basicconfigStore} = this.props;
    const tableData = toJS(fsu_basicconfigStore.s_tableData.Data) || [];
    const pagination = toJS(fsu_basicconfigStore.s_tableData) || {};
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
                loading={fsu_basicconfigStore.s_loading}
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
