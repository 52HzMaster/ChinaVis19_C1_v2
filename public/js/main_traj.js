/**
 * Created by Liang Liu on 2019/4/1.
 */


let main = $("#main");
let gridSize_w = (main.width() ) / 30;
let gridSize_h = (main.height() ) / 16;

let card_x = 30;
let card_y = 16;

let width = gridSize_w * card_x;
let height = gridSize_h * card_y;

let floor_data = [];
for (let i = 0; i < card_x; i++)
    for (let j = 0; j < card_y; j++)
        floor_data.push({x: i, y: j});


let floor_svg = d3.select("#main")
    .append("svg")
    .attr("id", "floor_svg")
    .attr("width", width)
    .attr("height", height)
    .style({
        "position": "absolute",
        //'left':"100px"
        "background": "#8f8f8f",
        "opacity": 0.6
    });

let floor_g = floor_svg.append("g");
//let legend_g = legend_svg.append("g");

let line = d3.svg.line()
    .x(function (d) {
        //return d[1] * gridSize_w + gridSize_w / 2;
        return d.y * gridSize_w + gridSize_w / 2;
    })
    .y(function (d) {
        //return d[0] * gridSize_h + gridSize_h / 2;
        return d.x * gridSize_h + gridSize_h / 2;
    })
    .interpolate("basis");
//.interpolate("bundle")
//.tension(.7);

/*    ==========================================  ==============
 linear - 线性插值
 linear-closed - 线性插值，封闭起点和终点形成多边形
 step - 步进插值，曲线只能沿x轴和y轴交替伸展
 step-before - 步进插值，曲线只能沿y轴和x轴交替伸展
 step-after - 同step
 basis - B样条插值
 basis-open - B样条插值，起点终点不相交
 basis-closed - B样条插值，连接起点终点形成多边形
 bundle - 基本等效于basis，除了有额外的tension参数用于拉直样条
 cardinal - Cardina样条插值
 cardinal-open - Cardina样条插值，起点终点不相交
 cardinal-closed - Cardina样条插值，连接起点终点形成多边形
 monotone - 立方插值，保留y方向的单调性
 ====================================================================*/

draw_floor();
draw_sensor_f1();
draw_area_f1();
//draw_area_f2();

function draw_floor() {
    let floor1_cards = floor_g.selectAll(".grid")
        .data(floor_data)
        .enter()
        .append("rect")
        .attr("class", "grid")
        // .attr("rx",2)
        // .attr("ry",2)
        .attr("x", function (d) {
            return d.x * gridSize_w;
        })
        .attr("y", function (d) {
            return d.y * gridSize_h;
        })
        .attr("width", gridSize_w)
        .attr("height", gridSize_h)
        .style({
            "fill": "#999999"
        })
}
function draw_sensor_f1() {
    let sensor_f1 = floor_svg.append("g").selectAll(".grid")
        .data(sensor_data[0].values)
        .enter()
        .append("rect")
        .attr("class", "grid")
        .attr("id",(d)=> "sensor_"+d.sid)
        .attr("x", function(d) { return d.y * gridSize_w; } )
        .attr("y", function(d) {return d.x * gridSize_h; })
        //.attr("rx",2)
        //.attr("ry",2)
        .attr("width", gridSize_w)
        .attr("height", gridSize_h)
        .style({
            "fill":"none"
        })
        .on("click",(d)=>{
            console.log(d.x,d.y);
        });
}
function draw_area_f1() {
    floor1_area.forEach((area) => {
        floor_svg.append("g").attr("class", "" + area)
            .selectAll(".grid")
            .data(floor1_areas[area])
            .enter()
            .append("rect")
            .attr("class", "grid")
            .attr("x", function (d) {
                return d.y * gridSize_w;
            })
            .attr("y", function (d) {
                return d.x * gridSize_h;
            })
            //.attr("rx",2)
            //.attr("ry",2)
            .attr("width", gridSize_w)
            .attr("height", gridSize_h)
            .style({
                "fill": colorScale[area],
                "opacity": 0.6
            })
            .on("mouseover", function (d) {
                d3.select("." + area).selectAll('.grid').style({"opacity": 1});
            })
            .on("mouseout", function (d) {
                d3.select("." + area).selectAll('.grid').style({"opacity": 0.6});
            })
            .on("click", function (d) {
                console.log(d.x,d.y)
            })
            .append("title")
            .text(area);
    });
}

function draw_area_f2() {
    floor2_area.forEach((area) => {
        floor_svg.append("g").attr("class", "" + area)
            .selectAll(".grid")
            .data(floor2_areas[area])
            .enter()
            .append("rect")
            .attr("class", "grid")
            .attr("x", function (d) {
                return d.y * gridSize_w;
            })
            .attr("y", function (d) {
                return d.x * gridSize_h;
            })
            .attr("width", gridSize_w)
            .attr("height", gridSize_h)
            .style({
                "fill": colorScale[area],
                "opacity": 0.2
            })
            .on("mouseover", function (d) {
                d3.select("." + area).selectAll('.grid').style({"opacity": 1});
            })
            .on("mouseout", function (d) {
                d3.select("." + area).selectAll('.grid').style({"opacity": 0.6});
            })
            .on("click", function (d) {
                area_graph(area);
            })
            .append("title")
            .text(area);
    });
}

//添加defs标签
let defs = floor_svg.append("defs");
//添加marker标签及其属性
let arrowMarker = defs.append("marker")
    .attr("id", "arrow")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("viewBox", "0 0 12 12")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("orient", "auto");

//绘制箭头
let arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
arrowMarker.append("path")
    .attr("d", arrow_path)
    .attr("fill", "#ffe730");

// $.ajax({
//     url: "/day1_id",    //请求的url地址
//     dataType: "json",   //返回格式为json
//     async: true, //请求是否异步，默认为异步，这也是ajax重要特性
//     type: "GET",   //请求方式
//     contentType: "application/json",
//     beforeSend: function () {//请求前的处理
//     },
//     success: function (data, textStatus) {
//         //console.log(data);
//         data.forEach((d) => {
//             if(!(d.id === 16632 || d.id === 16323))
//             // traj_chart(d.id);
//                 all_traj_chart(d.id)
//         });
//     },
//     complete: function () {//请求完成的处理
//     },
//     error: function () {//请求出错处理
//     }
// });

function traj_chart(id) {
    $.ajax({
        url: "day1_pro_id",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {
            id: id,
            floor: 1
        },
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            if(!data) return;
            let date_data = [];
            let date_extent = d3.extent(data, (d) => {
                d.date = new Date(d.date);
                d.date.setHours(d.date.getHours()-8);
                return d.date;
            });
            date_extent[0].setMinutes(0);
            date_extent[0].setSeconds(0);

            date_extent[1].setHours(date_extent[1].getHours() + 1);
            date_extent[1].setMinutes(0);
            date_extent[1].setSeconds(0);

            for (let i = date_extent[0].getTime(); i <= date_extent[1].getTime(); i += 1800000) {
                date_data.push({date: new Date(i), path: []});
            }

            data.forEach((d) => {
                for (let i = 0; i < date_data.length; i++) {
                    if ((d.date.getTime() >= date_data[i].date.getTime()) && (d.date.getTime() <= date_data[i + 1].date.getTime())) {
                        date_data[i].path.push([d.x, d.y]);
                        break;
                    }
                }
            });
            draw_traj(date_data,id);
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });
}
function all_traj_chart(id) {
    $.ajax({
        url: "/day1_pro_traj",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {
            id: id,
            floor:1
        },
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            //console.log(data);
            /* data.sort(function (a, b) {
             return a.date - b.date;
             });*/
            draw_all_traj(data, id);
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });
}
function draw_traj(data,id) {

    data.forEach((d, i) => {
        if (d.path) {
            //console.log(linear(d.date));
            let path_g = floor_svg.append("g");
            let lineGraph = path_g.append("path")
                .attr("d", line(d.path))
                .attr("id", id+"_"+i)
                .attr("class","traj_"+formatTime(d.date))
                .attr("stroke-width", 1)
                .attr("opacity",0.1)
                .attr("fill", "none")
                .attr("marker-start", "url(#arrow)")
                //.attr("marker-mid", "url(#arrow)")
                .attr("marker-end", "url(#arrow)")
                //.attr("stroke", "url(#linear-gradient)")
                .attr("stroke", color(linear(d.date)).toString())
                .on("mouseover",function () {
                    console.log(d3.select(this).attr("id"));
                });
        }
    });
}
function draw_all_traj(data, id) {

    floor_svg.append("path")
        .attr("d", line(data))
        .attr("class","traj_path")
        .attr("stroke-width", .5)
        .attr("id",""+id)
        .attr("fill", "none")
        .attr("marker-start","url(#arrow)")
        //.attr("marker-mid","url(#arrow)")
        .attr("marker-end","url(#arrow)")
        .attr("stroke", "#FFFFFF")
        .style({
            "opacity":0.3
        })
        // .attr("stroke", color1(i%20).toString())
        .on("mouseover",function () {
            //console.log(d3.select(this).attr("id"));
            d3.select(this).attr("stroke","#ffe730").attr("stroke-width",1).style("opacity",1);
        })
        .on("mouseout",function () {
            //console.log(d3.select(this).attr("id"));
            d3.select(this).attr("stroke","#FFFFFF").attr("stroke-width",.5).style("opacity",0.3);
        });

}

d3.select("#main").append("div")
    .attr("id","heatmap")
    .style({
        "width":main.width()+'px',
        "height":main.height()+'px',
        "pointer-events":"none",
        "z-index":20
        //"display":"none"
    });

let heatmapInstance = h337.create({
    container: document.querySelector('#heatmap'),
    gradient:{0.1: "#20C2E1", 0.3: "#23D561", 0.5: "#F1E229", 1.0: "#ff1815"},
    radius:65,
    blur:1
});

let extent = [];
for(let i = new Date(2019,0,1,7,0,0).getTime();i<=new Date(2019,0,1,18,0,0).getTime();i += 30000) {
    let date_start = new Date(i);
    let date_end = new Date(i + 30000);
    extent.push([date_start,date_end]);
}

let index = 0;
let heatmap_interval = setInterval(function () {
    if(index<=extent.length-1){
        heatmap(extent[index]);
    }
    else
        clearInterval(heatmap_interval);
    index++;
},200);

let  sensor_f1 = {};
sensor_data[0].values.forEach((d)=>{
    sensor_f1[d.sid]=0;
});

function heatmap(date_extent){
    $.ajax({
        url: "day1_pro_date",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {
            date_start: date_extent[0],
            date_end: date_extent[1]
        },
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {

            /*        data.forEach((d)=>{
                        d.date = new Date(d.date);
                    });*/
            let nest_sensor = d3.nest().key((d) => d.sid);

            let test = nest_sensor.entries(data);
            console.log(test);
            let points = [];
            let max = 0;
            test.forEach((d)=>{

                let floor = d.key.slice(0,1);
                if(floor === '1'){
                    max = Math.max(max,d.values.length);
                    let point = {
                        y:parseInt(d.key.slice(1,3))*gridSize_h,
                        x:parseInt(d.key.slice(3,5))*gridSize_w,
                        value: d.values.length
                    };
                    points.push(point);
                }
            });

            let heat_data = {
                max:max,
                data: points
            };

            heatmapInstance.setData(heat_data);

        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });
}
