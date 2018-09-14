import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import {message, Upload} from 'antd';
import Cascader from '../../../components/Cascader';
import styles from './index.less';
import Cookies from 'js-cookie';
import Table from '../../../components/Table';
import columnData from './columns.js';
import {decorate as mixin} from 'react-mixin';
import Toolbar from '../../../components/Toolbar';
import {cascader} from '../common';
import EditModal from '../../../components/EditModal';
import EditContent from './editContent.js';
import ValueTypeContent from './valueTypeTable.js';
import DeleteModal from '../../../components/DeleteModal';
import AlarmContent from './alarmTable.js';
import VirtualContent from './virtualContent.js';
import {formParams, virtualParams} from './tplJson.js';
//实例
@inject('basicchannelStore', 'regionalStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.add = this.add.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.onImportClick = this.onImportClick.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.channelTypeChange = this.channelTypeChange.bind(this);
    this.loadData = this.loadData.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.onValueTypeCancel = this.onValueTypeCancel.bind(this);
    this.onValueTypeOk = this.onValueTypeOk.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onExportTplClick = this.onExportTplClick.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.valueTypeClick = this.valueTypeClick.bind(this);
    this.addVirtual = this.addVirtual.bind(this);
    this.onVirtualCancel = this.onVirtualCancel.bind(this);
    this.onVirtualOk = this.onVirtualOk.bind(this);
    this.virtualFormChange = this.virtualFormChange.bind(this);
    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onImportOk = this.onImportOk.bind(this);
    this.onImportCancel = this.onImportCancel.bind(this);
    this.state = {
      cascaderLoading: false,
      cascaderText: '',
      cascaderValue: [],
      editShow: false,
      virtualShow: false,
      type: 'new',
      isVchannel: false,
      valueTypeShow: false,
      ...formParams,
      ...virtualParams,
      singleLineData: {},
      currentChannelID: '',
      F_DeviceType: '',
      importShow: false,
      F_Version: '',
      deleteShow: false,
    };
  }
  //删除回调
  onDeleteOk() {
    const item = this.state.singleLineData;
    const {basicchannelStore} = this.props;
    const params = {
      F_ID: item.F_ID,
    };

    basicchannelStore.delete(params).then(() => {
      this.setState({
        deleteShow: false,
      });
    });
  }
  async onImportOk() {
    await this.setState({
      importShow: false,
    });
    await $(this.upload).click();
  }
  onImportCancel() {
    this.setState({
      importShow: false,
    });
  }
  onDeleteCancel() {
    this.c_onDeleteCancel();
  }
  deleteClick(item, e) {
    this.setState({
      deleteShow: true,
      singleLineData: item,
    });
  }
  //级联组件方法
  loadData(selectedOptions, index, callback) {
    this.c_loadData(selectedOptions, index, callback);
  }
  onTextChange(value) {
    this.c_onTextChange(value);
  }
  onCascaderChange(value, selectedOptions) {
    const params = this.c_onCascaderChang(value, selectedOptions);
    const {basicchannelStore} = this.props;
    basicchannelStore.getTable(params);
  }
  onKeyPress(e) {
    const {regionalStore} = this.props;
    this.c_onKeyPress(regionalStore);
  }
  componentDidMount() {
    // const {basicchannelStore} = this.props;
    // this.initLoading(basicchannelStore);
  }
  //table分页
  onShowSizeChange(current, pageSize) {
    const {basicchannelStore} = this.props;

    const params = {
      ...basicchannelStore.tableParmas,
      page: current,
      number: pageSize,
    };
    basicchannelStore.getTable(params);
  }
  onPageChange(pageNumber) {
    const {basicchannelStore} = this.props;
    const params = {
      ...basicchannelStore.tableParmas,
      page: pageNumber,
    };
    basicchannelStore.getTable(params);
  }
  onSearch(value) {
    const {basicchannelStore} = this.props;
    const params = {
      ...basicchannelStore.tableParmas,
      keywords: encodeURIComponent(value),
    };
    basicchannelStore.search(params);
  }
  add() {
    const {
      basicchannelStore: {initAdd, tableParmas, getVirtualList},
    } = this.props;
    getVirtualList({
      F_TypeID: tableParmas.F_TypeID,
      F_Version: tableParmas.F_Version,
    });
    initAdd().then(() => {
      this.setState({
        editShow: true,
        type: 'new',
      });
    });
  }
  initFromValue(data, mode, item) {
    const {basicchannelStore: {virtualList}} = this.props;
    const record = _.filter(toJS(virtualList), app => {
      return app.channelID === data.pd.F_ChannelID;
    });
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.F_ChannelID.value = data.pd.F_ChannelID || '';
      formValue.F_ChannelName.value = data.pd.F_ChannelName || '';
      formValue.F_ValueType.value = data.pd.F_ValueType;
      formValue.F_ChannelType.value = data.pd.F_ChannelType;
      formValue.F_Ratio.value = data.pd.F_Ratio;
      formValue.F_StorePeriod.value = data.pd.F_StorePeriod;
      formValue.F_StoreMode.value = data.pd.F_StoreMode;
      // formValue.F_DeviceType.value = `${data.pd.F_DeviceType}_${
      //   data.pd.F_Version
      // }`;
      data.pd.F_ChannelType === 5
        ? (formValue.virtual.value = data.pd.F_ChannelID)
        : '';
      formValue.F_Threshold.value = data.pd.F_Threshold;
      formValue.F_ShowPrecision.value = data.pd.F_ShowPrecision;
      formValue.F_Unit.value = data.pd.F_Unit || '';
      formValue.F_AlarmVoiceDelay.value = data.pd.F_AlarmVoiceDelay;
      formValue.F_ShowOrder.value = data.pd.F_ShowOrder;
      formValue.F_Status.value = data.pd.F_Status;
      formValue.F_ValueDescription.value = data.pd.F_ValueDescription || '';
      formValue.F_AnalyOrder.value = data.pd.F_AnalyOrder || '';
      formValue.F_RelateChannelNO.value = data.pd.F_RelateChannelNO || '';
      formValue.F_DisplayFormat.value = data.pd.F_DisplayFormat || '';
      return {
        fields: {
          ...fields,
          ...formValue,
        },
        isVchannel: data.pd.F_ChannelType === 5,
        singleLineData: item,
        editShow: true,
        type: mode,
      };
    });
  }
  editClick(item) {
    const {basicchannelStore: {initEdit, getVirtualList}} = this.props;
    getVirtualList({
      F_TypeID: item.F_DeviceType,
      F_Version: item.F_Version,
    });
    const params = {
      F_ID: item.F_ID,
    };
    initEdit(params).then(data => {
      data && this.initFromValue(data, 'modify', item);
    });
    this.alarmClick(item);
  }
  //告警设置
  onValueTypeCancel() {
    this.setState({
      valueTypeShow: false,
    });
  }
  onValueTypeOk() {
    const {
      basicchannelStore: {v_tableData, valueTypeChange, valueMeanSave},
    } = this.props;
    let valueMeanTable = toJS(v_tableData);
    let hasError = [];
    const errorTable = _.map(valueMeanTable, (record, index) => {
      if (
        (!record.value && record.value !== 0) ||
        (!record.valueMean && record.valueMean !== 0)
      ) {
        if (valueMeanTable.length === 1) {
          valueMeanTable = [];
        } else {
          hasError.push(index + 1);
        }
        return {
          ...record,
          error: true,
        };
      } else {
        return record;
      }
    });

    if (hasError[0]) {
      valueTypeChange(errorTable);
      message.error(
        `配置值属性里的第${hasError.join(',')}条值里存在空值,请填写完整!`,
      );
      return;
    }
    //过滤后端所需要的数据
    const item = this.state.singleLineData;
    const valueMeanData = _.map(valueMeanTable, item => {
      return `${item.value}:${item.valueMean}`;
    });

    const params = {
      F_DeviceType: item.F_DeviceType,
      F_Version: item.F_Version,
      F_ChannelID: item.F_ChannelID,
      F_ChannelType: item.F_ChannelType,
      values: valueMeanData.join(','),
    };
    valueMeanSave(params).then(() => {
      this.setState({
        valueTypeShow: false,
      });
    });
  }
  valueTypeClick() {
    const {basicchannelStore: {getValuePropertyList}} = this.props;
    const item = this.state.singleLineData;
    const params = {
      F_ChannelID: item.F_ChannelID,
      F_DeviceType: item.F_DeviceType,
      F_Version: item.F_Version,
      F_ChannelType: item.F_ChannelType,
    };
    getValuePropertyList(params).then(() => {
      this.setState({
        valueTypeShow: true,
      });
    });
  }
  addVirtual() {
    const {basicchannelStore} = this.props;
    basicchannelStore.getGoAdd({Area_ID: 0}).then(() => {
      this.setState({
        virtualShow: true,
      });
    });
  }
  onVirtualOk() {
    const fields = this.state.virtualFields;
    const showError = this.test(fields);
    const hasError = _.keys(showError);

    if (hasError[0]) {
      this.setState(({virtualFields}) => {
        return {
          virtualFields: {
            ...virtualFields,
            ...showError,
          },
        };
      });
    } else {
      const {
        basicchannelStore: {
          virtualSave,
          channelList,
          getVirtualList,
          tableParmas,
        },
      } = this.props;
      const item = this.state.singleLineData;
      const params =
        this.state.type === 'new'
          ? {Id_Version: `${tableParmas.F_TypeID}_${tableParmas.F_Version}`}
          : {Id_Version: `${item.F_DeviceType}_${item.F_Version}`};
      // this.state.type === 'modify' &&
      //   (params.F_Fid = this.state.singleLineData.fid);
      _.forIn(fields, (value, key) => {
        if (key === 'F_RelateChannelName') {
          params['F_RelateChannelID'] = value.value.join(',');
          const selectChannel = _.filter(channelList.varList, item => {
            return value.value.indexOf(item.F_ChannelID) != -1;
          });
          params[key] = _.map(selectChannel, item => {
            return item.F_ChannelName;
          }).join(',');
        } else {
          params[key] = value.value;
        }
      });

      virtualSave(params).then(data => {
        getVirtualList({
          F_TypeID:
            this.state.type === 'new'
              ? tableParmas.F_TypeID
              : item.F_DeviceType,
          F_Version:
            this.state.type === 'new' ? tableParmas.F_Version : item.F_Version,
        });
        this.clearState(data);
      });
    }
  }
  clearState(data) {
    data &&
      this.setState({
        ...virtualParams,
        virtualShow: false,
      });
  }
  onVirtualCancel() {
    this.setState({
      ...virtualParams,
      virtualShow: false,
    });
  }
  onEditCancel() {
    this.setState({
      ...formParams,
      isVchannel: false,
      editShow: false,
    });
  }
  detailClick(item) {
    const {basicchannelStore: {initEdit, getVirtualList}} = this.props;
    getVirtualList({
      F_TypeID: item.F_DeviceType,
      F_Version: item.F_Version,
    });
    const params = {
      F_ID: item.F_ID,
    };
    initEdit(params).then(data => {
      data && this.initFromValue(data, 'detail', item);
    });
    this.alarmClick(item, 'detail');
  }
  alarmClick(item, detail) {
    const {basicchannelStore: {getAlarmTable}} = this.props;
    const params = {
      F_DeviceType: item.F_DeviceType,
      F_Version: item.F_Version,
      F_ChannelID: item.F_ChannelID,
    };
    getAlarmTable(params, detail).then(() => {
      this.setState({
        currentChannelID: item.F_ChannelID,
        F_DeviceType: item.F_DeviceType,
        F_Version: item.F_Version,
      });
    });
  }
  channelTypeChange(value) {
    const {basicchannelStore: {getTable, tableParmas}} = this.props;
    const params = {
      ...tableParmas,
      F_ChannelType: value,
    };
    getTable(params);
  }

  onExportClick() {
    const {basicchannelStore: {tableParmas}} = this.props;
    location.href =
      '/collect/device_basechannel/toExcel.do?F_DeviceType=' +
      tableParmas.F_TypeID +
      '&F_Version=' +
      tableParmas.F_Version;
  }
  onImportClick() {
    this.setState({
      importShow: true,
    });
  }
  onExportTplClick() {
    location.href = '/collect/device_basechannel/downExcel.do';
  }
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
  alarmOk() {
    const {
      basicchannelStore: {a_tableData, alarmDataChange, alarmBatchSave},
    } = this.props;
    let alarmTable = toJS(a_tableData);
    let hasAlarmError = [];
    const errorTable = _.map(alarmTable, (record, index) => {
      if (
        (!record.conType && record.conType !== 0) ||
        (!record.msgID && record.msgID !== 0) ||
        (!record.condition && record.condition !== 0)
      ) {
        if (
          alarmTable.length === 1 &&
          !record.conType &&
          !record.msgID &&
          !record.condition
        ) {
          alarmTable = [];
        } else {
          hasAlarmError.push(index + 1);
        }
        return {
          ...record,
          error: true,
        };
      } else {
        return record;
      }
    });

    if (hasAlarmError[0]) {
      alarmDataChange(errorTable);
      message.error(
        `告警条件里的第${hasAlarmError.join(',')}条告警存在空值,请填写完整!`,
      );
      return false;
    }
    //过滤后端所需要的数据
    let isNumber = true;
    const item = this.state.singleLineData;
    const alarmData = _.map(alarmTable, app => {
      if (isNaN(Number(app.alarmDelay))) {
        message.error('告警延迟只能输入数字！');
        isNumber = false;
      }

      return {
        conType: app.conType,
        condition: app.condition,
        msgID: app.msgID,
        alarmDelay: parseInt(app.alarmDelay),
      };
    });
    if (!isNumber) return false;

    const params = {
      F_DeviceType: item.F_DeviceType,
      F_Version: item.F_Version,
      F_ChannelID: item.F_ChannelID,
      alarmConditions: alarmData,
    };
    alarmBatchSave(params);
    return true;
  }
  onEditOk() {
    const fields = this.state.fields;
    const showError = this.test(fields);
    const hasError = _.keys(showError);

    if (hasError[0]) {
      this.setState(({fields}) => {
        return {
          fields: {
            ...fields,
            ...showError,
          },
        };
      });
    } else {
      //告警条件确认
      if (this.state.type !== 'new') {
        if (!this.alarmOk()) return;
      }
      const {
        basicchannelStore: {save, edit, getTable, tableParmas},
      } = this.props;
      const F_ID =
        this.state.type === 'modify'
          ? {F_ID: this.state.singleLineData.F_ID}
          : {};

      const params = {
        ...F_ID,
        F_DeviceType:
          this.state.type !== 'new'
            ? this.state.singleLineData.F_DeviceType
            : tableParmas.F_TypeID,
        F_Version:
          this.state.type !== 'new'
            ? this.state.singleLineData.F_Version
            : tableParmas.F_Version,
      };
      _.forIn(fields, (value, key) => {
        // key == 'F_ChannelName'
        //   ? (params[key] = encodeURIComponent(value.value))
        //   : (params[key] = value.value);
        params[key] = value.value;
      });
      this.state.type == 'modify'
        ? edit(params).then(() => {
            getTable(tableParmas);
          })
        : save(params).then(() => {
            getTable(tableParmas);
          });
      this.setState({
        ...formParams,
        editShow: false,
      });
    }
  }
  handleFormChange(changedFields) {
    this.setState(({fields}) => {
      //showError让自己校验字段
      const key = _.keys(changedFields);
      const obj = {};
      //值类型影响显示精度
      if (key[0] === 'F_ValueType') {
        if (changedFields[key].value === 2) {
          obj['F_ShowPrecision'] = {...fields.F_ShowPrecision, value: 2};
        } else {
          obj['F_ShowPrecision'] = {...fields.F_ShowPrecision, value: 0};
        }
      } else if (key[0] === 'virtual') {
        const {basicchannelStore: {virtualList}} = this.props;
        const item = _.filter(virtualList, item => {
          return item.fid === changedFields[key].value;
        });
        obj['F_ChannelID'] = {...fields.F_ChannelID, value: item[0].channelID};
      } else if (key[0] === 'F_ChannelID') {
        obj['virtual'] = {...fields.virtual, value: undefined};
      } else if (key[0] === 'F_ChannelType') {
        changedFields[key].value !== 5 &&
          (obj['virtual'] = {...fields.virtual, value: undefined});
      }

      obj[key] = {showError: false, ...changedFields[key]};
      return {
        fields: {...fields, ...obj},
      };
    });
  }
  onRowDoubleClick(item, e) {
    const {basicchannelStore: {initEdit}} = this.props;
    const params = {
      F_ID: item.F_ID,
    };
    initEdit(params).then(data => {
      data && this.initFromValue(data, 'detail', item);
    });
  }
  virtualFormChange(changedFields) {
    const obj = {};
    const key = _.keys(changedFields);
    if (key[0] === 'F_RelateChannelName') {
      const expression = {
        value: _.map(changedFields[key].value, (item, i) => {
          return `{${i}}`;
        }).join(','),
        name: 'F_Expression',
      };
      // const {vchannelStore: {channelList}} = this.props;
      // const selectedChannel = _.filter(channelList, item => {
      //   return changedFields[key].value.indexOf(item.F_ChannelID) != -1;
      // });

      obj['F_Expression'] = expression;
    }

    //showError让自己校验字段
    obj[key] = {showError: false, ...changedFields[key]};
    this.setState(({virtualFields}) => {
      return {
        virtualFields: {...virtualFields, ...obj},
      };
    });
  }

  render() {
    const {basicchannelStore, regionalStore} = this.props;
    const tableData = toJS(basicchannelStore.tableData);
    const data = (tableData && tableData.varList) || [];
    const pagination = tableData.pd || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      detailClick: this.detailClick,
      editClick: this.editClick,
      _this: this,
    });
    let title = '';
    switch (this.state.type) {
      case 'new':
        title = '通道新增';
        break;
      case 'detail':
        title = '通道详情';
        break;
      case 'modify':
        title = '通道修改';
        break;
    }
    const props = {
      name: 'file',
      action: '/collect/device_basechannel/readExcel.do',
      headers: {
        authorization: 'authorization-text',
      },
      data: {
        F_TypeID: basicchannelStore.tableParmas.F_TypeID,
        F_Version: basicchannelStore.tableParmas.F_Version,
      },
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if (info.file.response && info.file.response.Result === 'success') {
            message.success(`${info.file.name} 导入成功！`);

            basicchannelStore.getTable(basicchannelStore.tableParmas);
          } else {
            message.error(`${info.file.name} 导入失败！`);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败！`);
        }
      },
    };
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
              channelTypeChange={this.channelTypeChange}
              channelType={true}
              showValue={['export', 'add', 'import', 'exportTpl']}
              onImportClick={this.onImportClick}
              onExportTplClick={this.onExportTplClick}
              onExportClick={this.onExportClick}
              onClick={this.add}
            />
            <Table
              pageIndex={pagination.page}
              pageSize={pagination.showCount}
              loading={basicchannelStore.loading}
              onRowDoubleClick={this.onRowDoubleClick}
              total={pagination.allCount}
              columns={columns}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              data={data}
              useDefaultRowKey={true}
            />
          </div>
        </div>
        <EditModal
          isShow={this.state.valueTypeShow}
          onOk={this.onValueTypeOk}
          buttons={true}
          width={900}
          title={'配置值属性'}
          onCancel={this.onValueTypeCancel}>
          <ValueTypeContent />
        </EditModal>
        <EditModal
          isShow={this.state.virtualShow}
          onOk={this.onVirtualOk}
          buttons={true}
          title={'虚拟通道新增'}
          width={842}
          onCancel={this.onVirtualCancel}>
          <VirtualContent
            handleFormChange={this.virtualFormChange}
            fields={this.state.virtualFields}
          />
        </EditModal>
        <DeleteModal
          isShow={this.state.deleteShow}
          onOk={this.onDeleteOk}
          onCancel={this.onDeleteCancel}
        />
        <DeleteModal
          isShow={this.state.importShow}
          hintContent={
            '导入基础通道会删除当前设备类型下原有通道信息, 是否继续?'
          }
          onOk={this.onImportOk}
          onCancel={this.onImportCancel}
        />
        <EditModal
          width={850}
          buttons={this.state.type == 'detail' ? false : true}
          wrapClassName={'cl_basic_modal'}
          isShow={this.state.editShow}
          title={title}
          onOk={this.onEditOk}
          onCancel={this.onEditCancel}>
          <EditContent
            fields={this.state.fields}
            mode={this.state.type}
            valueTypeClick={this.valueTypeClick}
            addVirtual={this.addVirtual}
            isVchannel={this.state.isVchannel}
            handleFormChange={this.handleFormChange}
          />
        </EditModal>
        <Upload {...props}>
          <span
            style={{display: 'none'}}
            ref={c => {
              this.upload = c;
            }}
          />
        </Upload>
      </div>
    );
  }
}

export default Regional;
