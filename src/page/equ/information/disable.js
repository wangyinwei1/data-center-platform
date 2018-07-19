import {inject, observer} from 'mobx-react';

import React, {Component} from 'react';
import classNames from 'classnames';
import './index.less';
import CommonModal from '../../../components/CommonModal';
import {Button} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
class DeleteModal extends Component {
  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    const {isShow, onOk, onCancel} = this.props;
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
    let modalFooter = [];
    modalFooter.push(
      <div key={1}>
        <Button
          type="primary"
          onClick={() => {
            okProps.onClick();
          }}>
          {'删除'}
        </Button>
        <Button
          type="primary"
          onClick={() => {
            cancelProps.onClick();
          }}
        />
      </div>,
    );
    return (
      <CommonModal
        isShow={isShow}
        mask={false}
        width={414}
        confirmLoading={true}
        okProps={okProps}
        cancelProps={cancelProps}>
        <div className={styles['delete_wrap']}>
          <div className={styles['delete_title']}>
            <span>提示</span>
            <span style={{fontSize: '10px'}}>&nbsp;Notice</span>
          </div>

          <p className={styles['delete_ct']}>
            <i className={classnames('icon iconfont icon-jinggao')} />
            <span>此操作将禁用该设备, 是否继续?</span>
          </p>
        </div>
      </CommonModal>
    );
  }
}
export default DeleteModal;
