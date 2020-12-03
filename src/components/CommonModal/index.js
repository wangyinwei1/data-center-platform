import React, { Component, PropTypes } from "react"
import { Modal, Button } from "antd"
import styles from "./index.less"

const CommonModal = function({
  title,
  width,
  data,
  iconClass,
  buttons,
  okProps = {},
  cancelProps = {},
  isShow,
  children,
  confirmLoading = false,
  wrapClassName,
  localeMessage,
}) {
  const modalFooter = []
  if (!buttons) {
    modalFooter.push(
      <div className="modal-footer" key={1}>
        <Button
          type="ghost"
          disabled={cancelProps.disabled}
          className={"ghostBtn" + (cancelProps.className || "")}
          onClick={() => {
            cancelProps.onClick && cancelProps.onClick(data)
          }}
        >
          {cancelProps.title || "取消"}
        </Button>
        <Button
          type="primary"
          loading={confirmLoading}
          disabled={okProps.disabled || undefined}
          className={okProps.className || ""}
          onClick={() => {
            okProps.onClick && okProps.onClick(data)
          }}
        >
          {okProps.title || "确定"}
        </Button>
      </div>
    )
  } else {
    modalFooter.push(
      <div className={"modal-footer"} key={1}>
        {buttons}
      </div>
    )
  }

  return (
    <Modal
      title={title}
      destroyOnClose={true}
      width={width}
      wrapClassName={wrapClassName || ""}
      maskClosable="true"
      confirmLoading={confirmLoading}
      onCancel={() => {
        cancelProps.onClick && cancelProps.onClick()
      }}
      visible={isShow}
      footer={modalFooter}
    >
      {iconClass ? (
        <div className={"withIconDiv"}>
          <i className={"iconClass"} />
          <div>{children}</div>
        </div>
      ) : (
        children
      )}
    </Modal>
  )
}

CommonModal.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object, // 弹出框用到的数据，用于确认和取消按钮点击后的回调
  buttons: PropTypes.arrayOf(PropTypes.node),
  okProps: PropTypes.shape({
    className: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string, // 按钮标题
    disabled: PropTypes.bool,
  }),
  cancelProps: PropTypes.shape({
    className: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string, // 按钮标题
    disabled: PropTypes.bool,
  }),
  isShow: PropTypes.bool.isRequired,
  iconClass: PropTypes.string,
}

export default CommonModal
