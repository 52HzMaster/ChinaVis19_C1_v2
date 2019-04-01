/**
 * Created by Liang Liu on 2019/4/1.
 */
test();
function test() {

    let date_extent =date_slice("2019-01-01 07:00:00","2019-01-01 18:00:00",30);

    console.log(date_extent);

    /*$.ajax({
        url: day_url + "_date",    //请求的url地址
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
            console.log(data);
            /!*        data.forEach((d)=>{
             d.date = new Date(d.date);
             });*!/
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });*/

    /*let nodes = [];
    let links = [
        {"source":"area_in","target":"area_sign","value":"100"},
        {"source":"area_in","target":"area_main","value":"80"},
        {"source":"area_in","target":"area_A","value":"20"}
    ];

    all_areas.forEach((d)=>{
        nodes.push({name:d})
    });

    let sankey_wh = $("#chart");

    let margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = sankey_wh.width() - margin.left - margin.right,
        height = sankey_wh.height() - margin.top - margin.bottom;

    let formatNumber = d3.format(",.0f"),    // zero decimal places
        format = function(d) { return formatNumber(d) },
        color = d3.scale.category20();

    let svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    let sankey = d3.sankey()
        .nodeWidth(36)
        .nodePadding(10)
        .size([width, height]);

    let path = sankey.link();

    let nodeMap = {};
    nodes.forEach(function(x) { nodeMap[x.name] = x; });
    links = links.map(function(x) {
        return {
            source: nodeMap[x.source],
            target: nodeMap[x.target],
            value: x.value
        };
    });

    sankey
        .nodes(nodes)
        .links(links)
        .layout(32);

    // add in the links
    let link = svg.append("g").selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
    link.append("title")
        .text(function(d) {
            return d.source.name + " → " +
                d.target.name + "\n" + format(d.value); });

    // add in the nodes
    let node = svg.append("g").selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; })
        .call(d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", function() {
                this.parentNode.appendChild(this); })
            .on("drag", dragmove));

// add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) {
            return d.color = color(d.name.replace(/ .*!/, "")); })
        .style("stroke", function(d) {
            return d3.rgb(d.color).darker(2); })
        .append("title")
        .text(function(d) {
            return d.name + "\n" + format(d.value); });

    /!*!// add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
        .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");*!/

// the function for moving the nodes
    function dragmove(d) {
        d3.select(this).attr("transform",
            "translate(" + (
                d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
            ) + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
        sankey.relayout();
        link.attr("d", path);
    }
*/
}


