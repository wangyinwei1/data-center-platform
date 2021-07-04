const option = () => {
  return {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        return (
          params[0].marker + params[0].name + '：' + params[0].value + '<br>'
        );
      },
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    color: ['#5dd69a'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['内存使用率', 'CPU使用率'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name: '百分比(%)',
        type: 'value',
        max: 100,
        interval: 20,
      },
    ],
    series: [
      {
        name: 'FSU运行状态',
        type: 'bar',
        barWidth: '25%',
        data: [],
      },
    ],
  };
};
export default option;
