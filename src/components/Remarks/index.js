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
        <div className={styles['col']}>
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
        {theme !== 'darker' && (
          <div className={styles['col']}>
            <i className={classnames(styles['online'])} />
            <span className={styles['active']}>在线</span>
            <i className={classnames(styles['offline'])} />
            <span className={styles['active']}>离线</span>
            <i className={classnames(styles['errline'])} />
            <span className={styles['active']}>异常</span>
            <i className={classnames(styles['disable'])} />
            <span className={styles['active']}>禁用</span>
            <i className={classnames(styles['alarm'])} />
            <span className={styles['active']}>告警</span>
          </div>
        )}
      </div>
    );
  }
}

export default Remarks;
