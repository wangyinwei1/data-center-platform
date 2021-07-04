import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row, message, Upload} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {
  FormInput,
  FormRadio,
  FormTextArea,
  FormSelect,
} from '../../../components/FormItem';
import {toJS} from 'mobx';
//实例
@inject('deviceversionStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.uploadChange = this.uploadChange.bind(this);
    this.state = {
      showBigClasses: false,
      showProtocol: false,
      showNewProtocol: false,
      browseDisable: false,
      currentProtocol: {},

      protocolList: null,
      modalFields: {
        newBigClasses: {
          value: '',
        },
        P_Protocol: {
          value: '',
          require: true,
        },
        P_Name: {
          value: '',
          require: true,
        },
      },
    };
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
      this.setState(({modalFields}) => {
        return {
          modalFields: {
            ...modalFields,
            P_Protocol: {
              value: fileString,
            },
          },
        };
      });
    };
    return false;
  }
  handleFormChange(changedFields) {
    // this.setState({
    //   showBigClasses: false,
    //   showProtocol: false,
    //   showNewProtocol: false,
    //   browseDisable: false,
    // });
    const key = _.keys(changedFields);

    if (
      key[0] === 'newBigClasses' ||
      key[0] === 'P_Protocol' ||
      key[0] === 'P_Name'
    ) {
      const obj = {};
      obj[key] = {showError: false, ...changedFields[key]};
      this.setState(({modalFields}) => {
        return {
          modalFields: {...modalFields, ...obj},
        };
      });
    } else {
      const {
        handleFormChange,
        deviceversionStore: {addData, editData},
        mode,
      } = this.props;
      if (key[0] === 'F_Name') {
        const data = mode === 'new' ? addData : editData;
        const currentValue = _.filter(
          this.state.protocolList || toJS(data.protocolList),
          item => {
            return changedFields[key].value === item.F_ProID;
          },
        );
        currentValue &&
          currentValue[0] &&
          (this.state.currentProtocol = currentValue[0]);
        changedFields.F_Name.F_Name = currentValue[0].F_Name;
        changedFields.F_Name.F_Protocol = currentValue[0].F_Protocol;
      }
      handleFormChange(changedFields);
    }
  }
  childProtocolOk() {
    const modalFields = this.state.modalFields;
    const showError = this.test(modalFields);
    const hasError = _.keys(showError);

    if (hasError[0]) {
      this.setState(({modalFields}) => {
        return {
          modalFields: {
            ...modalFields,
            ...showError,
          },
        };
      });
    } else {
      const {
        deviceversionStore: {addData, editData},
        handleFormChange,
        mode,
      } = this.props;
      const data = mode === 'new' ? addData : editData;
      const cloneData = _.cloneDeep(
        this.state.protocolList || toJS(data.protocolList),
      );
      const randomID = new Date().getTime();
      const item = {
        F_ProID: randomID,
        F_Name: this.state.modalFields.P_Name.value,
        F_Protocol: this.state.modalFields.P_Protocol.value,
      };

      cloneData.unshift(item);

      this.setState({
        showNewProtocol: false,
        protocolList: cloneData,
        currentProtocol: item,
      });
      handleFormChange({
        F_Name: {
          value: randomID,
          F_Name: item.F_Name,
          F_Protocol: item.F_Protocol,
        },
      });
    }
  }
  handleClick(type, e) {
    switch (type) {
      case 'new_big_classes':
        this.setState(({modalFields}) => {
          return {
            modalFields: {
              ...modalFields,
              newBigClasses: {
                value: '',
              },
            },
            showBigClasses: true,
            showProtocol: false,
            showNewProtocol: false,
            browseDisable: false,
          };
        });
        break;
      case 'browse_protocol':
        const {fields} = this.props;
        if (fields.F_Name.value || fields.F_Name.value === 0) {
          this.setState(({modalFields}) => {
            let formValue = _.cloneDeep([modalFields])[0];
            formValue.P_Protocol.value =
              this.state.currentProtocol.F_Protocol || fields.F_Name.F_Protocol;
            formValue.P_Name.value =
              this.state.currentProtocol.F_Name || fields.F_Name.F_Name;
            return {
              modalFields: {
                ...modalFields,
                ...formValue,
              },
              showBigClasses: false,
              showProtocol: true,
              showNewProtocol: false,
              browseDisable: true,
            };
          });
        } else {
          message.error('请选择需要预览的协议类型!');
        }
        break;
      case 'new_protocol':
        this.setState(({modalFields}) => {
          let formValue = _.cloneDeep([modalFields])[0];
          formValue.P_Protocol.value = '';
          formValue.P_Name.value = '';
          return {
            modalFields: {
              ...modalFields,
              ...formValue,
            },
            showBigClasses: false,
            showProtocol: false,
            showNewProtocol: true,
            browseDisable: false,
          };
        });
        break;
      case 'cancel':
        this.setState({
          showBigClasses: false,
        });
        break;
      case 'new_cancel':
        this.setState({
          showNewProtocol: false,
        });
        break;
      case 'new_confirm':
        this.childProtocolOk();
        break;
      case 'browse_cancel':
        this.setState({
          showProtocol: false,
        });
        break;
      case 'confirm':
        const value = this.state.modalFields.newBigClasses.value;
        if (!value && value !== 0) {
          message.error('名称不能为空！');
          return;
        }

        const {deviceversionStore: {addBigClasses}} = this.props;
        addBigClasses({
          F_CategoryName: value,
        }).then(data => {
          data &&
            this.setState({
              showBigClasses: false,
            });
        });
        break;
    }
  }
  //校验循环
  test(fields) {
    let showError = {};
    //循环找到必填字段是否是空并作出警告
    _.forIn(fields, (v, k) => {
      if (!v.value && v.value !== 0 && v.require) {
        showError[k] = {showError: true, ...v};
      }
    });
    return showError;
  }
  render() {
    const {deviceversionStore: {editData, addData}, fields, mode} = this.props;

    let data = {};
    let disabled = false,
      currentClass = 'cl_regional_select_215';
    switch (mode) {
      case 'new':
        data = addData;

        break;
      case 'modify':
      case 'detail':
        data = editData;
        break;
    }
    const generaList = _.map(toJS(data.generaList), item => {
      return {
        value: item.F_ID,
        name: item.F_CategoryName,
      };
    });
    const protocolList = _.map(
      this.state.protocolList || toJS(data.protocolList),
      item => {
        return {
          value: item.F_ProID,
          name: item.F_Name,
          F_Protocol: item.F_Protocol,
        };
      },
    );
    return (
      <Form layout="inline" className={styles['edit_wrap']}>
        <Row className={styles['dev_row']}>
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'设备大类'}
            disabled={disabled}
            name={'F_TypeID'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={generaList}
          />
          {!this.state.showBigClasses && (
            <Button
              onClick={this.handleClick.bind(this, 'new_big_classes')}
              className={styles['deviceversion_btn']}>
              新增大类
            </Button>
          )}
        </Row>
        {this.state.showBigClasses && (
          <Row className={styles['out_modal']}>
            <FormInput
              {...this.state.modalFields}
              onChange={this.handleFormChange}
              label={'设备大类名'}
              className={'cl_select_290'}
              disabled={disabled}
              name={'newBigClasses'}
              rules={[{required: false}]}
            />
            <Button
              onClick={this.handleClick.bind(this, 'cancel')}
              className={classnames(
                styles['deviceversion_btn'],
                styles['deviceversion_cancel'],
              )}>
              取消新增
            </Button>
            <Button
              onClick={this.handleClick.bind(this, 'confirm')}
              className={styles['deviceversion_btn']}>
              确定新增
            </Button>
          </Row>
        )}
        <Row className={styles['dev_row']}>
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'协议类型'}
            disabled={disabled}
            name={'F_Name'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={protocolList}
          />
          {!this.state.showProtocol && (
            <Button
              onClick={this.handleClick.bind(this, 'browse_protocol')}
              className={classnames(
                styles['deviceversion_btn'],
                styles['deviceversion_browse'],
              )}>
              预览协议
            </Button>
          )}
          {this.state.showProtocol && (
            <Button
              onClick={this.handleClick.bind(this, 'browse_cancel')}
              className={classnames(
                styles['deviceversion_btn'],
                styles['deviceversion_browse'],
              )}>
              取消预览
            </Button>
          )}
          {!this.state.showNewProtocol && (
            <Button
              onClick={this.handleClick.bind(this, 'new_protocol')}
              className={styles['deviceversion_btn']}>
              新增协议
            </Button>
          )}
          {this.state.showNewProtocol && (
            <Button
              onClick={this.handleClick.bind(this, 'new_cancel')}
              className={styles['deviceversion_btn']}>
              取消新增
            </Button>
          )}
        </Row>
        {(this.state.showProtocol || this.state.showNewProtocol) && (
          <Row className={styles['out_modal']}>
            <FormInput
              {...this.state.modalFields}
              onChange={this.handleFormChange}
              label={'协议名称'}
              disabled={this.state.browseDisable}
              name={'P_Name'}
              rules={[{required: true, message: '请必须填写!'}]}
            />
            {this.state.showNewProtocol && (
              <Upload beforeUpload={this.uploadChange} showUploadList={false}>
                <Button
                  onClick={this.handleClick.bind(this, 'new_import')}
                  className={classnames(
                    styles['deviceversion_btn'],
                    styles['new_import'],
                  )}>
                  导入协议
                </Button>
              </Upload>
            )}
            {this.state.showNewProtocol && (
              <Button
                onClick={this.handleClick.bind(this, 'new_confirm')}
                className={styles['deviceversion_btn']}>
                提交协议
              </Button>
            )}

            <Row>
              <FormTextArea
                {...this.state.modalFields}
                onChange={this.handleFormChange}
                label={'协议内容'}
                type={'textarea'}
                disabled={this.state.browseDisable}
                name={'P_Protocol'}
                className={'cl_select_678'}
                rules={[{required: true, message: '请必须填写!'}]}
              />
            </Row>
          </Row>
        )}
        <Row className={styles['dev_row']}>
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'类型名称'}
            disabled={disabled}
            name={'F_TypeName'}
            rules={[{required: true, message: '请必须填写!'}]}
          />
          <FormSelect
            {...fields}
            onChange={this.handleFormChange}
            label={'通讯方式'}
            disabled={disabled}
            name={'F_CommunicatID'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={[{value: 1, name: 'TCP'}, {value: 2, name: 'UDP'}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'软件版本'}
            disabled={disabled}
            name={'F_SoftVersion'}
            rules={[{required: false}]}
          />
          <FormInput
            {...fields}
            onChange={this.handleFormChange}
            label={'硬件版本'}
            disabled={disabled}
            name={'F_HardVersion'}
            rules={[{required: false}]}
          />
          <FormRadio
            {...fields}
            onChange={this.handleFormChange}
            label={'数据上报'}
            disabled={disabled}
            name={'F_ReportType'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={[{value: 0, name: '被动'}, {value: 1, name: '主动'}]}
          />
          <FormRadio
            {...fields}
            onChange={this.handleFormChange}
            label={'链接方式'}
            disabled={disabled}
            name={'F_ConnectType'}
            rules={[{required: true, message: '请必须填写!'}]}
            children={[{value: 0, name: '被动'}, {value: 1, name: '主动'}]}
          />
        </Row>
      </Form>
    );
  }
}

export default Regional;
