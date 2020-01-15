import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Menu, Icon, Upload, message, Button, Tabs} from 'antd';
import styles from './index.less';
import {Link} from 'react-router';
import _ from 'lodash';
import classnames from 'classnames';
const {TabPane} = Tabs;
import FsuSpType from '../fsuSpType';
import FsuSubDeviceType from '../fsuSubDeviceType';
//实例
@inject('globalStore', 'layoutStore', 'fsu_basicconfigStore')
@observer
class FsuMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.import = this.import.bind(this);
    this.state = {
      current: 'deviceType',
    };
  }
  componentDidMount() {}
  handleClick(key) {}
  import() {
    $(this.upload).click();
  }
  render() {
    const {
      location,
      fsu_basicconfigStore: {getDeviceTypeList, getSpTypeList},
    } = this.props;
    const selectedKeys = [];
    location.pathname == '/fsu-deviceType' && selectedKeys.push('deviceType');
    location.pathname == '/fsu-spType' && selectedKeys.push('spType');

    const equipments = [
      {
        type: 'deviceType',
        name: '子设备类型',
      },
      {
        type: 'spType',
        name: '监控点类型',
      },
    ];
    const props = {
      name: 'file',
      action: '/collect/fsuBaseConfig/readExcel',
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList: false,
      data: {
        fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if (info.file.response && info.file.response.Result === 'success') {
            message.success(`${info.file.name} 导入成功！`);

            const params = {
              page: 1,
              keywords: '',
              number: 10,
              fsuTypeId: JSON.parse(localStorage.getItem('FsuTypeID')),
            };
            getDeviceTypeList(params);
            getSpTypeList(params);
          } else {
            message.error(info.file.response.Msg);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败！`);
        }
      },
    };
    const ImportButton = () => {
      return (
        <Button className={styles['import_btn']} onClick={this.import}>
          <i
            className={classnames(
              'icon iconfont icon-daoru',
              styles['common_icon'],
            )}
          />
          <span>导入</span>
        </Button>
      );
    };
    return (
      <div className={styles['admin_wrap']}>
        <Tabs defaultActiveKey="deviceType" onChange={this.handleClick}>
          <TabPane tab="子设备类型" key="deviceType">
            <div className={styles['type_wrap']}>
              <ImportButton />
              <FsuSubDeviceType />
            </div>
          </TabPane>
          <TabPane tab="监控点类型" key="spType">
            <div className={styles['type_wrap']}>
              <ImportButton />
              <FsuSpType />
            </div>
          </TabPane>
        </Tabs>
        ,
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

export default FsuMenu;
