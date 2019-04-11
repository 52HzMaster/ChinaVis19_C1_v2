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

    draw_floor();
    draw_area_f1();

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
                    "opacity":0.6
                })
                .on("mouseover",function (d) {
                    d3.select("."+area).selectAll('.grid').style({"opacity":1});
                })
                .on("mouseout",function (d) {
                    d3.select("."+area).selectAll('.grid').style({"opacity":0.6});
                })
                .on("click",function (d) {
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
        .attr("markerWidth",12)
        .attr("markerHeight",12)
        .attr("viewBox","0 0 12 12")
        .attr("refX",6)
        .attr("refY",6)
        .attr("orient","auto");

    //绘制直线箭头
    let arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
    arrowMarker.append("path")
        .attr("d",arrow_path)
        .attr("fill","#ff7e50")
        .style({
            "opacity":0.7
        });

    //==================================

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

    let lineGraph = path_g.append("path")
    //.attr("d", line(data))
        .attr("stroke", "#4aff3c")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("marker-start","url(#arrow)")
        .attr("marker-mid","url(#arrow)")
        .attr("marker-end","url(#arrow)");


    function animation(data){
        let trj = [],index=0;
        let interval = setInterval(function () {
            trj.push(data[index]);
            index++;
            if(index>data.length-1)
                clearInterval(interval);
            path_g.selectAll('path').attr('d',line(trj))

        },200);
    }

    $.ajax({
        url: day_url+"_id",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {
            id:10001,
            floor:1
        },
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            console.log(data);
            animation(data);
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });

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


