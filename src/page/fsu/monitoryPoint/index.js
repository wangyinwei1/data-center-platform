import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form, Row} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbarnew';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Panel from '../../../components/Panel';
import ChildTable from './childTable.js';
import TreeControls from '../../../components/TreeControls';
//实例
@inject('regionalStore', 'fsu_monitorypointStore')
@observer
@mixin(cascader)
class Passageway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
    };
  }
  componentDidMount() {
    const {fsu_monitorypointStore} = this.props;
    const params = {
      page: 1,
      sing: 'area',
      keywords: '',
      number: 10,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    fsu_monitorypointStore.getFSUType();
    this.getAreaList();
  }
  getAreaList = async () => {
    const {regionalStore} = this.props;
    let data = await regionalStore.getAsynArea();
    this.setState({
      areaList: data,
    });
    console.log(data);
  };
  //搜索
  onSearch = value => {
    const {fsu_monitorypointStore} = this.props;
    const params = {
      ...fsu_monitorypointStore.tableParmas,
      keywords: encodeURIComponent(value),
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
      page: 1,
    };
    fsu_monitorypointStore.search(params);
  };
  //table分页
  onShowSizeChange = (current, pageSize) => {
    const {fsu_monitorypointStore} = this.props;

    const params = {
      ...fsu_monitorypointStore.tableParmas,
      page: current,
      number: pageSize,
      F_FsuTypeID: localStorage.getItem('FsuTypeID'),
    };
    fsu_monitorypointStore.getTable(params);
  };
  onPageChange = pageNumber => {
    const {fsu_monitorypointStore} = this.props;
    this.c_onPageChange({pageNumber}, fsu_monitorypointStore);
  };
  //获取子集表格
  getChildTable = (item, e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {fsu_monitorypointStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      ztreeChild: item.suID,
      number: 10,
    };
    fsu_monitorypointStore.getChildTable(params);
    this.setState({
      childTableVisible: true,
      childTableTitle: item.name,
    });
  };
  onCancel = () => {
    this.setState({
      childTableVisible: false,
    });
  };

  typesChange = value => {
    const {
      fsu_monitorypointStore: {getTable, tableParmas},
    } = this.props;
    const params = {
      ...tableParmas,
      page: 1,
      F_FsuTypeID: value,
    };
    localStorage.setItem('FsuTypeID', value);
    getTable(params);
  };
  onLoadData = async treeNode => {
    return new Promise(async resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      const params = {
        ztreeChild: treeNode.props.dataRef.code,
        sing: treeNode.props.dataRef.sing || 'area',
      };
      //调用基站
      const {fsu_monitorypointStore} = this.props;
      let data = await fsu_monitorypointStore.getZone(params);
      if (data) {
        treeNode.props.dataRef.children = data;
        this.setState({
          areaList: [...this.state.areaList],
        });
      }
      resolve();
    });
  };

  render() {
    const {fsu_monitorypointStore, regionalStore} = this.props;
    const tableData = toJS(fsu_monitorypointStore.tableData.varList) || [];
    const pagination = toJS(fsu_monitorypointStore.tableData) || {};
    const columns = columnData({
      getChildTable: this.getChildTable,
      _this: this,
    });
    let toolbar = [
      {
        type: 'inputItem',
        pos: 'left',
        name: '唯一码查询',
        width: 320,
        labelCol: 8,
        wrapperCol: 16,
        handleChange: e => {},
      },
      {
        type: 'button',
        pos: 'left',
        name: '查询',
        handleClick: () => {},
      },
    ];
    return (
      <div className={styles['information_wrap']}>
        <div className={styles['left']}>
          <div className={styles['top']}>
            <Row className={styles['tree-title']}>
              <i />
              <span>区域</span>
            </Row>
            <Row className={styles['tree-wrap']}>
              <TreeControls
                onSelect={record => {
                  console.log(record);
                }}
                loadData={this.onLoadData}
                treeData={this.state.areaList}
                rowNameKey={'name'}
                rowKey={'code'}
              />
            </Row>
          </div>
          <div className={styles['bottom']}></div>
        </div>
        <div className={styles['right']}>
          <div className={styles['realtime-wrap']}>
            <Row className={styles['title']}>
              <i />
              <span>实时数据</span>
            </Row>
            <Row className={styles['table-wrap']}>
              <Toolbar modules={toolbar} className={styles['toolbar-wrap']} />
              <Table
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.count}
                columns={columns}
                rowClassName={(record, index) => {
                  const rowClassName = [];
                  return rowClassName.join(' ');
                }}
                loading={fsu_monitorypointStore.loading}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                data={tableData}
              />
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Passageway;
