import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import Cookies from 'js-cookie';
import Table from '../../../components/Table';
import {decorate as mixin} from 'react-mixin';
import columnData from './childColumns.js';
import Toolbar from '../../../components/Toolbar';
import {message, Upload} from 'antd';
import DeleteModal from '../../../components/DeleteModal';
//实例
@inject('passagewayStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.add = this.add.bind(this);
    this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.onExportTplClick = this.onExportTplClick.bind(this);
    this.channelTypeChange = this.channelTypeChange.bind(this);
    this.onImportClick = this.onImportClick.bind(this);
    this.onImportCancel = this.onImportCancel.bind(this);
    this.onImportOk = this.onImportOk.bind(this);
    this.state = {
      importShow: false,
    };
  }
  componentDidMount() {}
  //table分页
  onShowSizeChange(current, pageSize) {
    const {passagewayStore} = this.props;

    const params = {
      ...passagewayStore.c_tableParmas,
      page: current,
      number: pageSize,
    };
    passagewayStore.getChildTable(params);
  }
  onExportTplClick() {
    location.href = '/collect/device_channel/downExcel';
  }
  onImportClick() {
    this.setState({
      importShow: true,
    });
  }
  onPageChange(pageNumber) {
    const {passagewayStore} = this.props;
    const params = {
      ...passagewayStore.c_tableParmas,
      page: pageNumber,
    };
    passagewayStore.getChildTable(params);
  }
  onSearch(value) {
    const {passagewayStore} = this.props;
    const params = {
      ...passagewayStore.c_tableParmas,
      keywords: encodeURIComponent(value),
      page: 1,
    };
    passagewayStore.childSearch(params);
  }
  add() {
    const {addClick} = this.props;
    addClick();
  }
  detailClick(item) {
    const {detailClick} = this.props;
    detailClick(item);
  }
  deleteClick(item) {
    const {deleteClick} = this.props;
    deleteClick(item);
  }
  editClick(item) {
    const {editClick} = this.props;
    editClick(item);
  }
  channelTypeChange(value) {
    const {channelTypeChange} = this.props;
    channelTypeChange(value);
  }

  onExportClick() {
    const {onExportClick} = this.props;
    onExportClick();
  }
  onRowDoubleClick(item) {
    const {detailClick} = this.props;
    detailClick(item);
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
  render() {
    const {passagewayStore, currentDevice} = this.props;
    const c_tableData = toJS(passagewayStore.c_tableData);
    const tableData = (c_tableData && c_tableData.varList) || [];
    const pagination = c_tableData || {};
    const columns = columnData({
      deleteClick: this.deleteClick,
      detailClick: this.detailClick,
      editClick: this.editClick,
      _this: this,
    });
    const data = _.map(tableData, (item, index) => {
      return {...item, num: index + 1};
    });
    const props = {
      name: 'file',
      action: '/collect/device_channel/bathcAddDeviceChannels?',
      headers: {
        authorization: 'authorization-text',
      },
      data: {
        deviceID: currentDevice,
      },
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if (info.file.response && info.file.response.Result === 'success') {
            message.success(`${info.file.name} 导入成功！`);
            const params = {
              keywords: '',
              page: 1,
              F_DeviceID: currentDevice,
              number: 10,
            };
            passagewayStore.getChildTable(params);
          } else {
            message.error(info.file.response.Msg);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败！`);
        }
      },
    };
    return (
      <div>
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
          pageSize={pagination.number}
          loading={passagewayStore.c_loading}
          total={pagination.count}
          columns={columns}
          onRowDoubleClick={this.onRowDoubleClick}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          data={data}
          useDefaultRowKey={true}
        />
        <DeleteModal
          isShow={this.state.importShow}
          hintContent={
            '导入设备通道会删除当前设备类型下原有通道信息, 是否继续?'
          }
          onOk={this.onImportOk}
          onCancel={this.onImportCancel}
        />
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
