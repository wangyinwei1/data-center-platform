import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Col, Row} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import {toJS} from 'mobx';
//实例
@observer
class Detail extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  render() {
    const {record} = this.props;
    const RowData = ({data, title}) => {
      let text = '';
      if (data) {
        let arr = data.split('$');
        let s = ['A相:', 'B相:', 'C相:'];
        arr.forEach((item, index) => {
          text += s[index] + arr[index];
          if (index !== arr.length - 1) {
            text += ',';
          }
        });
      } else {
        text = '-';
      }
      return (
        <Row className={styles['row']}>
          <Col span={12}>{title}</Col>
          <Col span={12}>{text}</Col>
        </Row>
      );
    };
    return (
      <div className={styles['detail-wrap']}>
        <Row className={styles['row-header']}>
          <Col span={12}>属性</Col>
          <Col span={12}>值</Col>
        </Row>
        <RowData data={record.loop1cur} title={'第一路电流'} />
        <RowData data={record.loop2cur} title={'第二路电流'} />
        <RowData data={record.loop3cur} title={'第三路电流'} />
        <RowData data={record.loop4cur} title={'第四路电流'} />
        <RowData data={record.loop5cur} title={'第五路电流'} />
        <RowData data={record.loop6cur} title={'第六路电流'} />
        <RowData data={record.loop1vol} title={'第一路电压'} />
        <RowData data={record.loop2vol} title={'第二路电压'} />
        <RowData data={record.loop3vol} title={'第三路电压'} />
        <RowData data={record.loop4vol} title={'第四路电压'} />
        <RowData data={record.loop5vol} title={'第五路电压'} />
        <RowData data={record.loop6vol} title={'第六路电压'} />
        <RowData data={record.loop1insp} title={'第一路瞬时有功功率'} />
        <RowData data={record.loop2insp} title={'第二路瞬时有功功率'} />
        <RowData data={record.loop3insp} title={'第三路瞬时有功功率'} />
        <RowData data={record.loop4insp} title={'第四路瞬时有功功率'} />
        <RowData data={record.loop5insp} title={'第五路瞬时有功功率'} />
        <RowData data={record.loop6insp} title={'第六路瞬时有功功率'} />
        <RowData data={record.loop1insq} title={'第一路瞬时无功功率'} />
        <RowData data={record.loop2insq} title={'第二路瞬时无功功率'} />
        <RowData data={record.loop3insq} title={'第三路瞬时无功功率'} />
        <RowData data={record.loop4insq} title={'第四路瞬时无功功率'} />
        <RowData data={record.loop5insq} title={'第五路瞬时无功功率'} />
        <RowData data={record.loop6insq} title={'第六路瞬时无功功率'} />
        <RowData data={record.loop1pwrf} title={'第一路功率因数'} />
        <RowData data={record.loop2pwrf} title={'第二路功率因数'} />
        <RowData data={record.loop3pwrf} title={'第三路功率因数'} />
        <RowData data={record.loop4pwrf} title={'第四路功率因数'} />
        <RowData data={record.loop5pwrf} title={'第五路功率因数'} />
        <RowData data={record.loop6pwrf} title={'第六路功率因数'} />
      </div>
    );
  }
}

export default Detail;
