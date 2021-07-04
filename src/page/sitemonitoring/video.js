import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import styles from './index.less';
import _ from 'lodash';
import {Row, Col, Menu, Button, message} from 'antd';
import {toJS} from 'mobx';
import classnames from 'classnames';
//实例
@inject('sitemonitoringStore')
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {};
  }

  handleClick() {}
  componentDidMount() {}
  updateUrl() {
    const {sitemonitoringStore: {siteVideo}} = this.props;
    const params = toJS(siteVideo);
    if (params[0]) {
      const addr =
        `/collect/video.html?ip=${params[0].ip}&userName=${
          params[0].userName
        }&password=${params[0].password}&port=${params[0].port}&` +
        new Date().getTime();
      this.iframe.setAttribute('src', addr);
    }
  }
  componentDidMount() {
    this.updateUrl();
  }
  componentDidUpdate() {
    this.updateUrl();
  }
  render() {
    return (
      <div className={styles['aaa']}>
        <iframe ref={c => (this.iframe = c)} />
      </div>
    );
  }
}

export default Regional;
