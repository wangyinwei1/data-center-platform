import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import {Link} from 'react-router';
import _ from 'lodash';
import {Input, Row, Col, Upload, Button, message} from 'antd';
import {toJS} from 'mobx';
import classnames from 'classnames';
import Cascader from '../../components/Cascader';
import {cascader} from '../bsifm/common';
import LeftMenu from './leftMenu.js';
import VideoMenu from './menu.js';
import {decorate as mixin} from 'react-mixin';

//实例
@inject('regionalStore', 'sitemonitoringStore')
@observer
@mixin(cascader)
class Regional extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      cascaderLoading: false,
      cascaderValue: [],
      cascaderText: '',
    };
  }

  //级联组件方法
  loadData(selectedOptions, index, callback) {
    const text = selectedOptions[0].code;
    var area = /^\d{8}\b/; //区下的编码匹配
    const isSite = area.test(text);

    if (isSite) {
      callback();
      return;
    }
    this.c_loadData(selectedOptions, index, callback);
  }
  onTextChange(value) {
    this.c_onTextChange(value);
  }
  onCascaderChange(value, selectedOptions) {
    this.setState({
      cascaderText: value,
      cascaderValue: value.split('/'),
    });
    const params = {
      page: 1,
      sing: 'area',
      keywords: '',
      number: 999,
      ztreeChild: selectedOptions[0].code,
    };
    const {sitemonitoringStore} = this.props;
    sitemonitoringStore.changeSelectedValue('').then(() => {
      sitemonitoringStore.getList(params);
    });
  }
  async _initLoading() {
    const {regionalStore, sitemonitoringStore} = this.props;
    const data = await regionalStore.getAsynArea();
    let ztreeChild = 0;
    if (data.length > 1) {
      this.setState({
        cascaderText: '全国',
      });
    } else if (data.length == 1) {
      this.setState({
        cascaderText: data[0].name,
      });
    }
    //默认属于哪个区域
    if (data.length > 1) {
      ztreeChild = 0;
    } else {
      ztreeChild = data[0] && data[0].code;
    }
    return ztreeChild;
  }
  onKeyPress(e) {
    const {regionalStore} = this.props;
    this.c_onKeyPress(regionalStore);
  }
  componentDidMount() {
    const {sitemonitoringStore, router} = this.props;
    this._initLoading().then(ztreeChild => {
      let params = {
        page: 1,
        sing: 'area',
        keywords: '',
        number: 999,
        ztreeChild,
      };
      //设置初始值
      sitemonitoringStore.getList(params);
    });
  }
  componentWillUnmount() {
    const {sitemonitoringStore: {changeActiveKey}} = this.props;
    changeActiveKey('1');
  }

  //渲染
  render() {
    const {sitemonitoringStore, regionalStore} = this.props;

    // const belongRegion = siteStore.belongRegion;
    // const isCloseAdd =
    //   belongRegion == 'country' || belongRegion == 'province' ? true : false;
    return (
      <div className={styles['wrap']}>
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
        <div className={styles['container']}>
          <LeftMenu />
          <VideoMenu {...this.props} />
        </div>
      </div>
    );
  }
}

export default Regional;
