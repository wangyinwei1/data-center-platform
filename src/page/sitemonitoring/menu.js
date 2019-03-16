import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import Panel from '../../components/Panel';
import {Link} from 'react-router';
import _ from 'lodash';
import {Input, Icon, Row, Col, Tabs, Upload, Button, message} from 'antd';
import {toJS} from 'mobx';
import classnames from 'classnames';
import Cascader from '../../components/Cascader';
import {cascader} from '../bsifm/common';
import LeftMenu from './leftMenu.js';
import Detail from './detail.js';
import A3D from './3d.js';
import ChildTable from './childTable.js';

import {decorate as mixin} from 'react-mixin';
const TabPane = Tabs.TabPane;

//实例
@inject('regionalStore', 'sitemonitoringStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      show: false,
      activeKey: '1',
    };
  }
  componentDidMount() {}
  onChange(activeKey) {
    const {sitemonitoringStore: {changeActiveKey}} = this.props;
    changeActiveKey(activeKey);
  }
  onCancel() {
    this.setState({
      show: false,
    });
  }
  handleClick() {
    this.setState({
      show: true,
    });
    const {sitemonitoringStore} = this.props;
    const params = {
      page: 1,
      number: 10,
      stationID:
        (sitemonitoringStore.currentCode &&
          sitemonitoringStore.currentCode.ztreeChild) ||
        0,
    };
    sitemonitoringStore.getStationAlarm(params);
  }

  //渲染
  render() {
    const {sitemonitoringStore: {activeKey}} = this.props;
    return (
      <div
        className={classnames(
          styles['detail_wrap'],
          styles['detail_menu_wrap'],
        )}>
        <Tabs activeKey={activeKey} onChange={this.onChange}>
          <TabPane
            tab={<span>实时数据</span>}
            key="1"
            className={styles['s_data']}>
            {activeKey === '1' && <Detail {...this.props} />}
          </TabPane>
          <TabPane tab={<span>3D组态</span>} key="2">
            {activeKey === '2' && <A3D />}
          </TabPane>
        </Tabs>
        {activeKey === '1' && (
          <div className={styles['alarm']}>
            <Button onClick={this.handleClick}>当前机房告警</Button>
          </div>
        )}
        <Panel
          onCancel={this.onCancel}
          title={'当前机房告警'}
          isShow={this.state.show}>
          <ChildTable />
        </Panel>
      </div>
    );
  }
}

export default Regional;
