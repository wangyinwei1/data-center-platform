import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import Cascader from '../../../components/Cascader';
import {toJS} from 'mobx';
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
import {validateFields} from './common.js';
import {formParams} from './tplJson.js';
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
      type: 'new',
      ...formParams,
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
    const params = {id: this.state.currentData.id};
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
  editClick = record => {
    const {
      sitetreasureStore: {ztreeChild, findStationByCode},
    } = this.props;
    findStationByCode({code: ztreeChild}).then(() => {
      this.initFromValue(record);
    });
  };
  initFromValue(data) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.gdbId.value = data.gdbId || '';
      formValue.name.value = data.name || '';
      formValue.stationId.value = parseInt(data.stationId) || '';
      formValue.dataFilterTime.value = data.dataFilterTime || '';
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
      sitetreasureStore: {siteTreasureEdit, siteTreasureSave},
    } = this.props;
    validateFields(
      toJS(fields),
      () => {
        const params = {
          name: fields.name.value,
          dataFilterTime: fields.dataFilterTime.value,
          gdbId: fields.gdbId.value,
          stationId: fields.stationId.value,
        };
        this.state.type === 'modify' && (params['id'] = currentData.id);
        this.state.type === 'new'
          ? siteTreasureSave(params).then(data => {
              this.clearParams(data);
            })
          : siteTreasureEdit(params).then(data => {
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
  render() {
    const {sitetreasureStore, regionalStore} = this.props;
    const tableData = toJS(sitetreasureStore.tableData.list) || [];
    const pagination = toJS(sitetreasureStore.tableData) || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
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
            <Toolbar onSearch={this.onSearch} onClick={this.add} />
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
          isShow={this.state.editShow}
          mode={this.state.type}
          onOk={this.onEditOk}
          title={this.state.type === 'new' ? '网关新增' : '网关修改'}
          width={850}
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
      </div>
    );
  }
}

export default Passageway;
