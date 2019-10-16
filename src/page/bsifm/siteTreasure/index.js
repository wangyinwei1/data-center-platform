import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form, Row, Col} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';

import classnames from 'classnames';
import {decorate as mixin} from 'react-mixin';
import {cascader} from '../../bsifm/common';
import Toolbar from '../../../components/Toolbar';
import Remarks from '../../../components/Remarks';
import Table from '../../../components/Table';
import columnData from './columns.js';
import Panel from '../../../components/Panel';
import ChildTable from './childTable.js';
import DeleteModal from '../../../components/DeleteModal';
import EditModal from '../../../components/EditModal';
import moment from 'moment';
import EditContent from './editContent.js';
import IssuedContent from './issuedContent.js';
import {validateFields} from './common.js';
import {formParams, issuedParams} from './tplJson.js';
//实例
@inject('regionalStore', 'sitetreasureStore')
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
      childTableVisible: false,
      childTableTitle: '',
      whichTable: '',
      type: 'new',
      infoVisiable: false,
      ...formParams,
      ...issuedParams,
    };
  }
  //以下级联方法
  onKeyPress(e) {
    const {sitetreasureStore} = this.props;
    this.c_onKeyPress(sitetreasureStore);
  }
  loadData(selectedOptions, index, callback) {
    this.c_loadData(selectedOptions, index, callback);
  }
  onTextChange(value) {
    this.c_onTextChange(value);
  }
  onCascaderChange(value, selectedOptions) {
    this.c_onCascaderChang(value, selectedOptions);
    const params = {
      page: 1,
      sing: selectedOptions[0].sing,
      keywords: '',
      number: 10,
      ztreeChild: selectedOptions[0].code,
    };
    const {sitetreasureStore} = this.props;
    sitetreasureStore.getTable(params);
  }
  componentWillMount() {
    const {sitetreasureStore} = this.props;
    this.initLoading(sitetreasureStore);
  }
  //搜索
  onSearch = value => {
    const {sitetreasureStore} = this.props;
    const params = {
      number: 10,
      ...sitetreasureStore.tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    sitetreasureStore.getTable(params);
  };
  //table分页
  onShowSizeChange(current, pageSize) {
    const {sitetreasureStore} = this.props;

    const params = {
      ...sitetreasureStore.tableParmas,
      page: current,
      number: pageSize,
    };
    sitetreasureStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {sitetreasureStore} = this.props;
    this.c_onPageChange({pageNumber}, sitetreasureStore);
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
    const {sitetreasureStore} = this.props;
    const params = {deviceIds: this.state.currentData.deviceId};
    sitetreasureStore.delete(params).then(() => {
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
  handleFormIssuedChange = changedFields => {
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
  editClick = record => {
    this.initFromValue(record);
  };
  initFromValue(data) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.imsi.value = data.imsi || '';
      formValue.imei.value = data.imei || '';
      formValue.deviceName.value = data.deviceName || '';
      formValue.autoObserver.value = data.autoObserver || 1;
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
      sitetreasureStore: {AEPEdit, AEPSave},
    } = this.props;
    validateFields(
      toJS(fields),
      () => {
        const params = {
          imsi: fields.imsi.value,
          deviceName: fields.deviceName.value,
          autoObserver: fields.autoObserver.value,
        };
        this.state.type === 'new' && (params['imei'] = fields.imei.value);
        this.state.type === 'modify' &&
          (params['deviceId'] = currentData.deviceId);
        this.state.type === 'new'
          ? AEPSave(params).then(data => {
              this.clearParams(data);
            })
          : AEPEdit(params).then(data => {
              this.clearParams(data);
            });
      },
      newFields => {
        this.setState({fields: newFields});
      },
    );
  };
  clearParams(data) {
    data &&
      this.setState({
        ...formParams,
        editShow: false,
      });
  }

  onEditCancel = () => {
    this.setState({
      ...formParams,
      editShow: false,
    });
  };
  add = () => {
    const {
      sitetreasureStore: {ztreeChild, findStationByCode},
    } = this.props;
    findStationByCode({code: ztreeChild}).then(() => {
      this.setState({
        editShow: true,
        type: 'new',
      });
    });
  };
  issuedInstructionsClick = data => {
    const {
      sitetreasureStore: {getCommandList},
    } = this.props;

    getCommandList().then(() => {
      this.setState(({issuedFields}) => {
        let formValue1 = _.cloneDeep([issuedFields])[0];
        formValue1.serviceFlag.value = data.serviceFlag || undefined;
        formValue1.serviceName.value = data.serviceName || '';
        formValue1.propertyValue.value = '';
        return {
          issuedFields: {
            ...issuedFields,
            ...formValue1,
          },
          currentData: data,
          issuedVisiable: true,
        };
      });
    });
  };
  onIssuedOk = () => {
    const fields = this.state.issuedFields;
    const currentData = this.state.currentData;
    const {
      sitetreasureStore: {AEPcommand, commandList},
    } = this.props;
    validateFields(
      toJS(fields),
      () => {
        let record = commandList.filter(item => {
          return fields.serviceFlag.value === item.serviceFlag;
        });

        const params = {
          propertyFlag: record[0].properties[0].propertyFlag,
          propertyValue: fields.propertyValue.value,
          serviceFlag: fields.serviceFlag.value,
          deviceId: currentData.deviceId,
          dataType: record[0].properties[0].dataType,
        };
        AEPcommand(params).then(data => {
          data &&
            this.setState({
              ...issuedParams,
              issuedVisiable: false,
            });
        });
      },
      newFields => {
        this.setState({issuedFields: newFields});
      },
    );
  };
  onIssuedCancel = () => {
    this.setState({
      ...issuedParams,
      issuedVisiable: false,
    });
  };
  onChildCancel = () => {
    this.setState({
      childTableVisible: false,
    });
  };
  getChildTable = (which, title) => {
    const {sitetreasureStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      number: 10,
      startTime: +moment().startOf('day'),
      endTime: +moment().endOf('day'),
    };
    sitetreasureStore.getTagDetail(params, which);
    this.setState({
      childTableVisible: true,
      whichTable: which,
      childTableTitle: title,
    });
  };
  getHistoryTable = (which, title) => {
    const {sitetreasureStore} = this.props;

    const params = {
      page: 1,
      number: 10,
      begin_timestamp: +moment().startOf('day'),
      end_timestamp: +moment().endOf('day'),
    };
    sitetreasureStore.getTagDetail(params, which);
    this.setState({
      childTableVisible: true,
      whichTable: which,
      childTableTitle: title,
    });
  };
  getDeviceInfo = record => {
    const {
      sitetreasureStore: {getDeviceInfo},
    } = this.props;
    getDeviceInfo({deviceId: record.deviceId}).then(() => {
      this.setState({
        infoVisiable: true,
      });
    });
  };
  render() {
    const {sitetreasureStore, regionalStore} = this.props;
    const deviceInfo = sitetreasureStore.deviceInfo;
    const tableData = toJS(sitetreasureStore.tableData.list) || [];
    const pagination = toJS(sitetreasureStore.tableData) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      getDeviceInfo: this.getDeviceInfo,
      issuedInstructionsClick: this.issuedInstructionsClick,
      _this: this,
    });
    return (
      <div className={styles['information_wrap']}>
        {/* <Cascader */}
        {/*   loading={this.state.cascaderLoading} */}
        {/*   options={toJS(regionalStore.areaTree)} */}
        {/*   onKeyPress={this.onKeyPress} */}
        {/*   loadData={this.loadData} */}
        {/*   onTextChange={this.onTextChange} */}
        {/*   cascaderValue={this.state.cascaderValue} */}
        {/*   cascaderText={this.state.cascaderText} */}
        {/*   onChange={this.onCascaderChange} */}
        {/* /> */}
        <div className={styles['information_ct']}>
          <div className={styles['min_width']}>
            <Toolbar
              onSearch={this.onSearch}
              showValue={['history', 'issued', 'eventsReported', 'add']}
              onClick={this.add}
              reportedChange={() => {
                this.getChildTable('reported', '事件上报');
              }}
              historyChange={() => {
                this.getHistoryTable('history', '数据查看');
              }}
              issuedChange={() => {
                this.getChildTable('issued', '指令下发日志');
              }}
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
                loading={sitetreasureStore.loading}
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
          isShow={this.state.issuedVisiable}
          onOk={this.onIssuedOk}
          title={'下发指令'}
          width={332}
          wrapClassName={classnames(styles['issued_wrap'])}
          buttons={true}
          onCancel={this.onIssuedCancel}>
          <IssuedContent
            handleFormChange={this.handleFormIssuedChange}
            fields={this.state.issuedFields}
            record={this.state.currentData}
            commandList={sitetreasureStore.commandList}
          />
        </EditModal>
        <EditModal
          isShow={this.state.editShow}
          mode={this.state.type}
          onOk={this.onEditOk}
          title={this.state.type === 'new' ? '新增设备' : '编辑设备'}
          width={332}
          wrapClassName={classnames(styles['issued_wrap'])}
          buttons={true}
          onCancel={this.onEditCancel}>
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            record={this.state.currentData}
            type={this.state.type}
            stationList={sitetreasureStore.station}
          />
        </EditModal>
        <EditModal
          isShow={this.state.infoVisiable}
          title={'设备信息'}
          width={450}
          buttons={false}
          onCancel={() => {
            this.setState({infoVisiable: false});
          }}>
          <Row className={styles['device-info-wrap']}>
            <Row className={styles['device-info-item']}>
              <Col span={8}>IMEI</Col>
              <Col span={16}>{deviceInfo.imei}</Col>
            </Row>
            <Row className={styles['device-info-item']}>
              <Col span={8}>IMSI</Col>
              <Col span={16}>{deviceInfo.imsi}</Col>
            </Row>
            {/* <Row className={styles['device-info-item']}> */}
            {/*   <Col span={12}>secret</Col> */}
            {/*   <Col span={12}>{deviceInfo.imei}</Col> */}
            {/* </Row> */}
            <Row className={styles['device-info-item']}>
              <Col span={8}>设备ID</Col>
              <Col span={16}>{deviceInfo.deviceId}</Col>
            </Row>
            <Row className={styles['device-info-item']}>
              <Col span={8}>固件版本</Col>
              <Col span={16}>{deviceInfo.firmwareVersion}</Col>
            </Row>
            <Row className={styles['device-info-item']}>
              <Col span={8}>生命周期状态</Col>
              <Col span={16}>
                {deviceInfo.deviceStatus === 1
                  ? '已激活'
                  : deviceInfo.deviceStatus === 2
                  ? '已注册'
                  : '已注销'}
              </Col>
            </Row>
            <Row className={styles['device-info-item']}>
              <Col span={8}>在线状态</Col>
              <Col span={16}>
                {deviceInfo.netStatus === 1 ? '在线' : '离线'}
              </Col>
            </Row>
            <Row className={styles['device-info-item']}>
              <Col span={8}>创建时间</Col>
              <Col span={16}>
                {moment(deviceInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}
              </Col>
            </Row>
            <Row className={styles['device-info-item']}>
              <Col span={8}>最后上线时间</Col>
              <Col span={16}>
                {moment(deviceInfo.onlineAt).format('YYYY-MM-DD HH:mm:ss')}
              </Col>
            </Row>
          </Row>
        </EditModal>
        <Panel
          onCancel={this.onChildCancel}
          title={this.state.childTableTitle}
          isShow={this.state.childTableVisible}>
          <ChildTable whichTable={this.state.whichTable} />
        </Panel>
      </div>
    );
  }
}

export default Passageway;
