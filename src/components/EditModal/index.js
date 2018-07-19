import React, {Component} from 'react';
import classNames from 'classnames';
import './index.less';
import CommonModal from '../CommonModal';
import {Button, Form, Input, Select} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
class EditModal extends Component {
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
    const {isShow, onOk, onCancel, buttons, title, width, mode} = this.props;
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
    const needButtons = buttons
      ? {}
      : {
          buttons: [],
        };
    return (
      <CommonModal
        isShow={isShow}
        {...needButtons}
        mask={false}
        width={width}
        confirmLoading={true}
        okProps={okProps}
        cancelProps={cancelProps}>
        <div className={styles['edit_wrap']}>
          <div className={styles['edit_title']}>
            <span>{title || ''}</span>
          </div>
          {this.props.children}
        </div>
      </CommonModal>
    );
  }
}
export default EditModal;
