import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import _ from 'lodash';
import {Input, Col, Form, Row, Select, Cascader, Spin} from 'antd';
import {toJS} from 'mobx';
import Cl_Cascader from './cascader.js';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
//实例
@inject('regionalStore')
@Form.create()
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.areaTextChange = this.areaTextChange.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.isSearchCallback = this.isSearchCallback.bind(this);
    this.state = {
      visible: false,
      areaText: '',
      cascaderValue: [],
      value: true,
      isSearch: false,
    };
  }
  componentdidmount() {
    // 进入获取焦点
    $(this.areatext.input).focus();
    $(document).on('click.areatext', () => {
      if (this.state.visible) {
        this.cascaderhide();
      }
    });
  }
  shouldcomponentupdate(nextprops, nextstate) {
    return (
      !shallowequalimmutable(this.props, nextprops) ||
      !shallowequalimmutable(this.state, nextstate)
    );
  }
  componentwillunmount() {
    $(document).off('click.areatext');
  }

  areaTextChange(e) {
    this.state.visible && this.cascaderHide();
    const areaText = e.target.value;
    const cascaderValue = areaText.split('/');
    const {onTextChange} = this.props;
    onTextChange(areaText);

    this.setState({
      cascaderValue,
    });
  }

  onChange(value, selectedOptions) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    if (!targetOption.isParent) {
      this.cascaderHide();
      this.setState({value: false});
    }

    const areaText = value.join('/');
    const {onChange} = this.props;
    onChange(areaText, selectedOptions);

    this.setState({
      cascaderValue: value,
    });
  }
  loadData(selectedOptions, index, callback) {
    const {loadData} = this.props;
    loadData(selectedOptions, index, callback);
  }
  cascaderHide() {
    $('#cl_tree_cascader').fadeOut('fast');
    this.setState({visible: false});
  }
  cascaderShow() {
    $('#cl_tree_cascader').fadeIn('fast');
    this.setState({visible: true});
  }
  onKeyPress(e) {
    if (e.keyCode == 13) {
      const {onKeyPress} = this.props;
      this.cascaderShow();
      onKeyPress(e);
      //是不是键盘搜索
      this.setState({
        isSearch: true,
      });
    }
  }
  handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    !this.state.visible && this.cascaderShow();
  }
  handleLeave() {
    this.time =
      !this.props.loading &&
      setTimeout(() => {
        this.cascaderHide();
      }, 500);
  }
  handleEnter() {
    clearTimeout(this.time);
  }
  isSearchCallback() {
    this.setState({
      isSearch: false,
    });
  }

  render() {
    const {
      options,
      cascaderText,
      onKeyPress,
      cascaderValue,
      loading,
    } = this.props;

    return (
      <div className={styles['regional_wrap']} style={{position: 'relative'}}>
        <Row className={styles['regional_selection']}>
          <Col span={1} className={styles['title']}>
            <label>区域选择&nbsp;:</label>
          </Col>

          <Col span={1} className={styles['value']}>
            <Input
              ref={c => (this.areaText = c)}
              onKeyDown={this.onKeyPress}
              className={styles['area_text']}
              placeholder={'浙江/温州/鹿城'}
              onClick={this.handleClick}
              value={cascaderText || ''}
              onChange={this.areaTextChange}
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            />
            <Cl_Cascader
              options={options}
              loading={loading}
              loadData={this.loadData}
              value={cascaderValue}
              isSearch={this.state.isSearch}
              isSearchCallback={this.isSearchCallback}
              onChange={this.onChange}
              onEnter={this.handleEnter}
              onLeave={this.handleLeave}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Regional;
