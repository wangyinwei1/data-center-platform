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

    return (
      <div
        className={classnames(
          styles['table_wrap'],
          theme === 'darker' && styles['table_darker'],
        )}>
        <Table
          rowKey={(record, index) => {
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
          dataSource={data}
          loading={loading ? true : false}
          rowClassName={rowClassName}
          rowSelection={rowSelection}
          expandIconAsCell={expandIconAsCell}
          {...onRow}
          pagination={
            typeof pagination === 'undefined'
              ? {
                  total,
                  pageSize,
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
