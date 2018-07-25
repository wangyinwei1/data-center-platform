import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import styles from './index.less';
import _ from 'lodash';
import classnames from 'classnames';
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
    const {columns, data, disabled, loading} = this.props;
    return (
      <div className={styles['simulation_table_wrap']}>
        {disabled && <div className={styles['mask']} />}
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
          {!data[0] ? (
            <div className={styles['nodata']}>
              <span>暂无数据</span>
            </div>
          ) : (
            _.map(data, (app, index) => {
              return (
                <div
                  key={index.toString(36) + index}
                  className={classnames(
                    app.error && styles['table_error'],
                    styles['tr'],
                  )}>
                  {this.getBodyTd(app, index)}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default SimulationTable;
