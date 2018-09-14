import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {FormInput, FormSelect} from '../../../components/FormItem';
import {toJS} from 'mobx';
//实例
@inject('passagewayStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {
      passagewayStore: {virtualDevList, editVirtualData},
      fields,
      mode,
    } = this.props;

    let disabled = false,
      currentClass = 'cl_select_label_90';

    const newVirtualDevList = _.map(toJS(virtualDevList), item => {
      return {
        value: item.deviceID,
        name: item.deviceName,
      };
    });
    const keys = _.keys(fields);

    return (
      <Form layout="inline" className={styles['virtual_wrap']}>
        {_.map(toJS(editVirtualData.relateChannelList), (item, i) => {
          return (
            <Row key={i.toString(36) + i}>
              <div className={styles['virtualLabel']}>
                关联通道:<span>{item.relateChannelName}</span> 关联设备:
              </div>
              <FormSelect
                {...fields}
                onChange={this.handleFormChange}
                label={''}
                className={currentClass}
                disabled={disabled}
                name={item.relateChannelID}
                rules={[{required: false}]}
                children={newVirtualDevList}
              />
            </Row>
          );
        })}
      </Form>
    );
  }
}

export default Regional;
