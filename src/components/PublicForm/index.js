import React from "react"
import styles from "./index.less"
import classnames from "classnames"
import {
  Input,
  Form,
  Radio,
  Select,
  InputNumber,
  DatePicker,
  TreeSelect,
  Upload,
  Card,
  Row,
  Col,
} from "antd"

import { T_Button, T_Select, T_Upload } from "./components.js"

const { RangePicker } = DatePicker

const RadioGroup = Radio.Group
const { TextArea } = Input
const Option = Select.Option

export const CustomFormItem = (props) => {
  const {
    noDecorator,
    label,
    rules,
    options = {},
    className,
    visiable,
    formItemCol,
    formItemScale,
    required,
    style,
    ...rest
  } = props
  if (visiable === false) {
    return null
  }
  const { getFieldDecorator } = props.form
  const spanCol =
    typeof formItemCol === "number" ? { span: formItemCol } : { span: 24 }
  //

  let scale = Math.ceil((8 / 42) * 24)

  const formItemLayout = {
    labelCol: {
      span: scale,
    },
    wrapperCol: {
      span: 24 - scale,
    },
  }

  if (noDecorator) {
    return (
      <Col
        {...spanCol}
        className={classnames(className, styles["form-item-wrap"])}
      >
        <Form.Item
          label={label}
          className={classnames(className, styles["form-item-wrap"])}
          style={{ ...style }}
        >
          {formItemType(rest)}
        </Form.Item>
      </Col>
    )
  }

  let fieldsOptions = {
    ...options,
  }
  //默认规则
  const defaltRules = [
    { required: required || false, message: "必须输入内容!" },
  ]
  //区域特殊验证
  if (rest.type === "area") {
    let checkArea = (rule, value, callback) => {
      const keys = Object.keys(value)
      const hasEmpty = keys.some((item) => {
        return !value[item]
      })

      if (!hasEmpty) {
        return callback()
      }
      callback("必须输入内容!")
    }
    defaltRules.push({ validator: checkArea })
  }

  return (
    <Col
      {...spanCol}
      className={classnames(className, styles["form-item-wrap"])}
    >
      <Form.Item {...formItemLayout} label={label} style={{ ...style }}>
        {getFieldDecorator(props.name || "", {
          rules: rules ? rules : defaltRules,
        })(formItemType(rest))}
      </Form.Item>
    </Col>
  )
}
//new
class WrapperComponentForm extends React.PureComponent {
  componentDidMount() {
    const { formRef } = this.props
    formRef && formRef(this.props.form, this)
  }
  componentWillUnmount() {
    this.props.form && this.props.form.resetFields()
  }
  render() {
    const { children, formRef, form, ...rest } = this.props
    const renderFormItem = (child, a, b) => {
      if (!child) {
        return null
      }

      return React.cloneElement(child, { form })
    }

    return (
      <Form {...rest}>
        <Row>{React.Children.map(children, renderFormItem)}</Row>
      </Form>
    )
  }
}
//new
export const CustomForm = Form.create()(WrapperComponentForm)

//common
export const formItemType = ({ onChange, form, ...props }) => {
  const {
    disabled = false,
    placeholder = "请输入内容",
    type = "input",
    children,
  } = props
  if (type === "input") {
    return (
      <Input
        {...props}
        autoComplete={"off"}
        disabled={disabled ? disabled : false}
        placeholder={placeholder ? placeholder : "请输入内容"}
        className={styles["input-wrap"]}
        onChange={(...args) => {
          onChange && onChange(...args)
        }}
      />
    )
  }
  if (type === "password") {
    return (
      <Input.Password
        {...props}
        autoComplete={"off"}
        disabled={disabled ? disabled : false}
        placeholder={placeholder ? placeholder : "请输入内容"}
        className={styles["ant-input"]}
        onChange={(...args) => {
          onChange && onChange(...args)
        }}
      />
    )
  }
  if (type === "select") {
    return (
      <T_Select
        {...props}
        onChange={(...args) => {
          onChange && onChange(...args)
        }}
      />
    )
  }
  if (type === "radio") {
    return (
      <RadioGroup
        {...props}
        disabled={disabled}
        className={styles["radio-wrap"]}
      >
        {_.map(children, (item, i) => {
          return (
            <Radio key={i.toString(36) + i} value={item.value}>
              {item.name}
            </Radio>
          )
        })}
      </RadioGroup>
    )
  }
  return null
}
