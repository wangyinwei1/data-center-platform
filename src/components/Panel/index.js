import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
import classnames from 'classnames';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';
//实例
@inject('globalStore', 'layoutStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      showMask: false,
      widthClassName: '',
    };
  }
  monitorWindowWidth(globalStore) {
    const path = window.location.href;
    const {globalStore: {collapsed}} = this.props;

    clearTimeout(this.panelTimer);
    this.panelTimer = setTimeout(() => {
      if (collapsed) {
        this.setState({
          widthClassName: 'panel_active_1280',
        });
      } else if (path.indexOf('/shouye') != -1) {
        this.setState({
          widthClassName: 'panel_active_1280',
        });
      } else {
        this.setState({
          widthClassName: 'panel_active',
        });
      }
    }, 100);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqualImmutable(this.props, nextProps) ||
      !shallowEqualImmutable(this.state, nextState)
    );
  }
  componentDidMount() {
    // this.setState({
    //   children: [this.props.children],
    // });
    this.monitorWindowWidth();
    $(window).on('resize.panel', () => {
      this.monitorWindowWidth();
    });
  }
  componentDidUpdate() {
    this.props.isShow &&
      !this.state.children[0] &&
      this.setState({
        children: [this.props.children],
      });
    !this.props.isShow &&
      this.state.children[0] &&
      this.setState({
        children: [],
      });
  }
  componentWillUnmount() {
    $(window).off('resize.panel');
    // $(document).off('click.panel');
  }
  render() {
    const {isShow, title = '', theme, onCancel, left} = this.props;

    return (
      <div>
        {isShow && (
          <div
            className={classnames(
              styles['cl_mask'],
              theme === 'darker'
                ? styles['theme_darker']
                : styles['theme_white'],
            )}
            onClick={e => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              if (isShow) {
                onCancel && onCancel();

                this.setState({
                  children: [],
                });
              }
            }}
          />
        )}
        <div
          onClick={e => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
          className={classnames(
            styles['panel_wrap'],
            isShow && styles[this.state.widthClassName],
          )}>
          <div className={styles['min_width']}>
            <div className={styles['panel_header']}>
              <div className={styles['panel_title']}>
                <span>{title}</span>
              </div>
            </div>
            <div
              className={styles['close']}
              onClick={e => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                onCancel && onCancel();
              }}>
              <i className={classnames('icon iconfont icon-guanbi')} />
            </div>
            <div
              style={{padding: '12px', fontSize: '14px'}}
              ref={c => {
                this.content = c;
              }}>
              {this.state.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Regional;
