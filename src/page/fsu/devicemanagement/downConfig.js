import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import {Form, Button, Select, Row, Col, message} from 'antd';
import classnames from 'classnames';
const FormItem = Form.Item;
const Option = Select.Option;

//实例
@inject('passagewayStore', 'fsuconfigStore')
@Form.create()
@observer
class AlarmCondition extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      F_ChannelID: '',
      controlValue: '',
      value: [],
      Channels: '',
      allSelected: false,
    };
  }
  handleClick() {
    if (!this.state.Channels) {
      message.error('下发文件不能为空');
      return;
    }
    const {
      fsuconfigStore: {sendConfigFileList, tableData},
      selectedDevice,
    } = this.props;
    if (!selectedDevice) {
      message.error('请选择所需要下发的FSU设备!');
      return;
    }
    const params = {
      suIDs: selectedDevice,
      files: this.state.Channels,
    };
    sendConfigFileList(params).then(data => {
      if (data) {
        const {closeDownShowChange} = this.props;
        closeDownShowChange();
      }
    });
  }
  isAllSelected(value, tableData) {
    let isAll = true;
    _.map(tableData, item => {
      if (value.indexOf(item.ConfigFileName) === -1) isAll = false;
    });
    return isAll;
  }
  allSelectClick() {
    const selected = this.state.allSelected;
    if (!selected) {
      const {fsuconfigStore} = this.props;
      const tableData = toJS(fsuconfigStore.tableData.data);
      let result = [];
      _.map(tableData, item => {
        result.push(item.ConfigFileName);
      });
      this.setState({
        allSelected: !this.state.allSelected,
        Channels: result.join(','),
        value: result,
      });
    } else {
      $(`.${styles['drop_down']} .ant-select-selection__clear`).click();
    }
  }
  onSelect(value, option) {
    if (value.indexOf('all') != -1) {
      this.allSelectClick();
      return;
    }
    if (!value[0]) {
      this.setState({
        Channels: value.join(','),
        value,
        allSelected: false,
      });
    } else {
      const {fsuconfigStore} = this.props;
      const tableData = toJS(fsuconfigStore.tableData.data);
      const isAll =
        value.length === tableData.length &&
        this.isAllSelected(value, tableData);
      this.setState({
        Channels: value.join(','),
        allSelected: isAll,
        value,
      });
    }
  }
  render() {
    const {fsuconfigStore: {tableData}} = this.props;
    const children = _.map(tableData, (item, i) => {
      return <Option key={item.ConfigFileName}>{item.ConfigFileName}</Option>;
    });
    children.unshift(
      <Option
        className={classnames(this.state.allSelected && styles['all_selected'])}
        key={'all'}>
        全选
      </Option>,
    );
    return (
      <Form className={styles['control_ct']}>
        <Row className={styles['be_careful']}>
          注意：下发FSU配置文件对离线设备无效！
        </Row>
        <Row>
          <Col span={1} className={styles['channel_id']}>
            <FormItem label="FSU配置文件名">
              <Select
                mode="multiple"
                className={styles['drop_down']}
                allowClear
                optionFilterProp="children"
                placeholder={'请选择FSU配置文件'}
                value={this.state.value}
                onChange={this.onSelect}>
                {children}
              </Select>
            </FormItem>
          </Col>
          <Col span={1} className={styles['search']}>
            <Button onClick={this.handleClick}>下发配置文件</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default AlarmCondition;
