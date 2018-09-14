import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row, Upload} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {FormInput, FormTextArea} from '../../../components/FormItem';
import {toJS} from 'mobx';
//实例
@inject('alarminformationStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.uploadChange = this.uploadChange.bind(this);
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  uploadChange(file) {
    const isTxt = file.type === 'text/plain' || file.type === 'text/xml';
    if (!isTxt) {
      message.error('文件格式不对！');
      return;
    }
    const reader = new FileReader(); //新建一个FileReader
    reader.readAsText(file, 'UTF-8'); //读取文件
    reader.onload = evt => {
      //读取完文件之后会回来这里
      const fileString = evt.target.result; // 读取文件内容
      this.props.changeFileds(fileString);
    };
    return false;
  }
  render() {
    const {
      alarminformationStore: {editData, addData},
      fields,
      mode,
    } = this.props;

    let disabled = false;
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <Row>
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'协议名称'}
            disabled={disabled}
            name={'F_Name'}
            rules={[{required: true, message: '请必须填写!'}]}
          />

          <Upload beforeUpload={this.uploadChange} showUploadList={false}>
            <Button className={classnames(styles['new_import'])}>
              导入协议
            </Button>
          </Upload>
        </Row>
        <Row>
          <FormTextArea
            {...fields}
            onChange={this.handleFormChange}
            label={'协议内容'}
            disabled={disabled}
            name={'F_Name'}
            type={'textarea'}
            name={'F_Protocol'}
            className={'cl_select_678'}
            rules={[{required: true, message: '请必须填写!'}]}
          />
        </Row>
      </Form>
    );
  }
}

export default Regional;
