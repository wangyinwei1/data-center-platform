import React, { memo } from "react"
import styles from "./index.less"
import {
  Input,
  DatePicker,
  Cascader,
  Menu,
  Tooltip,
  Popconfirm,
  Button,
  Dropdown,
  Select,
  Upload,
} from "antd"
import classnames from "classnames"
const { Dragger } = Upload
const { Option, OptGroup } = Select
const { Search } = Input
const { RangePicker } = DatePicker

const T_Input = (props) => {
  const { disabled = false, placeholder = "请输入内容" } = props
  return (
    <Input
      {...props}
      autoComplete={"off"}
      disabled={disabled ? disabled : false}
      placeholder={placeholder ? placeholder : "请输入内容"}
      className={styles["input-wrap"]}
    />
  )
}

const T_RangePicker = (props) => {
  return (
    <RangePicker
      style={{ width: "100%" }}
      format="YYYY-MM-DD HH:mm:ss"
      showTime={{ format: "HH:mm:ss" }}
      {...props}
    />
  )
}

const T_Select = (props) => {
  const { disabled = false, placeholder = "请输入内容", mode, children } = props
  return (
    <Select
      {...props}
      className={styles["select-wrap"]}
      placeholder={placeholder}
      disabled={disabled}
    >
      {!props.hasGroup &&
        _.map(children, (item, i) => {
          return (
            <Option
              key={i.toString(36) + i}
              value={item.value}
              label={item.label || item.value}
            >
              {item.name}
            </Option>
          )
        })}

      {props.hasGroup &&
        _.map(children, (item, i) => {
          return (
            <OptGroup label={item.label} key={item.key}>
              {_.map(item.children, (_item, _i) => {
                return (
                  <Option key={_item.value} value={_item.value} {..._item}>
                    {_item.name}
                  </Option>
                )
              })}
            </OptGroup>
          )
        })}
    </Select>
  )
}

const T_Button = (props) => {
  let { icon, name, title, theme, className, tooltipProps, ...rest } = props
  const antIcon = typeof icon === "string" && { icon }
  let themeClass = ""
  switch (theme) {
    case "white":
      themeClass = styles["white-btn-wrap"]
      break
    case "red":
      themeClass = styles["red-btn-wrap"]
      break
    default:
      themeClass = styles["blue-btn-wrap"]
      break
  }
  if (title) {
    return (
      <Tooltip {...tooltipProps} title={title}>
        <Button {...rest} {...antIcon} className={themeClass}>
          {typeof icon === "object" && icon}
          {name && <span>{name}</span>}
        </Button>
      </Tooltip>
    )
  }

  return (
    <Button {...rest} {...antIcon} className={themeClass}>
      {typeof icon === "object" && icon}
      {name && <span>{name}</span>}
    </Button>
  )
}

const T_Search = (props) => {
  let { placeholder, enterButton, ...rest } = props
  return (
    <Search
      placeholder="请输入关键字"
      {...rest}
      //   prefix={<SearchOutlined />}
      placeholder={placeholder ? placeholder : "请输入内容"}
      enterButton={enterButton ? enterButton : "搜索"}
      className={classnames(styles["search-wrap"], rest.className)}
      allowClear
    />
  )
}

// dropdown组件&批量操作
// 子组件的hide可以隐藏
const T_Dropdown = (props) => {
  let { name, onClick, menuList, ...rest } = props
  const menu = (
    <Menu onClick={onClick}>
      {menuList &&
        menuList
          .filter((v) => !v.hide)
          .map((v) => (
            <Menu.Item key={v.key} {...v}>
              {v.name}
            </Menu.Item>
          ))}
    </Menu>
  )
  return (
    <Dropdown overlay={menu} {...rest}>
      <Button>{name || "批量操作"}</Button>
    </Dropdown>
  )
}
const T_Upload = (props) => {
  const {
    children,
    isDragger,
    showUploadList,
    className,
    buttonName,
    ...rest
  } = props

  if (isDragger) {
    return (
      <Dragger
        {...props}
        className={classnames(styles["upload-wrap"], className)}
      >
        {children ? children : props.name}
      </Dragger>
    )
  }
  return (
    <Upload {...props} className={classnames(styles["upload-wrap"], className)}>
      {children ? children : <T_Button {...rest} name={buttonName} />}
    </Upload>
  )
}

//气泡确认框组件
const T_Popconfirm = (props) => {
  let {
    title = "确定要所选中的数据吗？",
    visible = null,
    onConfirm = () => {},
    onCancel = () => {},
    onVisibleChange = null,
    okText = "确定",
    cancelText = "取消",
    ...rest
  } = props
  let isVisible =
    visible !== null
      ? {
          visible: visible,
        }
      : {}
  return (
    <Popconfirm
      title={title}
      {...isVisible}
      onVisibleChange={onVisibleChange}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      {T_Button({ ...rest })}
    </Popconfirm>
  )
}

//级联选择框
const T_Cascader = (props) => {
  let { options = [], placeholder = "请选择", ...rest } = props

  return <Cascader options={options} placeholder={placeholder} {...rest} />
}

export {
  T_Upload,
  T_Popconfirm,
  T_Cascader,
  T_Search,
  T_Dropdown,
  T_Button,
  T_Select,
  T_RangePicker,
  T_Input,
}
