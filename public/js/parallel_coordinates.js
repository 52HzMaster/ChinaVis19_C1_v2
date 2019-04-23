/**
 * Created by Liang Liu on 2019/4/23.
 */

let all_id = [];
$.ajax({
    url: "/day1_id",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
    type: "GET",   //请求方式
    contentType: "application/json",
    beforeSend: function () {//请求前的处理
    },
    success: function (data, textStatus) {
       all_id = data;
    },
    complete: function () {//请求完成的处理
    },
    error: function () {//请求出错处理
    }
});

$.ajax({
    url: "/day1_pro_id",    //请求的url地址
    dataType: "json",   //返回格式为json
    data:{
        id:10001
    },
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    type: "GET",   //请求方式
    contentType: "application/json",
    beforeSend: function () {//请求前的处理
    },
    success: function (data, textStatus) {
        console.log(unrepeat(data));
    },
    complete: function () {//请求完成的处理
    },
    error: function () {//请求出错处理
    }
});

let chart = $("#chart");

let areas = [
    "area_A","area_B","area_C","area_D",
    "area_sign","area_poster",
    "area_wc1","area_wc2","area_wc3",
    "area_room1","area_room2","area_room3","area_room4","area_room5","area_room6",
    "area_serve", "area_disc","area_main",
    "area_canteen","area_leisure",
    "area_in", "area_out",
];

let time_extent = [7,8,9,10,11,12,13,14,15,16,17,18];

let margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = chart.width()  - margin.left - margin.right,
    height = chart.height() - margin.top - margin.bottom;

let svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

let x_scale = d3.scale.ordinal()
    .domain(time_extent)
    .rangePoints([0, width], .5);

let y_scale ={};

areas.forEach((d,i)=>{
    y_scale[i] = d3.scale.ordinal()
        .domain(areas)
        .rangePoints([0, height], .5);
});

let x_axis = d3.svg.axis()
    .scale(x_scale)
    .orient("bottom");

let y_axis = d3.svg.axis()
    .orient("right");

let line = d3.svg.line()//.interpolate("basis");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform","translate("+margin.left+","+height +")")
    .call(x_axis);

let g = svg.selectAll(".time_extent")
    .data(time_extent)
    .enter()
    .append("g")
    .attr("class", "time_extent")
    .attr("transform", function(d) { return "translate(" + (x_scale(d) + margin.left)+ ")"; });

g.append("g")
    .attr("class", "axis")
    .each(function(d,i) {
        if(i === 0)
            d3.select(this).call(y_axis.scale(y_scale[d]));
        else
            d3.select(this).call(y_axis.tickFormat("").scale(y_scale[d]));
    });

let data = [{"id":16632,"7":"area_in","8":"area_sign","9":"area_poster","10":"area_wc1","11":"area_main","12":"area_disc",
    "13":"area_serve","14":"area_D","15":"area_room2","16":"area_A","17":"area_B","18":"area_out"}];

// Add grey background lines for context.
background = svg.append("g")
    .attr("class", "background")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("transform", function(d) { return "translate(" + margin.left + ")"; });

// Add blue foreground lines for focus.
foreground = svg.append("g")
    .attr("class", "foreground")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("transform", function(d) { return "translate(" + margin.left + ")"; });;

// Returns the path for a given data point.
function path(d) {
    return line(time_extent.map(function(p) { return [x_scale(p), y_scale[p](d[p])]; }));
}

// Add and store a brush for each axis.
g.append("g")
    .attr("class", "brush")
    .each(function(d) { d3.select(this).call(y_scale[d].brush = d3.svg.brush().y(y_scale[d]).on("brush", brush)); })
    .selectAll("rect")
    .attr("x", -8)
    .attr("width", 16);

// Handles a brush event, toggling the display of foreground lines.
function brush() {
    let actives = time_extent.filter(function(p) { return !y_scale[p].brush.empty(); }),
        extents = actives.map(function(p) { return y_scale[p].brush.extent(); });
    foreground.style("display", function(d) {
        return actives.every(function(p, i) {
            return extents[i][0] <= y_scale[p](d[p]) && y_scale[p](d[p]) <=  extents[i][1];
        }) ? "block" : "none";
    });
}

function unrepeat(arr) {
    let data = [];
    data.push(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].area !== data[data.length - 1].area)
            data.push(arr[i]);
    }
    return data;
}
/*
 let time_extent = [7,8,9,10,11,12,13,14,15,16,17,18];

 let margin = {top: 1, right: 1, bottom: 1, left: 1},
 width = chart.width() - 200 - margin.left - margin.right,
 height = chart.height()- 200 - margin.top - margin.bottom;

 let svg = d3.select("#chart").append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .attr("transform","translate(200,100)");

 let x_scale = d3.scale.ordinal()
 .domain(time_extent)
 .rangePoints([0, width], .5);

 let x_axis = d3.svg.axis()
 .scale(x_scale)
 .orient("bottom");

 svg.append("g")
 .attr("class", "x axis")
 .attr("transform","translate(0,"+(height -20) +")")
 .call(x_axis);


 let drag = d3.behavior.drag()
 .on("drag", dragmove);

 let test_g = svg.append("g");
 areas.forEach((d,i)=>{
 if(i%2 === 0){
 svg.append("rect")
 .attr("x",x_scale(7) - 15)
 .attr("y",Math.floor(Math.random()*1000))
 .attr("width",30)
 .attr("height",Math.floor(Math.random()*100))
 .attr("fill",colorScale[d])
 .call(d3.behavior.drag()
 .origin(function(d) { return d; })
 .on("dragstart", function() { this.parentNode.appendChild(this); })
 .on("drag", dragmove));
 }

 });

 function dragmove(d) {
 d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
 }

 area_legend();

 function area_legend() {

 let lg_size = height / 30;

 let area_legend = d3.select("#chart").append("div")
 .attr("id","area_legend")
 .style({
 "position":"absolute",
 "top":"12%",
 "left":"1%",
 "z-index":10
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
 .attr("rx",lg_size/5)
 .attr("ry",lg_size/5)
 .style("fill",(d)=>colorScale[d])
 .on("mouseover",function(d){
 d3.select(this).style("fill","#FFF");
 })
 .on("mouseout",function(d){
 d3.select(this).style("fill",colorScale[d]);
 });

 let legend_text = area_lg_svg.append("g").attr("transform","translate(0,"+lg_size/2.4+")");

 legend_text.selectAll(".legend_text")
 .data(all_areas)
 .enter()
 .append("text")
 .attr("x",function (d,i) {
 return  lg_size + 5;
 })
 .attr("y",(d,i)=>{
 return i * lg_size;
 })
 .attr("fill","#FFFFFF")
 .text((d)=>{
 return d;
 })
 .attr("font-size",lg_size/2);
 }*/