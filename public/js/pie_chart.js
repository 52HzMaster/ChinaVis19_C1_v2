
let pie_ ={};

pie_.day1data = [{value: 272, name: 'VIP人员'}, {value: 758, name: '分会场A,B'}, {value: 415, name: '分会场C'}, {value: 485, name: '分会场D'}, {value: 1132, name: '普通参会人员'}, {value: 74, name: '服务人员'}, {value: 237, name: '游览人员'}, {value: 23, name: '媒体记者'}, {value: 168, name: '会议委员会'}];
pie_.day2data = [{value: 300, name: 'VIP人员'}, {value: 1315, name: '分会场A,B'}, {value: 401, name: '分会场C'}, {value: 363, name: '分会场D'}, {value: 989, name: '普通参会人员'}, {value: 74, name: '服务人员'}, {value: 781, name: '游览人员'}, {value: 29, name: '媒体记者'}, {value: 182, name: '会议委员会'}];
pie_.day3data = [{value: 196, name: 'VIP人员'}, {value: 630, name: '主会场分会场A'}, {value: 152, name: '分会场A'}, {value: 966, name: '分会场B'}, {value: 177, name: '分会场C'}, {value: 485, name: '普通参会人员'}, {value: 74, name: '服务人员'}, {value: 58, name: '游览人员'}, {value: 17, name: '媒体记者'}, {value: 175, name: '会议委员会'}];

pie_.legend = ['VIP人员', '分会场A,B', '分会场C', '分会场D', '普通参会人员', '服务人员', '游览人员', '媒体记者', '会议委员会'];
pie_.day3legend = ['VIP人员', '主会场分会场A', '分会场A', '分会场B', '分会场C', '普通参会人员', '服务人员', '游览人员', '媒体记者', '会议委员会'];
pie_.all_num = ["3564","4434","2930"];

pie_chart(pie_.day1data,pie_.legend,0);

function pie_chart(data,legend,index) {

    let message = "";

    let myChart = echarts.init(document.getElementById('pie_main'));

    myChart.clear();

    myChart.on("click",function (e) {
        if(e.componentType === "graphic"){
            console.log("all_traj");
        }
        else{
            para_coor_group(GROUP.indexOf(e.name),e.color);
            index ===2?draw_group_traj(index,GROUP_.indexOf(e.name),e.color):draw_group_traj(index,GROUP.indexOf(e.name),e.color);
        }
    });

    myChart.on("mouseover",function (e) {
        console.log(e.name);
        data.forEach((d)=>{
            if(e.name === d.name){
                message = d.value;
                option.graphic.style.text = message;
                myChart.setOption(option);
            }
        });
    });

    myChart.on("mouseout",function () {
        option.graphic.style.text = "";
        myChart.setOption(option);
    })

    let option = {
        title : {
            text: '会场人员分类',
            x:'center',
            top: "2%",
            textStyle:{
                color:"#fff",
                fontWeight:700,
                fontSize:20
            }
        },
        //color:["#FF0033","#9966FF","#99FF00","#CC33CC","#CC6600","#CCFF00","#FF00FF","#FF6600","#FFFF00"],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            bottom: "2%",
            top:"75%",
            "left":"2%",
            icon:"path://M898.2 785.4c-18-113-102.2-204.7-212.8-236.6 58-31.2 97.5-93 97.5-164.3 0-102.7-82.1-185.9-183.4-185.9s-183.4 83.2-183.4 185.9c0 71.1 39.4 132.8 97.2 164.1-110.9 31.8-195.2 123.7-213.2 236.8-3.8 23.8 15.1 45.3 39.9 45.3h518.3c24.8 0 43.7-21.5 39.9-45.3zM347.9 538.6c0.6-7.6-3.6-14.9-10.5-18.2-51.2-24.6-84.2-77.7-84.2-135.2 0-82.4 65.7-149.5 146.4-149.5 10.3 0 18.6-8.3 18.6-18.6s-8.3-18.6-18.6-18.6c-101.2 0-183.6 83.8-183.6 186.7 0 58.2 27.3 112.9 71.8 147.8-84.6 39-146 119.2-160.4 213.1-1.6 10.2 5.4 19.6 15.5 21.2 0.9 0.1 1.9 0.2 2.8 0.2 9 0 16.9-6.5 18.3-15.7 14.2-92.8 81.2-170 170.7-196.9 7.4-2.2 12.6-8.7 13.2-16.3z",
            x: 'left',
            data:legend,
            textStyle:{
                color:"#fff"
            }
        },
        graphic:{
            type:"text",
            left:"42%",
            x:"center",
            top:"43%",
            style:{
                text:message,
                textAlign:"center",
                fill:"#FFF",
                fontSize:30,
                fontWeight:700
            }
        },
        series: [
            {
                name: '人员类型',
                type: 'pie',
                radius :['25%', '55%'],
                center: ['51%', '45%'],
                data:data,
                roseType: 'radius',
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
            }
        ]
    };

    myChart.setOption(option);
}