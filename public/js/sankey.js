/**
 * Created by Liang Liu on 2019/4/21.
 */

$.ajax({
    url: "/day1_pro",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    type: "GET",   //请求方式
    contentType: "application/json",
    beforeSend: function () {//请求前的处理
    },
    success: function (data, textStatus) {
        //console.log(data);

        // let nodes =[];
        // let links =[];
        //
        // let temp_nodes = [];

        let id_data = d3.nest().key((d)=>d.id).entries(data);
        id_data.forEach((d)=>{
            d.values.sort((a,b)=>{
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            d.values = unrepeat(d.values);
        });

        console.log(id_data);

        /*id_data.forEach((d)=>{
            d.values.sort((a,b)=>{
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            d.values = unrepeat(d.values);

            let temp = [];

            for(let i=0;i<d.values.length-1;i++){
                temp.push({"id":d.key,"source":d.values[i].area,"target":d.values[i+1].area});
            }

            d.values = temp;
        });

        id_data.sort(function (a,b) {
            return a.values.length - b.values.length;
        });

        let temp = [];

        for(let i=0;i<34;i++){
            temp[i] = [];
            id_data.forEach((d)=>{
                if(i<d.values.length)
                    temp[i].push(d.values[i])
            });
        }

        temp.forEach((data,i)=>{

            let source = d3.nest().key((d)=>d.source).entries(data);
            let target = d3.nest().key((d)=>d.target);

            source.forEach((d)=>{
                d.values = target.entries(d.values);
            });

            console.log(source);

            source.forEach((d)=>{
                if(temp_nodes.indexOf(d.key) === -1){
                    nodes.push({"name":d.key});
                    temp_nodes.push(d.key);
                }
                d.values.forEach((s)=>{
                    if(temp_nodes.indexOf(s.key) === -1){
                        nodes.push({"name":s.key});
                        temp_nodes.push(s.key);
                    }
                });
            });

            source.forEach((d)=>{
                d.values.forEach((s)=>{
                    links.push({"source":temp_nodes.indexOf(d.key),"target":temp_nodes.indexOf(s.key),value:Math.sqrt(s.values.length)});
                    //links.push({"source":d.key,"target":s.key,value:s.values.length,"level":i});
                });
            });
        });

        console.log(nodes);
        console.log(links);*/
        //sankey_chart({"nodes":nodes,"links":links});

    },
    complete: function () {//请求完成的处理
    },
    error: function () {//请求出错处理
    }
});

/*function date_slice(start,end,stick) {
    let extent = [];

    for(let i = new Date(start).getTime();i<new Date(end).getTime();i += stick*60*1000) {
        let date_start = new Date(i);
        let date_end = new Date(i + stick*60*1000);
        extent.push([date_start,date_end]);
    }
    return extent;
}

let areas_data = {
    "area_A": [], "area_B":[], "area_C":[], "area_D":[],
    "area_sign":[], "area_poster":[],
    "area_wc1":[], "area_wc2":[], "area_wc3":[],
    "area_room1":[], "area_room2":[], "area_room3":[],
    "area_room4":[], "area_room5":[], "area_room6":[],
    "area_serve":[], "area_disc":[], "area_main":[],
    "area_canteen":[], "area_leisure":[],
    "area_in":[], "area_out":[]
};

let areas = [
    "area_A","area_B","area_C","area_D",
    "area_sign","area_poster",
    "area_wc1","area_wc2","area_wc3",
    "area_room1","area_room2","area_room3","area_room4","area_room5","area_room6",
    "area_serve", "area_disc","area_main",
    "area_canteen","area_leisure",
    "area_in", "area_out",
];

let date_extent = date_slice("2019-01-01 7:00:00","2019-01-01 18:00:00",10);

date_extent.forEach((date,index)=>{
    if(index > 0) return false;
    $.ajax({
        url: "day1_pro_date",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {
            date_start: date[0],
            date_end: date[1]
        },
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            //console.log(data);
            data.forEach((d,i)=>{

                d.date = new Date(d.date);
                d.date.setHours(d.date.getHours()-8);

                areas_data[d.area].push(d.id);

                areas.forEach((area)=>{
                    if( d.area !== area){
                        if( areas_data[area].indexOf(d.id) !== -1){

                            areas_data[d.area].slice(areas_data[d.area].indexOf(d.id),1);

                        }
                    }
                });

            });
            console.log(areas_data);
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });
});*/


let nodes = [{"name":"area_in"},{"name":"area_sign"},{"name":"area_D0"},{"name":"area_room2"},{"name":"area_room4"},{"name":"area_room5"}];

let links = [{"source": 0, "target": 1, "value": 3262},
    {"source": 0, "target": 2, "value": 272},
    {"source": 0, "target": 3, "value": 30},
    {"source": 4, "target": 3, "value": 272},
    {"source": 3, "target": 5, "value": 272},
    {"source": 1, "target": 5, "value": 272},
];

//sankey_chart({"nodes":nodes,"links":links});

// load the data
function sankey_chart(data) {

    let chart = $("#chart");

    let margin = {top: 1, right: 1, bottom: 6, left: 1},
        width = chart.width() - margin.left - margin.right,
        height = chart.height() - margin.top - margin.bottom;

    let formatNumber = d3.format(",.0f"),
        format = function(d) { return formatNumber(d) + " TWh"; },
        color = d3.scale.category20();

    let svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let sankey = d3.sankey()
        .nodeWidth(15)
        .nodePadding(10)
        .size([width, height]);

    let path = sankey.link();

    sankey
        .nodes(data.nodes)
        .links(data.links)
        .layout(32);

    let link = svg.append("g").selectAll(".link")
        .data(data.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .sort(function(a, b) { return b.dy - a.dy; });

    link.append("title")
        .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    let node = svg.append("g").selectAll(".node")
        .data(data.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .call(d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", function() { this.parentNode.appendChild(this); })
            .on("drag", dragmove));

    node.append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
        .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
        .append("title")
        .text(function(d) { return d.name + "\n" + format(d.value); });

    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
        .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    function dragmove(d) {
        d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
        sankey.relayout();
        link.attr("d", path);
    }
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