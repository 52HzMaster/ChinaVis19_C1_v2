var myChart = echarts.init(document.getElementById('pie_chart'));
day1data = [{value: 272, name: 'VIP人员'}, {value: 758, name: '分会场A,B'}, {value: 415, name: '分会场C'}, {value: 485, name: '分会场D'}, {value: 1132, name: '普通参会人员'}, {value: 74, name: '服务人员'}, {value: 237, name: '游览人员'}, {value: 23, name: '记者'}, {value: 168, name: '黑客大赛参与者'}];
day2data = [{value: 272, name: 'VIP人员'}, {value: 758, name: '分会场A,B'}, {value: 415, name: '分会场C'}, {value: 485, name: '分会场D'}, {value: 1132, name: '普通参会人员'}, {value: 74, name: '服务人员'}, {value: 237, name: '游览人员'}, {value: 23, name: '记者'}, {value: 168, name: '黑客大赛参与者'}]


legend = ['VIP人员', '分会场A,B', '分会场C', '分会场D', '普通参会人员', '服务人员', '游览人员', '记者', '黑客大赛参与者'];

option = {
    title : {
        text: '会场人员分类',
        subtext: '第一天',
        x:'center',
        top: "2%",
        textStyle:{
            color:"#fff"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        //orient: 'vertical',
        bottom: "2%",
        x: 'left',
        data:legend,
        textStyle:{
            color:"#fff"
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius :['35%', '55%'],
            center: ['50%', '50%'],
            data:day1data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart.setOption(option);
