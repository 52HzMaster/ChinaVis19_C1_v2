/**
 * Created by Liang Liu on 2019/4/1.
 */
test();
function test() {

    let floor = $("#all_view");

    let gridSize_w = (floor.width() -100) / 30;
    let gridSize_h = (floor.height()-100) / 16;

    let card_x = 30;
    let card_y = 16;

    let width = gridSize_w * card_x;
    let height = gridSize_h * card_y;

    let floor_data = [];
    for (let i = 0; i < card_x; i++)
        for (let j = 0; j < card_y; j++)
            floor_data.push({x: i, y: j});


    let floor_svg = d3.select("#all_view")
        .append("svg")
        .attr("id", "floor_svg")
        .attr("width", width)
        .attr("height", height)
        .style({
            "position":"absolute",
            //'left':"100px"
            "background":"#8f8f8f",
            "opacity":0.6
        });

    let floor_g = floor_svg.append("g");
    let path_g = floor_svg.append("g");

    let line = d3.svg.line()
        .x(function(d) { return d.y* gridSize_w + gridSize_w/2; })
        .y(function(d) { return d.x* gridSize_h + gridSize_h/2; })
        .interpolate("basis");

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
            });
    }
    function draw_area_f1() {
        floor1_area.forEach((area)=>{
            floor_svg.append("g").attr("class",""+area)
                .selectAll(".grid")
                .data(floor1_areas[area])
                .enter()
                .append("rect")
                .attr("class", "grid")
                .attr("x", function(d) { return d.y * gridSize_w; } )
                .attr("y", function(d) { return d.x * gridSize_h; })
                //.attr("rx",2)
                //.attr("ry",2)
                .attr("width", gridSize_w)
                .attr("height", gridSize_h)
                .style({
                    "fill":colorScale[area],
                    "opacity":1
                })
                .on("mouseover",function (d) {
                    d3.select("."+area).selectAll('.grid').style({"opacity":0.6});
                })
                .on("mouseout",function (d) {
                    d3.select("."+area).selectAll('.grid').style({"opacity":1});
                })
                .on("click",function (d) {
                })
                .append("title")
                .text(area);
        });
    }
    function draw_area_f2() {
        floor2_area.forEach((area)=>{
            floor_svg.append("g").attr("class",""+area)
                .selectAll(".grid")
                .data(floor2_areas[area])
                .enter()
                .append("rect")
                .attr("class", "grid")
                .attr("x", function(d) { return d.y * gridSize_w; } )
                .attr("y", function(d) { return d.x * gridSize_h; })
                .attr("width", gridSize_w)
                .attr("height", gridSize_h)
                .style({
                    "fill":colorScale[area],
                    "opacity":0.6
                })
                .on("mouseover",function (d) {
                    d3.select("."+area).selectAll('.grid').style({"opacity":1});
                })
                .on("mouseout",function (d) {
                    d3.select("."+area).selectAll('.grid').style({"opacity":0.6});
                })
                .on("click",function (d) {
                    area_graph(area);
                })
                .append("title")
                .text(area);
        });
    }
    //==================================
    function draw_nodes(data,color) {

        let nodes_g = floor_svg.append("g");

        let floor_nodes = nodes_g.selectAll(".node")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("cx", function (d) {
                return d[1] * gridSize_w + gridSize_w/2;
            })
            .attr("cy", function (d) {
                return d[0] * gridSize_h + gridSize_h/2;
            })
            .attr("r", 5)
            .style({
                "fill": color
            });
    }

    //添加defs标签
    let defs = floor_svg.append("defs");
    //添加marker标签及其属性
    let arrowMarker = defs.append("marker")
        .attr("id","arrow")
        .attr("markerUnits","strokeWidth")
        .attr("markerWidth",8)
        .attr("markerHeight",8)
        .attr("viewBox","0 0 12 12")
        .attr("refX",6)
        .attr("refY",6)
        .attr("orient","auto");

    //绘制箭头
    let arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
    arrowMarker.append("path")
        .attr("d",arrow_path)
        .attr("fill","#ff7e50")
        .style({
            "opacity":0.7
        });

    let colorRange = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'] //['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494']

    let color = d3.scale.linear().range(colorRange).domain([1, 2, 3, 4, 5]);

    //定义颜色
    let color1 = d3.scale.category20();


    let linearGradient = floor_svg.append("defs")
        .append("linearGradient")
        .attr("id", "linear-gradient")
        .attr("gradientTransform", "rotate(90)");

    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color(1));

    linearGradient.append("stop")
        .attr("offset", "25%")
        .attr("stop-color", color(2));

    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", color(3));

    linearGradient.append("stop")
        .attr("offset", "75%")
        .attr("stop-color", color(4));

    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color(5));

    function draw_traj(data){

        data.forEach((d,i)=>{
            if(d.path){
                let path_g = floor_svg.append("g");
                let lineGraph = path_g.append("path")
                    .attr("d", line(d.path,i))
                    .attr("date",d.date)
                    .attr("stroke-width", 2)
                    .attr("fill", "none")
                    .attr("marker-start","url(#arrow)")
                    .attr("marker-mid","url(#arrow)")
                    .attr("marker-end","url(#arrow)")
                    //.attr("stroke", "url(#linear-gradient)")
                    .attr("stroke", color1(i%20).toString())
                // .on("mouseover",function () {
                //     console.log(d3.select(this).attr("date"));
                // });
            }
        });
    }

    /*    $.ajax({
     url: "/day1_id",    //请求的url地址
     dataType: "json",   //返回格式为json
     async: true, //请求是否异步，默认为异步，这也是ajax重要特性
     type: "GET",   //请求方式
     contentType: "application/json",
     beforeSend: function () {//请求前的处理
     },
     success: function (data, textStatus) {
     //console.log(data);
     data.forEach((d)=>{
     //traj_chart(d.id);
     all_traj_chart(d.id)
     });
     },
     complete: function () {//请求完成的处理
     },
     error: function () {//请求出错处理
     }
     });*/

    function traj_chart(id) {
        $.ajax({
            url: day_url+"_id",    //请求的url地址
            dataType: "json",   //返回格式为json
            data: {
                id:id,
                floor:1
            },
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",   //请求方式
            contentType: "application/json",
            beforeSend: function () {//请求前的处理
            },
            success: function (data, textStatus) {

                let date_10min = [];
                let date_extent = d3.extent(data,(d)=>new Date(d.date));
                date_extent[0].setMinutes(0);
                date_extent[0].setSeconds(0);

                date_extent[1].setHours(date_extent[1].getHours()+1);
                date_extent[1].setMinutes(0);
                date_extent[1].setSeconds(0);

                for(let i = date_extent[0].getTime();i<=date_extent[1].getTime();i+=3600000){
                    date_10min.push({date:new Date(i),path:[]});
                }

                data.forEach((d)=>{
                    d.date = new Date(d.date);
                    for(let i=0;i<date_10min.length-1;i++) {
                        if((d.date.getTime()>date_10min[i].date.getTime())&&(d.date.getTime()<date_10min[i+1].date.getTime())) {
                            date_10min[i].path.push([d.x,d.y]);
                            break;
                        }
                    }
                });
                //console.log(date_10min);
                draw_traj(date_10min);
            },
            complete: function () {//请求完成的处理
            },
            error: function () {//请求出错处理
            }
        });
    }

    all_traj_chart(16632);

    function all_traj_chart(id) {
        $.ajax({
            url: day_url+"_id",    //请求的url地址
            dataType: "json",   //返回格式为json
            data: {
                id:id,
                floor:1
            },
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",   //请求方式
            contentType: "application/json",
            beforeSend: function () {//请求前的处理
            },
            success: function (data, textStatus) {
                console.log(data);
                data.sort(function (a,b) {
                    return a.date-b.date;
                });
                draw_all_traj(data,id);
            },
            complete: function () {//请求完成的处理
            },
            error: function () {//请求出错处理
            }
        });
    }
    function draw_all_traj(data,id){

        /*floor_svg.append("path")
            .attr("d", line(data))
            .attr("stroke-width", 2)
            .attr("id",""+id)
            .attr("fill", "none")
            .attr("marker-start","url(#arrow)")
            .attr("marker-mid","url(#arrow)")
            .attr("marker-end","url(#arrow)")
            .attr("stroke", "#FFFFFF")
            .style({
                "opacity":0.2
            })
            // .attr("stroke", color1(i%20).toString())
            .on("mouseover",function () {
                console.log(d3.select(this).attr("id"));
            });*/

        let traj =[], index=0;
        let interval = setInterval(function () {

            if(index>=data.length-1)
                clearInterval(interval);

            traj.push(data[index]);

            floor_svg.append("path")
                .attr("d", line(traj))
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .attr("marker-start","url(#arrow)")
                .attr("marker-mid","url(#arrow)")
                .attr("marker-end","url(#arrow)")
                .attr("stroke", "url(#linear-gradient)");

            index++;
        },200);
    }

    function remove_element(arr) {

        let data=[];
        data.push(arr[0]);
        for(let i =1;i<arr.length;i++) {
            if(arr[i].area === data[data.length-1].area){
            }
            else
                data.push(arr[i]);
        }
        return data;
    }

}


