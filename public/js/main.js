main();
function main() {

    let nest = d3.nest().key((d)=>{
        return d.floor;
    });

    let nest_id = d3.nest().key((d)=>{
        return d.id;
    });

    let nest_area = d3.nest().key((d)=>{
        return d.area;
    });

    let sensor_data = nest.entries(sensor);
    //let id_data = nest_id.entries(day1_data);

    //let test = id_data[0].values;

    //let test = day1_data.slice(0,1000);

    //console.log(add_data(test));

    //let day1_test = nest_area.entries(add_data(test));

    //console.log(JSON.stringify(add_data(day1_data)));

    function add_data(data) {
        for (let i=0; i<data.length-1;i++){
            data[i].stay = data[i+1].time - data[i].time;
            data[i].date = date_convert(data[i].time);
            data[i].area = area_judge(data[i].sid);
        }
        data[data.length-1].stay = 0;
        data[data.length-1].date = date_convert(data[data.length-1].time);
        data[data.length-1].area = area_judge(data[data.length-1].sid);
        return data;
    }

    let max_scale = 900;

    let gridSize = max_scale / 30;
    let card_x = 30;
    let card_y = 16;

    let width = gridSize * card_x;
    let height = gridSize * card_y;

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

    let colorScale = {"area_A":"#306bff","area_B":"#34a8ff","area_C":"#44caff","area_D":"#5afaff",
        "area_canteen":"#ffd172",
        "area_leisure":"#c8ff32",
        "area_sign":"#ffb48f","area_poster":"#fff277",
        "area_wc1":"#ffd2a6","area_wc2":"#ffd2a6","area_wc3":"#ffd2a6",
        "area_room1":"#8409ff","area_room2":"#a143ff","area_room3":"#c180ff","area_room4":"#ccb1ff","area_room5":"#8409ff","area_room6":"#a143ff",
        "area_ladder1":"#ff7e50","area_ladder2":"#ff7e50",
        "area_serve":"#ff6c22","area_disc":"#ff5821","area_main":"#306bff",
        "area_in":"#16ff3c","area_out":"#ff2c31",
        "area_other":"#c8c8c7"
    };

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
        .attr("height", height);

    let floor2_svg = d3.select("#floor")
        .append("svg")
        .attr("id", "floor2_svg")
        .attr("width", width)
        .attr("height", height)
        .style("display","none");

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
                return d.x * gridSize;
            })
            .attr("y", function (d) {
                return d.y * gridSize;
            })
            .attr("width", gridSize)
            .attr("height", gridSize)
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
            .attr("x", function(d) { return d.y * gridSize; } )
            .attr("y", function(d) {return d.x * gridSize; })
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style({
                "fill":"#ffffff"
            })
            .on("click",(d)=>{
                console.log(d.x,d.y);
            });
    }
    function draw_area_f1() {
        floor1_area.forEach((d)=>{
            area_g1.append("g").attr("class",""+d)
                .selectAll(".grid")
                .data(floor1_areas[d])
                .enter()
                .append("rect")
                .attr("class", "grid")
                .attr("x", function(d) { return d.y * gridSize; } )
                .attr("y", function(d) { return d.x * gridSize; })
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style({
                    "fill":colorScale[d],
                    "opacity":0.6
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
                return d.x * gridSize;
            })
            .attr("y", function (d) {
                return d.y * gridSize;
            })
            .attr("width", gridSize)
            .attr("height", gridSize)
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
            .attr("x", function(d) { return d.y * gridSize; } )
            .attr("y", function(d) {return d.x * gridSize; })
            .attr("width", gridSize)
            .attr("height", gridSize)
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
                .attr("x", function(d) { return d.y * gridSize; } )
                .attr("y", function(d) { return d.x * gridSize; })
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style({
                    "fill":colorScale[d],
                    "opacity":0.6
                });
        });
    }
    //area legend
    function area_legend() {

        let area_legend = d3.select("body").append("div")
            .attr("id","area_legend")
            .style({
                "position":"absolute",
                "top":"7%",
                "left":"3%",
                "z-index":999
            });

        let area_lg_svg = d3.select('#area_legend').append("svg")
            .attr("width",200)
            .attr("height",600)
            .style({

            });

        area_lg_svg.selectAll('.legend')
            .data(all_areas)
            .enter()
            .append("rect")
            .attr("class","legend")
            .attr("x",function (d,i) {
                return  20;
            })
            .attr("y",(d,i)=>{
                return i * 20;
            })
            .attr("width",20)
            .attr("height",10)
            .attr("rx",5)
            .attr("ry",5)
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
                return  40;
            })
            .attr("y",(d,i)=>{
                return i * 20;
            })
            .attr("fill","#FFFFFF")
            .text((d)=>{
                return d;
            });
    }

    function date_convert(seconds) {
        let date,hour,min,sec;
        hour = seconds / 3600;
        seconds = seconds % 3600;
        min = seconds / 60;
        sec = seconds % 60;
        date = new Date(2019,1,1,hour,min,sec);
        return date;
    }

    function area_judge(sid) {
        let coor = null,floor,area;
        sensor.forEach((d) => {
            if (d.sid == sid) {
                coor = {x: parseInt(d.x), y: parseInt(d.y)};
                floor = d.floor;
            }
        });
        if (floor == '1') {
            if ( (2<coor.x&&coor.x<=3)&&(1<coor.y&&coor.y<=5) )
                area = "area_A";

            else if((4<coor.x&&coor.x<=5)&&(1<coor.y&&coor.y<=5))
                area = "area_B";

            else if((6<coor.x&&coor.x<=7)&&(1<coor.y&&coor.y<=5))
                area = "area_C";

            else if ((8<coor.x&&coor.x<=9)&&(1<coor.y&&coor.y<=5))
                area = "area_D";

            else if((12<coor.x&&coor.x<=13)&&(2<coor.y&&coor.y<=5))
                area = "area_sign";

            else if ((3<coor.x&&coor.x<=9)&&(7<coor.y&&coor.y<=8))
                area = "area_poster";

            else if ((4<coor.x&&coor.x<=5)&&(10<coor.y&&coor.y<=11))
                area = "area_wc1";

            else if ((14<coor.x&&coor.x<=15)&&(27<coor.y&&coor.y<=28))
                area = "area_wc2";

            else if ((6<coor.x&&coor.x<=9)&&(10<coor.y&&coor.y<=11))
                area = "area_room1";

            else if ((10<coor.x&&coor.x<=11)&&(10<coor.y&&coor.y<=11))
                area = "area_room2";

            else if ((14<coor.x&&coor.x<=15)&&(21<coor.y&&coor.y<=24))
                area = "area_room3";

            else if ((14<coor.x&&coor.x<=15)&&(25<coor.y&&coor.y<=26))
                area = "area_room4";

            else if ((1<coor.x&&coor.x<=1)&&(10<coor.y&&coor.y<=11))
                area = "area_ladder1";

            else if ((14<coor.x&&coor.x<=14)&&(10<coor.y&&coor.y<=11))
                area = "area_ladder2";

            else if ((14<coor.x&&coor.x<=15)&&(19<coor.y&&coor.y<=20))
                area = "area_serve";
            else if ((2<coor.x&&coor.x<=11)&&(15<coor.y&&coor.y<=18))
                area = "area_disc";

            else if ((coor.x == 13&&coor.y == 0)||(coor.x == 15&&coor.y == 2)||(coor.x == 15&&coor.y == 4)||(coor.x == 15&&coor.y == 7))
                area = "area_in";

            else if ((coor.x == 0&&coor.y == 19)||(coor.x == 15&&coor.y == 5)||(coor.x == 15&&coor.y == 15)||(coor.x == 15&&coor.y == 17))
                area = "area_out";
            else
                area = "area_other";
        }
        else {
            if ( (2<coor.x&&coor.x<=9)&&(1<coor.y&&coor.y<=5) )
                area = "area_canteen";

            else if((10<coor.x&&coor.x<=11)&&(1<coor.y&&coor.y<=5))
                area = "area_room5";

            else if((6<coor.x&&coor.x<=7)&&(10<coor.y&&coor.y<=11))
                area = "area_room6";

            else if((4<coor.x&&coor.x<=5)&&(10<coor.y&&coor.y<=11))
                area = "area_wc3";

            else if((1<coor.x&&coor.x<=1)&&(10<coor.y&&coor.y<=11))
                area = "area_ladder1";
            else if((14<coor.x&&coor.x<=14)&&(10<coor.y&&coor.y<=11))
                area = "area_ladder2";
            else
                area = "area_other";
        }
        return area;
    }

}

