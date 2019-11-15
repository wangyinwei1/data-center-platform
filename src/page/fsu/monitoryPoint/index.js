import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form, Row, Spin} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import classnames from 'classnames';
import HistoryModal from './../../equ/information/historyModal.js';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import RealtimeTable from '../devicemanagement/realtimeTable.js';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbarnew';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Panel from '../../../components/Panel';
import ChildTable from './childTable.js';
import TreeControls from '../../../components/TreeControls';
import Empty from '../../../components/Empty';
import RealtimeAlarmTable from '../realtimealarm/childTable.js';
//实例
@inject(
  'regionalStore',
  'fsu_monitorypointStore',
  'historymodalStore',
  'fsu_realtimealarmStore',
)
@observer
@mixin(cascader)
class Passageway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      selectedKeys: [],
      subExpandedKeys: [],
      subSelectedKeys: [],
      currentArea: {},
      currentSubDevice: {},
      historyShow: false,
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
    this.getSubDeviceAndMoniter({
      code: data[0].code,
      sing: data[0].sing,
    });
    this.setState({
      areaList: data,
      selectedKeys: data[0] ? ['' + data[0].code] : [],
      currentArea: data[0] || {},
    });
  };
  //搜索
  onSearch = value => {
    const {fsu_monitorypointStore} = this.props;
    const params = {
      ...fsu_monitorypointStore.tableParmas,
      keywords: encodeURIComponent(value),
      F_FsuTypeID: JSON.parse(localStorage.getItem('FsuTypeID')),
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
      F_FsuTypeID: JSON.parse(localStorage.getItem('FsuTypeID')),
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
  getSubDeviceAndMoniter = async record => {
    const {
      fsu_monitorypointStore: {getSubDeviceTree, getTable},
    } = this.props;
    let params = {
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
      ztreeChild: record.code,
      sing: record.sing,
    };
    let firstData = await getSubDeviceTree(params);
    if (firstData.deviceID && firstData.children && firstData.children[0]) {
      let children = firstData.children[0];
      this.setState({
        subExpandedKeys: [firstData.deviceID],
        subSelectedKeys: [children.deviceID],
        currentSubDevice: children,
      });
      this.getTableData(children);
      //获取监控
    }
  };
  getTableData = children => {
    const {fsu_realtimealarmStore, fsu_monitorypointStore} = this.props;

    // fsu_monitorypointStore.getTable({
    //   F_DeviceID: children.deviceID,
    //   F_Suid: children.suID,
    //   F_DevicerID: children.devicerID,
    //   F_SurID: children.surID,
    //   fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
    // });
    let F_FsuTypeID = localStorage.getItem('FsuTypeID');
    if (JSON.parse(F_FsuTypeID) === 2) {
      // const params = {
      //   F_Suid: item.suID,
      // };
      // fsu_devicemanagementStore.getSubDevice(params).then(data => {
      //   data && setState();
      // });
    } else {
      const params = {
        keywords: '',
        page: 1,
        number: 10,
        F_Suid: children.suID,
        fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
      };
      fsu_monitorypointStore.getTable(params).then(data => {
        // data && setState();
      });
    }

    const params = {
      keywords: '',
      page: 1,
      ztreeChild: children.suID,
      number: 10,
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
    };
    fsu_realtimealarmStore.getChildTable(params);
  };
  typesChange(value) {
    const {
      fsu_monitorypointStore: {getTable, tableParmas},
    } = this.props;
    const params = {
      ...tableParmas,
      page: 1,
      F_FsuTypeID: value,
    };
    localStorage.setItem('FsuTypeID', value);
    this.getSubDeviceAndMoniter(this.state.currentArea);
    // getTable(params);
  }
  onHistoryCancel = () => {
    this.setState({
      historyShow: false,
    });
    const {fsu_devicemanagementStore} = this.props;
    fsu_devicemanagementStore.clearHisData(); //离开情况列表
  };

  render() {
    const {fsu_monitorypointStore, regionalStore} = this.props;
    const {
      fsuAddTypes,
      subDeviceTree,
      subDeviceLoading,
      tableData,
    } = fsu_monitorypointStore;
    const columns = columnData({
      getChildTable: this.getChildTable,
      _this: this,
    });
    let toolbar = [
      {
        type: 'button',
        pos: 'right',
        name: '实时召测',
        handleClick: () => {},
      },
      {
        type: 'button',
        pos: 'right',
        name: '历史数据',
        style: {marginRight: '8px'},
        handleClick: () => {
          this.setState({
            historyShow: true,
          });
          const {
            historymodalStore: {his_subDevice, getGrandsonMenu},
          } = this.props;
          const params = {
            F_DeviceID: this.state.currentSubDevice.deviceID,
            F_Suid: this.state.currentSubDevice.suID,
          };
          getGrandsonMenu(params);
        },
      },
      {
        type: 'selectItem',
        pos: 'left',
        name: '设备类型',
        children: fsuAddTypes || [],
        width: 200,
        defaultValue: JSON.parse(localStorage.getItem('FsuTypeID')),
        labelCol: 9,
        wrapperCol: 15,
        handleChange: value => {
          this.typesChange(value);
        },
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
              {this.state.areaList[0] ? (
                <TreeControls
                  onSelect={(record, {selected, selectedNodes}) => {
                    if (!selected) return;
                    this.getSubDeviceAndMoniter(selectedNodes[0].props.dataRef);
                    this.setState({
                      selectedKeys: record,
                      currentArea: selectedNodes[0].props.dataRef,
                      subSelectedKeys: [],
                      subExpandedKeys: [],
                    });
                  }}
                  loadData={this.onLoadData}
                  selectedKeys={this.state.selectedKeys}
                  treeData={this.state.areaList}
                  rowNameKey={'name'}
                  rowKey={'code'}
                />
              ) : (
                <Empty />
              )}
            </Row>
          </div>
          <div className={styles['bottom']}>
            <Row className={styles['tree-title']}>
              <i />
              <span>子设备</span>
            </Row>
            <Row className={styles['tree-wrap']}>
              {/* 子设备 */}
              <Spin spinning={subDeviceLoading}>
                {subDeviceTree[0] ? (
                  <TreeControls
                    onSelect={(record, {selected, selectedNodes}) => {
                      if (!selected) return;
                      this.getTableData(selectedNodes[0].props.dataRef);
                      this.setState({
                        subSelectedKeys: record,
                        currentSubDevice: selectedNodes[0].props.dataRef,
                      });
                    }}
                    itemClick={record => {
                      let key = record.deviceID;
                      let subExpandedKeys = [...this.state.subExpandedKeys];
                      let index = subExpandedKeys.indexOf(key);
                      let hasKey = index !== -1;
                      if (hasKey) {
                        subExpandedKeys.splice(index, 1);
                      } else {
                        subExpandedKeys.push(key);
                      }
                      this.setState({
                        subExpandedKeys: subExpandedKeys,
                      });
                    }}
                    onExpand={(expandedKeys, {expanded, node}) => {
                      this.setState({
                        subExpandedKeys: expandedKeys,
                      });
                    }}
                    expandedKeys={this.state.subExpandedKeys}
                    selectedKeys={this.state.subSelectedKeys}
                    treeData={subDeviceTree}
                    rowNameKey={'deviceName'}
                    rowKey={'deviceID'}
                  />
                ) : (
                  <Empty />
                )}
              </Spin>
            </Row>
          </div>
        </div>
        <div className={styles['right']}>
          <div className={styles['realtime-wrap']}>
            <Row className={styles['title']}>
              <i />
              <span>实时数据</span>
            </Row>
            <Row className={styles['table-wrap']}>
              <Toolbar modules={toolbar} className={styles['toolbar-wrap']} />
              {/* <Table */}
              {/*   columns={columns} */}
              {/*   rowClassName={(record, index) => { */}
              {/*     const rowClassName = []; */}
              {/*     return rowClassName.join(' '); */}
              {/*   }} */}
              {/*   pagination={false} */}
              {/*   loading={fsu_monitorypointStore.loading} */}
              {/*   data={[...tableData]} */}
              {/* /> */}
              <RealtimeTable singleLineData={this.state.currentSubDevice} />
            </Row>
          </div>
          <div className={styles['alarm-wrap']}>
            <Row className={styles['title']}>
              <i />
              <span>实时告警</span>
            </Row>
            <Row className={styles['table-wrap']}>
              <RealtimeAlarmTable />
            </Row>
          </div>
        </div>
        <Panel
          onCancel={this.onHistoryCancel}
          title={`历史数据/${this.state.currentSubDevice.deviceName}`}
          isShow={this.state.historyShow}>
          <HistoryModal
            isFsu={true}
            currentSuID={this.state.currentSubDevice.suID}
          />
        </Panel>
      </div>
    );
  }
}

export default Passageway;
