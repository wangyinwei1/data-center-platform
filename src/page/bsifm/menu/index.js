import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Menu, Icon} from 'antd';
import styles from './index.less';
import {Link} from 'react-router';
import _ from 'lodash';
//实例
@inject('globalStore', 'layoutStore')
@observer
class BsifmMenu extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const {location} = this.props;
    const selectedKeys = [];
    location.pathname == '/bsifm-deviceversion' && selectedKeys.push('type');
    location.pathname == '/bsifm-devicetype' && selectedKeys.push('largeClass');

    const equipments = [
      {
        type: 'type',
        name: '设备类型',
        url: '/bsifm-deviceversion',
      },
      {
        type: 'largeClass',
        name: '设备大类',
        url: '/bsifm-devicetype',
      },
    ];
    return (
      <div className={styles['admin_wrap']}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={selectedKeys}
          mode="horizontal">
          {_.map(equipments, item => {
            return (
              <Menu.Item key={item.type}>
                <Link to={item.url}>{item.name}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
        {this.props.children}
      </div>
    );
  }
}

export default BsifmMenu;
