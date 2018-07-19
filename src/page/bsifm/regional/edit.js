import React, {Component} from 'react';
import classNames from 'classnames';
import './index.less';
import CommonModal from '../../../components/CommonModal';
import {Button, Form, Input, Select} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()
class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {}

  componentWillUnmount() {}
  onChange(e) {
    const value = e.target.value;
    const {onChange} = this.props;
  }
  render() {
    const {isShow, onOk, onCancel, width, mode} = this.props;
    const okProps = {
      onClick: () => {
        onOk();
      },
    };
    const cancelProps = {
      onClick: () => {
        onCancel();
      },
    };
    let title = '';
    switch (mode) {
      case 'new':
        title = {
          zh: '新增区域',
          en: 'New area',
        };

        break;
      case 'modify':
        title = {
          zh: '修改名称',
          en: 'Modifyuname',
        };
        break;
    }
    return (
      <CommonModal
        isShow={isShow}
        mask={false}
        width={width}
        confirmLoading={true}
        okProps={okProps}
        cancelProps={cancelProps}>
        <div className={styles['delete_wrap']}>
          <div className={styles['delete_title']}>
            <span>{title.zh || ''}</span>
            <span style={{fontSize: '10px'}}>&nbsp;{title.en || ''}</span>
          </div>
          {this.props.children}
        </div>
      </CommonModal>
    );
  }
}
export default DeleteModal;
