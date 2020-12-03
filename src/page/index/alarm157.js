import React, { Component } from "react"
import { action, observer, inject } from "mobx-react"
import styles from "./index.less"
import classnames from "classnames"
import Panel from "../../components/Panel"
import _ from "lodash"
import ChildTable from "./childTable.js"
import { toJS } from "mobx"
//实例
@inject("home_pageStore")
@observer
class Pie extends Component {
  constructor(props) {
    super(props)
    this.switchAlarm = this.switchAlarm.bind(this)
    this.switchAlarmApi = this.switchAlarmApi.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.state = {
      isFsu: true,
      startRun: true,
      isRotate0: true,
      show: false,
      direction: [
        {
          name: "front",
          type: "基础告警",
          switchName: "切换到FSU告警",
          active: false,
        },
        {
          name: "top",
          type: "FSU告警",
          switchName: "切换到基础告警",
          active: true,
        },
      ],
      transitionEnd: false,
    }
  }
  transitonEnd() {
    let direction = _.cloneDeep(this.state.direction)
    const isFsu = this.state.isFsu
    if (isFsu) {
      direction[1].active = true
      direction[0].active = false
    } else {
      direction[0].active = true
      direction[1].active = false
    }
    this.setState({
      direction: direction,
      startRun: false,
      // isRotate0: isFsu ? false : true,
      // isFsu: !isFsu,
    })
  }
  isBrowerEvent() {
    const body = document.body || document.documentElement,
      style = body.style
    const transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend",
    }
    for (var name in transEndEventNames) {
      if (typeof style[name] === "string") {
        return transEndEventNames[name]
      }
    }
  }
  componentWillUnmount() {
    const transitionEnd = this.isBrowerEvent()
    $("#cl_box_alarm").off(`${transitionEnd}.alarm`)
    $("#cl_box_alarm").off("mouseenter.alarm")
    $("#cl_box_alarm").off("mouseleave.alarm")
    clearInterval(this.alarmTimer)
  }
  componentDidMount() {
    const {
      home_pageStore: { getFsuAlarmNum, getAlarmNum },
    } = this.props
    const params = {
      page: 1,
      number: 10,
      keywords: "",
      type: "",
      des: 1,
    }

    getFsuAlarmNum({ ...params, sort: "F_AlarmLevel" })
    getAlarmNum({ ...params, sort: "F_AlarmGrade" })
    const transitionEnd = this.isBrowerEvent()
    $("#cl_box_alarm").on(`${transitionEnd}.alarm`, () => {
      this.transitonEnd()
    })
    $("#cl_box_alarm").on("mouseenter.alarm", (e) => {
      e.stopPropagation()
      clearInterval(this.alarmTimer)
    })
    $("#cl_box_alarm").on("mouseleave.alarm", (e) => {
      e.stopPropagation()
      // this.openSetInterval(params);
    })
    // this.openSetInterval(params);
  }
  openSetInterval(params) {
    const {
      home_pageStore: { getFsuAlarmNum, getAlarmNum, getCountInfo },
    } = this.props
    this.alarmTimer = setInterval(() => {
      this.switchAlarm()
      this.state.isFsu
        ? getFsuAlarmNum({ ...params, sort: "F_AlarmLevel" })
        : getAlarmNum({ ...params, sort: "F_AlarmGrade" })
      getCountInfo()
    }, 5000)
  }
  switchAlarmApi() {
    const {
      home_pageStore: { getFsuAlarmNum, getAlarmNum, getCountInfo },
    } = this.props
    clearInterval(this.alarmTimer)
    const params = {
      page: 1,
      number: 10,
      keywords: "",
      type: "",
      des: 1,
    }
    this.switchAlarm()
    !this.state.isFsu
      ? getFsuAlarmNum({ ...params, sort: "F_AlarmLevel" })
      : getAlarmNum({ ...params, sort: "F_AlarmGrade" })
    getCountInfo()
  }
  switchAlarm() {
    let direction = _.cloneDeep(this.state.direction)
    const isFsu = this.state.isFsu
    direction[0].active = true
    direction[1].active = true
    this.setState({
      startRun: true,
      isFsu: !this.state.isFsu,
      direction: direction,
    })
  }
  alarmItemClick(type) {
    const {
      home_pageStore: { getTable, getFsuTable },
    } = this.props
    this.setState({
      show: true,
    })
    const params = {
      page: 1,
      number: 10,
      keywords: "",
      type: type === 0 ? "" : type,
      sort: !this.state.isFsu ? "F_AlarmGrade" : "F_AlarmLevel",
      des: 1,
    }
    !this.state.isFsu ? getTable(params) : getFsuTable(params)
  }
  onCancel() {
    this.setState({
      show: false,
    })
    const params = {
      page: 1,
      number: 10,
      keywords: "",
      type: "",
      des: 1,
    }
    const {
      home_pageStore: { getFsuAlarmNum, getAlarmNum },
    } = this.props
    this.state.isFsu
      ? getFsuAlarmNum({ ...params, sort: "F_AlarmLevel" })
      : getAlarmNum({ ...params, sort: "F_AlarmGrade" })
    // this.openSetInterval(params)
  }

  render() {
    const {
      home_pageStore: { alarmFsuMenuList, alarmMenuList },
      height,
    } = this.props

    const AlarmItem = (props) => {
      const item = props.item
      const index = props.index
      return (
        <div
          className={styles["alarm_ct"]}
          onClick={this.alarmItemClick.bind(this, item.type)}
        >
          <i
            className={classnames(
              "icon iconfont icon-huodonggaojing",
              styles["icon"],
              styles[`color${item.type}`]
            )}
          />
          <span className={styles["alarm_title"]}>
            <span className={styles["alarm_num"]}>{item.typeCount}</span>
            <span className={styles["alarm_grade"]}>{item.name}</span>
          </span>
        </div>
      )
    }
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div id={"cl_alarm_item"} className={styles["alarm_wrap"]}>
          <ul
            id={"cl_box_alarm"}
            className={classnames(
              styles["alarm_box_wrap"],
              this.state.startRun && styles["active"],
              this.state.isFsu && styles["turn_over"],
              this.state.isRotate0 ? styles["rotate0"] : styles["rotate30"]
            )}
          >
            {_.map(this.state.direction, (app, index) => {
              return (
                <li
                  key={index.toString(36) + index}
                  className={classnames(
                    styles["alarm_box_item"],
                    app.active && styles["active"]
                  )}
                >
                  <div className={styles["alarm_header"]}>
                    <span className={styles["zh"]}>
                      {/* 告警中心 / {app.type} */}
                    </span>
                    <span className={styles["en"]}>
                      ALARM CENTER
                      {/* / {app.type === "基础告警" ? "BASIC" : "FSU"}{" "}
                      ALARM
 */}
                    </span>
                    {/* <span
                      onClick={this.switchAlarmApi}
                      className={styles["switch_alarm"]}
                    >
                      {app.switchName}
                    </span> */}
                  </div>
                  <div className={styles["alarm_body"]}>
                    {_.map(
                      app.type === "基础告警"
                        ? toJS(alarmMenuList)
                        : toJS(alarmFsuMenuList),
                      (item, i) => {
                        return (
                          <AlarmItem
                            key={i.toString(36) + i}
                            item={item}
                            index={i}
                          />
                        )
                      }
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <Panel
          onCancel={this.onCancel}
          title={this.state.isFsu ? "FSU告警" : "基础告警"}
          theme={"darker"}
          isShow={this.state.show}
        >
          <ChildTable isFsu={this.state.isFsu} />
        </Panel>
      </div>
    )
  }
}

export default Pie
