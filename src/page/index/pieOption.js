const option = (allCount: {}, height) => {
  return {
    tooltip: {
      trigger: 'item',
      //formatter: '{a} <br/>{b} : {c} ({d}%)',
      formatter: '{a} <br/>{b} ({d}%)',
    },
    legend: {
      show: false,
      orient: 'vertical',
      left: '53%',
      top: '25%',
      itemWidth: 10 / 198 * height,
      itemHeight: 10 / 198 * height,
      itemGap: 17 / 198 * height,
      textStyle: {
        color: '#fff',
      },
      textStyle: {
        fontSize: 14 / 198 * height,
        color: 'rgba(255, 255, 255, 0.95)',
        lineHeight: 30 / 198 * height,
        fontFamily: 'PingFangSC-Thin',
        padding: [0, 0, 0, 10 / 198 * height],
        fontFamily: 'Microsoft YaHei',
      },

      data: [
        // {
        //   name: `在线数量 : ${allCount.OnCount ? allCount.OnCount : 0}`,
        //   icon: 'rect',
        // },
        // {
        //   name: `告警数量 : ${allCount.alarmCount ? allCount.alarmCount : 0}`,
        //   icon: 'rect',
        // },
        // {
        //   name: `离线数量 : ${allCount.OffCount ? allCount.OffCount : 0}`,
        //   icon: 'rect',
        // },
        // {
        //   name: `异常数量 : ${allCount.ErrCount ? allCount.ErrCount : 0}`,
        //   icon: 'rect',
        // },
      ],
    },
    // color: ['#65e6a5', '#fff', '#5c667d', '#ff8a00', '#e8f000'],
    color: ['#36b1ff', '#ff0000', '#5c667d', '#ff8a00', '#ddd'],
    series: [
      {
        name: '状态',
        type: 'pie',
        center: ['28%', '50%'],
        selectedOffset: 3.5,
        labelLine: {
          normal: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            shadowColor: 'rgba(4, 22, 74, 0.39)',
            shadowBlur: 12,
            shadowOffsetY: 7,
            shadowOffsetX: 7,
          },
        },

        label: {
          normal: {
            show: false,
            position: 'center',
          },
          emphasis: {
            show: false,
          },
        },
        data: [
          {
            value: allCount.OnCount ? allCount.OnCount : 0,
            name: `在线数量 : ${allCount.OnCount ? allCount.OnCount : 0}`,
            selected: true,
          },
          {
            value: allCount.alarmCount ? allCount.alarmCount : 0,
            name: `告警数量 : ${allCount.alarmCount ? allCount.alarmCount : 0}`,
            selected: true,
          },
          {
            value: allCount.OffCount ? allCount.OffCount : 0,
            name: `离线数量 : ${allCount.OffCount ? allCount.OffCount : 0}`,
            selected: true,
            itemStyle: {
              normal: {
                shadowBlur: 12,
                shadowOffsetY: 6,
                shadowOffsetX: 4,
              },
            },
          },
          {
            value: allCount.ErrCount ? allCount.ErrCount : 0,
            name: `异常数量 : ${allCount.ErrCount ? allCount.ErrCount : 0}`,
            selected: true,
          },
          {
            value: allCount.forbiddenCount ? allCount.forbiddenCount : 0,
            name: `禁用数量 : ${
              allCount.forbiddenCount ? allCount.forbiddenCount : 0
            }`,
            selected: true,
          },
        ],
      },
    ],
  };
};

export default option;
