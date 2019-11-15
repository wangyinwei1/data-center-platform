import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form, Row, Spin} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import classnames from 'classnames';
import HistoryModal from './../../equ/information/historyModal.js';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import RealtimeTable from './realtimeTable.js';
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
      spValue: 1,
      nodata: false,
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
    fsu_monitorypointStore.getFsuSpType({
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
    });
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
    if (
      firstData &&
      firstData.deviceID &&
      firstData.children &&
      firstData.children[0]
    ) {
      let children = firstData.children[0];
      this.setState({
        subExpandedKeys: [firstData.deviceID],
        subSelectedKeys: [children.deviceID],
        currentSubDevice: children,
        nodata: false,
      });
      this.getTableData(children);
      //获取监控
    } else {
      this.setState({
        nodata: true,
      });
    }
  };
  getTableData = children => {
    const {fsu_realtimealarmStore, fsu_monitorypointStore} = this.props;

    //实时数据
    fsu_monitorypointStore.getTable({
      page: 1,
      number: 10,
      spTypeId: this.state.spValue,
      F_Suid: children.suID,
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
    });

    //告警
    fsu_realtimealarmStore.getChildTable({
      keywords: '',
      page: 1,
      ztreeChild: children.suID,
      number: 10,
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
    });
  };
  typesChange = async value => {
    const {
      fsu_monitorypointStore: {getTable, getFsuSpType, tableParmas},
    } = this.props;
    const params = {
      ...tableParmas,
      page: 1,
      F_FsuTypeID: value,
    };
    localStorage.setItem('FsuTypeID', value);
    await getFsuSpType({
      fsuTypeId: value,
    }).then(data => {
      this.setState({spValue: data[0] ? 1 : undefined});
    });
    await this.getSubDeviceAndMoniter(this.state.currentArea);
  };
  onHistoryCancel = () => {
    this.setState({
      historyShow: false,
    });
    // const {fsu_devicemanagementStore} = this.props;
    // fsu_devicemanagementStore.clearHisData(); //离开情况列表
  };
  render() {
    const {fsu_monitorypointStore, regionalStore} = this.props;
    const {
      fsuAddTypes,
      spType,
      subDeviceTree,
      subDeviceLoading,
      tableData,
      tableParmas,
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
        disabled: this.state.nodata,
        handleClick: () => {},
      },
      {
        type: 'button',
        pos: 'right',
        name: '历史数据',
        disabled: this.state.nodata,
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
      {
        type: 'selectItem',
        pos: 'left',
        name: '监控点类型',
        children: spType || [],
        width: 210,
        defaultValue: this.state.spValue,
        disabled: this.state.nodata,
        labelCol: 10,
        wrapperCol: 14,
        handleChange: value => {
          this.setState({
            spValue: value,
          });
          let params = {
            ...tableParmas,
            spTypeId: value,
            fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
          };
          fsu_monitorypointStore.getTable(params);
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
              <RealtimeTable spValue={this.state.spValue} />
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
