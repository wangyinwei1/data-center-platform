import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Upload, message, Icon, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomSelect,
} from '../../../components/FormItem';
import {toJS} from 'mobx';
const FormItem = Form.Item;
//实例
@inject('siteStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.state = {
      fileList: [],
    };
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {
      siteStore: {editData, addLists, belongRegion},
      regionMenu,
      cityMenu,
      countyMenu,
      fields,
      mode,
    } = this.props;

    let aa = [];
    let data = {};
    let disabled = false;
    switch (mode) {
      case 'new':
        data = addLists;

        break;
      case 'modify':
      case 'detail':
        data = editData;
        break;
    }
    const _this = this;
    const customRequest = async file => {
      await _this.setState({
        fileList: _this.state.fileList.concat([file.file]),
      });
    };
    const props = {
      name: 'file',
      multiple: true,
      showUploadList: true,
      fileList: [...this.state.fileList],
      customRequest: file => {
        customRequest(file);
      },
      onSuccess(file) {},
      onErrer(file) {},
      onRemove(file) {
        const newList = _this.state.fileList.filter(item => {
          return item.uid !== file.uid;
        });
        _this.setState({
          fileList: newList,
        });
      },
      onChange() {},
    };

    return (
      <div>
        <Form layout="inline" className={styles['edit_wrap']}>
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'创建时间'}
            disabled={disabled}
            name={'F_Tel'}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'备注'}
            disabled={disabled}
            name={'F_Address'}
            rules={[{required: false}]}
          />
          <FormItem className={styles['upload_wrap']}>
            <p className={styles['upload_notes']}>
              只支持jpg,png格式，可以多选图片,但一次最多只能上传6张！
            </p>
            <Upload {...props}>
              <Button className={styles['upload_button']}>
                <Icon type="upload" />选择上传文件
              </Button>
            </Upload>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Regional;
