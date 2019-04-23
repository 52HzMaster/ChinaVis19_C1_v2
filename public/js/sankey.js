/**
 * Created by Liang Liu on 2019/4/21.
 */

/*$.ajax({
    url: "/day1_pro",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    type: "GET",   //请求方式
    contentType: "application/json",
    beforeSend: function () {//请求前的处理
    },
    success: function (data, textStatus) {
        //console.log(data);
        let nodes =[];
        let links =[];

        let temp = [];
        let temp_nodes = [];
        let id_data = d3.nest().key((d)=>d.id).entries(data);
        id_data.forEach((d)=>{
            d.values.sort((a,b)=>{
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            d.values = remove_element(d.values);

            // for(let i=0;i<d.values.length-1;i++){
            //    temp.push({"id":d.key,"source":d.values[i].area,"target":d.values[i+1].area});
            // }
        });

        console.log(d3.max(id_data,(d)=>d.values.length));

        /!*let source = d3.nest().key((d)=>d.source).entries(temp);
        let target = d3.nest().key((d)=>d.target);

        source.forEach((d)=>{
            d.values = target.entries(d.values);
        });

        source.forEach((d)=>{
            nodes.push({"name":d.key});
            temp_nodes.push(d.key);
        });

        source.forEach((d)=>{
            d.values.forEach((s)=>{
                links.push({"source":temp_nodes.indexOf(d.key),"target":temp_nodes.indexOf(s.key),value:s.values.length});
            });
        });

        console.log(nodes);
        console.log(links);

        let temp_links = [];

        links.forEach((d,i)=>{
            if(d.source < d.target)
                temp_links.push(d);
        });*!/

        //sankey_chart({"nodes":nodes,"links":temp_links});

    },
    complete: function () {//请求完成的处理
    },
    error: function () {//请求出错处理
    }
});*/

function date_slice(start,end,stick) {
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
});

/*
let nodes = [{"name":"area_in"},{"name":"area_sign"},{"name":"area_D0"},{"name":"area_room2"}];

let links = [{"source": 0, "target": 1, "value": 3262},
    {"source": 0, "target": 2, "value": 272},
    {"source": 0, "target": 3, "value": 30}];

let energy = {"nodes":[
        {"name":"Agricultural 'waste'"},
        {"name":"Bio-conversion"},
        {"name":"Liquid"},
        {"name":"Losses"},
        {"name":"Solid"},
        {"name":"Gas"},
        {"name":"Biofuel imports"},
        {"name":"Biomass imports"},
        {"name":"Coal imports"},
        {"name":"Coal"},
        {"name":"Coal reserves"},
        {"name":"District heating"},
        {"name":"Industry"},
        {"name":"Heating and cooling - commercial"},
        {"name":"Heating and cooling - homes"},
        {"name":"Electricity grid"},
        {"name":"Over generation / exports"},
        {"name":"H2 conversion"},
        {"name":"Road transport"},
        {"name":"Agriculture"},
        {"name":"Rail transport"},
        {"name":"Lighting & appliances - commercial"},
        {"name":"Lighting & appliances - homes"},
        {"name":"Gas imports"},
        {"name":"Ngas"},
        {"name":"Gas reserves"},
        {"name":"Thermal generation"},
        {"name":"Geothermal"},
        {"name":"H2"},
        {"name":"Hydro"},
        {"name":"International shipping"},
        {"name":"Domestic aviation"},
        {"name":"International aviation"},
        {"name":"National navigation"},
        {"name":"Marine algae"},
        {"name":"Nuclear"},
        {"name":"Oil imports"},
        {"name":"Oil"},
        {"name":"Oil reserves"},
        {"name":"Other waste"},
        {"name":"Pumped heat"},
        {"name":"Solar PV"},
        {"name":"Solar Thermal"},
        {"name":"Solar"},
        {"name":"Tidal"},
        {"name":"UK land based bioenergy"},
        {"name":"Wave"},
        {"name":"Wind"}
    ],
    "links":[
        {"source":0,"target":1,"value":127.729},
        {"source":1,"target":2,"value":0.597},
        {"source":1,"target":3,"value":26.862},
        {"source":1,"target":4,"value":280.322},
        {"source":1,"target":5,"value":81.144},
        {"source":6,"target":2,"value":35},
        {"source":7,"target":4,"value":35},
        {"source":8,"target":9,"value":11.606},
        {"source":10,"target":9,"value":63.965},
        {"source":9,"target":4,"value":75.571},
        {"source":11,"target":12,"value":10.639},
        {"source":11,"target":13,"value":22.505},
        {"source":11,"target":14,"value":46.184},
        {"source":15,"target":16,"value":104.453},
        {"source":15,"target":14,"value":113.726},
        {"source":15,"target":17,"value":27.14},
        {"source":15,"target":12,"value":342.165},
        {"source":15,"target":18,"value":37.797},
        {"source":15,"target":19,"value":4.412},
        {"source":15,"target":13,"value":40.858},
        {"source":15,"target":3,"value":56.691},
        {"source":15,"target":20,"value":7.863},
        {"source":15,"target":21,"value":90.008},
        {"source":15,"target":22,"value":93.494},
        {"source":23,"target":24,"value":40.719},
        {"source":25,"target":24,"value":82.233},
        {"source":5,"target":13,"value":0.129},
        {"source":5,"target":3,"value":1.401},
        {"source":5,"target":26,"value":151.891},
        {"source":5,"target":19,"value":2.096},
        {"source":5,"target":12,"value":48.58},
        {"source":27,"target":15,"value":7.013},
        {"source":17,"target":28,"value":20.897},
        {"source":17,"target":3,"value":6.242},
        {"source":28,"target":18,"value":20.897},
        {"source":29,"target":15,"value":6.995},
        {"source":2,"target":12,"value":121.066},
        {"source":2,"target":30,"value":128.69},
        {"source":2,"target":18,"value":135.835},
        {"source":2,"target":31,"value":14.458},
        {"source":2,"target":32,"value":206.267},
        {"source":2,"target":19,"value":3.64},
        {"source":2,"target":33,"value":33.218},
        {"source":2,"target":20,"value":4.413},
        {"source":34,"target":1,"value":4.375},
        {"source":24,"target":5,"value":122.952},
        {"source":35,"target":26,"value":839.978},
        {"source":36,"target":37,"value":504.287},
        {"source":38,"target":37,"value":107.703},
        {"source":37,"target":2,"value":611.99},
        {"source":39,"target":4,"value":56.587},
        {"source":39,"target":1,"value":77.81},
        {"source":40,"target":14,"value":193.026},
        {"source":40,"target":13,"value":70.672},
        {"source":41,"target":15,"value":59.901},
        {"source":42,"target":14,"value":19.263},
        {"source":43,"target":42,"value":19.263},
        {"source":43,"target":41,"value":59.901},
        {"source":4,"target":19,"value":0.882},
        {"source":4,"target":26,"value":400.12},
        {"source":4,"target":12,"value":46.477},
        {"source":26,"target":15,"value":525.531},
        {"source":26,"target":3,"value":787.129},
        {"source":26,"target":11,"value":79.329},
        {"source":44,"target":15,"value":9.452},
        {"source":45,"target":1,"value":182.01},
        {"source":46,"target":15,"value":19.013},
        {"source":47,"target":15,"value":289.366}
    ]};*/

//sankey_chart(energy);
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

function remove_element(arr) {

    let data = [];
    data.push(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].area !== data[data.length - 1].area)
            data.push(arr[i]);
    }
    console.log(data);
    return data;
}