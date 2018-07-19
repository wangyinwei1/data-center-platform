import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Form} from 'antd';
import styles from './index.less';
//实例
@inject('globalStore', 'layoutStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return <div className={styles['']} />;
  }
}

export default Regional;
