import React, {Component} from 'react';
import classNames from 'classnames';
import './index.less';
import CommonModal from '../../../components/CommonModal';
import {Button, Form, Input, Select} from 'antd';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
class Realtime extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const {isShow, onOk, onCancel, title} = this.props;
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
    return (
      <CommonModal
        isShow={isShow}
        mask={false}
        width={1000}
        confirmLoading={true}
        buttons={[]}
        okProps={okProps}
        cancelProps={cancelProps}>
        <div className={styles['delete_wrap']}>
          <div className={styles['delete_title']}>
            <span>{title || ''}</span>
          </div>
          {this.props.children}
        </div>
      </CommonModal>
    );
  }
}
export default Realtime;
