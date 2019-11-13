import React, {Component} from 'react';
import {Button, DatePicker, Form, Select, Input, Popconfirm} from 'antd';
import {random6} from '../../utils/tool.js';
import classnames from 'classnames';
const {Option} = Select;
const {RangePicker} = DatePicker;
import moment from 'moment';

import styles from './style.less';

class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const {location, match, history} = this.props;

    // await this.store.onWillMount(location, match, history);
  }
  getSelectItemModule(item, index) {
    let formItemLayout = {
      labelCol: {span: !isNaN(parseInt(item.labelCol)) ? item.labelCol : 8},
      wrapperCol: {
        span: !isNaN(parseInt(item.wrapperCol)) ? item.wrapperCol : 16,
      },
    };
    return (
      <Form
        key={`${random6()}${index}`}
        {...formItemLayout}
        className={classnames(styles['select-wrap'], item.className)}
        style={item.width ? {width: item.width} : {}}>
        <Form.Item label={item.name || ''} hasFeedback>
          <Select
            key={`${random6()}${index}`}
            defaultValue={item.defaultValue}
            placeholder={item.placeholder ? item.placeholder : '请选择内容'}
            onChange={item.handleChange ? item.handleChange : () => {}}>
            {item.children
              ? item.children.map((record, i) => {
                  return (
                    <Option key={i.toString(36) + i} value={record.value}>
                      {record.name}
                    </Option>
                  );
                })
              : null}
          </Select>
        </Form.Item>
      </Form>
    );
  }
  getRangePickerItemModule(item, index) {
    let formItemLayout = {
      labelCol: {span: !isNaN(parseInt(item.labelCol)) ? item.labelCol : 8},
      wrapperCol: {
        span: !isNaN(parseInt(item.wrapperCol)) ? item.wrapperCol : 16,
      },
    };
    return (
      <Form
        {...formItemLayout}
        key={`${random6()}${index}`}
        className={classnames(styles['select-wrap'], item.className)}
        style={item.width ? {width: item.width} : {}}>
        <Form.Item label={item.name || ''} hasFeedback>
          <RangePicker
            // defaultValue={item.defaultValue ? item.defaultValue : undefined}
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{format: 'HH:mm:ss'}}
            defaultValue={item.defaultValue ? item.defaultValue : null}
            onChange={item.handleChange ? item.handleChange : () => {}}
          />
        </Form.Item>
      </Form>
    );
  }
  getInputItemModule(item, index) {
    let formItemLayout = {
      labelCol: {span: !isNaN(parseInt(item.labelCol)) ? item.labelCol : 8},
      wrapperCol: {
        span: !isNaN(parseInt(item.wrapperCol)) ? item.wrapperCol : 16,
      },
    };
    return (
      <Form
        {...formItemLayout}
        key={`${random6()}${index}`}
        className={classnames(styles['select-wrap'], item.className)}
        style={item.width ? {width: item.width} : {}}>
        <Form.Item label={item.name || ''} hasFeedback>
          <Input
            placeholder="请输入内容"
            defaultValue={item.defaultValue ? item.defaultValue : ''}
            onChange={item.handleChange ? item.handleChange : () => {}}
          />
        </Form.Item>
      </Form>
    );
  }
  getSelectModule(item, index) {
    return (
      <Select
        className={classnames(item.className)}
        key={`${random6()}${index}`}
        defaultValue={item.defaultValue ? item.defaultValue : undefined}
        placeholder={item.placeholder ? item.placeholder : '请输入内容'}
        onChange={item.onChange ? value => item.onChange(value) : () => {}}>
        {item.children
          ? item.children.map((record, index) => {
              return (
                <Option key={index.toString(36)} value={record.value}>
                  {record.name}
                </Option>
              );
            })
          : null}
      </Select>
    );
  }
  getInputModule(item, index) {
    return (
      <Input
        className={classnames(
          item.className,
          styles['float'],
          styles['input-default'],
        )}
        defaultValue={item.defaultValue ? item.defaultValue : undefined}
        onChange={item.onChange ? e => item.onChange(e, item) : () => {}}
        key={`${random6()}${index}`}
        placeholder={item.placeholder ? item.placeholder : '请输入内容'}
      />
    );
  }
  getButtonModule(item, index) {
    const InnerButton = () => {
      return (
        <Button
          className={classnames(item.className, styles['float'])}
          onClick={item.handleClick ? () => item.handleClick(item) : () => {}}>
          {item.icon}
          <span>{item.name}</span>
        </Button>
      );
    };
    const WrapModal = props => {
      return (
        <Popconfirm
          title={item.title}
          onConfirm={() => item.onConfirm(item)}
          placement={item.placement ? item.placement : 'top'}
          okText="确定"
          cancelText="取消"></Popconfirm>
      );
    };
    return <InnerButton key={`${random6()}${index}`} />;
  }
  getTitleModule(item, index) {
    return (
      <div className={''} key={`${random6()}${index}`}>
        {item.name}
      </div>
    );
  }
  filterModule(modules) {
    let rightModules = [];
    let leftModules = [];
    const loadModule = (type, item, index, currentModuules) => {
      switch (type) {
        case 'title':
          currentModuules.push(this.getTitleModule(item, index));
          break;
        case 'button':
          currentModuules.push(this.getButtonModule(item, index));
          break;
        case 'selectItem':
          currentModuules.push(this.getSelectItemModule(item, index));
          break;
        case 'select':
          currentModuules.push(this.getSelectModule(item, index));
          break;
        case 'inputItem':
          currentModuules.push(this.getInputItemModule(item, index));
          break;
        case 'rangePickerItem':
          currentModuules.push(this.getRangePickerItemModule(item, index));
          break;
        case 'input':
          currentModuules.push(this.getInputModule(item, index));
          break;
      }
    };
    modules.map((item, index) => {
      if (item.pos === 'left') {
        loadModule(item.type, item, index, leftModules);
      } else {
        loadModule(item.type, item, index, rightModules);
      }
    });
    return {
      left: leftModules,
      right: rightModules,
    };
  }
  componentDidMount() {
    let leftWidth = this.leftDOm.clientWidth;
    let rightWidth = this.rightDOm.clientWidth;
    let percentage = ((leftWidth - rightWidth) / leftWidth) * 100;
    this.leftDOm.style.width = `${percentage}%`;
  }

  render() {
    const {modules = [], className} = this.props;
    let module = this.filterModule(modules);
    return (
      <div className={classnames(className)}>
        <div className={styles['wrap']}>
          <div
            className={styles['toolbar-left']}
            ref={c => {
              this.leftDOm = c;
            }}>
            {module.left}
          </div>
          <div
            className={styles['toolbar-right']}
            ref={c => {
              this.rightDOm = c;
            }}>
            {module.right}
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
