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
    this.state = {
      confirmLoading: false,
    }
  }
  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    const { isShow, onCancel, width, title, buttons, onOk, name } = this.props
    const cancelProps = {
      onClick: () => {
        onCancel()
      },
    }
    const okProps = {
      onClick: async () => {
        let handlePromiseOnOk = onOk()
        if (handlePromiseOnOk && handlePromiseOnOk.then) {
          this.setState({ confirmLoading: true })
          handlePromiseOnOk.then(
            () => {
              this.setState({ confirmLoading: false })
            },
            (e: Error) => {
              this.setState({ confirmLoading: false })
            }
          )
        }
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
        confirmLoading={this.state.confirmLoading}
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
