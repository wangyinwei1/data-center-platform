import React, { Component } from "react"
import classNames from "classnames"
import "./index.less"
import CommonModal from "../../../components/CommonModal"
import { Button, Form, Input, Select } from "antd"
import classnames from "classnames"
import styles from "./index.less"
const FormItem = Form.Item
const Option = Select.Option
@Form.create()
class DeleteModal extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    const { isShow, onCancel, width, title, buttons, onOk } = this.props
    const cancelProps = {
      onClick: () => {
        onCancel()
      },
    }
    const okProps = {
      onClick: () => {
        onOk()
      },
    }
    const needButtons = buttons
      ? {}
      : {
          buttons: [],
        }
    return (
      <CommonModal
        isShow={isShow}
        {...needButtons}
        mask={false}
        width={width}
        okProps={okProps}
        cancelProps={cancelProps}
      >
        <div className={styles["delete_wrap"]}>
          <div className={styles["delete_title"]}>
            <span>{title}</span>
          </div>
          {this.props.children}
        </div>
      </CommonModal>
    )
  }
}
export default DeleteModal
