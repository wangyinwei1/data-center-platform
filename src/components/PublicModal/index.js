import React, { PureComponent } from "react"
import "./index.less"
import CommonModal from "../CommonModal"
import { Button } from "antd"
import classnames from "classnames"
import styles from "./index.less"

class PublicModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmLoading: false,
    }
  }
  componentDidMount() {
    const { modalRef } = this.props
    modalRef && modalRef(this)
  }
  componentWillUnmount() {
    this.setState({
      visible: false,
      confirmLoading: false,
    })
  }
  changeVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  render() {
    const { modalRef } = this.props
    //modalref是必须字段
    if (typeof modalRef !== "function") {
      console.warn("The modelRef must be a function!")
      return null
    }
    const {
      onOk,
      wrapClassName,
      onCancel,
      buttons = true,
      title,
      theme,
      width,
      mode,
    } = this.props
    const okProps = {
      onClick: () => {
        if (onOk) {
          let handlePromiseOnOk = onOk(this)
          if (handlePromiseOnOk && handlePromiseOnOk.then) {
            this.setState({ confirmLoading: true })
            handlePromiseOnOk.then(
              () => {
                this.setState({ confirmLoading: false, visible: false })
              },
              (e) => {
                this.setState({ confirmLoading: false })
              }
            )
          }
        }
      },
    }
    const cancelProps = {
      onClick: () => {
        if (onCancel) {
          onCancel()
        }

        this.setState({
          visible: false,
        })
      },
    }
    const needButtons = buttons
      ? {}
      : {
          buttons: [],
        }

    return (
      <CommonModal
        isShow={this.state.visible}
        {...needButtons}
        mask={false}
        width={width}
        wrapClassName={
          wrapClassName + ` ${theme === "darker" && "index_modal_darker"}`
        }
        okProps={okProps}
        confirmLoading={this.state.confirmLoading}
        cancelProps={cancelProps}
      >
        <div
          className={classnames(
            styles["edit_wrap"],
            theme === "darker" && styles["darker"]
          )}
        >
          <div className={styles["edit_title"]}>
            <span>{title || ""}</span>
          </div>
          {this.props.children}
        </div>
      </CommonModal>
    )
  }
}
export default PublicModal
