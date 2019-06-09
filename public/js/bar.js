
let pie_ ={};

pie_.day1data = [{value: 272, name: 'VIP人员'}, {value: 758, name: '分会场A,B'}, {value: 415, name: '分会场C'}, {value: 485, name: '分会场D'}, {value: 1132, name: '普通参会人员'}, {value: 74, name: '服务人员'}, {value: 237, name: '游览人员'}, {value: 23, name: '媒体记者'}, {value: 168, name: '餐饮服务人员'}];
pie_.day2data = [{value: 300, name: 'VIP人员'}, {value: 1315, name: '分会场A,B'}, {value: 401, name: '分会场C'}, {value: 363, name: '分会场D'}, {value: 989, name: '普通参会人员'}, {value: 74, name: '服务人员'}, {value: 781, name: '游览人员'}, {value: 29, name: '媒体记者'}, {value: 182, name: '餐饮服务人员'}];
pie_.day3data = [{value: 196, name: 'VIP人员'}, {value: 630, name: '主会场分会场A'}, {value: 152, name: '分会场A'}, {value: 966, name: '分会场B'}, {value: 177, name: '分会场C'}, {value: 485, name: '普通参会人员'}, {value: 74, name: '服务人员'}, {value: 58, name: '游览人员'}, {value: 17, name: '媒体记者'}, {value: 175, name: '餐饮服务人员'}];

pie_.legend = ['VIP人员', '分会场A,B', '分会场C', '分会场D', '普通参会人员', '服务人员', '游览人员', '媒体记者', '餐饮服务人员'];
pie_.day3legend = ['VIP人员', '主会场分会场A', '分会场A', '分会场B', '分会场C', '普通参会人员', '服务人员', '游览人员', '媒体记者', '餐饮服务人员']
pie_.day =["第一天","第二天","第三天"];

pie_chart(pie_.day1data,pie_.legend,pie_.day[0]);

function pie_chart(data,legend,day) {

    let myChart = echarts.init(document.getElementById('pie_chart'));

    myChart.clear();

    myChart.on("click",function (e) {
        //console.log(e.color);
        para_coor_group(GROUP.indexOf(e.name),e.color);
        draw_group_traj(GROUP.indexOf(e.name),e.color);
    });

    let option = {
        title : {
            text: '会场人员分类',
            subtext: day,
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
                data:data,
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
}