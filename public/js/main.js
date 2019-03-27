
main();

function main() {

    let floor = $("#floor");
    let gridSize_w = (floor.width() - 200) / 30;
    let gridSize_h = floor.height() / 16;

    let card_x = 30;
    let card_y = 16;

    let width = gridSize_w * card_x;
    let height = gridSize_h * card_y;

    let floor1_areas = {};
    let floor2_areas = {};

    let floor_data = [];
    for (let i = 0; i < card_x; i++)
        for (let j = 0; j < card_y; j++)
            floor_data.push({x: i, y: j});
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
    floor2_areas.area_ladder1 = area_compute(1,10,1,11);
    floor2_areas.area_ladder2 = area_compute(14,10,14,11);

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
        "area_ladder1","area_ladder2",
        "area_room5","area_room6"
    ];

    let all_areas = [
        "area_A","area_B","area_C","area_D",
        "area_sign","area_poster",
        "area_ladder1","area_ladder2",
        "area_wc1","area_wc2","area_wc3",
        "area_room1","area_room2","area_room3","area_room4","area_room5","area_room6",
        "area_serve", "area_disc","area_main",
        "area_canteen","area_leisure",
        "area_in", "area_out",
        "area_other"
    ];

    let floor1_svg = d3.select("#floor")
        .append("svg")
        .attr("id", "floor1_svg")
        .attr("width", width)
        .attr("height", height)
        .style({
            "position":"absolute",
            "right":0
        });

    let floor2_svg = d3.select("#floor")
        .append("svg")
        .attr("id", "floor2_svg")
        .attr("width", width)
        .attr("height", height)
        .style({
            "display":"none",
            "position":"absolute",
            "right":0
        });

    let floor1_g = floor1_svg.append("g");
    let sensor_g1 = floor1_svg.append("g").attr("class","sensor_f1");
    let area_g1 = floor1_svg.append("g").attr("class","area_f1");

    let floor2_g = floor2_svg.append("g");
    let sensor_g2 = floor2_svg.append("g").attr("class","sensor_f2");
    let area_g2= floor2_svg.append("g").attr("class","area_f2");

    draw_floor1();
    draw_sensor_f1();
    draw_area_f1();

    draw_floor2();
    draw_sensor_f2();
    draw_area_f2();

    //legend
    area_legend();

    //floor1 sensor area
    function draw_floor1() {
        let floor1_cards = floor1_g.selectAll(".grid")
            .data(floor_data)
            .enter()
            .append("rect")
            .attr("class", "grid")
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
    function draw_sensor_f1() {
        let sensor_f1 = sensor_g1.selectAll(".grid")
            .data(sensor_data[0].values)
            .enter()
            .append("rect")
            .attr("class", "grid")
            .attr("x", function(d) { return d.y * gridSize_w; } )
            .attr("y", function(d) {return d.x * gridSize_h; })
            .attr("width", gridSize_w)
            .attr("height", gridSize_h)
            .style({
                "fill":"#ffffff"
            })
            .on("click",(d)=>{
                console.log(d.x,d.y);
            });
    }
    function draw_area_f1() {
        floor1_area.forEach((area)=>{
            area_g1.append("g").attr("class",""+area)
                .selectAll(".grid")
                .data(floor1_areas[area])
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
                });
        });
    }
    //floor2 sensor area
    function draw_floor2() {
        let floor2_cards = floor2_g.selectAll(".grid")
            .data(floor_data)
            .enter()
            .append("rect")
            .attr("class", "grid")
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
            .on("click",(d)=>{
                console.log(d.x,d.y);
            });
    }
    function draw_sensor_f2() {
        let sensor_f2 = sensor_g2.selectAll(".grid")
            .data(sensor_data[1].values)
            .enter()
            .append("rect")
            .attr("class", "grid")
            .attr("x", function(d) { return d.y * gridSize_w; } )
            .attr("y", function(d) {return d.x * gridSize_h; })
            .attr("width", gridSize_w)
            .attr("height", gridSize_h)
            .style({
                "fill":"#ffffff"
            })
            .on("click",(d)=>{
                console.log(d.x,d.y);
            });
    }
    function draw_area_f2() {
        floor2_area.forEach((d)=>{
            area_g2.append("g").attr("class",""+d)
                .selectAll(".grid")
                .data(floor2_areas[d])
                .enter()
                .append("rect")
                .attr("class", "grid")
                .attr("x", function(d) { return d.y * gridSize_w; } )
                .attr("y", function(d) { return d.x * gridSize_h; })
                .attr("width", gridSize_w)
                .attr("height", gridSize_h)
                .style({
                    "fill":colorScale[d],
                    "opacity":0.6
                });
        });
    }

    //area legend
    function area_legend() {

        let lg_size = height / 25;

        let area_legend = d3.select("#floor").append("div")
            .attr("id","area_legend")
            .style({
                "position":"absolute",
                "left":0,
                "z-index":999
            });

        let area_lg_svg = d3.select('#area_legend').append("svg")
            .attr("width",200)
            .attr("height",height);

        area_lg_svg.selectAll('.legend')
            .data(all_areas)
            .enter()
            .append("rect")
            .attr("class","legend")
            .attr("x",function (d,i) {
                return  0;
            })
            .attr("y",(d,i)=>{
                return i * lg_size;
            })
            .attr("width",lg_size)
            .attr("height",lg_size/2)
            .attr("rx",2)
            .attr("ry",2)
            .style("fill",(d)=>{
                return colorScale[d];
            })
            .attr("transform","translate(2,8)")
            .on("mouseover",(d)=>{
                d3.select("."+d).selectAll('.grid').style({
                    "opacity":1
                });
            })
            .on("mouseout",(d)=>{
                d3.select("."+d).selectAll('.grid').style({
                    "opacity":0.6
                });
            });

        let legend_text = area_lg_svg.append("g").attr("transform","translate(4,17)");

        legend_text.selectAll(".legend_text")
            .data(all_areas)
            .enter()
            .append("text")
            .attr("x",function (d,i) {
                return  lg_size * 2;
            })
            .attr("y",(d,i)=>{
                return i * lg_size;
            })
            .attr("fill","#FFFFFF")
            .text((d)=>{
                return d;
            })
            .attr("font-size",lg_size/2);
    }

}