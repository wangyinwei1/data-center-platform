import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import { Form } from "antd"
import styles from "./index.less"
import PieEcharts from "./pieEcharts.js"
import Alarm from "./alarm.js"
import classnames from "classnames"
import Services from "./services.js"
//实例
@inject("globalStore", "layoutStore")
@observer
class Regional extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scaleX: 1,
      scaleY: 1,
    }
  }
  componentDidUpdate() {
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.adaptive()
      window.onresize = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.adaptive()
        }, 50)
      }
    }, 50)
  }
  componentDidMount() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.adaptive()
      window.onresize = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.adaptive()
        }, 50)
      }
    }, 50)
  }

  adaptive() {
    const width = 1920 - 46
    const height = 1080 - 44
    const c_width = this.root.offsetWidth
    const c_height = this.root.offsetHeight

    let update =
      this.state.scaleX === c_width / width &&
      this.state.scaleY === c_height / height
    !update &&
      this.setState({
        scaleX: c_width / width,
        scaleY: c_height / height,
      })
  }
  render() {
    let width = 1920 - 46
    let height = 1080 - 44

    return (
      <div
        className={styles["wrap"]}
        ref={(c) => {
          this.root = c
        }}
      >
        <div
          className={styles["index_wrap"]}
          style={{
            width: this.state.scaleX * width + "px",
            height: this.state.scaleY * height + "px",
          }}
        >
          <div className={classnames(styles["index_bg"])}>
            <div className={styles["alarm_state_wrap"]}>
              <div
                className={styles["state_quantity"]}
                style={{
                  fontSize: 285 * this.state.scaleY + "px",
                }}
              >
                <PieEcharts height={285 * this.state.scaleY} />
              </div>
              <div
                className={styles["alarm_center"]}
                style={{
                  fontSize: 285 * this.state.scaleY + "px",
                }}
              >
                <Alarm height={285 * this.state.scaleY} />
              </div>
            </div>
            <div
              className={styles["services_wrap"]}
              style={{
                fontSize: 759 * this.state.scaleY + "px",
              }}
            >
              <Services
                width={1530 * this.state.scaleX}
                height={759 * this.state.scaleY}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Regional
