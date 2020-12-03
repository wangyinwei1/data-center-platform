import { inject, observer } from "mobx-react"

import React, { Component } from "react"
import classNames from "classnames"
import "./index.less"
import CommonModal from "../../../components/CommonModal"
import { Button } from "antd"
import classnames from "classnames"
import styles from "./index.less"
class DeleteModal extends Component {
  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    const { isShow, onOk, onCancel, hintContent } = this.props
    const okProps = {
      onClick: () => {
        onOk()
      },
    }
    const cancelProps = {
      onClick: () => {
        onCancel()
      },
    }
    let modalFooter = []
    modalFooter.push(
      <div key={1}>
        <Button
          type="primary"
          onClick={() => {
            okProps.onClick()
          }}
        >
          {"删除"}
        </Button>
        <Button
          type="primary"
          onClick={() => {
            cancelProps.onClick()
          }}
        />
      </div>
    )
    return (
      <CommonModal
        isShow={isShow}
        mask={false}
        width={414}
        okProps={okProps}
        cancelProps={cancelProps}
      >
        <div className={styles["delete_wrap"]}>
          <div className={styles["delete_title"]}>
            <span>提示</span>
            <span style={{ fontSize: "10px" }}>&nbsp;Notice</span>
          </div>

          <p className={styles["delete_ct"]}>
            <i className={classnames("icon iconfont icon-jinggao")} />
            <span>
              {hintContent ? hintContent : "此操作将删除该条数据, 是否继续?"}
            </span>
          </p>
        </div>
      </CommonModal>
    )
  }
}
export default DeleteModal
