/**
 * Created by Liang Liu on 2019/3/26.
 */
//class_block(add_data(test)); //人员时间区域图谱

// (d)=>{} 不支持 d3.select(this)
let p_id = 11396;

$.ajax({
    url: "/day1_pro_id",    //请求的url地址
    dataType: "json",   //返回格式为json
    data:{
        id:p_id
    },
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    type: "GET",   //请求方式
    contentType: "application/json",
    beforeSend: function () {//请求前的处理
    },
    success: function (data, textStatus) {

        for (let i=0; i<data.length-1;i++){
            data[i].date = new Date(data[i].date);
            data[i].stay = data[i+1].time - data[i].time;
        }
        data[data.length-1].stay = 0;
        data[data.length-1].date = new Date(data[data.length-1].date);

        class_block(data);
    },
    complete: function () {//请求完成的处理
    },
    error: function () {//请求出错处理
    }
});

function class_block(data) {

    //console.log(data);

    let time_line = $("#class_block");
    let width = time_line.width();
    let height = time_line.height()/10;

    let x_scale = d3.time.scale()
        .domain(d3.extent(data, function (d) {
            return d.date;
        }))
        .range([0, width]);

    let y_scale = d3.scale.linear()
        .domain([0,100])
        .range([height, 0]);

    var zoom = d3.behavior.zoom()
        .x(x_scale)
        // .scaleExtent(SCALE_EXTENT)
        .on("zoom", zoomed);

    let svg = d3.select("#class_block")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("position", "absolute")
        .call(zoom);

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
        .attr("height", height)
        .style({
            "fill": function (d) {
                return colorScale[d.area];
            },
            "fill-opacity":0.6,
            "stroke":"#FFFFFF",
        })
        .on("mouseover",function (d,i) {
            d3.select(this) .transition().duration(200).style("fill-opacity",1);
            d3.select("."+d.area).selectAll('.grid').style({
                "opacity":1,
                "fill": "#ff4229"
            });
        })
        .on("mouseout",function (d,i) {
            d3.select(this) .transition().duration(200).style("fill-opacity",0.6);
            d3.select("."+d.area).selectAll('.grid').style({
                "opacity":0.6,
                "fill": colorScale[d.area]
            })
        });

    function zoomed() {
        g.selectAll("rect")
            .attr("x", function (d,i) {
                if(i<data.length -1)
                    return x_scale(d.date);
            })
            .attr("y", y_scale(100))
            .attr("width", (d,i)=>{
                if(i<data.length -1)
                    return x_scale(data[i+1].date)-x_scale(data[i].date);
            })
            .attr("height",height)
            .on("mouseover",function (d,i) {
                d3.select(this) .transition().duration(200).style("fill-opacity",1);
                d3.select("."+d.area).selectAll('.grid').style({
                    "opacity":1,
                    "fill": "#ff4229"
                });
            })
            .on("mouseout",function (d,i) {
                d3.select(this) .transition().duration(200).style("fill-opacity",0.6);
                d3.select("."+d.area).selectAll('.grid').style({
                    "opacity":0.6,
                    "fill": colorScale[d.area]
                })
            });

    }
}
