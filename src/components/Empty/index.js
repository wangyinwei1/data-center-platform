import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import classnames from 'classnames';
@observer
class Empty extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles['empty']}>
        <div className={styles['empty_pos']}>
          <div>
            <i className={classnames('icon iconfont icon-zanwuxinxi')} />
          </div>
          <div style={{marginTop: '-16px'}}>
            <span>暂无数据</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Empty;
