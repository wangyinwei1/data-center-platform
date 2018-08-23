import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import styles from './index.less';
import pieOption from './pieOption';
import ReactEcharts from 'echarts-for-react';
import {toJS} from 'mobx';
//实例
@inject('home_pageStore')
@observer
class Pie extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {home_pageStore: {getCountInfo}} = this.props;
    getCountInfo();
  }
  render() {
    const {home_pageStore: {allCount}, height} = this.props;
    const count = toJS(allCount) || {};
    const options = pieOption(count, height);
    return (
      <ReactEcharts
        style={{
          width: '100%',
          height: '80%',
          top: '50%',
          position: 'absolute',
          left: 0,
          transform: 'translateY(-50%)',
        }}
        option={options}
      />
    );
  }
}

export default Pie;
