import React, {Component} from 'react';
import {Form, Icon, Spin} from 'antd';
import _ from 'lodash';
import {render} from 'react-dom';
import classnames from 'classnames';
import {random6} from '../../utils/tool.js';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  handleClick(item, loadingIndex, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {onChange, index, value, loadData, isSearchCallback} = this.props;
    //搜索完点击改回false状态
    isSearchCallback();
    const selectedValue = $(e.target).text();
    value[index] = selectedValue;
    const selectedOptions = _.filter(value, (item, i) => {
      return i <= index;
    });
    onChange(selectedOptions, [item]);
    //大于100毫秒才显示
    this.time = setTimeout(() => {
      item.isParent &&
        this.setState({
          loading: true,
        });
    }, 100);
    this.loadingIndex = loadingIndex;
    const callback = () => {
      clearTimeout(this.time);

      item.isParent &&
        this.setState({
          loading: false,
        });
    };
    loadData([item], index, callback);
  }
  componentDidUpdate() {
    const {options, value, index, isSearch, isSearchCallback} = this.props;

    if (isSearch) {
      //搜索定位选中位置
      _.map(options, (item, i) => {
        const selectedValue = value[index];
        if ((item.value || item.name || item.F_TypeName) == selectedValue) {
          const itemHeight = 32;
          const height = this.scrollDom.clientHeight;
          const scrollHeight = this.scrollDom.scrollHeight;
          const scrollTop = i * itemHeight;
          if (scrollHeight - scrollTop <= height) {
            this.scrollDom.scrollTop = scrollHeight - height;
          } else {
            this.scrollDom.scrollTop = scrollTop;
          }
        }
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqualImmutable(this.props, nextProps) ||
      !shallowEqualImmutable(this.state, nextState)
    );
  }
  render() {
    const {options, value, index} = this.props;
    if (!options[0]) {
      return null;
    }

    return (
      <ul
        className={styles['cascader_menu']}
        ref={c => {
          this.scrollDom = c;
        }}
        onClick={e => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}>
        {options.map((item, i) => {
          const selectedValue = value[index];
          let active = false;
          (item.value || item.name || item.F_TypeName) == selectedValue &&
            (active = true);

          const isShowLoading =
            item.isParent && this.state.loading && this.loadingIndex == i;

          return (
            <li
              key={`${i}${random6}`}
              onClick={this.handleClick.bind(this, item, i)}
              className={classnames(
                active ? styles['active'] : '',
                styles['cascader_menu_item'],
              )}>
              {item.value || item.name || item.F_TypeName}

              {isShowLoading ? (
                <Icon
                  type="loading"
                  className={styles['expand']}
                  style={{fontSize: '18px', color: 'rgba(0,0,0,.45)'}}
                />
              ) : (
                item.isParent && (
                  <Icon type="right" className={styles['expand']} />
                )
              )}
            </li>
          );
        })}
      </ul>
    );
  }
}
import styles from './index.less';
//实例
class Cl_cascader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  componentDidMount() {
    $('#cl_tree_cascader').append($(this.root));
  }
  componentWillUnmount() {
    $(this.root).remove();
  }
  onChange(value, selectedOptions) {
    const {onChange} = this.props;
    onChange(value, selectedOptions);
    this.setState({
      value,
    });
  }
  handleLeave(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.onLeave();
  }
  handleEnter() {
    this.props.onEnter();
  }
  handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqualImmutable(this.props, nextProps) ||
      !shallowEqualImmutable(this.state, nextState)
    );
  }
  render() {
    const {
      options,
      value,
      loadData,
      loading,
      isSearch,
      isSearchCallback,
    } = this.props;
    let twoUnselected = false;
    const searchOptions = _.filter(options, (item, index) => {
      const selectedValue = _.filter(item, app => {
        return (app.value || app.name || app.F_TypeName) == value[index];
      });

      if (!twoUnselected) {
        if (!selectedValue[0]) {
          twoUnselected = true;
        }
        return true;
      } else {
        return false;
      }
    });

    return (
      <div
        className={styles['cascader_wrap']}
        onClick={this.handleClick}
        onMouseLeave={this.handleLeave}
        onMouseEnter={this.handleEnter}
        ref={c => {
          this.root = c;
        }}>
        <Spin
          className={styles['loading']}
          tip={'加载中...'}
          spinning={loading}>
          {searchOptions[0] ? (
            _.map(searchOptions, (item, index) => {
              return (
                <List
                  key={`${index}${random6}`}
                  options={item}
                  index={index}
                  value={value}
                  onChange={this.onChange}
                  isSearch={isSearch}
                  loadData={loadData}
                  isSearchCallback={isSearchCallback}
                />
              );
            })
          ) : (
            <div className={styles['no_data']}>暂无数据</div>
          )}
        </Spin>
      </div>
    );
  }
}

export default Cl_cascader;
