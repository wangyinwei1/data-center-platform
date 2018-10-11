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
        feature: {
          // dataView: {
          //   lang: ['预约日报表', '关闭', '下载'],
          //   readOnly: true,
          //   optionToContent: function(opt) {
          //     const listData = opt.listData;
          //     const trArr = [];
          //     // _.map(listData,(item)=>{
          //     //     return'<tr>' +
          //     //
          //     // })
          //     var series = opt.series;
          //
          //     var table =
          //       '<table style="width:100%;text-align:center"><thead><tr><th>采集值</th><th>时间</th></tr></thead><tbody><tr>' +
          //       '<th>时间</th>' +
          //       '<td>采集值</td>' +
          //       '</tr>';
          //     table +=
          //       '<tr>' +
          //       '<td>' +
          //       111 +
          //       '</td>' +
          //       '<td>' +
          //       3333 +
          //       '</td>' +
          //       '</tr>';
          //     table += '</tbody></table>';
          //     return table;
          //   },
          // },
          saveAsImage: {},
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
