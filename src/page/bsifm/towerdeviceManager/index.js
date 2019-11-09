import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import Panel from '../../../components/Panel';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import HistoryModal from './historyModal.js';
import Toolbar from '../../../components/Toolbar';
import Remarks from '../../../components/Remarks';
import Table from '../../../components/Table';
import columnData from './columns.js';
import ChildTable from './childTable.js';
import DeleteModal from '../../../components/DeleteModal';
import EditModal from '../../../components/EditModal';
import moment from 'moment';
import EditContent from './editContent.js';
import IssuedContent from './issuedContent.js';
import {validateFields} from './common.js';
import {formParams, issuedParams} from './tplJson.js';
//实例
@inject('regionalStore', 'towerStore')
@observer
@mixin(cascader)
class Passageway extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      cascaderText: '',
      cascaderLoading: false,
      cascaderValue: [],
      areaName: '',
      expandedRows: [],
      deleteShow: false,
      currentData: {},
      editShow: false,
      issuedVisiable: false,
      type: 'new',
      historyShow: false,
      currentType: '',
      ...formParams,
      ...issuedParams,
    };
  }
  //以下级联方法
  onKeyPress(e) {
    const {towerStore} = this.props;
    this.c_onKeyPress(towerStore);
  }
  loadData(selectedOptions, index, callback) {
    this.c_loadData(selectedOptions, index, callback);
  }
  onTextChange(value) {
    this.c_onTextChange(value);
  }
  devStateChange = value => {
    const {towerStore} = this.props;
    const params = {
      number: 10,
      ...towerStore.tableParmas,
      state: value,
      page: 1,
    };
    towerStore.getTable(params);
  };
  onCascaderChange(value, selectedOptions) {
    this.c_onCascaderChang(value, selectedOptions);
    const params = {
      page: 1,
      sing: selectedOptions[0].sing,
      keywords: '',
      number: 10,
      ztreeChild: selectedOptions[0].code,
    };
    const {towerStore} = this.props;
    towerStore.getTable(params);
  }
  componentWillMount() {
    const {towerStore} = this.props;
    this.initLoading(towerStore);
  }
  //搜索
  onSearch = value => {
    const {towerStore} = this.props;
    const params = {
      number: 10,
      ...towerStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    towerStore.getTable(params);
  };
  //table分页
  onShowSizeChange(current, pageSize) {
    const {towerStore} = this.props;

    const params = {
      ...towerStore.tableParmas,
      page: current,
      number: pageSize,
    };
    towerStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {towerStore} = this.props;
    this.c_onPageChange({pageNumber}, towerStore);
  }
  onCancel = () => {
    this.setState({
      tagVisible: false,
    });
  };
  deleteClick = record => {
    this.setState({
      deleteShow: true,
      currentData: record,
    });
  };
  onDeleteOk = () => {
    const {towerStore} = this.props;
    const params = {id: this.state.currentData.id};
    towerStore.delete(params).then(() => {
      this.setState({
        deleteShow: false,
      });
    });
  };
  onDeleteCancel = () => {
    this.setState({
      deleteShow: false,
    });
  };
  issuedHandleFormChange = changedFields => {
    const key = _.keys(changedFields);
    //showError让自己校验字段
    const obj = {};
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({issuedFields}) => {
      return {
        issuedFields: {...issuedFields, ...obj},
      };
    });
  };
  handleFormChange = changedFields => {
    const key = _.keys(changedFields);
    //showError让自己校验字段
    const obj = {};
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({fields}) => {
      return {
        fields: {...fields, ...obj},
      };
    });
  };
  editClick = async record => {
    const {
      towerStore: {ztreeChild, findStationByCode, getInfo},
    } = this.props;
    await findStationByCode({code: ztreeChild});
    await getInfo({id: record.id}).then(data => {
      this.initFromValue(data);
    });
  };
  initFromValue(data) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.meternum.value = data.meternum || '';
      formValue.iccid.value = data.iccid || '';
      formValue.interval.value = data.interval || '';
      formValue.stationId.value = parseInt(data.stationId) || '';
      formValue.imei.value = data.imei || '';
      formValue.metertype.value = data.metertype || '';
      formValue.moduletype.value = data.moduletype || '';
      formValue.version.value = data.version || '';
      formValue.longitude.value = data.longitude || '';
      formValue.latitude.value = data.latitude || '';
      formValue.orgid.value = data.orgid || '';
      formValue.meterchannel.value = data.meterchannel || '';
      formValue.fullorgid.value = data.fullorgid || '';
      formValue.siteid.value = data.siteid || '';
      formValue.fullorgid.value = data.fullorgid || '';
      return {
        fields: {
          ...fields,
          ...formValue,
        },
        type: 'modify',
        currentData: data,
        editShow: true,
      };
    });
  }
  //编辑确定
  onEditOk = () => {
    const fields = this.state.fields;
    const currentData = this.state.currentData;
    const {
      towerStore: {towerEdit, towerSave},
    } = this.props;
    validateFields(
      toJS(fields),
      () => {
        let params = {};
        _.forIn(fields, (value, key) => {
          params[key] = value.value;
        });
        this.state.type === 'modify' && (params['id'] = currentData.id);
        this.state.type === 'new'
          ? towerSave(params).then(data => {
              this.clearParams(data);
            })
          : towerEdit(params).then(data => {
              this.clearParams(data);
            });
      },
      newFields => {
        this.state.fields = newFields;
      },
    );
  };
  clearParams(data) {
    data &&
      this.setState({
        ...formParams,
        ...issuedParams,
        editShow: false,
      });
  }

  onEditCancel = () => {
    this.setState({
      ...formParams,
      editShow: false,
    });
  };
  historyClick = (record, type) => {
    const {towerStore} = this.props;

    const params = {
      id: record.id,
      startTime: moment()
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      page: 1,
      number: 10,
    };
    if (type === 'electricQuantity') {
      towerStore.getElectricQuantity(params);
    } else if (type === 'alarmInfo') {
      towerStore.getAlarmInfo(params);
    } else {
      towerStore.getElectricEnergy(params);
    }
    this.setState({
      historyShow: true,
      currentType: type,
    });
  };
  add = () => {
    const {
      towerStore: {ztreeChild, findStationByCode},
    } = this.props;
    findStationByCode({code: ztreeChild}).then(() => {
      this.setState({
        editShow: true,
        type: 'new',
      });
    });
  };
  onHistoryCancel = () => {
    this.setState({
      historyShow: false,
    });
  };
  issuedClick = record => {
    this.setState({
      issuedVisiable: true,
      currentData: record,
    });
    // const {
    //   towerStore: {sendCommand},
    // } = this.props;
    // sendCommand({
    //   id: record.id,
    //   serverdata: record.serverdata,
    //   servercommand: record.servercommand,
    // });
  };
  //编辑确定
  onIssuedOk = () => {
    const issuedFields = this.state.issuedFields;
    const currentData = this.state.currentData;
    const {
      towerStore: {sendCommand},
    } = this.props;
    validateFields(
      toJS(issuedFields),
      () => {
        let params = {};
        _.forIn(issuedFields, (value, key) => {
          params[key] = value.value;
        });
        params['id'] = currentData.id;
        sendCommand(params).then(data => {
          this.clearParams(data);
        });
      },
      newFields => {
        this.setState({issuedFields: newFields});
      },
    );
  };
  remoteClick = (record, rrpc) => {
    const {
      towerStore: {sendRRPC},
    } = this.props;
    let params = {
      rrpc: rrpc,
      id: record.id,
    };
    sendRRPC(params, rrpc);
  };
  render() {
    const {towerStore, regionalStore} = this.props;
    const tableData = toJS(towerStore.tableData.list) || [];
    const pagination = toJS(towerStore.tableData) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      historyClick: this.historyClick,
      issuedClick: this.issuedClick,
      remoteClick: this.remoteClick,
      _this: this,
    });
    return (
      <div className={styles['information_wrap']}>
        <Cascader
          loading={this.state.cascaderLoading}
          options={toJS(regionalStore.areaTree)}
          onKeyPress={this.onKeyPress}
          loadData={this.loadData}
          onTextChange={this.onTextChange}
          cascaderValue={this.state.cascaderValue}
          cascaderText={this.state.cascaderText}
          onChange={this.onCascaderChange}
        />
        <div className={styles['information_ct']}>
          <div className={styles['min_width']}>
            <Toolbar
              onSearch={this.onSearch}
              devStateChange={this.devStateChange}
              onClick={this.add}
            />
            <div className={styles['table_wrap']}>
              <Table
                rowClassName={(record, index) => {
                  const rowClassName = [];
                  return rowClassName.join(' ');
                }}
                pageIndex={pagination.page}
                pageSize={pagination.number}
                total={pagination.allCount}
                columns={columns}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                loading={towerStore.loading}
                data={tableData}
              />
            </div>
          </div>
        </div>
        <DeleteModal
          isShow={this.state.deleteShow}
          onOk={this.onDeleteOk}
          onCancel={this.onDeleteCancel}
        />
        <EditModal
          isShow={this.state.editShow}
          mode={this.state.type}
          onOk={this.onEditOk}
          title={this.state.type === 'new' ? '新增' : '修改'}
          width={880}
          buttons={true}
          onCancel={this.onEditCancel}>
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            record={this.state.currentData}
            type={this.state.type}
            stationList={towerStore.station}
          />
        </EditModal>
        <EditModal
          isShow={this.state.issuedVisiable}
          onOk={this.onIssuedOk}
          title={'下发命令'}
          width={880}
          buttons={true}
          onCancel={() => {
            this.setState({issuedVisiable: false});
            this.clearParams(true);
          }}>
          <IssuedContent
            handleFormChange={this.issuedHandleFormChange}
            fields={this.state.issuedFields}
            record={this.state.currentData}
          />
        </EditModal>
        <Panel
          onCancel={this.onHistoryCancel}
          title={`${
            this.state.currentType === 'electricQuantity'
              ? '电量'
              : this.state.currentType === 'alarmInfo'
              ? '告警'
              : '电能'
          }数据`}
          isShow={this.state.historyShow}>
          <HistoryModal currentType={this.state.currentType} />
        </Panel>
      </div>
    );
  }
}

export default Passageway;
