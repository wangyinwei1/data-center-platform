import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Input, Button} from 'antd';
import styles from './index.less';
import classnames from 'classnames';
const Search = Input.Search;
//实例
@inject('globalStore', 'layoutStore')
@observer
class MyselfSearch extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {value: '', isSearchValue: true};
  }
  onChange(e) {
    const value = e.target.value;
    this.setState({
      isSearchValue: false,
      value,
    });
  }
  onSearch() {
    const {onSearch} = this.props;
    this.setState({
      isSearchValue: true,
    });
    onSearch && onSearch(this.state.value);
  }
  render() {
    const {theme, value, hasSearchValue} = this.props;
    return (
      <div
        className={classnames(
          styles['search_wrap'],
          theme === 'darker' && styles['theme_darker'],
        )}>
        {hasSearchValue ? (
          <ClSearch
            value={this.state.isSearchValue ? value : this.state.value}
            onSearch={this.onSearch}
            onChange={this.onChange}
          />
        ) : (
          <Search
            enterButton
            placeholder="搜索"
            defaultValue={''}
            onSearch={value => {
              const {onSearch} = this.props;
              onSearch(value);
            }}
            style={{width: 200}}
          />
        )}
      </div>
    );
  }
}
class ClSearch extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {value: ''};
  }
  onChange(e) {
    const {onChange} = this.props;
    onChange && onChange(e);
  }
  onSearch(e) {
    const {onSearch} = this.props;
    onSearch && onSearch(e);
  }

  render() {
    const {value} = this.props;
    return (
      <span
        style={{width: '200px'}}
        className={
          'ant-input-search ant-input-search-enter-button ant-input-affix-wrapper'
        }>
        <Input
          placeholder="搜索"
          value={value}
          onPressEnter={this.onSearch}
          onChange={this.onChange}
        />
        <span className={'ant-input-suffix'} onClick={this.onSearch}>
          <Button className={'ant-btn ant-input-search-button ant-btn-primary'}>
            <i className={'anticon anticon-search'} />
          </Button>
        </span>
      </span>
    );
  }
}
export default MyselfSearch;
