import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Button, Form, Upload, message, Icon, Row, Col} from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import EditModal from './edit.js';
import {
  FormInput,
  FormRadio,
  FormSelect,
  CustomSelect,
} from '../../../components/FormItem';
import {toJS} from 'mobx';
const FormItem = Form.Item;
//实例
@observer
class Regional extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onCheckOk = this.onCheckOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      fileList: [],
      show: false,
      imgWidth: 0,
      imgHeight: 0,
      imgSrc: '',
    };
  }
  handleFormChange(changedFields) {
    const {handleFormChange} = this.props;
    handleFormChange(changedFields);
  }
  onCheckOk() {}
  onCancel() {
    this.setState({show: false});
  }
  render() {
    const {mode, inspectionData} = this.props;

    let aa = [];
    let data = {};
    let disabled = false;
    switch (mode) {
      case 'new':
        data = addLists;

        break;
      case 'modify':
      case 'detail':
        data = editData;
        break;
    }
    const listData = inspectionData.listData;
    const type0 = listData.filter(item => {
      return item.type === 0;
    });
    const type1 = listData.filter(item => {
      return item.type === 1;
    });

    let labelSpan = 3;
    let valueSpan = 7;
    switch (type0.length > type1.length ? type0.length : type1.length) {
      case 1:
        valueSpan = 21;

        break;
      case 2:
        valueSpan = 10;
        labelSpan = 4;

        break;
      case 3:
        valueSpan = 7;
        break;
      default:
        valueSpan = 21 / type0.length;
        break;
    }

    return (
      <div className={styles['inspection_wrap']}>
        <Row className={styles['inspection_table']}>
          <Row className={styles['inspection_tr']}>
            <Col className={styles['inspection_td']} span={labelSpan || 3}>
              巡检前:
            </Col>
            {_.map(type0 || [], item => {
              const imgSrc = item.infor;
              return (
                <Col
                  key={item.id}
                  className={styles['inspection_td']}
                  span={valueSpan}>
                  <img
                    src={`/collect/${item.workOrderImagePath || item.infoName}`}
                    onClick={e => {
                      const width = $(e.target).width();
                      const height = $(e.target).height();
                      const imgHeight = window.innerHeight * 0.8;
                      let imgWidth = width / height * imgHeight;
                      const imgSrc = `/collect/${item.workOrderImagePath ||
                        item.infoName}`;

                      this.setState({
                        show: true,
                        imgWidth,
                        imgHeight,
                        imgSrc,
                      });
                    }}
                  />
                </Col>
              );
            })}
            {!type0[0] && (
              <Col className={styles['inspection_td']} span={21}>
                暂无数据
              </Col>
            )}
          </Row>
          <Row className={styles['inspection_tr']}>
            <Col className={styles['inspection_td']} span={labelSpan}>
              巡检后:
            </Col>
            {_.map(type1 || [], item => {
              const imgSrc = item.infor;
              return (
                <Col
                  key={item.id}
                  className={styles['inspection_td']}
                  span={valueSpan}>
                  <img
                    src={`/collect/${item.workOrderImagePath || item.infoName}`}
                    onClick={e => {
                      const width = $(e.target).width();
                      const height = $(e.target).height();
                      const imgHeight = window.innerHeight * 0.8;
                      let imgWidth = width / height * imgHeight;
                      const imgSrc = `/collect/${item.workOrderImagePath ||
                        item.infoName}`;

                      this.setState({
                        show: true,
                        imgWidth,
                        imgHeight,
                        imgSrc,
                      });
                    }}
                  />
                </Col>
              );
            })}
            {!type1[0] && (
              <Col className={styles['inspection_td']} span={21}>
                暂无数据
              </Col>
            )}
          </Row>
        </Row>
        {(inspectionData.taskState && inspectionData.taskState) ===
          '待审批' && (
          <Row style={{textAlign: 'center', paddingTop: '10px'}}>
            <Button
              onClick={e => {
                const {approvalClick} = this.props;
                approvalClick && approvalClick(inspectionData);
              }}>
              审批
            </Button>
          </Row>
        )}
        <EditModal
          isShow={this.state.show}
          onOk={this.onCheckOk}
          width={this.state.imgWidth}
          wrapClassName={'inspection_modal'}
          hideHead={true}
          onCancel={this.onCancel}>
          <img src={this.state.imgSrc} height={this.state.imgHeight} />
        </EditModal>
      </div>
    );
  }
}

export default Regional;
