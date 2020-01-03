import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import RemoteControlContent from './rumorContent.js';
import {Select, message} from 'antd';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './realtimeColumns.js';
import ControlContent from './controlContent.js';
import Toolbar from '../../../components/Toolbar';
import {remoteControlFields} from './tplJson.js';
import ControlModal from '../devicemanagement/controlModal.js';
const Option = Select.Option;
//实例
@inject('fsu_monitorypointStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      subDeviceValue: '',
      type: 1,
      controlShow: false,
      currentData: {},
      remoteControlShow: false,
      ...remoteControlFields,
    };
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    let FsuTypeID = JSON.parse(localStorage.getItem('FsuTypeID'));
    const {fsu_monitorypointStore, isCall} = this.props;

    const params = {
      ...fsu_monitorypointStore.tableParmas,
      page: current,
      number: pageSize,
    };
    if (isCall) {
      fsu_monitorypointStore.getRealTimeCall(params);
    } else {
      fsu_monitorypointStore.getTable(params);
    }
  }
  onPageChange(pageNumber) {
    let FsuTypeID = JSON.parse(localStorage.getItem('FsuTypeID'));
    const {fsu_monitorypointStore, isCall, subDevItem} = this.props;
    // console.log(subDevItem);
    const params = {
      ...fsu_monitorypointStore.tableParmas,
      page: pageNumber,
    };
    if (isCall) {
      fsu_monitorypointStore.getRealTimeCall(params);
    } else {
      fsu_monitorypointStore.getTable(params);
    }
  }
  remoteControlClick = (item, e) => {
    const {fsu_monitorypointStore, subDevItem} = this.props;
    const params = {
      suID: item.suID,
      fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
      deviceID: item.deviceID,
      spID: item.spID,
    };

    if (JSON.parse(localStorage.getItem('FsuTypeID')) === 2) {
      params['devicerID'] = subDevItem.devicerID;
      params['surID'] = subDevItem.surID;
    }

    fsu_monitorypointStore.getSpInfo(params).then(data => {
      if (data) {
        this.setState(({remoteControlFields}) => {
          let formValue = {...remoteControlFields};
          formValue.sVal.value = data.sVal;
          formValue.hLimit.value = data.hLimit;
          formValue.sHLimit.value = data.sHLimit;
          formValue.lLimit.value = data.lLimit;
          formValue.sLLimit.value = data.sLLimit;
          formValue.relativeVal.value = data.relativeVal;
          formValue.threshold.value = data.threshold;
          formValue.intervalTime.value = data.intervalTime;
          formValue.bDelay.value = data.bDelay;
          formValue.eDelay.value = data.eDelay;
          formValue.spType.value = item.spType;
          return {
            remoteControlFields: {
              ...remoteControlFields,
              ...formValue,
            },
            currentData: item,
            remoteControlShow: true,
          };
        });
      }
    });
  };

  //控制
  controlClick = item => {
    if (JSON.parse(localStorage.getItem('FsuTypeID')) === 2) {
      const {
        fsu_monitorypointStore: {postDeviceControl},
        subDevItem,
      } = this.props;
      const params = {
        F_DeviceID: item.deviceID,
        F_Spid: item.spID,
        F_Suid: item.suID,
        value: this.state.value,
        fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
        surID: subDevItem.surID,
        devicerID: subDevItem.devicerID,
      };
      postDeviceControl(params).then(data => {
        data &&
          this.setState({
            controlShow: false,
          });
      });
    } else {
      this.setState({
        currentData: item,
        controlShow: true,
      });
    }
  };

  onRemoteControlCancel = () => {
    this.setState({
      remoteControlShow: false,
    });
  };
  remoteControlChange = changedFields => {
    this.setState(({remoteControlFields}) => {
      return {
        remoteControlFields: {...remoteControlFields, ...changedFields},
      };
    });
  };
  onControlCancel = () => {
    this.setState({
      controlShow: false,
    });
  };
  onRemoteControlOk = () => {
    const fields = this.state.remoteControlFields;
    const showError = this.test(fields);
    const hasError = _.keys(showError);
    if (hasError[0]) {
      this.setState(({remoteControlFields}) => {
        return {
          remoteControlFields: {
            ...remoteControlFields,
            ...showError,
          },
        };
      });
    } else {
      const {
        fsu_monitorypointStore: {remoteOperationSp},
        subDevItem,
      } = this.props;
      let item = this.state.currentData;
      const params = {
        suID: item.suID,
        deviceID: item.deviceID,
        spID: item.spID,
      };
      if (JSON.parse(localStorage.getItem('FsuTypeID')) === 2) {
        params['devicerID'] = subDevItem.devicerID;
        params['surID'] = subDevItem.surID;
      }

      _.forIn(fields, (value, key) => {
        params[key] = value.value;
      });
      remoteOperationSp(params).then(() => {
        this.setState({
          remoteControlShow: false,
        });
      });
    }
  };
  //校验循环
  test(fields) {
    let showError = {};
    //循环找到必填字段是否是空并作出警告
    _.forIn(fields, (v, k) => {
      if (!v.value && v.value !== 0 && v.require) {
        showError[k] = {showError: true, ...v};
      }
    });
    return showError;
  }
  render() {
    const {fsu_monitorypointStore, needRealtime, spValue} = this.props;
    const r_tableData = toJS(fsu_monitorypointStore.tableData);
    const tableData = (r_tableData && r_tableData.list) || [];
    let spType = fsu_monitorypointStore.spType;
    let rest = spType.filter(item => {
      return item.value === spValue;
    });

    const pagination = r_tableData || {};

    const columns = columnData({
      _this: this,
      controlClick: this.controlClick,
      remoteControlClick: this.remoteControlClick,
      rest,
    });
    return (
      <div>
        <Table
          loading={fsu_monitorypointStore.loading}
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.count}
          pageSizeOptions={['5', '10', '15', '20']}
          columns={columns}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          useDefaultRowKey={true}
          data={tableData}
        />
        <ControlModal
          width={530}
          isShow={this.state.controlShow}
          title={'远程控制'}
          onCancel={this.onControlCancel}>
          <ControlContent
            item={this.state.currentData}
            cancle={this.onControlCancel}
          />
        </ControlModal>
        <ControlModal
          width={852}
          isShow={this.state.remoteControlShow}
          title={
            this.state.currentData.spType === 6 ? '远程调配' : '告警量设置'
          }
          buttons={true}
          onOk={this.onRemoteControlOk}
          onCancel={this.onRemoteControlCancel}>
          <RemoteControlContent
            fields={this.state.remoteControlFields}
            handleFormChange={this.remoteControlChange}
          />
        </ControlModal>
      </div>
    );
  }
}

export default Regional;
