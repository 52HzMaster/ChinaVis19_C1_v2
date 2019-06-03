var myChart = echarts.init(document.getElementById('plot'));
option = {
    legend:{
        data:[1,2]
      },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    },{
        data: [320, 532, 101, 434, 290, 930, 120],
        type: 'line'
    }]
};
myChart.setOption(option);