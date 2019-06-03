// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('bar'));

// 指定图表的配置项和数据
//day3
day3data = [
    {value:192, name:'VIP'},
    {value:1054, name:'普通参会'},
    {value:586, name:'A会场'},
    {value:646, name:'B会场'},
    {value:185, name:'C会场'},
    {value:74, name:'工作人员'},
    {value:176, name:'餐饮人员'},
    {value:17, name:'记者'}
];
//day2
day2data = [
    {value:300, name:'VIP'},
    {value:909, name:'普通参会'},
    {value:836, name:'凑热闹'},
    {value:355, name:'A,B会场'},
    {value:854, name:'B会场'},
    {value:585, name:'C会场'},
    {value:310, name:'D会场'},
    {value:74, name:'工作人员'},
    {value:182, name:'餐饮人员'},
    {value:29, name:'记者'}
];
//day1
day1data = [
    {value:264, name:'VIP'},
    {value:1109, name:'普通参会'},
    {value:243, name:'凑热闹'},
    {value:362, name:'A,B会场'},
    {value:924, name:'C会场'},
    {value:395, name:'D会场'},
    {value:74, name:'工作人员'},
    {value:170, name:'餐饮人员'},
    {value:23, name:'记者'}
];
option = {
    title : {
        text: '会场人员分类',
        subtext: '第一天',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:day2data,
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
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);