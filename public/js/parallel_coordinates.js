/**
 * Created by Liang Liu on 2019/4/23.
 */

/*$.ajax({
    url: "/day1_stay",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    type: "GET",   //请求方式
    contentType: "application/json",
    beforeSend: function () {//请求前的处理
    },
    success: function (data, textStatus) {
        para_coor(data);
    },
    complete: function () {//请求完成的处理
    },
    error: function () {//请求出错处理
    }
})*/

d3.csv("data/cluster_data/day1_group.csv",(data)=>{
    //console.log(data);
    let group = d3.nest().key((d)=>d.group).entries(data);
    //console.log(group);

    let stay_data = [];
    group[7].values.forEach((d)=>{

        $.ajax({
            url: "/day1_pro_id",    //请求的url地址
            dataType: "json",   //返回格式为json
            data:{id:d.id},
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",   //请求方式
            contentType: "application/json",
            beforeSend: function () {//请求前的处理
            },
            success: function (data, textStatus) {
                stay_data.push(data);
                if(stay_data.length ===  group[7].values.length){
                    para_coor(stay_data);
                }
            },
            complete: function () {//请求完成的处理
            },
            error: function () {//请求出错处理
            }
        });

    });
});
    /*d3.csv("data/day1_stay.csv",(data)=>para_coor(data));*/

    function para_coor(data) {

        let _charts = {};

        let chart = $("#time_line");

        _charts.areas = [
            "area_A","area_B","area_C","area_D",
            "area_sign","area_poster",
            //"area_wc1","area_wc2","area_wc3",
            "area_room1","area_room2","area_room3","area_room4","area_room5","area_room6",
            "area_serve", "area_disc","area_main",
            "area_canteen","area_leisure",
            "area_other"
        ];

        _charts.margin = {top: 20, right: 30, bottom: 10, left: 30};
        _charts.width = chart.width()  - _charts.margin.left - _charts.margin.right;
        _charts.height = chart.height() - _charts.margin.top - _charts.margin.bottom;

        _charts.svg = d3.select("#time_line").append("svg")
            .attr("width", _charts.width + _charts.margin.left + _charts.margin.right)
            .attr("height", _charts.height + _charts.margin.top + _charts.margin.bottom);

        _charts.x_scale = d3.scale.ordinal()
            .domain(_charts.areas)
            .rangePoints([0, _charts.width], .5);

        _charts.y_scale ={};

        _charts.areas.forEach((d)=>{
            _charts.y_scale[d] = d3.scale.sqrt()
                .domain([35000,0])
                .range([0, _charts.height*0.8]);
        });

        _charts.x_axis = d3.svg.axis()
            .scale(_charts.x_scale)
            .orient("bottom");

        _charts.y_axis = d3.svg.axis()
            .orient("left");

        _charts.line = d3.svg.line()//.interpolate("basis");

        _charts.svg.append("g")
            .attr("class", "x axis")
            .attr("transform","translate("+_charts.margin.left+","+(_charts.height + _charts.margin.bottom) +")")
            .call(_charts.x_axis);

        _charts.g = _charts.svg.selectAll(".area_extent")
            .data(_charts.areas)
            .enter()
            .append("g")
            .attr("class", "area_extent")
            .attr("transform", function(d) { return "translate(" + (_charts.x_scale(d) + _charts.margin.left)+ ")"; });

        _charts.g.append("g")
            .attr("class", "axis")
            .each(function(d,i) {
                if(i === 0)
                    d3.select(this).call(_charts.y_axis.scale(_charts.y_scale[d]));
                else
                    d3.select(this).call(_charts.y_axis.tickFormat("").scale(_charts.y_scale[d]));
            })
            .attr("transform", function(d) { return "translate(0,"+_charts.height*0.2+")"; });

// Add grey background lines for context.
        _charts.background = _charts.svg.append("g")
            .attr("class", "background")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("transform", function(d) { return "translate(" + _charts.margin.left + "," + _charts.height * 0.2 + ")"; });

// Add blue foreground lines for focus.
        _charts.foreground = _charts.svg.append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("transform", function(d) { return "translate(" + _charts.margin.left + "," + _charts.height * 0.2 + ")"; });

// Returns the path for a given data point.
        function path(d) {
            let coor =[];
            _charts.areas.forEach((p)=>{
                coor.push([_charts.x_scale(p), _charts.y_scale[p](d[p])]);
            });
            return _charts.line(coor);
        }

// Add and store a brush for each axis.
        _charts.g.append("g")
            .attr("class", "brush")
            .each(function(d) { d3.select(this).call(_charts.y_scale[d].brush = d3.svg.brush().y(_charts.y_scale[d]).on("brushend", brush)); })
            .attr("transform", function(d) { return "translate(0," + _charts.height * 0.2 + ")"; })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);

        function brush(){
            let brush_data = [];
            let actives = _charts.areas.filter(function(p) {  return !_charts.y_scale[p].brush.empty(); }),
                extents = actives.map(function(p) { return _charts.y_scale[p].brush.extent(); });
            _charts.foreground.style("display", function(d) {

                return actives.every(function(p, i) {
                    if(extents[i][0] <= d[p] && d[p] <=  extents[i][1])
                        brush_data.push(d.id);
                    return extents[i][0] <= d[p] && d[p] <=  extents[i][1];
                }) ? null : "none";
            });
            console.log(brush_data);
            d3.selectAll(".traj_path").remove();
            brush_data.forEach((d)=>{
                all_traj_chart(d);
            });
        }

// Handles a brush event, toggling the display of foreground lines.
    }