import React, {Component} from 'react';
import styles from './index.less';
import classnames from 'classnames';
//实例
class Remarks extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {theme} = this.props;
    return (
      <div
        className={classnames(
          styles['remarks'],
          theme === 'darker' && styles['theme_darker'],
        )}>
        <i
          className={classnames(
            'icon iconfont icon-beidong',
            styles['icon_passive'],
          )}
        />

        <span className={styles['passive']}>被动设备</span>
        <i
          className={classnames(
            'icon iconfont icon-zhudong',
            styles['icon_active'],
          )}
        />
        <span className={styles['active']}>主动设备</span>
      </div>
    );
  }
}

export default Remarks;
