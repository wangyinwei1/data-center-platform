import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { toJS } from "mobx"
import styles from "./index.less"
import Empty from "../../../components/Empty"
import {
  Form,
  oButton,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Row,
  Col,
} from "antd"
import ControlModal from "./controlModal.js"
import moment from "moment"

const { Option } = Select

class RumorContent extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    typeIndex: 0,
  }
  componentDidMount() {}
  render() {
    const { form, regulatChannel } = this.props
    const { getFieldDecorator } = form

    let data = regulatChannel.alters || []

    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 8 },
      },
    }
    const paramsItemLayout = {
      labelCol: {
        sm: { span: 12 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    }
    const { typeIndex } = this.state
    let alterParams = []
    if (
      data[0] &&
      data[typeIndex] &&
      data[typeIndex].alterParams &&
      data[typeIndex].alterParams[0]
    ) {
      alterParams = data[typeIndex].alterParams
    }
    console.log(toJS(data))
    const monthFormat = "YYYY/MM"

    function disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day")
    }
    return (
      <Form className={styles["control_ct"]}>
        <Row className={styles["remote-type"]}>
          <Form.Item label="谣调类型" {...formItemLayout}>
            {getFieldDecorator("remote-type", {
              initialValue: data[0] ? 0 : undefined,
              rules: [{ required: true, message: "必须填写内容!" }],
            })(
              <Select
                placeholder="请选择遥调类型"
                onChange={(value) => {
                  this.setState({
                    typeIndex: value,
                  })
                }}
              >
                {data.map((item, index) => {
                  return (
                    <Option key={index.toString(36) + index} value={index}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </Form.Item>
        </Row>
        <Row className={styles["params-wrap"]}>
          {!alterParams[0] && <Empty />}
          {alterParams.map((item, index) => {
            if (item.paramType === "int" && item.enums) {
              return (
                <Col
                  span={12}
                  key={index.toString(36) + index}
                  className={styles["item"]}
                >
                  <Form.Item label={item.paramName} {...paramsItemLayout}>
                    {getFieldDecorator(index.toString(), {
                      initialValue: item.value || undefined,
                      rules: [{ required: true, message: "必须填写内容!" }],
                    })(
                      <Select placeholder="请选择内容">
                        {Object.entries(item.enums).map((app, i) => {
                          let name = app[0]
                          let value = app[1]
                          return (
                            <Option key={i.toString(36) + i} value={value}>
                              {name}
                            </Option>
                          )
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              )
            }
            if (item.paramType === "int") {
              return (
                <Col
                  span={12}
                  key={index.toString(36) + index}
                  className={styles["item"]}
                >
                  <Form.Item label={item.paramName} {...paramsItemLayout}>
                    {getFieldDecorator(index.toString(), {
                      initialValue: item.value || item.min,
                      rules: [{ required: true, message: "必须填写内容!" }],
                    })(<InputNumber min={item.min} max={item.max} />)}
                  </Form.Item>
                </Col>
              )
            }
            if (item.paramType === "string" || item.paramType === "hex") {
              return (
                <Col
                  span={12}
                  key={index.toString(36) + index}
                  className={styles["item"]}
                >
                  <Form.Item label={item.paramName} {...paramsItemLayout}>
                    {getFieldDecorator(index.toString(), {
                      initialValue: item.value || item.min,
                      rules: [{ required: true, message: "必须填写内容!" }],
                    })(<Input maxLength={item.length} />)}
                  </Form.Item>
                </Col>
              )
            }
          })}
        </Row>
      </Form>
    )
  }
}
//实例
@inject("informationStore")
@Form.create()
@observer
class RumorModal extends Component {
  render() {
    const {
      informationStore: { regulatChannel, currentDevice, deviceAlter },
      rumorShow,
      form,
      onRumorCancel,
    } = this.props

    return (
      <ControlModal
        width={834}
        isShow={rumorShow}
        buttons={true}
        onOk={() => {
          form.validateFields(async (errors, values) => {
            if (!errors) {
              const feilds = { ...regulatChannel }
              const remoteType = values["remote-type"]
              const item = feilds.alters[remoteType]
              const result =
                item.alterParams[0] &&
                item.alterParams.map((app, index) => {
                  return { ...app, value: values[index.toString()] }
                })
              const params = {
                deviceId: currentDevice,
                cmd: item.cmd,
                alterParams: result || [],
              }
              //遥调操作
              let res = await deviceAlter(params)
              //取消
              res && onRumorCancel()
            }
          })
        }}
        title={"远程调配"}
        onCancel={onRumorCancel}
      >
        <RumorContent form={form} regulatChannel={regulatChannel} />
      </ControlModal>
    )
  }
}

export default Form.create()(RumorModal)
