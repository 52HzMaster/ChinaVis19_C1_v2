
main();

function main() {

    let floor = $("#mini_floor");
    let gridSize_w = floor.width() / 30;
    let gridSize_h = floor.height() / 16;

    let card_x = 30;
    let card_y = 16;

    let width = gridSize_w * card_x;
    let height = gridSize_h * card_y;

    let floor_data = [];
    for (let i = 0; i < card_x; i++)
        for (let j = 0; j < card_y; j++)
            floor_data.push({x: i, y: j});

    let floor1_svg = d3.select("#mini_floor")
        .append("svg")
        .attr("id", "floor1_svg")
        .attr("width", width)
        .attr("height", height)
        .style({
            "position":"absolute",
            //'left':"100px"
            "background":"#8f8f8f",
            "opacity":0.6
        });

    let floor2_svg = d3.select("#mini_floor")
        .append("svg")
        .attr("id", "floor2_svg")
        .attr("width", width)
        .attr("height", height)
        .style({
            "position":"absolute",
            //"display":"none"
            "bottom":height + 5+"px",
            "background":"#8f8f8f",
            "opacity":0.6
        });

    let floor1_g = floor1_svg.append("g");
    let sensor_g1 = floor1_svg.append("g").attr("class","sensor_f1");
    let area_g1 = floor1_svg.append("g").attr("class","area_f1");

    let floor2_g = floor2_svg.append("g");
    let sensor_g2 = floor2_svg.append("g").attr("class","sensor_f2");
    let area_g2= floor2_svg.append("g").attr("class","area_f2");

    //draw_floor1();
    draw_sensor_f1();
    draw_area_f1();

    //draw_floor2();
    draw_sensor_f2();
    draw_area_f2();

    let heatmap_time = d3.select("#mini_floor").append("div")
        .attr("id","heatmap_time")
        .attr("width",width)
        .attr("height",height)
        .style({
            "position":"absolute",
            "pointer-events":"none",
            "text-align":"center",
            "z-index":99
        });

    heatmap_time.append("a")
        .attr("align","center")
        .style({
            "display":"block",
            "font-size":width/4+'px',
            "opacity":0.1,
            "text-align":"center",
            "line-height":height+"px"
        })
        .text("00:00:00");

    //legend
    //area_legend();

    //floor1 sensor area
    function draw_floor1() {
        let floor1_cards = floor1_g.selectAll(".grid")
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
    function draw_sensor_f1() {
        let sensor_f1 = sensor_g1.selectAll(".grid")
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
        floor1_area.forEach((area)=>{
            area_g1.append("g").attr("class",""+area)
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
                    d3.select("."+area).selectAll('.grid').attr("title",area);
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
            .attr("id",(d)=>"sensor_" + d.sid)
            .attr("x", function(d) { return d.y * gridSize_w; } )
            .attr("y", function(d) {return d.x * gridSize_h; })
            .attr("width", gridSize_w)
            .attr("height", gridSize_h)
            .style({
                "fill":"none"
            })
            .on("click",(d)=>{
                console.log(d.x,d.y);
            });
    }
    function draw_area_f2() {
        floor2_area.forEach((area)=>{
            area_g2.append("g").attr("class",""+area)
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
                });
        });
    }
}