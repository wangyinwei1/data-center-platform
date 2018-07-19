import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import _ from 'lodash';
//实例
class SimulationTable extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  //table分页
  getBodyTd(data, index) {
    const {columns} = this.props;
    const result = _.map(columns, (item, i) => {
      const text = item.render
        ? item.render(data[item.dataIndex], data, index)
        : data[item.dataIndex];
      return (
        <div
          key={i.toString(36) + i}
          className={styles['td']}
          style={
            typeof item.width === 'string'
              ? {width: item.width}
              : {width: 100 / columns.length + '%'}
          }>
          {text}
        </div>
      );
    });
    return result;
  }
  render() {
    const {columns, data, loading} = this.props;
    return (
      <div className={styles['simulation_table_wrap']}>
        <div className={styles['header']}>
          <div className={styles['tr']}>
            {_.map(columns, (item, i) => {
              return (
                <div
                  key={i.toString(36) + i}
                  className={styles['th']}
                  style={
                    typeof item.width === 'string'
                      ? {width: item.width}
                      : {width: 100 / columns.length + '%'}
                  }>
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles['body']}>
          <div className={styles['tr']}>
            {_.map(data, (app, index) => {
              const children = this.getBodyTd(app, index);
              return children;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SimulationTable;
