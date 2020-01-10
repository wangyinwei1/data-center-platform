import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Table} from 'antd';
import styles from './index.less';
import classnames from 'classnames';
import {random6} from '../../utils/tool.js';

class Cl_Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: <span />,
    };
  }
  componentDidMount() {}
  render() {
    const {
      pageSize,
      columns,
      pageIndex,
      total,
      data,
      onChange,
      loading,
      onShowSizeChange,
      nesting,
      rowClassName,
      pagination,
      theme,
      onRowDoubleClick,
      useDefaultRowKey,
      expandIconAsCell,
      rowSelection,
      rowKey,
      scroll,
    } = this.props;
    const onRow = onRowDoubleClick
      ? {
          onRow: record => {
            return {
              onDoubleClick: e => {
                onRowDoubleClick(record, e);
              },
            };
          },
        }
      : {};

    let dataIndexs = [];
    columns.forEach(item => {
      dataIndexs.push(item.dataIndex);
    });

    let newData = data.map(item => {
      dataIndexs.forEach(app => {
        if (item[app] === null || item[app] === '') {
          item[app] = '-';
        }
      });

      return item;
    });

    return (
      <div
        className={classnames(
          styles['table_wrap'],
          theme === 'darker' && styles['table_darker'],
        )}>
        <Table
          rowKey={(record, index) => {
            if (rowKey) {
              return record[rowKey];
            }

            return !useDefaultRowKey
              ? (record && record.spID) ||
                  (record && record.deviceID) ||
                  (record && record.devID) ||
                  (record && record.suID) ||
                  (record && record.subDeviceID) ||
                  (record && record.portID) ||
                  `${random6()}${index}`
              : `${random6()}${index}`;
          }}
          {...(nesting ? nesting : {})}
          columns={columns}
          scroll={scroll}
          dataSource={newData}
          loading={loading ? true : false}
          rowClassName={rowClassName}
          rowSelection={rowSelection}
          expandIconAsCell={expandIconAsCell}
          {...onRow}
          pagination={
            typeof pagination === 'undefined'
              ? {
                  total,
                  pageSize: parseInt(pageSize),
                  current: parseInt(pageIndex),
                  showQuickJumper: true,
                  showSizeChanger: true,
                  showTotal: total => {
                    return `共 ${total} 条`;
                  },
                  onChange: pageNumber => {
                    onChange(pageNumber);
                  },
                  onShowSizeChange: (current, pageSize) => {
                    onShowSizeChange(current, pageSize);
                  },
                }
              : pagination
          }
        />
      </div>
    );
  }
}

export default Cl_Table;
