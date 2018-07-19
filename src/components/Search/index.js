import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Input} from 'antd';
import styles from './index.less';
const Search = Input.Search;
//实例
@inject('globalStore', 'layoutStore')
@observer
class MyselfSearch extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles['search_wrap']}>
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
      </div>
    );
  }
}

export default MyselfSearch;
