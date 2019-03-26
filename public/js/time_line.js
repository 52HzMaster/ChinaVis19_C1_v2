/**
 * Created by Liang Liu on 2019/3/26.
 */
//time_line(add_data(test)); //人员时间区域图谱

// (d)=>{} 不支持 d3.select(this)
function time_line(data) {

    let time_line = $("#time_line");
    let width = time_line.width();
    let height = time_line.height();

    let x_scale = d3.time.scale()
        .domain(d3.extent(data, function (d) {
            return d.date;
        }))
        .range([0, width]);

    let y_scale = d3.scale.linear()
        .domain([0,100])
        .range([height, 0]);

    let x_axis = d3.svg.axis()
        .scale(x_scale)
        .tickFormat(d3.time.format("%H:%M"))
        .orient("bottom");

    var zoom = d3.behavior.zoom()
        .x(x_scale)
        // .scaleExtent(SCALE_EXTENT)
        .on("zoom", zoomed);

    let svg = d3.select("#time_line")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("position", "absolute")
        .call(zoom);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, 100)")
        .call(x_axis);

    let g = svg.append("g");

    g.selectAll(".v_line")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "v_line")
        .attr("x", function (d) {
            return x_scale(d.date);
        })
        .attr("y",  y_scale(100))
        .attr("width", (d,i)=>{
            if(i<data.length -1)
                return x_scale(data[i+1].date)-x_scale(data[i].date);
        })
        .attr("height", 100)
        .style({
            "fill": function (d) {
                return colorScale[area_judge(d.sid)];
            },
            "fill-opacity":0.6,
            "stroke":"#FFFFFF",
        })
        .on("mouseover",function (d,i) {
            d3.select(this) .transition().duration(200).style("fill-opacity",1);
            d3.select("."+area_judge(d.sid)).selectAll('.grid').style({
                "opacity":1,
                "fill": "#ff4229"
            });
        })
        .on("mouseout",function (d,i) {
            d3.select(this) .transition().duration(200).style("fill-opacity",0.6);
            d3.select("."+area_judge(d.sid)).selectAll('.grid').style({
                "opacity":0.6,
                "fill": colorScale[area_judge(d.sid)]
            })
        });

    function zoomed() {
        svg.select(".x.axis").call(x_axis);
        g.selectAll("rect")
            .attr("x", function (d,i) {
                if(i<data.length -1)
                    return x_scale(d.date);
            })
            .attr("y", function () {
                return 0;
            })
            .attr("width", (d,i)=>{
                if(i<data.length -1)
                    return x_scale(data[i+1].date)-x_scale(data[i].date);
            })
            .attr("height", 100)
            .on("mouseover",function (d,i) {
                d3.select(this) .transition().duration(200).style("fill-opacity",1);
                d3.select("."+area_judge(d.sid)).selectAll('.grid').style({
                    "opacity":1,
                    "fill": "#ff4229"
                });
            })
            .on("mouseout",function (d,i) {
                d3.select(this) .transition().duration(200).style("fill-opacity",0.6);
                d3.select("."+area_judge(d.sid)).selectAll('.grid').style({
                    "opacity":0.6,
                    "fill": colorScale[area_judge(d.sid)]
                })
            });

    }
}