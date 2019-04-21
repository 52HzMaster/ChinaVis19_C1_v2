/**
 * Created by Liang Liu on 2019/4/21.
 */
let test_id = [
    10001,
    10003,
    10012,
    10014,
    10015,
    10018,
    10019,
    10021,
    10022,
    10023
];

test_id.forEach((d)=>{
    $.ajax({
        url: "/day1_pro_id",    //请求的url地址
        data:{
            id:d
        },
        dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            let traj = remove_element(data);
            let node_nest = d3.nest().key((d)=>d.area).entries(traj);
            let nodes = [];
            node_nest.forEach((d)=>{
                nodes.push({"name":d.key});
            });
            let links = [];
            for(let i=0;i<traj.length-1;i++){
                links.push({"source":traj[i].area,"target":traj[i+1].area,"value":1})
            }
            //console.log(nodes);
            console.log(links);
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });
})



sankey_chart();

function remove_element(arr) {

    let data = [];
    data.push(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].area === data[data.length - 1].area) {
        }
        else
            data.push(arr[i]);
    }
    return data;
}

// load the data
function sankey_chart() {

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

    d3.json("data/energy.json", function(energy) {

        sankey
            .nodes(energy.nodes)
            .links(energy.links)
            .layout(32);

        let link = svg.append("g").selectAll(".link")
            .data(energy.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", path)
            .style("stroke-width", function(d) { return Math.max(1, d.dy); })
            .sort(function(a, b) { return b.dy - a.dy; });

        link.append("title")
            .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

        let node = svg.append("g").selectAll(".node")
            .data(energy.nodes)
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
    });

}