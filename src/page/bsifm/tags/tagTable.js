import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {cascader} from '../common';
import DeleteModal from '../../../components/DeleteModal';
import EditModal from '../../../components/EditModal';
import Panel from '../../../components/Panel';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import classnames from 'classnames';
import EditContent from './editContent.js';
import columnData from './columns.js';
import {validateFields} from '../siteTreasure/common.js';
import Toolbar from '../../../components/Toolbar';
import {formParams} from './tplJson.js';
import ChildTable from './childTable.js';
import moment from 'moment';
//实例
@inject('tagsStore', 'realtimealarmStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteShow: false,
      currentData: {},
      editShow: false,
      type: 'new',
      childTableVisible: false,
      childTableTitle: '',
      whichTable: '',
      ...formParams,
    };
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange = (current, pageSize) => {
    const {tagsStore} = this.props;

    const params = {
      ...tagsStore.tagParmas,
      page: current,
      number: pageSize,
    };
    tagsStore.getTagList(params);
  };
  onPageChange = pageNumber => {
    const {tagsStore} = this.props;
    const params = {
      ...tagsStore.tagParmas,
      page: pageNumber,
    };
    tagsStore.getTagList(params);
  };
  onSearch = value => {
    const {tagsStore} = this.props;
    const params = {
      number: 10,
      ...tagsStore.tagParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    tagsStore.getTagList(params);
  };
  onCancel = () => {
    this.setState({
      childTableVisible: false,
    });
  };
  deleteClick = record => {
    this.setState({
      deleteShow: true,
      currentData: record,
    });
  };
  onDeleteOk = () => {
    const {tagsStore} = this.props;
    const params = {
      chipId: this.state.currentData.chipId,
      gdbId: this.state.currentData.gdbId,
    };

    tagsStore.delete(params).then(() => {
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
    this.initFromValue(record);
  };
  initFromValue(data) {
    this.setState(({fields}) => {
      let formValue = _.cloneDeep([fields])[0];
      formValue.gdbId.value = data.gdbId || '';
      formValue.chipName.value = data.chipName || '';
      formValue.chipId.value = data.chipId || '';
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
    const {
      tagsStore: {tagEdit, tagSave, selectedValue},
    } = this.props;
    validateFields(
      toJS(fields),
      () => {
        const params = {
          gdbId: selectedValue,
          chipId: fields.chipId.value,
          chipName: fields.chipName.value,
        };
        this.state.type === 'new'
          ? tagSave(params).then(data => {
              this.clearParams(data);
            })
          : tagEdit(params).then(data => {
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
    this.setState({
      editShow: true,
      type: 'new',
    });
  };
  getChildTable = (record, which) => {
    const {tagsStore} = this.props;

    const params = {
      keywords: '',
      page: 1,
      number: 10,
      gdbId: record.gdbId,
      chipId: record.chipId,
      startTime: moment()
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
    };
    tagsStore.getTagDetail(params, which);
    this.setState({
      childTableVisible: true,
      whichTable: which,
      childTableTitle: record.chipName,
    });
  };
  render() {
    const {tagsStore, theme} = this.props;
    const c_tableData = toJS(tagsStore.tagData);
    const tableData = (c_tableData && c_tableData.list) || [];
    const pagination = c_tableData || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      editClick: this.editClick,
      getChildTable: this.getChildTable,
      _this: this,
    });
    return (
      <div
        className={classnames(
          styles['detail_wrap'],
          styles['detail_menu_wrap'],
        )}>
        <Toolbar onSearch={this.onSearch} onClick={this.add} />
        <Table
          pageIndex={pagination.page}
          pageSize={pagination.number}
          total={pagination.allCount}
          columns={columns}
          theme={theme}
          loading={tagsStore.tagLoading}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={tableData}
          useDefaultRowKey={true}
        />
        <DeleteModal
          isShow={this.state.deleteShow}
          onOk={this.onDeleteOk}
          onCancel={this.onDeleteCancel}
        />
        <EditModal
          isShow={this.state.editShow}
          mode={this.state.type}
          onOk={this.onEditOk}
          title={this.state.type === 'new' ? '设备新增' : '设备修改'}
          width={850}
          buttons={true}
          onCancel={this.onEditCancel}>
          <EditContent
            handleFormChange={this.handleFormChange}
            fields={this.state.fields}
            record={this.state.currentData}
            type={this.state.type}
          />
        </EditModal>
        <Panel
          onCancel={this.onCancel}
          title={this.state.childTableTitle}
          isShow={this.state.childTableVisible}>
          <ChildTable whichTable={this.state.whichTable} />
        </Panel>
      </div>
    );
  }
}

export default Regional;
