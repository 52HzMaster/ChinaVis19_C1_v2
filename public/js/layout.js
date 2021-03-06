let floor1_areas = {};
let floor2_areas = {};
//分会场
floor1_areas.area_A = area_compute(2,1,3,5);
floor1_areas.area_B = area_compute(4,1,5,5);
floor1_areas.area_C = area_compute(6,1,7,5);
floor1_areas.area_D = area_compute(8,1,9,5);
//签到处  海报区
floor1_areas.area_sign = area_compute(12,2,13,5);
floor1_areas.area_poster = area_compute(3,7,9,8);
//厕所
floor1_areas.area_wc1 = area_compute(4,10,5,11);
floor1_areas.area_wc2 = area_compute(14,27,15,28);
//房间1~4
floor1_areas.area_room1 = area_compute(6,10,9,11);
floor1_areas.area_room2 = area_compute(10,10,11,11);
floor1_areas.area_room3 = area_compute(14,21,15,24);
floor1_areas.area_room4 = area_compute(14,25,15,26);
//扶梯1~2
floor1_areas.area_ladder1 = area_compute(1,10,1,11);
floor1_areas.area_ladder2 = area_compute(14,10,14,11);
//服务台 展厅 主会场
floor1_areas.area_serve = area_compute(14,19,15,20);
floor1_areas.area_disc = area_compute(2,15,11,18);
floor1_areas.area_main = area_compute(2,19,11,28);
//进出口
floor1_areas.area_in = [{x:13,y:0},{x:15,y:2},{x:15,y:4},{x:15,y:7}];
floor1_areas.area_out = [{x:0,y:19},{x:15,y:5},{x:15,y:15},{x:15,y:17}];

//餐厅
floor2_areas.area_canteen = area_compute(2,1,9,5);
//房间5~6
floor2_areas.area_room5 = area_compute(10,1,11,5);
floor2_areas.area_room6 = area_compute(6,10,7,11);
//休闲区
floor2_areas.area_leisure = area_compute(13,0,15,5);
//厕所3
floor2_areas.area_wc3 = area_compute(4,10,5,11);
//扶梯1~2
floor2_areas.area_ladder3 = area_compute(1,10,1,11);
floor2_areas.area_ladder4 = area_compute(14,10,14,11);

function area_compute(x1,y1,x2,y2) {
    let data= [];
    for(let i=x1;i<x2+1;i++)
        for(let j=y1;j<y2+1;j++)
            data.push({x:i,y:j});
    return data;
}

let floor1_area = ["area_A","area_B","area_C","area_D",
    "area_sign","area_poster",
    "area_ladder1","area_ladder2",
    "area_wc1","area_wc2",
    "area_room1","area_room2","area_room3","area_room4",
    "area_serve", "area_disc","area_main",
    "area_in", "area_out"
];

let floor2_area = ["area_canteen","area_leisure",
    "area_wc3",
    "area_ladder3","area_ladder4",
    "area_room5","area_room6"
];

let colorScale = {"area_A":"#306bff","area_B":"#34a8ff","area_C":"#44caff","area_D":"#5afaff",
    "area_canteen":"#ffd172",
    "area_leisure":"#c8ff32",
    "area_sign":"#ffb48f","area_poster":"#fff277",
    "area_wc1":"#ffd2a6","area_wc2":"#ffd2a6","area_wc3":"#ffd2a6",
    "area_room1":"#8409ff","area_room2":"#a143ff","area_room3":"#c180ff","area_room4":"#ccb1ff","area_room5":"#8409ff","area_room6":"#a143ff",
    "area_ladder1":"#ff7e50","area_ladder2":"#ff7e50", "area_ladder3":"#ff7e50","area_ladder4":"#ff7e50",
    "area_serve":"#ff6c22","area_disc":"#ff5821","area_main":"#306bff",
    "area_in":"#16ff3c","area_out":"#ff2c31",
    "area_other":"#c8c8c7"
};

let all_areas = [
    "area_A","area_B","area_C","area_D",
    "area_sign","area_poster",
    "area_ladder1","area_ladder2","area_ladder3","area_ladder4",
    "area_wc1","area_wc2","area_wc3",
    "area_room1","area_room2","area_room3","area_room4","area_room5","area_room6",
    "area_serve", "area_disc","area_main",
    "area_canteen","area_leisure",
    "area_in", "area_out",
    "area_other"
];

Layout();

function Layout() {

    let all_view = $(".all_view");
    let width = all_view.width();
    let height = all_view.height();

    let header = document.getElementById('header');
    header.style.width = width * 0.99  + 'px';
    header.style.height = height * 0.08 + 'px';

    let func_chart = document.getElementById("func_chart");
    func_chart.style.width = width*0.24  + 'px';
    func_chart.style.height = height*0.1  + 'px';

    let control = document.getElementById("control");
    control.style.width = width*0.24  + 'px';
    control.style.height = height*0.49  + 'px';

    let sensor_line = document.getElementById("sensor_line");
    sensor_line.style.width = width*0.24  + 'px';
    sensor_line.style.height = height*0.49  + 'px';

    let main = document.getElementById('main');
    main.style.width = width*0.5  + 'px';
    main.style.height = height*0.6  + 'px';

    let para_coor = document.getElementById("para_coor");
    para_coor.style.width = width*0.4925  + 'px';
    para_coor.style.height = height*0.28  + 'px';

    let para_coor_main = document.getElementById("para_coor_main");
    para_coor_main.style.width = width*0.4925  + 'px';
    para_coor_main.style.height = height*0.28  + 'px';

    let workarea = document.getElementById("workarea");
    workarea.style.width = width*0.24  + 'px';
    workarea.style.height = height*0.09  + 'px';

    let pie_chart = document.getElementById("pie_chart");
    pie_chart.style.width = width*0.24  + 'px';
    pie_chart.style.height = height*0.5  + 'px';

    let pie_main = document.getElementById("pie_main");
    pie_main.style.width = width*0.24  + 'px';
    pie_main.style.height = height*0.5  + 'px';

    let time_line = document.getElementById("time_line");
    time_line.style.width = width*0.4925  + 'px';
    time_line.style.height = height*0.28  + 'px';
    
    let plot = document.getElementById("plot");
    plot.style.width = width*0.4925  + 'px';
    plot.style.height = height*0.28  + 'px';

    d3.select("#header").append("div")
        .attr("class","header_left")
        .append("svg")
        .attr("width",width * 0.4 -10)
        .attr("height",38)
        .append("image")
        .attr("x",0)
        .attr("y",0)
        .attr("width",width * 0.4 -10)
        .attr("height",38)
        .attr("xlink:href","img/1.png");

    d3.select("#header").append("div")
        .attr("class","header_right")
        .append("svg")
        .attr("width",width * 0.4 -10)
        .attr("height",38)
        .append("image")
        .attr("x",0)
        .attr("y",0)
        .attr("width",width * 0.4 -10)
        .attr("height",38)
        .attr("xlink:href","img/2.png");

    d3.select(".header_title").style("font-size",width/60+"px");

}

$(window).resize(function () {
    window.location.reload();
});
