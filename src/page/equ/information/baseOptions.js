import React, {Component} from 'react';
const option = () => {
  return [
    {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: [],
      },
      toolbox: {
        right: 12,
        feature: {
          saveAsImage: {
            title: '保存图片',
          },
        },
      },
      grid: {
        left: '4%',
        right: '6%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [],
    },
  ];
};
export default option;
